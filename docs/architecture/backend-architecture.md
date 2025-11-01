# Backend Architecture

## Service Architecture

**NestJS Module Organization:**

```
apps/backend/src/
├── auth/                          # Authentication module
├── users/                         # User management
├── integrations/                  # Platform OAuth
├── posts/                         # Post management
├── analytics/                     # Analytics module
├── mcp/                           # MCP server
├── workers/                       # BullMQ processors
├── cron/                          # Scheduled tasks
├── database/                      # Prisma service
└── common/                        # Shared utilities
```

**Controller Template:**

```typescript
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Request() req) {
    return this.postsService.findAll(req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.id, createPostDto);
  }
}
```

## Database Access Layer

**Prisma Service:**

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
```

## Authentication Architecture

**JWT Strategy:**

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: string }) {
    return this.prisma.user.findUnique({ where: { id: payload.sub } });
  }
}
```

**API Key Strategy:**

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { createHash } from 'crypto';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private prisma: PrismaService) {
    super();
  }

  async validate(apiKey: string) {
    const keyHash = createHash('sha256').update(apiKey).digest('hex');
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { keyHash },
      include: { user: true },
    });

    if (!apiKeyRecord?.isActive) {
      throw new UnauthorizedException('Invalid API key');
    }

    return apiKeyRecord.user;
  }
}
```

---
