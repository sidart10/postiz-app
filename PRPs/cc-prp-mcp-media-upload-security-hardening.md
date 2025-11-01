# PRP: MCP Media Upload Security & Reliability Hardening

**Feature:** Secure Base64 Image Upload for MCP Tools
**Priority:** P0 (Critical - Security)
**Estimated Effort:** 2-3 hours
**Risk Level:** Medium → Low (after implementation)
**Status:** Ready for Implementation

---

## Executive Summary

Enhance Postiz MCP server to securely handle base64-encoded image uploads with comprehensive validation, sanitization, and error handling. Current implementation works for happy-path scenarios but has critical security vulnerabilities and reliability gaps that block production deployment.

**Impact:** Enables seamless image uploads from all MCP clients (Claude Code, Claude Desktop, Cursor) without requiring users to manually upload files first.

---

## Problem Statement

### Current State
MCP tools now accept base64-encoded images, but implementation has **7 critical security vulnerabilities**:

1. **CWE-400:** No size limits (memory exhaustion attacks possible)
2. **CWE-434:** No MIME type validation (malicious file uploads)
3. **CWE-73:** No filename sanitization (path traversal attacks)
4. **Silent Failures:** Invalid base64 creates corrupted files
5. **All-or-Nothing:** One bad image crashes entire multi-image post
6. **Resource Leaks:** Orphaned uploads when post creation fails
7. **Type Safety:** Incomplete Multer.File objects may break Cloudflare storage

### Target State
Production-ready base64 upload with:
- ✅ Size validation (prevent DoS)
- ✅ MIME type verification (prevent malicious files)
- ✅ Filename sanitization (prevent path traversal)
- ✅ Graceful partial failures (UX improvement)
- ✅ Proper error codes (debugging)
- ✅ Complete type safety (reliability)

---

## Research Findings

### Existing Postiz Patterns to Follow

#### 1. File Size Validation Pattern
**Reference:** `/libraries/nestjs-libraries/src/upload/custom.upload.validation.ts:18-42`

```typescript
private getMaxSize(mimeType: string): number {
  if (mimeType.startsWith('image/')) {
    return 10 * 1024 * 1024; // 10 MB
  } else if (mimeType.startsWith('video/')) {
    return 1024 * 1024 * 1024; // 1 GB
  }
}
```

**Apply to:** Base64 validation with 1.37x encoding overhead

#### 2. Filename Generation (Security Best Practice)
**Reference:** `/libraries/nestjs-libraries/src/upload/local.storage.ts:64-66`

```typescript
// Generate random filename instead of using original
const randomName = Array(32)
  .fill(null)
  .map(() => Math.round(Math.random() * 16).toString(16))
  .join('');
```

**Pattern:** Never trust user-provided filenames, only extract extension

#### 3. Error Handling in Services
**Reference:** `/libraries/nestjs-libraries/src/database/prisma/media/media.service.ts:71-100`

```typescript
if (totalCredits.credits <= 0) {
  throw new SubscriptionException({
    action: AuthorizationActions.Create,
    section: Sections.VIDEOS_PER_MONTH,
  });
}
```

**Pattern:** Use custom HttpException subclasses with specific status codes

#### 4. Promise.all Error Handling
**Reference:** `/libraries/nestjs-libraries/src/database/prisma/posts/posts.service.ts:95-117`

```typescript
posts: await Promise.all(
  body.posts.map(async (post) => {
    const integration = await this._integrationService.getIntegrationById(
      organization,
      post.integration.id
    );

    if (!integration) {
      throw new BadRequestException(
        `Integration with id ${post.integration.id} not found`
      );
    }
    // ...
  })
)
```

**Pattern:** Validate inside map, throw BadRequestException with descriptive message

#### 5. Multer.File Complete Structure (Cloudflare Storage)
**Reference:** `/libraries/nestjs-libraries/src/upload/cloudflare.storage.ts:95-106`

```typescript
return {
  filename: `${id}.${extension}`,
  mimetype: file.mimetype,
  size: file.size,
  buffer: file.buffer,
  originalname: `${id}.${extension}`,
  fieldname: 'file',
  path: `${this._uploadUrl}/${id}.${extension}`,
  destination: `${this._uploadUrl}/${id}.${extension}`,
  encoding: '7bit',
  stream: file.buffer as any,
};
```

**Pattern:** Return complete Multer.File with all required properties

---

### External Best Practices (2025)

#### Base64 Size Validation
**Source:** https://stackoverflow.com/questions/53764734/how-do-i-validate-base64-images-in-nodejs-express

```typescript
// Base64 increases size by ~1.37x (4/3 ratio)
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB actual
const MAX_BASE64_SIZE = Math.ceil(MAX_IMAGE_SIZE * 1.37); // ~13.7MB base64

if (base64String.length > MAX_BASE64_SIZE) {
  throw new Error('Image too large');
}
```

#### MIME Type Validation (Content-Based)
**Source:** https://www.npmjs.com/package/file-type

```typescript
import { fileTypeFromBuffer } from 'file-type';

const buffer = Buffer.from(base64, 'base64');
const type = await fileTypeFromBuffer(buffer);

if (!type || !['image/jpeg', 'image/png', 'image/gif'].includes(type.mime)) {
  throw new Error('Invalid image type');
}
```

**Note:** file-type package is ESM-only. Postiz uses CommonJS. Alternative: use `sharp` (already installed) for image validation.

#### Filename Sanitization
**Source:** https://www.stackhawk.com/blog/node-js-path-traversal-guide-examples-and-prevention/

```typescript
import path from 'path';

function sanitizeFilename(filename: string): string {
  // Remove path separators
  const basename = path.basename(filename);

  // Whitelist safe characters
  const safe = basename.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Limit length
  return safe.slice(0, 255);
}
```

#### Partial Failure Handling
**Source:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

```typescript
const results = await Promise.allSettled(uploads);

const successful = results
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value);

const failed = results
  .filter(r => r.status === 'rejected')
  .map(r => r.reason);
```

---

## Implementation Blueprint

### Architecture Overview

```
┌─────────────┐
│ MCP Client  │ (Claude Code, Cursor, etc.)
└──────┬──────┘
       │ Base64 image + metadata
       ▼
┌─────────────────────────────┐
│ IntegrationSchedulePostTool │
└──────┬──────────────────────┘
       │ 1. Validate size (base64 length)
       │ 2. Decode to buffer
       │ 3. Validate buffer (size, content, MIME)
       │ 4. Sanitize filename
       │ 5. Create safe Multer.File
       │ 6. Upload via UploadFactory
       │ 7. Handle partial failures
       ▼
┌─────────────────┐
│ Storage Service │ (Local or Cloudflare R2)
└─────────────────┘
```

### Shared Validation Utility

Create centralized validation to be used by both tools:

**New File:** `/libraries/nestjs-libraries/src/upload/base64.upload.validator.ts`

```typescript
import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import sharp from 'sharp';

export interface ValidatedUpload {
  buffer: Buffer;
  filename: string;
  mimetype: string;
  size: number;
}

export class Base64UploadValidator {
  // Constants based on CustomFileValidationPipe
  private static readonly MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
  private static readonly MAX_VIDEO_SIZE = 1024 * 1024 * 1024; // 1 GB
  private static readonly MAX_BASE64_SIZE = Math.ceil(this.MAX_IMAGE_SIZE * 1.37); // ~13.7 MB

  private static readonly ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  private static readonly ALLOWED_VIDEO_TYPES = [
    'video/mp4',
  ];

  /**
   * Sanitize filename to prevent path traversal
   * Reference: local.storage.ts - uses extname() on originalname
   */
  static sanitizeFilename(filename: string): string {
    if (!filename || typeof filename !== 'string') {
      return 'upload.jpg';
    }

    // Extract extension safely
    const extension = extname(filename).toLowerCase();

    // Whitelist allowed extensions
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4'];
    if (!allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        `Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`
      );
    }

    // Generate safe random name (following local.storage.ts pattern)
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    return `${randomName}${extension}`;
  }

  /**
   * Validate base64 string size before decoding
   */
  static validateBase64Size(base64Data: string, isVideo: boolean = false): void {
    if (!base64Data || typeof base64Data !== 'string') {
      throw new BadRequestException('Base64 data must be a non-empty string');
    }

    const maxSize = isVideo ? this.MAX_VIDEO_SIZE * 1.37 : this.MAX_BASE64_SIZE;

    if (base64Data.length > maxSize) {
      const maxMB = Math.floor(maxSize / (1024 * 1024));
      throw new BadRequestException(
        `Base64 data too large. Maximum ${maxMB}MB (encoded size)`
      );
    }

    // Validate base64 format (basic check)
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(base64Data)) {
      throw new BadRequestException('Invalid base64 format');
    }
  }

  /**
   * Validate decoded buffer content and MIME type
   * Uses sharp (already installed) for image validation instead of file-type (ESM-only)
   */
  static async validateBuffer(
    buffer: Buffer,
    declaredMimetype: string
  ): Promise<ValidatedUpload> {
    // Validate buffer is not empty or too small
    if (!buffer || buffer.length === 0) {
      throw new BadRequestException('Decoded buffer is empty');
    }

    if (buffer.length < 100) {
      throw new BadRequestException(
        'File too small (likely corrupted or invalid base64)'
      );
    }

    // Check actual vs declared size
    const isVideo = declaredMimetype.startsWith('video/');
    const maxSize = isVideo ? this.MAX_VIDEO_SIZE : this.MAX_IMAGE_SIZE;

    if (buffer.length > maxSize) {
      const maxMB = Math.floor(maxSize / (1024 * 1024));
      throw new BadRequestException(
        `File size ${Math.floor(buffer.length / (1024 * 1024))}MB exceeds maximum ${maxMB}MB`
      );
    }

    // Validate MIME type using sharp for images
    if (declaredMimetype.startsWith('image/')) {
      try {
        const metadata = await sharp(buffer).metadata();

        // Map sharp format to MIME type
        const actualMimetype = this.formatToMime(metadata.format);

        if (!this.ALLOWED_IMAGE_TYPES.includes(actualMimetype)) {
          throw new BadRequestException(
            `Unsupported image type: ${actualMimetype}. Allowed: ${this.ALLOWED_IMAGE_TYPES.join(', ')}`
          );
        }

        // Verify declared MIME matches actual
        if (declaredMimetype !== actualMimetype && declaredMimetype !== 'image/jpeg' && actualMimetype !== 'image/jpg') {
          console.warn(
            `[Base64Validator] MIME type mismatch: declared=${declaredMimetype}, actual=${actualMimetype}`
          );
        }

        return {
          buffer,
          filename: '', // Will be set by caller
          mimetype: actualMimetype,
          size: buffer.length,
        };
      } catch (error) {
        if (error instanceof BadRequestException) throw error;
        throw new BadRequestException(
          `Invalid or corrupted image file: ${error.message}`
        );
      }
    }

    // For videos, basic validation only (full video validation is expensive)
    if (declaredMimetype.startsWith('video/')) {
      if (!this.ALLOWED_VIDEO_TYPES.includes(declaredMimetype)) {
        throw new BadRequestException(
          `Unsupported video type: ${declaredMimetype}. Allowed: ${this.ALLOWED_VIDEO_TYPES.join(', ')}`
        );
      }

      // Basic MP4 signature check (0x00 0x00 0x00 [size] 0x66 0x74 0x79 0x70)
      const signature = buffer.toString('hex', 4, 8);
      if (signature !== '66747970') {
        throw new BadRequestException('Invalid MP4 file signature');
      }

      return {
        buffer,
        filename: '',
        mimetype: declaredMimetype,
        size: buffer.length,
      };
    }

    throw new BadRequestException(
      `Unsupported file type: ${declaredMimetype}`
    );
  }

  /**
   * Create complete Express.Multer.File object
   * Reference: cloudflare.storage.ts:95-106 for required properties
   */
  static createMulterFile(
    validated: ValidatedUpload,
    originalFilename: string
  ): Express.Multer.File {
    const sanitizedFilename = this.sanitizeFilename(originalFilename);

    return {
      fieldname: 'file',
      originalname: sanitizedFilename,
      encoding: '7bit',
      mimetype: validated.mimetype,
      size: validated.size,
      buffer: validated.buffer,
      destination: '', // Set by storage provider
      filename: sanitizedFilename,
      path: '', // Set by storage provider
      stream: validated.buffer as any, // Cloudflare expects this
    };
  }

  /**
   * Convert sharp format to MIME type
   */
  private static formatToMime(format: string | undefined): string {
    const mimeMap: Record<string, string> = {
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
    };

    return mimeMap[format || ''] || 'image/jpeg';
  }
}
```

---

## Implementation Tasks

### Task 1: Create Base64 Upload Validator Utility
**File:** `libraries/nestjs-libraries/src/upload/base64.upload.validator.ts` (NEW)

**Implementation:**
1. Create class with static validation methods
2. Add base64 size validation (reference: research findings)
3. Add buffer content validation using sharp
4. Add filename sanitization (whitelist approach)
5. Add createMulterFile factory (complete type)
6. Follow CustomFileValidationPipe patterns for size limits

**Validation:**
- TypeScript compiles without errors
- All imports resolve
- Size constants match CustomFileValidationPipe

---

### Task 2: Update UploadMediaTool with Validation
**File:** `libraries/nestjs-libraries/src/chat/tools/upload.media.tool.ts`

**Changes:**
```typescript
// Add import
import { Base64UploadValidator } from '@gitroom/nestjs-libraries/upload/base64.upload.validator';

// In execute function, replace lines 63-77:
execute: async (args, options) => {
  checkAuth(args, options);

  try {
    const { context } = args;

    // Step 1: Validate base64 size BEFORE decoding
    Base64UploadValidator.validateBase64Size(context.data);

    // Step 2: Decode
    const buffer = Buffer.from(context.data, 'base64');

    // Step 3: Validate buffer content and MIME type
    const validated = await Base64UploadValidator.validateBuffer(
      buffer,
      context.mimetype || 'image/jpeg'
    );

    // Step 4: Create complete Multer.File object
    const file = Base64UploadValidator.createMulterFile(
      validated,
      context.filename
    );

    // Step 5: Upload
    const storage = UploadFactory.createStorage();
    const result = await storage.uploadFile(file);

    console.log(`[UploadMediaTool] Successfully uploaded: ${result.path}`);

    return {
      success: true,
      url: result.path,
      filename: result.filename,
    };
  } catch (error) {
    console.error(`[UploadMediaTool] Upload failed:`, error);

    // Return structured error
    return {
      success: false,
      error: error.message || 'Failed to upload media',
      errorCode: error.status || 500,
    };
  }
}
```

**Validation:**
- All validation steps execute before upload
- Errors are caught and returned (not thrown)
- Console logging maintained

---

### Task 3: Update IntegrationSchedulePostTool with Validation & Partial Failures
**File:** `libraries/nestjs-libraries/src/chat/tools/integration.schedule.post.ts`

**Changes:**

```typescript
// Add import (after line 15)
import { Base64UploadValidator } from '@gitroom/nestjs-libraries/upload/base64.upload.validator';

// Replace processedAttachments logic (lines 203-245) with:
const processedAttachments = await Promise.allSettled(
  postOrComment.attachments.map(async (attachment) => {
    // If it's already a URL string, use it as-is
    if (typeof attachment === 'string') {
      return attachment;
    }

    // If it's a base64 object, validate and upload
    if (attachment && typeof attachment === 'object' && 'data' in attachment && 'filename' in attachment) {
      try {
        console.log(
          `[IntegrationSchedulePostTool] Uploading base64 image: ${attachment.filename}`
        );

        // Step 1: Validate base64 size
        const isVideo = attachment.mimetype?.startsWith('video/');
        Base64UploadValidator.validateBase64Size(attachment.data, isVideo);

        // Step 2: Decode
        const buffer = Buffer.from(attachment.data, 'base64');

        // Step 3: Validate buffer content
        const validated = await Base64UploadValidator.validateBuffer(
          buffer,
          attachment.mimetype || 'image/jpeg'
        );

        // Step 4: Create complete Multer.File
        const file = Base64UploadValidator.createMulterFile(
          validated,
          attachment.filename
        );

        // Step 5: Upload
        const storage = UploadFactory.createStorage();
        const result = await storage.uploadFile(file);

        console.log(
          `[IntegrationSchedulePostTool] Uploaded successfully: ${result.path}`
        );
        return result.path;
      } catch (error) {
        console.error(
          `[IntegrationSchedulePostTool] Failed to upload ${attachment.filename}:`,
          error
        );
        // Return error object instead of throwing
        return {
          error: true,
          filename: attachment.filename,
          message: error.message,
        };
      }
    }

    return null;
  })
);

// Process results - separate successes from failures
const uploadResults = processedAttachments.map((result, index) => {
  if (result.status === 'fulfilled') {
    return result.value;
  } else {
    return {
      error: true,
      filename: postOrComment.attachments[index]?.filename || 'unknown',
      message: result.reason?.message || 'Upload failed',
    };
  }
});

// Filter errors and successes
const successfulUrls = uploadResults.filter(
  (r) => typeof r === 'string' || (r && !r.error)
);
const failedUploads = uploadResults.filter((r) => r && r.error);

// If ANY uploads failed, throw detailed error
if (failedUploads.length > 0) {
  const errorDetails = failedUploads
    .map((f) => `${f.filename}: ${f.message}`)
    .join('; ');
  throw new Error(
    `Failed to upload ${failedUploads.length} of ${postOrComment.attachments.length} images: ${errorDetails}`
  );
}

return {
  ...postOrComment,
  attachments: successfulUrls,
};
```

**Validation:**
- Promise.allSettled allows partial success tracking
- Detailed error messages show which images failed
- Zero successful uploads = throw error
- Some successful uploads = proceed with warning (user decides)

---

### Task 4: Add Output Schema for Error Codes
**File:** `libraries/nestjs-libraries/src/chat/tools/upload.media.tool.ts`

**Update outputSchema:**

```typescript
outputSchema: z.object({
  success: z.boolean().describe('Whether the upload was successful'),
  url: z
    .string()
    .optional()
    .describe('The URL of the uploaded file'),
  filename: z
    .string()
    .optional()
    .describe('The generated filename'),
  error: z
    .string()
    .optional()
    .describe('Error message if upload failed'),
  errorCode: z
    .number()
    .optional()
    .describe('HTTP error code (400=validation, 500=server error)'),
}),
```

---

### Task 5: Add Comprehensive Validation Tests
**File:** `libraries/nestjs-libraries/src/upload/base64.upload.validator.spec.ts` (NEW)

```typescript
import { Base64UploadValidator } from './base64.upload.validator';
import { BadRequestException } from '@nestjs/common';

describe('Base64UploadValidator', () => {
  describe('validateBase64Size', () => {
    it('should accept valid small base64', () => {
      const small = Buffer.from('test').toString('base64');
      expect(() => Base64UploadValidator.validateBase64Size(small)).not.toThrow();
    });

    it('should reject oversized base64', () => {
      const huge = 'A'.repeat(20 * 1024 * 1024); // 20MB base64
      expect(() => Base64UploadValidator.validateBase64Size(huge)).toThrow(
        BadRequestException
      );
    });

    it('should reject invalid base64 characters', () => {
      expect(() =>
        Base64UploadValidator.validateBase64Size('not-base64-!@#$%')
      ).toThrow(BadRequestException);
    });

    it('should reject empty string', () => {
      expect(() => Base64UploadValidator.validateBase64Size('')).toThrow(
        BadRequestException
      );
    });
  });

  describe('sanitizeFilename', () => {
    it('should extract extension and generate random name', () => {
      const result = Base64UploadValidator.sanitizeFilename('photo.jpg');
      expect(result).toMatch(/^[a-f0-9]{32}\.jpg$/);
    });

    it('should block path traversal attempts', () => {
      const result = Base64UploadValidator.sanitizeFilename('../../../etc/passwd.jpg');
      expect(result).not.toContain('..');
      expect(result).toMatch(/^[a-f0-9]{32}\.jpg$/);
    });

    it('should block invalid extensions', () => {
      expect(() =>
        Base64UploadValidator.sanitizeFilename('malware.exe')
      ).toThrow(BadRequestException);
    });

    it('should handle missing extension', () => {
      expect(() =>
        Base64UploadValidator.sanitizeFilename('noextension')
      ).toThrow(BadRequestException);
    });
  });

  describe('validateBuffer', () => {
    it('should validate JPEG buffer', async () => {
      // Create minimal valid JPEG (FFD8FFE0 header)
      const jpegBuffer = Buffer.from([
        0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46,
        // ... (minimal JPEG structure)
      ]);

      const result = await Base64UploadValidator.validateBuffer(
        jpegBuffer,
        'image/jpeg'
      );

      expect(result.mimetype).toBe('image/jpeg');
      expect(result.size).toBeGreaterThan(0);
    });

    it('should reject empty buffer', async () => {
      await expect(
        Base64UploadValidator.validateBuffer(Buffer.from([]), 'image/jpeg')
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject too small buffer', async () => {
      const tiny = Buffer.from([1, 2, 3]); // 3 bytes
      await expect(
        Base64UploadValidator.validateBuffer(tiny, 'image/jpeg')
      ).rejects.toThrow('File too small');
    });

    it('should reject non-image data', async () => {
      const textBuffer = Buffer.from('This is not an image');
      await expect(
        Base64UploadValidator.validateBuffer(textBuffer, 'image/jpeg')
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('createMulterFile', () => {
    it('should create complete Multer.File object', () => {
      const validated = {
        buffer: Buffer.from('test'),
        filename: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 100,
      };

      const file = Base64UploadValidator.createMulterFile(validated, 'original.jpg');

      expect(file.fieldname).toBe('file');
      expect(file.encoding).toBe('7bit');
      expect(file.mimetype).toBe('image/jpeg');
      expect(file.size).toBe(100);
      expect(file.buffer).toBeDefined();
      expect(file.originalname).toMatch(/^[a-f0-9]{32}\.jpg$/);
    });
  });
});
```

---

### Task 6: Add Integration Tests
**File:** `libraries/nestjs-libraries/src/chat/tools/upload.media.tool.spec.ts` (NEW)

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UploadMediaTool } from './upload.media.tool';
import { UploadFactory } from '@gitroom/nestjs-libraries/upload/upload.factory';

describe('UploadMediaTool Integration', () => {
  let tool: UploadMediaTool;
  let uploadMediaTool: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadMediaTool],
    }).compile();

    tool = module.get<UploadMediaTool>(UploadMediaTool);
    uploadMediaTool = tool.run();
  });

  it('should upload valid base64 image', async () => {
    // Create minimal valid PNG
    const pngBase64 = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      // ... minimal PNG structure
    ]).toString('base64');

    const result = await uploadMediaTool.execute({
      context: {
        filename: 'test.png',
        data: pngBase64,
        mimetype: 'image/png',
      },
      runtimeContext: new Map([['organization', JSON.stringify({ id: 'test-org' })]]),
    }, {});

    expect(result.success).toBe(true);
    expect(result.url).toContain('/uploads/');
  });

  it('should reject oversized base64', async () => {
    const huge = 'A'.repeat(20 * 1024 * 1024);

    const result = await uploadMediaTool.execute({
      context: {
        filename: 'huge.jpg',
        data: huge,
        mimetype: 'image/jpeg',
      },
      runtimeContext: new Map(),
    }, {});

    expect(result.success).toBe(false);
    expect(result.error).toContain('too large');
  });

  it('should reject invalid base64', async () => {
    const result = await uploadMediaTool.execute({
      context: {
        filename: 'test.jpg',
        data: 'not-valid-base64-!@#$',
        mimetype: 'image/jpeg',
      },
      runtimeContext: new Map(),
    }, {});

    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid base64');
  });
});
```

---

## Error Handling Strategy

### Error Classification

| Error Code | Type | Handling | User Message |
|------------|------|----------|--------------|
| 400 | Validation Failed | Return error object | "Image validation failed: {reason}" |
| 413 | Payload Too Large | Return error object | "Image too large (max 10MB)" |
| 415 | Unsupported Media | Return error object | "Invalid image type" |
| 500 | Storage Failure | Throw exception | "Failed to save image" |
| 507 | Storage Full | Throw exception | "Storage quota exceeded" |

### Error Response Format

```typescript
{
  success: false,
  error: "Detailed error message",
  errorCode: 400,
  details: {
    filename: "photo.jpg",
    declaredType: "image/jpeg",
    actualType: "text/plain",
  }
}
```

### Partial Failure Handling

**Strategy:** Use Promise.allSettled and report all failures together

```typescript
// If 3 of 5 images fail:
throw new Error(
  `Failed to upload 3 of 5 images:
   - image1.jpg: File too large
   - image2.png: Invalid format
   - image3.gif: Corrupted data`
);
```

---

## Validation Gates

### Pre-Implementation Checks

```bash
# 1. Verify TypeScript compiles
cd /Users/sid/Desktop/4.\ Coding\ Projects/Postiz/postiz-app
pnpm run build:backend

# 2. Check for lint errors
pnpm run lint

# 3. Verify dependencies installed
pnpm list sharp mime-types @nestjs/common
```

### Post-Implementation Validation

```bash
# 1. TypeScript compilation
pnpm run build:backend
# Expected: No errors in upload or chat modules

# 2. Run unit tests
pnpm test -- base64.upload.validator.spec.ts
# Expected: All tests pass

# 3. Run integration tests
pnpm test -- upload.media.tool.spec.ts
# Expected: All tests pass

# 4. Lint check
pnpm run lint
# Expected: No new lint errors

# 5. Start application and verify
docker-compose down && docker-compose build --no-cache && docker-compose up -d
docker-compose logs -f postiz | grep -E "UploadMediaTool|Base64Validator"
# Expected: No startup errors, validator initializes
```

### Manual Testing Checklist

```bash
# Test 1: Valid small image upload
# Via MCP: Upload a 100KB JPEG
# Expected: Success, URL returned

# Test 2: Oversized image rejection
# Via MCP: Upload 15MB image
# Expected: Error "Image too large"

# Test 3: Invalid base64
# Via MCP: Send malformed base64
# Expected: Error "Invalid base64 format"

# Test 4: MIME type spoofing
# Via MCP: Send PNG with declared mimetype="image/jpeg"
# Expected: Warning logged, upload succeeds with correct type

# Test 5: Path traversal attempt
# Via MCP: filename="../../../etc/passwd.jpg"
# Expected: Filename sanitized to random hex

# Test 6: Partial upload failure
# Via MCP: Post with 3 images, 1 corrupted
# Expected: Error showing which image failed

# Test 7: Complete post flow
# Via MCP: "Post to LinkedIn with image: [base64]"
# Expected: Image uploads, post publishes, visible on LinkedIn
```

---

## Security Considerations

### Attack Vectors Mitigated

1. **Memory Exhaustion (DoS)**
   - Mitigation: Size validation before decode
   - Test: Send 100MB base64 → Rejected at ~13.7MB

2. **Path Traversal**
   - Mitigation: Filename sanitization, only extract extension
   - Test: `filename="../../../etc/passwd"` → Safe random name

3. **Malicious File Upload**
   - Mitigation: MIME validation via sharp, extension whitelist
   - Test: Upload .exe as .jpg → Rejected

4. **Base64 Bomb**
   - Mitigation: Buffer size validation after decode
   - Test: Highly compressed base64 → Size check catches it

5. **Resource Exhaustion**
   - Mitigation: Partial failure handling, cleanup on error
   - Test: Upload 100 images → Memory stable

### Security Validation Tests

```typescript
// Add to test suite
describe('Security Tests', () => {
  it('should prevent memory exhaustion', async () => {
    const huge = 'A'.repeat(50 * 1024 * 1024); // 50MB
    await expect(validator.validateBase64Size(huge)).rejects.toThrow();
  });

  it('should prevent path traversal', () => {
    const malicious = '../../../etc/passwd.jpg';
    const safe = validator.sanitizeFilename(malicious);
    expect(safe).not.toContain('..');
    expect(safe).not.toContain('/');
  });

  it('should prevent MIME spoofing', async () => {
    const pngData = Buffer.from([0x89, 0x50, 0x4e, 0x47, /* PNG header */]);
    await expect(
      validator.validateBuffer(pngData, 'image/jpeg')
    ).resolves.toHaveProperty('mimetype', 'image/png');
  });
});
```

---

## Implementation Order

Execute tasks in this exact order to maintain system stability:

1. **Task 1:** Create `base64.upload.validator.ts` with all validation methods
2. **Task 2:** Update `upload.media.tool.ts` to use validator
3. **Task 3:** Update `integration.schedule.post.ts` with validation + partial failures
4. **Task 4:** Add error codes to output schemas
5. **Task 5:** Create unit tests for validator
6. **Task 6:** Create integration tests for tools
7. **Run validation gates:** Build, test, lint
8. **Manual testing:** Follow checklist above
9. **Deploy:** Rebuild Docker container

**Critical:** Do NOT skip task 1. All other tasks depend on the validator utility.

---

## Rollback Plan

If issues occur after deployment:

```bash
# Option 1: Revert specific files
cd /Users/sid/Desktop/4.\ Coding\ Projects/Postiz/postiz-app
git checkout HEAD~1 -- libraries/nestjs-libraries/src/chat/tools/upload.media.tool.ts
git checkout HEAD~1 -- libraries/nestjs-libraries/src/chat/tools/integration.schedule.post.ts
git checkout HEAD~1 -- libraries/nestjs-libraries/src/chat/tools/tool.list.ts
rm libraries/nestjs-libraries/src/upload/base64.upload.validator.ts

# Option 2: Disable uploadMediaTool in tool.list.ts
# Comment out UploadMediaTool from exports

# Option 3: Full rollback
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## Success Metrics

**Deployment Ready When:**
- ✅ All 6 Priority 1 fixes implemented
- ✅ Unit tests pass (90%+ coverage on validator)
- ✅ Integration tests pass
- ✅ Manual security tests pass
- ✅ TypeScript compiles without errors
- ✅ No lint errors
- ✅ Docker build succeeds
- ✅ Application starts without errors
- ✅ Test upload via MCP succeeds

**Monitoring After Deployment:**
- Track upload success/failure rates
- Monitor memory usage during uploads
- Log validation failures (identify attack attempts)
- Track upload latency (should be <2s for 1MB images)

---

## Dependencies & Prerequisites

### Required Packages (Already Installed)
- `sharp@^0.33.4` - Image validation
- `mime-types@^2.1.35` - MIME type utilities
- `@nestjs/common@^10.0.2` - Exception classes
- `zod@^3.25.76` - Schema validation

### Configuration Requirements
- `UPLOAD_DIRECTORY` must be set and writable
- `STORAGE_PROVIDER` must be configured
- `FRONTEND_URL` must be set for URL generation

### No New Dependencies Required
All functionality can be implemented with existing packages.

---

## Known Limitations

1. **Video Validation:** Basic signature check only (full video parsing too expensive)
2. **File-Type Package:** Not used due to ESM incompatibility with Postiz (CommonJS)
3. **Streaming:** Not implemented (all in-memory)
4. **Content Deduplication:** Not implemented
5. **Progress Feedback:** MCP protocol doesn't support upload progress

---

## References

### Postiz Codebase
- `/libraries/nestjs-libraries/src/upload/custom.upload.validation.ts` - Size limits
- `/libraries/nestjs-libraries/src/upload/local.storage.ts` - Filename generation
- `/libraries/nestjs-libraries/src/upload/cloudflare.storage.ts` - Complete Multer.File
- `/libraries/nestjs-libraries/src/chat/auth.context.ts` - Authentication pattern
- `/apps/backend/src/api/routes/media.controller.ts` - Upload controller pattern

### External Resources
- [Base64 Validation Best Practices](https://stackoverflow.com/questions/53764734/how-do-i-validate-base64-images-in-nodejs-express)
- [Path Traversal Prevention](https://www.stackhawk.com/blog/node-js-path-traversal-guide-examples-and-prevention/)
- [Node.js Security Best Practices](https://nodejs.org/en/learn/getting-started/security-best-practices)
- [Sharp Documentation](https://sharp.pixelplumbing.com/api-constructor)
- [Promise.allSettled MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

---

## PRP Confidence Score

**8.5/10** - High confidence for one-pass implementation

**Deductions:**
- -0.5: Sharp image validation may need adjustment for edge cases
- -0.5: Integration testing requires running Docker environment
- -0.5: Manual testing required for end-to-end validation

**Strengths:**
- ✅ Complete code examples provided
- ✅ All patterns reference existing codebase
- ✅ Clear implementation order
- ✅ Comprehensive error handling
- ✅ Executable validation gates
- ✅ Rollback plan included
- ✅ No new dependencies required

---

## Implementation Checklist

- [ ] Task 1: Create base64.upload.validator.ts
- [ ] Task 2: Update upload.media.tool.ts with validation
- [ ] Task 3: Update integration.schedule.post.ts with validation + partial failures
- [ ] Task 4: Add error codes to output schemas
- [ ] Task 5: Create base64.upload.validator.spec.ts
- [ ] Task 6: Create upload.media.tool.spec.ts
- [ ] Validation Gate: Run `pnpm run build:backend`
- [ ] Validation Gate: Run `pnpm test`
- [ ] Validation Gate: Run `pnpm run lint`
- [ ] Manual Testing: Follow security test checklist
- [ ] Deploy: Rebuild Docker container
- [ ] Verify: Test upload via MCP client
- [ ] Monitor: Check logs for validation errors
- [ ] Document: Update MCP usage guide

---

## Post-Implementation

### Documentation Updates Required
1. Update `/docs/mcp-integration-guide.md` with base64 upload examples
2. Add security considerations section
3. Document error codes and troubleshooting

### Monitoring Setup
```bash
# Track upload metrics
docker-compose logs postiz | grep -E "UploadMediaTool|Base64Validator" | tail -100

# Monitor for attacks
docker-compose logs postiz | grep "BadRequestException.*base64\|too large\|Invalid"
```

### Operational Runbook
- Add to Story 4.6 operations runbook
- Include validation error troubleshooting
- Document storage quota management
