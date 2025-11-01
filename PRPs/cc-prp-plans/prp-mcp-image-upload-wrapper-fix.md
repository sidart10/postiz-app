# PRP: MCP Image Upload Wrapper Fix - Enable Image Posting via MCP

**Feature:** MCP Wrapper Tool for Image Upload Support
**Priority:** P0 (Critical - Blocking MCP Automation)
**Estimated Effort:** 2-3 hours
**Risk Level:** Low → Very Low
**Status:** Ready for Implementation
**GitHub Issue:** https://github.com/gitroomhq/postiz-app/issues/856
**Related PR:** https://github.com/gitroomhq/postiz-app/pull/968 (future architecture)

---

## Executive Summary

Create a wrapper tool that translates MCP client calls with `images` parameter into the internal Postiz tool format that uses `attachments`. This enables Claude Code, Claude Desktop, and Cursor to post images via MCP without manual upload steps.

**Impact:** Enables complete MCP automation of social media posts including images, fulfilling the core value proposition of hands-free posting.

**Key Constraint:** Must work with current Mastra-based MCP architecture (NOT the future decorator-based PR #968 architecture).

---

## Problem Statement

### Current State
When MCP clients call `POSTIZ_SCHEDULE_POST` with images:

```json
{
  "posts": [{
    "text": "My post content",
    "images": ["https://example.com/image.jpg"]
  }]
}
```

The images are **silently ignored** - only text is posted. This is GitHub Issue #856.

### Root Cause
**Schema Mismatch Between MCP External API and Internal Tool:**

```typescript
// MCP Client sends:
posts: [{ text: string, images: string[] }]

// Internal tool expects:
socialPost: [{
  postsAndComments: [{
    content: string,
    attachments: string[]  // ← Different parameter name!
  }]
}]
```

The Mastra agent (GPT-4.1) is supposed to intelligently transform parameters, but it **doesn't have explicit mapping instructions** and fails to do this transformation.

### Why Previous Fix Failed
Adding agent instructions (in `load.tools.service.ts`) doesn't work because:
- MCP tools are exposed **directly** through `MCPServer.tools` (see `start.mcp.ts:14-20`)
- They bypass the agent's conversational instructions
- Direct tool calls don't process the agent's prompt

### Target State
MCP client calls `POSTIZ_SCHEDULE_POST` → Wrapper transforms schema → Internal tool processes → Images appear in post ✅

---

## All Needed Context

### Documentation & References
```yaml
MUST READ:
- file: libraries/nestjs-libraries/src/chat/tools/integration.list.tool.ts
  why: Perfect example of AgentToolInterface pattern with auth and organization handling

- file: libraries/nestjs-libraries/src/chat/tools/integration.schedule.post.ts
  why: The actual internal tool we'll wrap - study its schema and error handling
  lines: 49-107 (inputSchema), 118-258 (execute logic)

- file: libraries/nestjs-libraries/src/chat/tools/tool.list.ts
  why: Where new tools are registered - simple array export

- file: libraries/nestjs-libraries/src/chat/chat.module.ts
  why: How tools are provided to NestJS DI system

- file: libraries/nestjs-libraries/src/chat/load.tools.service.ts
  why: How tools are loaded and organized into agent
  lines: 24-41 (loadTools method)

- file: libraries/nestjs-libraries/src/chat/start.mcp.ts
  why: How Mastra exposes tools through MCPServer
  lines: 12-21 (tool exposure)

EXTERNAL DOCS:
- url: https://github.com/gitroomhq/postiz-app/issues/856
  why: Complete bug report with reproduction steps and community discussion

- url: https://docs.mastra.ai/tools
  why: Mastra createTool API documentation

GITHUB PR (Different Architecture - Reference Only):
- url: https://github.com/gitroomhq/postiz-app/pull/968
  why: Shows the LOGIC for image handling (lines 80-108) but uses decorator architecture we don't have
  critical: We're adapting the image handling logic, NOT implementing the decorator system
```

### Current Codebase Tree
```bash
postiz-app/
├── apps/
│   └── backend/
│       └── src/
│           ├── api/
│           ├── app.module.ts (imports ChatModule)
│           ├── main.ts (calls startMcp)
│           └── public-api/
├── libraries/
│   └── nestjs-libraries/
│       └── src/
│           ├── chat/
│           │   ├── agent.tool.interface.ts (Tool interface)
│           │   ├── auth.context.ts (checkAuth helper)
│           │   ├── async.storage.ts (context management)
│           │   ├── chat.module.ts (NestJS module)
│           │   ├── load.tools.service.ts (Tool loading)
│           │   ├── mastra.service.ts (Mastra instance)
│           │   ├── start.mcp.ts (MCP server startup)
│           │   └── tools/
│           │       ├── agent.tool.interface.ts
│           │       ├── integration.list.tool.ts ← PATTERN TO FOLLOW
│           │       ├── integration.schedule.post.ts ← TOOL TO WRAP
│           │       ├── integration.trigger.tool.ts
│           │       ├── integration.validation.tool.ts
│           │       ├── generate.image.tool.ts
│           │       └── tool.list.ts ← REGISTER HERE
│           ├── database/
│           │   └── prisma/
│           │       ├── integrations/integration.service.ts
│           │       └── posts/posts.service.ts
│           ├── openai/
│           │   └── openai.service.ts (generateImage method)
│           └── services/
│               └── make.is.ts (makeId helper)
```

### Desired Codebase Tree (Files to Add)
```bash
libraries/nestjs-libraries/src/chat/tools/
└── mcp.schedule.post.wrapper.ts  ← NEW FILE
    Responsibility: Transform MCP external schema to internal tool schema
    Dependencies: IntegrationSchedulePostTool, IntegrationService, OpenaiService
    Exports: McpSchedulePostWrapper class implementing AgentToolInterface
```

### Known Gotchas & Library Quirks
```typescript
// CRITICAL: Mastra Tools Naming
// Tool name in class (this.name) !== Tool ID in createTool (id:)
// Example: name='integrationList' but id='integrationList'
// MCP exposes tools by the tool.id from createTool, not the class name

// CRITICAL: NestJS Dependency Injection
// All tool dependencies MUST be in ChatModule providers
// If you need OpenaiService, it must be imported and available

// CRITICAL: Auth Context
// checkAuth(args, options) MUST be called first in execute
// organization ID comes from runtimeContext.get('organization')

// CRITICAL: Mastra Schema
// inputSchema and outputSchema are REQUIRED
// execute() receives: { context, runtimeContext } from args

// CRITICAL: Image URLs Only
// storage.uploadSimple() only accepts HTTP/HTTPS URLs
// Local file paths will FAIL silently
// Base64 requires separate handling (out of scope for this PRP)

// GOTCHA: Promise.all Error Handling
// If one image fails, entire post creation fails
// For production: consider Promise.allSettled (future enhancement)

// GOTCHA: Integration Premium Status
// wrapper hardcodes isPremium: false
// Future: query actual integration to get premium status for X/Twitter
```

---

## Implementation Blueprint

### Data Models and Types

```typescript
// External MCP Schema (what MCP clients send)
interface McpPostRequest {
  type: 'draft' | 'schedule' | 'now';
  configId: string;
  generatePictures: boolean;
  date: string;  // UTC ISO 8601
  providerId: string;  // Integration UUID
  posts: Array<{
    text: string;
    images: string[];  // Public HTTP/HTTPS URLs
  }>;
}

// Internal Tool Schema (what IntegrationSchedulePostTool expects)
interface InternalPostRequest {
  socialPost: Array<{
    integrationId: string;
    isPremium: boolean;
    date: string;
    shortLink: boolean;
    type: 'draft' | 'schedule' | 'now';
    postsAndComments: Array<{
      content: string;
      attachments: string[];  // URLs to download
    }>;
    settings: Array<{
      key: string;
      value: any;
    }>;
  }>;
}
```

### List of Tasks (Implementation Order)

```yaml
Task 1: Create Wrapper Tool Class
  CREATE libraries/nestjs-libraries/src/chat/tools/mcp.schedule.post.wrapper.ts
  PATTERN: Mirror structure from integration.list.tool.ts
  IMPLEMENT:
    - Class: McpSchedulePostWrapper implements AgentToolInterface
    - Constructor: Inject IntegrationSchedulePostTool, IntegrationService, OpenaiService
    - Property: name = 'mcpSchedulePostWrapper'
    - Method: run() returns createTool(...)
  SCHEMA:
    - id: 'POSTIZ_SCHEDULE_POST'
    - inputSchema: Match MCP external API (posts with text + images)
    - outputSchema: Simple success message
    - execute: Transform and delegate

Task 2: Implement Image Handling Logic
  IN mcp.schedule.post.wrapper.ts execute() method:
  LOGIC (from PR #968 lines 80-108):
    1. Check if post.images exists and has items
    2. If yes: Use provided image URLs directly
    3. If no + generatePictures=true: Call OpenAI to generate image
    4. If no + generatePictures=false: Empty images array
    5. Map each image URL to {id, path} object format
  PATTERN: See PR #968 patch (provided in context)

Task 3: Implement Schema Transformation
  IN execute() method:
  TRANSFORM:
    - posts[].text → socialPost[].postsAndComments[].content
    - posts[].images → socialPost[].postsAndComments[].attachments
    - providerId → socialPost[].integrationId
    - Add defaults: isPremium=false, shortLink=false, settings=[]
  CALL: existing IntegrationSchedulePostTool.run().execute()

Task 4: Register Wrapper in Tool List
  MODIFY libraries/nestjs-libraries/src/chat/tools/tool.list.ts
  FIND: export const toolList = [
  ADD: McpSchedulePostWrapper at END of array (before closing bracket)
  IMPORT: Add import for McpSchedulePostWrapper

Task 5: Verify Dependencies in ChatModule
  CHECK libraries/nestjs-libraries/src/chat/chat.module.ts
  VERIFY: toolList is spread into providers
  IF NEEDED: Add OpenaiService to imports (check if already available)

Task 6: Update Mastra Tool Naming (Critical)
  MODIFY libraries/nestjs-libraries/src/chat/start.mcp.ts
  FIND: const tools = await agent.getTools();
  ADD AFTER: Tool name transformation logic
  RENAME: mcpSchedulePostWrapper → POSTIZ_SCHEDULE_POST for MCP exposure
  PRESERVE: All other tool names unchanged

Task 7: Build and Deploy
  DOCKER:
    - docker-compose down
    - docker-compose build --no-cache postiz (5-10 min build)
    - docker-compose up -d
    - docker-compose logs -f postiz (wait for "Backend is running")

Task 8: Manual Testing
  TEST 1: Public URL
    - Call POSTIZ_SCHEDULE_POST with Wikipedia image
    - Check Postiz UI for image
    - Check Docker logs for "Downloading image:" message
  TEST 2: AI Generation
    - Call with generatePictures=true, empty images
    - Verify AI image appears
  TEST 3: No Images
    - Call with generatePictures=false, empty images
    - Verify text-only post

Task 9: Rollback Plan
  IF FAILED:
    - Revert tool.list.ts changes
    - Revert start.mcp.ts changes
    - Revert docker-compose.yml to use pre-built image
    - docker-compose up -d (restore to working state)
```

---

## Pseudocode: Wrapper Tool Implementation

```typescript
// Task 1-3: Complete Wrapper Implementation
// FILE: libraries/nestjs-libraries/src/chat/tools/mcp.schedule.post.wrapper.ts

import { AgentToolInterface } from '@gitroom/nestjs-libraries/chat/agent.tool.interface';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { IntegrationSchedulePostTool } from './integration.schedule.post';
import { IntegrationService } from '@gitroom/nestjs-libraries/database/prisma/integrations/integration.service';
import { OpenaiService } from '@gitroom/nestjs-libraries/openai/openai.service';
import { checkAuth } from '@gitroom/nestjs-libraries/chat/auth.context';
import { makeId } from '@gitroom/nestjs-libraries/services/make.is';

@Injectable()
export class McpSchedulePostWrapper implements AgentToolInterface {
  constructor(
    private _schedulePostTool: IntegrationSchedulePostTool,
    private _integrationService: IntegrationService,
    private _openAiService: OpenaiService
  ) {}

  name = 'mcpSchedulePostWrapper';

  run() {
    return createTool({
      id: 'POSTIZ_SCHEDULE_POST',  // CRITICAL: This is what MCP clients see
      description: 'Schedule social media posts with text and images. Images must be publicly accessible URLs (HTTP/HTTPS).',

      // EXTERNAL MCP SCHEMA (what Claude Code sends)
      inputSchema: z.object({
        type: z.enum(['draft', 'schedule', 'now']),
        configId: z.string(),
        generatePictures: z.boolean(),
        date: z.string().describe('UTC TIME in ISO 8601 format'),
        providerId: z.string().describe('Integration ID from POSTIZ_PROVIDERS_LIST'),
        posts: z.array(
          z.object({
            text: z.string(),
            images: z.array(z.string()).default([]),  // Public URLs only
          })
        ),
      }),

      outputSchema: z.object({
        result: z.string(),
        postId: z.string().optional(),
      }),

      execute: async (args, options) => {
        const { context, runtimeContext } = args;

        // PATTERN: Always check auth first (from integration.list.tool.ts:34-35)
        checkAuth(args, options);
        const organizationId = JSON.parse(
          // @ts-ignore
          runtimeContext.get('organization') as string
        ).id;

        // STEP 1: Get integration details for premium status
        const integration = await this._integrationService.getIntegrationById(
          organizationId,
          context.providerId
        );

        if (!integration) {
          throw new Error(`Integration ${context.providerId} not found`);
        }

        // STEP 2: Transform posts with image handling logic (PR #968 pattern)
        const transformedPostsAndComments = await Promise.all(
          context.posts.map(async (post) => {
            let attachments: string[] = [];

            // PRIORITY 1: User-provided images (if exist)
            if (post.images && post.images.length > 0) {
              attachments = post.images;  // Pass URLs directly
            }
            // PRIORITY 2: AI-generated images (if no images + generatePictures=true)
            else if (context.generatePictures) {
              const aiImageUrl = await this._openAiService.generateImage(
                post.text,
                true  // second param = return URL directly
              );
              attachments = [aiImageUrl];
            }
            // PRIORITY 3: No images (empty array)

            return {
              content: post.text,
              attachments,  // ← THE KEY TRANSFORMATION
            };
          })
        );

        // STEP 3: Call internal tool with transformed schema
        const internalTool = this._schedulePostTool.run();
        const result = await internalTool.execute(
          {
            context: {
              socialPost: [
                {
                  integrationId: context.providerId,
                  isPremium: integration.providerIdentifier === 'x' ? true : false,  // TODO: Get actual premium status
                  date: context.date,
                  shortLink: false,  // Default to false
                  type: context.type,
                  postsAndComments: transformedPostsAndComments,
                  settings: [],  // Empty settings for now (future: support custom settings)
                },
              ],
            },
            runtimeContext,
          },
          options
        );

        // STEP 4: Return MCP-friendly response
        const output = result.output as any;
        if (output.errors) {
          throw new Error(output.errors);
        }

        return {
          result: `Post created successfully, check it here: ${process.env.FRONTEND_URL}/p/${output[0]?.postId}`,
          postId: output[0]?.postId,
        };
      },
    });
  }
}
```

### Pseudocode: Tool Registration

```typescript
// Task 4: Register in Tool List
// FILE: libraries/nestjs-libraries/src/chat/tools/tool.list.ts

// ADD import:
import { McpSchedulePostWrapper } from './mcp.schedule.post.wrapper';

// MODIFY array:
export const toolList = [
  IntegrationListTool,
  IntegrationValidationTool,
  IntegrationTriggerTool,
  IntegrationSchedulePostTool,  // Keep original (for backward compat)
  McpSchedulePostWrapper,        // ADD NEW WRAPPER
  GenerateVideoOptionsTool,
  VideoFunctionTool,
  GenerateVideoTool,
  GenerateImageTool,
];
```

### Pseudocode: MCP Tool Naming (Optional Enhancement)

```typescript
// Task 6: Ensure Proper MCP Naming
// FILE: libraries/nestjs-libraries/src/chat/start.mcp.ts (ONLY if needed)

// Currently tools are exposed as-is from agent.getTools()
// The wrapper's id: 'POSTIZ_SCHEDULE_POST' should work automatically
// VERIFY after deployment: MCP client sees POSTIZ_SCHEDULE_POST

// IF NAMING DOESN'T WORK, add this transformation:
const tools = await agent.getTools();
const mcpTools = Object.entries(tools).reduce((acc, [key, tool]) => {
  // Map tool IDs for MCP exposure
  return { ...acc, [tool.id || key]: tool };
}, {});

const server = new MCPServer({
  name: 'Postiz MCP',
  version: '1.0.0',
  tools: mcpTools,  // Use transformed tools
  agents: { postiz: agent },
});
```

---

## Integration Points

### Dependencies to Inject
```yaml
ChatModule (chat.module.ts):
  - ALREADY HAS: ...toolList (spreads all tools including our new wrapper)
  - VERIFY: OpenaiService is available (check if OpenAI module is imported)
  - IF NOT: Import OpenaiModule in ChatModule.imports[]

OpenaiService:
  - Location: libraries/nestjs-libraries/src/openai/openai.service.ts
  - Method needed: generateImage(prompt: string, returnUrl: boolean): Promise<string>
  - VERIFY: Method signature matches before using

IntegrationService:
  - Location: libraries/nestjs-libraries/src/database/prisma/integrations/integration.service.ts
  - Method needed: getIntegrationById(orgId, integrationId): Promise<Integration>
  - ALREADY USED BY: IntegrationSchedulePostTool (so definitely available)
```

### Docker Build Configuration
```yaml
docker-compose.yml:
  CURRENTLY: Uses pre-built image (ghcr.io/gitroomhq/postiz-app:latest)
  CHANGE TO: Build from local postiz-app directory

  postiz:
    build:
      context: ./postiz-app
      dockerfile: Dockerfile.dev
    image: postiz-app:local
    container_name: postiz
    # ... rest unchanged
```

### Build Process (NX Monorepo)
```bash
# Inside Docker container during build:
pnpm install          # Install all dependencies (3-5 min)
pnpm run build        # Build all apps/libraries (5-10 min)
pm2 start ...         # Start services

# CRITICAL: Build failures
# Common issue: TypeScript compilation errors
# Solution: Fix type errors, run pnpm run build locally to verify
```

---

## Validation Loop

### Level 1: TypeScript Compilation
```bash
# BEFORE committing, run locally:
cd /Users/sid/Desktop/4.\ Coding\ Projects/Postiz/postiz-app
pnpm install
pnpm run build

# Expected: No TypeScript errors in libraries/nestjs-libraries
# If errors: Fix type mismatches, missing imports, etc.
```

### Level 2: Docker Build
```bash
# Build with modified code:
docker-compose build --no-cache postiz

# Expected: Build completes successfully (~10 min)
# If fails: Check build logs for pnpm or TypeScript errors
```

### Level 3: Container Startup
```bash
# Start containers:
docker-compose up -d

# Verify startup:
docker-compose logs -f postiz | grep "Backend is running"

# Expected: "🚀 Backend is running on: http://localhost:3000" within 30s
# If not: Check logs for database connection, Redis connection errors
```

### Level 4: MCP Tool Registration
```bash
# From Claude Code, call:
mcp__postiz__POSTIZ_GET_CONFIG_ID

# Expected: Returns config ID and date
# If hangs: Restart Claude Code to reset MCP client

# Verify wrapper tool is exposed (indirect test):
# Create a post with image - if it works, wrapper is registered correctly
```

### Level 5: Image Upload Functional Test
```bash
# TEST CASE 1: Public Image URL
mcp__postiz__POSTIZ_SCHEDULE_POST({
  configId: "pWcCBjUkWv",
  providerId: "cmhbikjxk0001mnmq47byp59n",  // LinkedIn
  type: "draft",
  date: "2025-10-30T10:00:00Z",
  generatePictures: false,
  posts: [{
    text: "Test post with public image",
    images: ["https://picsum.photos/800/600"]
  }]
})

# VERIFY in Docker logs:
docker-compose logs postiz --tail=50 | grep "IntegrationSchedulePostTool"
# Expected: "[IntegrationSchedulePostTool] Downloading image: https://picsum.photos/800/600"
# Expected: "[IntegrationSchedulePostTool] Re-uploaded to: http://localhost:5001/uploads/..."

# VERIFY in Postiz UI:
# Navigate to http://localhost:5001/p/{postId}
# Expected: Image is visible in post preview

# IF IMAGE MISSING:
# 1. Check logs for download errors
# 2. Check if URL is publicly accessible: curl https://picsum.photos/800/600
# 3. Check network connectivity from container: docker-compose exec postiz curl https://picsum.photos/800/600
```

### Level 6: AI Generation Test
```bash
# TEST CASE 2: AI Image Generation
mcp__postiz__POSTIZ_SCHEDULE_POST({
  configId: "pWcCBjUkWv",
  providerId: "cmhbikjxk0001mnmq47byp59n",
  type: "draft",
  date: "2025-10-30T10:05:00Z",
  generatePictures: true,
  posts: [{
    text: "A futuristic city at sunset",
    images: []
  }]
})

# VERIFY:
# Expected: Post has AI-generated image matching the text description
# Check OpenAI API key is valid in docker-compose.yml env vars
```

### Level 7: Multi-Image Test
```bash
# TEST CASE 3: Multiple Images
mcp__postiz__POSTIZ_SCHEDULE_POST({
  configId: "pWcCBjUkWv",
  providerId: "cmhbikjxk0001mnmq47byp59n",
  type: "draft",
  date: "2025-10-30T10:10:00Z",
  generatePictures: false,
  posts: [{
    text: "Multi-image test post",
    images: [
      "https://picsum.photos/800/600",
      "https://picsum.photos/600/800"
    ]
  }]
})

# VERIFY: Post shows both images in carousel/grid
```

---

## Final Validation Checklist
- [ ] TypeScript compiles: `pnpm run build` in postiz-app/
- [ ] Docker build succeeds: No errors in build output
- [ ] Container starts: "Backend is running" message appears
- [ ] MCP connection works: POSTIZ_GET_CONFIG_ID returns data
- [ ] Image upload works: Public URL test shows image in post
- [ ] AI generation works: generatePictures=true creates image
- [ ] Multi-image works: Multiple URLs all appear
- [ ] Error handling works: Invalid URL logs error, doesn't crash server
- [ ] Backward compat: Existing Mastra agent tools still work
- [ ] Documentation: Update docs/mcp-integration-guide.md with image usage

---

## Anti-Patterns to Avoid

❌ **Don't modify IntegrationSchedulePostTool** - Wrap it, don't change it
❌ **Don't skip checkAuth()** - Security vulnerability
❌ **Don't hardcode organizationId** - Must come from runtimeContext
❌ **Don't use local file paths in tests** - Only public URLs work
❌ **Don't implement base64 support** - Out of scope, requires uploadSimple() changes
❌ **Don't remove existing tools** - Maintain backward compatibility
❌ **Don't skip Docker rebuild** - Code changes require container rebuild
❌ **Don't assume build works** - Always verify with test posts

---

## Known Limitations (Document These)

1. **Images must be public URLs** - No local file paths, no base64 (yet)
2. **Download must succeed** - If URL is blocked/404, entire post fails
3. **No progress feedback** - Download happens silently, no progress bar
4. **Single integration per call** - Can't mix LinkedIn + Twitter with different images
5. **Premium status hardcoded** - X/Twitter premium detection needs enhancement

---

## Success Criteria

✅ MCP client can post with images using: `posts: [{text, images: ["url"]}]`
✅ Wrapper transforms schema correctly without manual intervention
✅ Public image URLs are downloaded and re-uploaded to Postiz storage
✅ AI generation still works as fallback when generatePictures=true
✅ Images appear in Postiz UI and are published to social platforms
✅ Existing tools continue to work (backward compatibility)
✅ Build completes in < 15 minutes
✅ No TypeScript compilation errors
✅ Docker container starts successfully
✅ All 3 test cases pass (public URL, AI gen, multi-image)

---

## Rollback Strategy

### If Build Fails:
```bash
# Revert docker-compose.yml
git checkout docker-compose.yml

# Use pre-built image
docker-compose up -d
```

### If Runtime Errors:
```bash
# Remove wrapper from tool list
# Revert libraries/nestjs-libraries/src/chat/tools/tool.list.ts

# Rebuild:
docker-compose build postiz
docker-compose up -d
```

### If Images Still Don't Work:
```bash
# Full revert:
cd postiz-app
git checkout libraries/nestjs-libraries/src/chat/

# Restore original setup:
git checkout /Users/sid/Desktop/4. Coding Projects/Postiz/docker-compose.yml
docker-compose down
docker-compose up -d
```

---

## Future Enhancements (Out of Scope)

- Base64 image support (requires modifying uploadSimple())
- Local file path support (requires file transfer mechanism)
- Progress callbacks during download
- Graceful partial failure (Promise.allSettled)
- Integration premium status auto-detection
- Image optimization before upload
- Support for video files
- Batch upload optimization

---

## Confidence Score: 7/10

### Why Not Higher:
- **NestJS DI complexity (-1):** OpenaiService might not be available in ChatModule
- **Docker build time (-1):** 10+ min builds make iteration slow
- **No unit tests (-1):** Manual testing only, no automated regression prevention

### Why Not Lower:
- **Clear pattern to follow (+2):** integration.list.tool.ts is perfect template
- **Simple transformation (+1):** Just parameter renaming, no complex logic
- **Existing image handling (+1):** uploadSimple() already works, we just enable it
- **Rollback safety (+1):** Easy to revert if issues arise

### Mitigation for Risks:
- **DI issues:** Check ChatModule imports, add OpenaiModule if needed
- **Build time:** Test TypeScript locally first with `pnpm run build`
- **No tests:** Create detailed manual test script, run all scenarios

---

## Research Summary

### Codebase Patterns Found:
✅ AgentToolInterface implementation (integration.list.tool.ts)
✅ Auth handling pattern (checkAuth, organization extraction)
✅ Error handling (throw Error with descriptive messages)
✅ Schema definition (zod inputSchema/outputSchema)
✅ Tool registration (tool.list.ts simple array export)
✅ NestJS module structure (ChatModule provider pattern)

### External Research:
✅ GitHub Issue #856 - Bug report and reproduction
✅ GitHub PR #968 - Image handling logic (decorator architecture)
✅ Mastra documentation - createTool API
✅ Postiz upload infrastructure - uploadSimple() method

### Unknowns Identified:
⚠️ OpenaiService availability in ChatModule - needs verification
⚠️ Exact premium status detection logic - using simplified approach
⚠️ MCP tool naming behavior - id vs name property

---

**Status:** Ready for implementation with comprehensive context and fallback plans.
