# Error Handling Strategy

## Error Response Format

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
}
```

## Frontend Error Handling

```typescript
import { toast } from '@/hooks/use-toast';

export function handleApiError(error: unknown): void {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'UNAUTHORIZED':
        window.location.href = '/login';
        break;
      case 'PLATFORM_DISCONNECTED':
        toast({
          title: 'Platform Disconnected',
          description: error.message,
          action: { label: 'Reconnect', onClick: () => {} },
        });
        break;
      default:
        toast({ title: 'Error', description: error.message });
    }
  }
}
```

## Backend Error Handling

**Global Exception Filter:**

```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = ctx.getResponse<Response>();
    const requestId = uuidv4();

    response.status(status).json({
      error: {
        code: 'ERROR_CODE',
        message: 'Error message',
        timestamp: new Date().toISOString(),
        requestId,
      },
    });
  }
}
```

## Worker Error Handling

**BullMQ Retry Strategy:**

```typescript
@Process('publish-post')
async handlePublishPost(job: Job) {
  try {
    await this.publishToPlatform(job.data.postId);
    return { success: true };
  } catch (error) {
    if (this.isRateLimitError(error)) {
      throw new Error('Rate limited. Retry after delay');
    }
    if (this.isAuthError(error)) {
      await this.markIntegrationInactive(job.data.platformId);
      return { success: false };
    }
    if (job.attemptsMade >= 3) {
      await this.markPostFailed(job.data.postId);
      return { success: false };
    }
    throw error; // Retry
  }
}
```

---
