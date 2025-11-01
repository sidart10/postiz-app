# MCP Media Upload Fix - Implementation Guide

## Problem
MCP clients can't attach images/media to posts without manually uploading them first and providing URLs.

## Root Cause
The MCP protocol doesn't natively support file uploads in tool calls. Images must be:
1. Either provided as URLs
2. Or base64-encoded in the tool call

## Proposed Solution
Add a new MCP tool called `upload_media` that accepts base64-encoded images and returns URLs.

---

## Implementation Steps

### Step 1: Find MCP Server Implementation
The MCP server is likely in one of these locations:
```bash
# Search for MCP server files
cd postiz-app
find . -name "*.ts" -exec grep -l "@modelcontextprotocol/sdk" {} \;

# Or search for the SSE endpoint handler
grep -r "/api/mcp" apps/backend --include="*.ts"
```

**Expected file location:**
- `apps/backend/src/api/routes/mcp.controller.ts` (or similar)
- OR integrated into `public.controller.ts`
- OR separate `apps/backend/src/mcp/` directory

### Step 2: Add Media Upload Tool

Once you find the MCP server file, add this tool definition:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/index.js';
import { UploadFactory } from '@gitroom/nestjs-libraries/upload/upload.factory';

// In your MCP server setup:
server.addTool({
  name: 'upload_media',
  description: 'Upload an image/media file to Postiz storage and get a URL',
  inputSchema: {
    type: 'object',
    properties: {
      filename: {
        type: 'string',
        description: 'Original filename (e.g., "photo.jpg")',
      },
      data: {
        type: 'string',
        description: 'Base64-encoded image data',
      },
      mimetype: {
        type: 'string',
        description: 'MIME type (e.g., "image/jpeg", "image/png")',
        default: 'image/jpeg',
      },
    },
    required: ['filename', 'data'],
  },
  async handler({ filename, data, mimetype }) {
    try {
      // Decode base64 to buffer
      const buffer = Buffer.from(data, 'base64');

      // Create multer-compatible file object
      const file = {
        originalname: filename,
        mimetype: mimetype || 'image/jpeg',
        buffer: buffer,
        size: buffer.length,
      };

      // Upload using existing Postiz upload factory
      const storage = UploadFactory.createStorage();
      const result = await storage.uploadFile(file);

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            url: result.path,
            filename: result.filename,
            message: 'Image uploaded successfully',
          }, null, 2),
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message,
          }, null, 2),
        }],
        isError: true,
      };
    }
  },
});
```

### Step 3: Update Existing Post Creation Tool

Modify the `schedule_post` or `create_post` tool to accept inline base64 images:

```typescript
// In the posts array schema:
posts: {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      // OLD: images: array of URLs only
      // NEW: images can be URLs or base64 objects
      images: {
        type: 'array',
        items: {
          oneOf: [
            // Option 1: URL string (existing behavior)
            { type: 'string', description: 'Image URL' },
            // Option 2: Base64 object (new behavior)
            {
              type: 'object',
              properties: {
                data: { type: 'string', description: 'Base64-encoded image' },
                filename: { type: 'string' },
                mimetype: { type: 'string', default: 'image/jpeg' },
              },
              required: ['data', 'filename'],
            },
          ],
        },
      },
    },
  },
}

// In the handler, process images:
async handler({ posts, ...rest }) {
  const processedPosts = await Promise.all(posts.map(async (post) => {
    if (!post.images) return post;

    // Convert base64 images to URLs
    const processedImages = await Promise.all(post.images.map(async (img) => {
      // If already a URL, return as-is
      if (typeof img === 'string') return img;

      // If base64 object, upload it
      if (img.data && img.filename) {
        const buffer = Buffer.from(img.data, 'base64');
        const file = {
          originalname: img.filename,
          mimetype: img.mimetype || 'image/jpeg',
          buffer,
          size: buffer.length,
        };

        const storage = UploadFactory.createStorage();
        const result = await storage.uploadFile(file);
        return result.path;
      }

      return null;
    }));

    return {
      ...post,
      images: processedImages.filter(Boolean),
    };
  }));

  // Continue with existing post creation logic
  // ...
}
```

### Step 4: Update MCP Tool Documentation

Add usage examples to the tool descriptions:

```typescript
description: `Create and schedule social media posts with optional media.

Images can be provided in two ways:
1. As URLs: ["https://example.com/image.jpg"]
2. As base64 objects: [{
     data: "base64EncodedString",
     filename: "photo.jpg",
     mimetype: "image/jpeg"
   }]

Example with base64:
{
  "posts": [{
    "text": "Check out this photo!",
    "images": [{
      "data": "/9j/4AAQSkZJRg...",
      "filename": "sunset.jpg",
      "mimetype": "image/jpeg"
    }]
  }]
}`
```

---

## Client-Side Usage

Once implemented, MCP clients can send images like this:

### Option 1: Two-step (using upload_media tool)
```json
// Step 1: Upload
{
  "tool": "upload_media",
  "arguments": {
    "filename": "photo.jpg",
    "data": "/9j/4AAQSkZJRg...",
    "mimetype": "image/jpeg"
  }
}
// Returns: {"url": "http://localhost:5001/uploads/2025/10/29/abc123.jpg"}

// Step 2: Post
{
  "tool": "schedule_post",
  "arguments": {
    "posts": [{
      "text": "My post",
      "images": ["http://localhost:5001/uploads/2025/10/29/abc123.jpg"]
    }]
  }
}
```

### Option 2: One-step (inline base64)
```json
{
  "tool": "schedule_post",
  "arguments": {
    "posts": [{
      "text": "My post",
      "images": [{
        "data": "/9j/4AAQSkZJRg...",
        "filename": "photo.jpg",
        "mimetype": "image/jpeg"
      }]
    }]
  }
}
```

---

## Testing After Implementation

```bash
# Rebuild the container
cd /Users/sid/Desktop/4. Coding Projects/Postiz
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Test via Claude Code
# "Upload this image to Postiz: [image data]"
# "Post to LinkedIn with this image: [image data]"
```

---

## Alternative: Use MCP Resources

If you prefer, you can use MCP resources instead of tools:

```typescript
server.addResource({
  uri: 'postiz://media/upload',
  name: 'Upload Media',
  description: 'Upload media files',
  mimeType: 'image/*',
});

server.onResourceRead = async (uri) => {
  if (uri.startsWith('postiz://media/')) {
    // Handle resource upload
  }
};
```

---

## Files to Modify

Based on standard NestJS MCP patterns:
1. **MCP Server:** `apps/backend/src/api/routes/mcp.controller.ts` (or wherever MCP is implemented)
2. **Upload Service:** Already exists at `libraries/nestjs-libraries/src/upload/upload.factory.ts` ✅
3. **Type Definitions:** Add interfaces for base64 images in `libraries/nestjs-libraries/src/dtos/`

---

## Next Steps

1. **Find the MCP server implementation file** (search commands above)
2. **Add the `upload_media` tool** (copy code from Step 2)
3. **Update post creation tool** to accept base64 (copy code from Step 3)
4. **Rebuild and test** (commands in Testing section)
5. **Update MCP documentation** for your users

---

## Benefits

✅ Clients don't need to know about upload URLs
✅ Works with any MCP client (Claude, Cursor, etc.)
✅ Backward compatible (URLs still work)
✅ Uses existing Postiz upload infrastructure
✅ Automatic error handling

---

## Questions?

If you can't find the MCP server implementation, try:
```bash
cd postiz-app
# Check package.json for MCP-related scripts
grep -i mcp package.json

# Check for SSE endpoints
grep -r "text/event-stream" apps/backend

# Check main app module
cat apps/backend/src/app.module.ts
```
