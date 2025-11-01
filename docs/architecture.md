# Postiz Self-Hosted Deployment with MCP Integration - Fullstack Architecture Document

**Version:** 0.1
**Date:** October 28, 2025
**Author:** Winston (Architect)
**Status:** Draft

---

## Introduction

This document outlines the complete fullstack architecture for **Postiz Self-Hosted Deployment with MCP Integration**, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

### Starter Template or Existing Project

**Existing Project: Postiz Open Source Platform (Brownfield Deployment)**

This project is based on the existing Postiz open-source application (github.com/gitroomhq/postiz-app, 24.1k GitHub stars). We are deploying a pre-built, mature platform rather than building from scratch.

**Key Architectural Constraints:**

- **Pre-configured Tech Stack:** NX monorepo, NestJS backend, Next.js frontend, PostgreSQL, Redis, BullMQ
- **Deployment Model:** Using official Docker images (`ghcr.io/gitroomhq/postiz-app:latest`)
- **Customization Approach:** Fork for version control, but primarily configuration-based customization
- **Modification Scope:** OAuth credentials, environment variables, MCP integration endpoints
- **Cannot Modify:** Core Postiz architecture, service structure, or internal implementations without custom builds

**What This Means for Architecture:**

- Architecture document focuses on **deployment architecture**, **integration patterns**, and **MCP extension layer**
- Tech stack section reflects Postiz's choices (already decided)
- Component diagrams show Postiz's existing structure plus our MCP integration layer
- Development workflow emphasizes configuration management and deployment over coding

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-28 | 0.1 | Initial architecture document creation based on PRD v0.1 | Winston (Architect) |

---

## High Level Architecture

### Technical Summary

Postiz is a **self-hosted, container-based social media management platform** deployed via Docker Compose, featuring a Next.js frontend, NestJS backend API, PostgreSQL database, and Redis-backed BullMQ job queue. The architecture follows a **monolithic-with-microservices-option pattern**, running all services in a single container for simplicity, with the ability to split into separate containers (frontend, backend, worker, cron) for production scaling via the `POSTIZ_APPS` environment variable. OAuth 2.0 integration enables secure connections to 18+ social media platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram, TikTok, etc.), while the **MCP (Model Context Protocol) server** exposes a Server-Sent Events (SSE) endpoint at `/api/mcp/{api_key}/sse`, allowing Claude Desktop, Claude Code, Cursor, and custom agentic frameworks to manage social media through natural language. Deployed on localhost:5000 with minimal resource requirements (2GB RAM, 2 vCPUs), this architecture achieves the PRD's goals of cost-effective ($0 ongoing), privacy-focused social media scheduling with AI-powered workflows, eliminating context switching for developers and content creators.

### Platform and Infrastructure Choice

**Platform:** Local macOS/Linux/Windows (WSL2) with Docker Desktop

**Key Services:**

- **Container Orchestration:** Docker Compose v2+
- **Application:** Postiz (ghcr.io/gitroomhq/postiz-app:latest)
- **Database:** PostgreSQL 17 Alpine
- **Cache/Queue:** Redis 7.2
- **Reverse Proxy:** None initially (direct localhost:5000), nginx/Caddy optional for production SSL

**Deployment Host and Regions:** Localhost initially, with migration path to cloud regions (US-East, EU-West, Asia-Pacific) for production scaling

**Rationale:** PRD emphasizes local deployment and $0 ongoing costs. Docker Compose provides sufficient orchestration for 3-container stack without Kubernetes complexity. Migration path to cloud exists if needed.

### Repository Structure

**Structure:** Dual Repository Approach (Fork + Deployment Config)

**Repository 1: Postiz Fork (github.com/YOUR_USERNAME/postiz-app)**

- Purpose: Track upstream Postiz updates, enable custom modifications if needed
- Modification Frequency: Rare (only for deep customizations requiring source changes)
- Update Strategy: Periodic merges from upstream `gitroomhq/postiz-app`

**Repository 2: Deployment Configuration (Current Working Directory)**

- Purpose: Version control for docker-compose.yml, backup scripts, documentation
- Contains: Docker Compose files, environment templates, operational scripts

**Monorepo Tool:** N/A - Postiz already uses NX monorepo internally (we don't modify it)

**Package Organization:**

- **Postiz Internal (NX Workspace):** apps/frontend, apps/backend, packages/shared (pre-built in Docker image)
- **Our Custom Layer:** Docker Compose configuration, environment variables, backup automation
- **No Code Sharing Needed:** We consume Postiz as a black-box service via Docker

### High Level Architecture Diagram

```mermaid
graph TB
    subgraph "MCP Clients"
        Claude[Claude Desktop]
        Code[Claude Code]
        Cursor[Cursor IDE]
    end

    subgraph "User Access"
        Browser[Web Browser]
    end

    subgraph "Docker Compose Stack (localhost:5000)"
        subgraph "Postiz Container"
            Frontend[Next.js Frontend<br/>Port 5000]
            Backend[NestJS Backend API<br/>Port 3000 internal]
            Worker[BullMQ Worker<br/>Job Processor]
            Cron[Cron Service<br/>Scheduled Tasks]
            MCP[MCP Server Endpoint<br/>/api/mcp/{key}/sse]
        end

        DB[(PostgreSQL 17<br/>Database<br/>Port 5432)]
        Cache[(Redis 7.2<br/>Cache & Queue<br/>Port 6379)]
    end

    subgraph "External Services"
        Twitter[Twitter/X API]
        LinkedIn[LinkedIn API]
        YouTube[YouTube API]
        Facebook[Facebook API]
        Instagram[Instagram API]
        Others[TikTok, Reddit, etc.]
    end

    Browser -->|HTTPS/HTTP| Frontend
    Frontend -->|Internal| Backend
    Backend -->|Prisma ORM| DB
    Backend -->|BullMQ Jobs| Cache
    Worker -->|Process Jobs| Cache
    Worker -->|OAuth Requests| Twitter
    Worker -->|OAuth Requests| LinkedIn
    Worker -->|OAuth Requests| YouTube
    Worker -->|OAuth Requests| Facebook
    Worker -->|OAuth Requests| Instagram
    Worker -->|OAuth Requests| Others
    Cron -->|Scheduled Jobs| Cache

    Claude -->|SSE| MCP
    Code -->|SSE| MCP
    Cursor -->|SSE| MCP
    MCP -->|API Calls| Backend

    Backend -.->|Backup| DB

    style Postiz Container fill:#e1f5ff
    style DB fill:#4CAF50
    style Cache fill:#FF6B6B
    style MCP fill:#FFD93D
```

### Architectural Patterns

- **Containerized Monolith with Microservices Escape Hatch:** All services run in single Postiz container for simplicity, but can be split via `POSTIZ_APPS` environment variable when scaling needs arise (frontend, backend, worker, cron as separate containers). _Rationale:_ Start simple, scale only when necessary. Docker Compose supports both modes without architecture changes.

- **OAuth 2.0 Provider Pattern:** Postiz acts as OAuth client to 18+ social media platforms, managing token refresh, scope management, and secure credential storage. _Rationale:_ Industry-standard authentication pattern ensures security and platform compliance. Postiz's pre-built OAuth handlers eliminate custom implementation risk.

- **Job Queue Pattern (BullMQ + Redis):** Asynchronous post publishing, scheduling, and platform API calls processed through Redis-backed job queue. _Rationale:_ Decouples API requests from user actions, enables retries, handles rate limits gracefully, supports scheduled posting.

- **MCP Server-Sent Events (SSE) Pattern:** Real-time bidirectional communication between MCP clients and Postiz API using SSE transport over HTTP. _Rationale:_ Simpler than WebSockets for one-way server-to-client streaming, works through firewalls, compatible with all MCP clients (Claude Desktop, Code, Cursor).

- **Configuration-as-Code (Docker Compose):** All infrastructure defined in docker-compose.yml with environment variables for secrets. _Rationale:_ Version-controllable infrastructure, reproducible deployments, easy rollbacks, no manual server configuration.

- **Repository Pattern (Prisma ORM):** Database access abstracted through Prisma ORM (Postiz built-in). _Rationale:_ Type-safe database queries, automatic migrations, multi-database support (PostgreSQL primary, can switch to MySQL/SQLite).

- **Backend for Frontend (BFF) Pattern:** Next.js frontend communicates with NestJS backend API, which orchestrates platform-specific logic. _Rationale:_ Separation of concerns, enables independent scaling of frontend/backend, supports multiple client types (web UI, MCP clients).

- **Circuit Breaker Pattern (Implicit in BullMQ):** Failed platform API calls retry with exponential backoff, preventing cascade failures. _Rationale:_ Social media APIs have rate limits and occasional downtime. Graceful degradation maintains system stability.

---

## Tech Stack

This is the **DEFINITIVE** technology selection for the entire project. All development must use these exact versions.

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Frontend Language** | TypeScript | 5.x | Type-safe frontend development | Postiz built-in. Provides compile-time safety, better IDE support, reduces runtime errors. |
| **Frontend Framework** | Next.js | 14.x | React-based SSR/SSG framework | Postiz built-in. Server-side rendering for SEO, built-in routing, API routes, optimal performance. |
| **UI Component Library** | Custom + shadcn/ui | Latest | UI component primitives | Postiz built-in. Tailwind-based components, accessible, customizable. |
| **State Management** | React Context + Zustand | Latest | Client-side state management | Postiz built-in. Lightweight, no Redux complexity, sufficient for app needs. |
| **Backend Language** | TypeScript | 5.x | Type-safe backend development | Postiz built-in. Shared types between frontend/backend, consistent codebase. |
| **Backend Framework** | NestJS | 10.x | Enterprise Node.js framework | Postiz built-in. Modular architecture, built-in DI, TypeScript-first, Express/Fastify under the hood. |
| **API Style** | REST + SSE | HTTP/1.1 | RESTful APIs + Server-Sent Events | Postiz REST API for CRUD operations. SSE for MCP real-time communication. Simple, well-understood, firewall-friendly. |
| **Database** | PostgreSQL | 17 Alpine | Primary relational database | Postiz requirement. ACID compliance, robust for scheduling/analytics data, excellent JSON support, proven scalability. |
| **ORM** | Prisma | 5.x | Type-safe database client | Postiz built-in. Type-safe queries, automatic migrations, excellent TypeScript integration. |
| **Cache** | Redis | 7.2 | Cache and job queue backend | Postiz requirement. In-memory speed for BullMQ, session storage, rate limiting. |
| **Job Queue** | BullMQ | 5.x | Background job processing | Postiz built-in. Robust job scheduling, retries, priority queues, scheduled posts. Built on Redis. |
| **File Storage** | Local Filesystem | N/A | Media upload storage | Default for self-hosted. Configurable to S3/Cloud Storage via STORAGE_PROVIDER env var if needed. |
| **Authentication** | OAuth 2.0 / 1.0a | Platform-specific | Social platform authentication | Postiz built-in handlers per platform. Twitter (OAuth 1.0a), LinkedIn/Facebook/YouTube (OAuth 2.0). JWT for session management. |
| **Frontend Testing** | Jest + React Testing Library | Latest | Component and unit tests | Postiz built-in. Standard React testing approach. We won't modify tests for deployment-only project. |
| **Backend Testing** | Jest + Supertest | Latest | API and integration tests | Postiz built-in. NestJS testing utilities. Existing test suite covers core functionality. |
| **E2E Testing** | Manual Testing | N/A | End-to-end workflow validation | PRD specifies manual testing for OAuth flows, MCP integration, multi-platform posting. No Playwright/Cypress needed. |
| **Build Tool** | NX | 18.x | Monorepo build orchestration | Postiz built-in. Coordinates builds across apps/packages, caching, affected detection. |
| **Bundler** | Webpack (via Next.js) | 5.x | Frontend asset bundling | Next.js default. Optimized for React, code splitting, tree shaking. |
| **Containerization** | Docker + Docker Compose | 24.x + 2.x | Application containerization | Our deployment layer. Official Postiz image. PostgreSQL 17 Alpine, Redis 7.2 official images. |
| **IaC Tool** | Docker Compose YAML | 2.x | Infrastructure definition | Configuration-as-code for 3-container stack. Simple, version-controlled. |
| **CI/CD** | N/A (Manual) | N/A | Deployment automation | Not required for MVP. GitHub Actions possible for future custom builds. |
| **Monitoring** | Docker Logs + docker stats | Built-in | Container health and logs | Sufficient for local deployment. Future: Prometheus/Grafana for production. |
| **Logging** | stdout/stderr | N/A | Application logging | Docker captures container logs. Accessible via `docker compose logs -f`. |
| **CSS Framework** | Tailwind CSS | 3.x | Utility-first styling | Postiz built-in. Rapid UI development, minimal CSS, highly customizable. |
| **MCP Protocol** | Server-Sent Events (SSE) | HTTP/1.1 | MCP client communication | Postiz MCP endpoint at `/api/mcp/{api_key}/sse`. |
| **Backup Automation** | Bash + pg_dump + tar | System default | Database and file backups | Our custom script. 7-day retention. |

---

## Data Models

### User

**Purpose:** Represents admin/user accounts that manage the Postiz instance. Created during initial setup, owns social media connections and posts.

**Key Attributes:**

- `id`: UUID - Unique identifier
- `email`: string - Login email address
- `passwordHash`: string - Bcrypt hashed password
- `name`: string - Display name
- `role`: enum (ADMIN, USER) - Permission level
- `createdAt`: timestamp - Account creation date
- `updatedAt`: timestamp - Last modification date

**TypeScript Interface:**

```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**

- One-to-many with `Integration` (owns multiple social media connections)
- One-to-many with `Post` (creates multiple posts)
- One-to-many with `ApiKey` (generates multiple MCP API keys)

### Integration

**Purpose:** Represents connected social media accounts via OAuth. Each platform connection (Twitter, LinkedIn, YouTube, etc.) is an Integration entity.

**Key Attributes:**

- `id`: UUID - Unique identifier
- `userId`: UUID - Foreign key to User
- `platform`: enum - Platform type (TWITTER, LINKEDIN, YOUTUBE, FACEBOOK, INSTAGRAM, etc.)
- `platformAccountId`: string - Platform's user/page ID
- `platformUsername`: string - Display name/handle on platform
- `accessToken`: string (encrypted) - OAuth access token
- `refreshToken`: string (encrypted) - OAuth refresh token (if applicable)
- `tokenExpiresAt`: timestamp - Token expiration time
- `scopes`: string[] - Granted OAuth scopes
- `isActive`: boolean - Connection status
- `createdAt`: timestamp - Connection date
- `updatedAt`: timestamp - Last token refresh

**TypeScript Interface:**

```typescript
interface Integration {
  id: string;
  userId: string;
  platform: 'TWITTER' | 'LINKEDIN' | 'YOUTUBE' | 'FACEBOOK' | 'INSTAGRAM' | 'TIKTOK' | 'REDDIT' | 'PINTEREST' | 'THREADS' | 'MASTODON' | 'DISCORD' | 'SLACK';
  platformAccountId: string;
  platformUsername: string;
  accessToken: string; // Encrypted in database
  refreshToken?: string; // Encrypted, optional
  tokenExpiresAt?: Date;
  scopes: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**

- Many-to-one with `User`
- One-to-many with `Post`

### Post

**Purpose:** Core entity representing social media content. Supports drafts, scheduled posts, and published posts. Can target single or multiple platforms simultaneously.

**Key Attributes:**

- `id`: UUID - Unique identifier
- `userId`: UUID - Foreign key to User
- `content`: text - Post text content
- `mediaUrls`: string[] - Attached images/videos
- `status`: enum - POST_STATUS (DRAFT, SCHEDULED, PUBLISHING, PUBLISHED, FAILED)
- `scheduledFor`: timestamp (nullable) - When to publish
- `publishedAt`: timestamp (nullable) - Actual publication time
- `platforms`: string[] - Target platform IDs
- `platformPostIds`: JSON - Map of platform to published post ID
- `createdAt`: timestamp - Creation date
- `updatedAt`: timestamp - Last modification

**TypeScript Interface:**

```typescript
interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED';
  scheduledFor?: Date;
  publishedAt?: Date;
  platforms: string[];
  platformPostIds: Record<string, string>;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**

- Many-to-one with `User`
- Many-to-many with `Integration`
- One-to-many with `Analytics`

### Analytics

**Purpose:** Stores engagement metrics for published posts. Periodically updated by Postiz workers fetching data from platform APIs.

**Key Attributes:**

- `id`: UUID - Unique identifier
- `postId`: UUID - Foreign key to Post
- `platform`: enum - Which platform these metrics are from
- `impressions`: integer - View count
- `likes`: integer - Like/favorite count
- `shares`: integer - Retweet/share count
- `comments`: integer - Reply/comment count
- `clicks`: integer - Link click count
- `engagementRate`: float - Calculated engagement percentage
- `fetchedAt`: timestamp - When metrics were last updated

**TypeScript Interface:**

```typescript
interface Analytics {
  id: string;
  postId: string;
  platform: string;
  impressions: number;
  likes: number;
  shares: number;
  comments: number;
  clicks: number;
  engagementRate: number;
  fetchedAt: Date;
}
```

**Relationships:**

- Many-to-one with `Post`

### ApiKey

**Purpose:** Represents generated API keys for MCP server authentication. Created in Postiz UI, used by Claude Desktop/Code/Cursor.

**Key Attributes:**

- `id`: UUID - Unique identifier
- `userId`: UUID - Foreign key to User
- `key`: string - API key (format: `ptz_xxxxx...`, hashed in database)
- `name`: string - Human-readable key name
- `scopes`: string[] - Permissions (posts:write, posts:read, analytics:read)
- `lastUsedAt`: timestamp (nullable) - Last API request timestamp
- `expiresAt`: timestamp (nullable) - Optional expiration
- `isActive`: boolean - Key enabled status
- `createdAt`: timestamp - Generation date

**TypeScript Interface:**

```typescript
interface ApiKey {
  id: string;
  userId: string;
  key: string; // Hashed in database
  name: string;
  scopes: ('posts:write' | 'posts:read' | 'analytics:read')[];
  lastUsedAt?: Date;
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
}
```

**Relationships:**

- Many-to-one with `User`

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Integration : owns
    User ||--o{ Post : creates
    User ||--o{ ApiKey : generates
    Integration ||--o{ Post : targets
    Post ||--o{ Analytics : has

    User {
        uuid id PK
        string email UK
        string passwordHash
        string name
        enum role
        timestamp createdAt
        timestamp updatedAt
    }

    Integration {
        uuid id PK
        uuid userId FK
        enum platform
        string platformAccountId
        string platformUsername
        string accessToken
        string refreshToken
        timestamp tokenExpiresAt
        array scopes
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    Post {
        uuid id PK
        uuid userId FK
        text content
        array mediaUrls
        enum status
        timestamp scheduledFor
        timestamp publishedAt
        array platforms
        json platformPostIds
        timestamp createdAt
        timestamp updatedAt
    }

    Analytics {
        uuid id PK
        uuid postId FK
        string platform
        int impressions
        int likes
        int shares
        int comments
        int clicks
        float engagementRate
        timestamp fetchedAt
    }

    ApiKey {
        uuid id PK
        uuid userId FK
        string key
        string name
        array scopes
        timestamp lastUsedAt
        timestamp expiresAt
        boolean isActive
        timestamp createdAt
    }
```

---

## API Specification

### REST API Specification

```yaml
openapi: 3.0.0
info:
  title: Postiz REST API
  version: 2.8.0
  description: |
    REST API for Postiz social media management platform.
    Authentication via API key (Bearer token) or session cookies.

    Base URL: http://localhost:5000/api

servers:
  - url: http://localhost:5000/api
    description: Local development server
  - url: https://your-domain.com/api
    description: Production deployment (with SSL)

security:
  - ApiKeyAuth: []
  - SessionAuth: []

components:
  securitySchemes:
    ApiKeyAuth:
      type: http
      scheme: bearer
      bearerFormat: API Key (ptz_xxxxx...)
    SessionAuth:
      type: apiKey
      in: cookie
      name: postiz_session

  schemas:
    Post:
      type: object
      required:
        - content
        - platforms
      properties:
        id:
          type: string
          format: uuid
        content:
          type: string
          maxLength: 10000
        mediaUrls:
          type: array
          items:
            type: string
        status:
          type: string
          enum: [DRAFT, SCHEDULED, PUBLISHING, PUBLISHED, FAILED]
        scheduledFor:
          type: string
          format: date-time
          nullable: true
        publishedAt:
          type: string
          format: date-time
          nullable: true
        platforms:
          type: array
          items:
            type: string
            format: uuid
        platformPostIds:
          type: object
          additionalProperties:
            type: string

    Integration:
      type: object
      properties:
        id:
          type: string
          format: uuid
        platform:
          type: string
        platformUsername:
          type: string
        isActive:
          type: boolean

    Analytics:
      type: object
      properties:
        postId:
          type: string
          format: uuid
        platform:
          type: string
        impressions:
          type: integer
        likes:
          type: integer
        shares:
          type: integer
        comments:
          type: integer
        engagementRate:
          type: number

    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object
            timestamp:
              type: string
            requestId:
              type: string

paths:
  /health:
    get:
      summary: Health check endpoint
      security: []
      responses:
        '200':
          description: Service healthy

  /posts:
    get:
      summary: List all posts
      parameters:
        - name: status
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
      responses:
        '200':
          description: List of posts

    post:
      summary: Create a new post
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Post'
      responses:
        '201':
          description: Post created

  /posts/{postId}:
    get:
      summary: Get post by ID
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Post details

    put:
      summary: Update post
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Post updated

    delete:
      summary: Delete post
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Post deleted

  /posts/{postId}/publish:
    post:
      summary: Publish post immediately
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Post queued for publishing

  /integrations:
    get:
      summary: List connected social media accounts
      responses:
        '200':
          description: List of integrations

  /analytics/{postId}:
    get:
      summary: Get post analytics
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Analytics data

  /mcp/{apiKey}/sse:
    get:
      summary: MCP Server-Sent Events endpoint
      description: Real-time event stream for MCP clients
      security: []
      parameters:
        - name: apiKey
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: SSE stream established
          content:
            text/event-stream:
              schema:
                type: string
```

---

## Components

### Postiz Frontend (Next.js)

**Responsibility:** Serves the web-based admin interface for managing social media accounts, creating posts, viewing analytics, and configuring settings.

**Key Interfaces:**

- HTTP requests to NestJS Backend API
- Static asset serving
- OAuth redirect handling

**Dependencies:**

- NestJS Backend API
- Browser environment

**Technology Stack:** Next.js 14, Tailwind CSS, React Context + Zustand

### Postiz Backend API (NestJS)

**Responsibility:** Core business logic layer handling post management, OAuth token management, platform API orchestration, user authentication, and MCP server endpoint.

**Key Interfaces:**

- RESTful HTTP API endpoints
- SSE endpoint for MCP clients
- OAuth callback endpoints
- Prisma ORM queries to PostgreSQL
- BullMQ job queue enqueuing

**Dependencies:**

- PostgreSQL database
- Redis for BullMQ
- Platform-specific OAuth libraries

**Technology Stack:** NestJS 10, Prisma 5, Passport.js, BullMQ

### BullMQ Worker

**Responsibility:** Processes asynchronous background jobs from Redis queue. Handles post publishing to platform APIs, analytics fetching, OAuth token refresh.

**Key Interfaces:**

- Consumes jobs from Redis/BullMQ queue
- HTTP requests to social media platform APIs
- Updates PostgreSQL records

**Dependencies:**

- Redis
- PostgreSQL
- Platform API credentials

**Technology Stack:** BullMQ 5, Platform API clients

### Cron Service

**Responsibility:** Executes recurring tasks: triggering scheduled posts, periodically fetching analytics, refreshing expiring OAuth tokens.

**Key Interfaces:**

- Enqueues BullMQ jobs
- Queries PostgreSQL for scheduled posts

**Dependencies:**

- PostgreSQL
- Redis/BullMQ

**Technology Stack:** Node-cron

### PostgreSQL Database

**Responsibility:** Persistent storage for all application data: users, integrations, posts, analytics, API keys.

**Key Interfaces:**

- Prisma ORM connections
- TCP port 5432
- pg_dump for backups

**Technology Stack:** PostgreSQL 17 Alpine

### Redis Cache & Queue

**Responsibility:** In-memory data structure store for BullMQ job queue and caching layer.

**Key Interfaces:**

- Redis protocol (TCP port 6379)
- BullMQ client connections

**Technology Stack:** Redis 7.2

### MCP Server Endpoint

**Responsibility:** Exposes Postiz functionality to Model Context Protocol clients. Translates natural language commands into Postiz API calls.

**Key Interfaces:**

- SSE endpoint: `GET /api/mcp/{apiKey}/sse`
- Validates API keys
- Emits events: post_created, post_published, post_failed

**Dependencies:**

- Backend API
- PostgreSQL for API key validation

**Technology Stack:** Server-Sent Events, NestJS EventEmitter

### Component Interaction Diagram

```mermaid
C4Container
    title Postiz Component Architecture

    Person(user, "User", "Social media manager")
    Person(mcp_user, "MCP Client User", "Developer/content creator")

    System_Boundary(postiz, "Postiz Docker Compose Stack") {
        Container(frontend, "Next.js Frontend", "Next.js, React, Tailwind", "Web UI")
        Container(backend, "NestJS Backend API", "NestJS, TypeScript", "Business logic")
        Container(worker, "BullMQ Worker", "Node.js, BullMQ", "Async job processor")
        Container(cron, "Cron Service", "Node-cron", "Scheduled tasks")
        Container(mcp, "MCP Server", "SSE, NestJS", "MCP protocol endpoint")

        ContainerDb(db, "PostgreSQL", "PostgreSQL 17", "Persistent storage")
        ContainerDb(redis, "Redis", "Redis 7.2", "Job queue & cache")
    }

    System_Ext(platforms, "Social Media Platforms", "Twitter, LinkedIn, YouTube, etc.")
    System_Ext(claude, "MCP Clients", "Claude Desktop, Claude Code, Cursor")

    Rel(user, frontend, "Uses", "HTTPS/HTTP")
    Rel(mcp_user, claude, "Uses")
    Rel(claude, mcp, "Connects via SSE")

    Rel(frontend, backend, "API calls")
    Rel(mcp, backend, "API calls")
    Rel(backend, db, "Reads/writes", "Prisma ORM")
    Rel(backend, redis, "Enqueues jobs", "BullMQ")
    Rel(worker, redis, "Processes jobs")
    Rel(worker, db, "Updates status")
    Rel(worker, platforms, "Posts content")
    Rel(cron, redis, "Schedules jobs")
    Rel(cron, db, "Queries scheduled posts")
```

---

## External APIs

### Twitter/X API

- **Purpose:** Post tweets, retrieve tweet analytics
- **Documentation:** https://developer.twitter.com/en/docs/twitter-api
- **Base URL(s):** `https://api.twitter.com/2/`
- **Authentication:** OAuth 1.0a
- **Rate Limits:** 300 tweets per 3-hour window

**Key Endpoints Used:**

- `POST /2/tweets` - Create tweet
- `GET /2/tweets/:id` - Retrieve tweet details
- `GET /2/tweets/:id/metrics` - Get tweet analytics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/twitter/callback`. Character limit: 280 characters.

### LinkedIn API

- **Purpose:** Post updates to LinkedIn profiles/pages, retrieve engagement metrics
- **Documentation:** https://learn.microsoft.com/en-us/linkedin/
- **Base URL(s):** `https://api.linkedin.com/v2/`
- **Authentication:** OAuth 2.0
- **Rate Limits:** 500,000 API calls per day (application-level)

**Key Endpoints Used:**

- `POST /ugcPosts` - Create post
- `GET /socialActions/{shareUrn}/likes` - Get likes
- `GET /organizationalEntityShareStatistics` - Get analytics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/linkedin/callback`. Tokens expire after 60 days.

### YouTube Data API v3

- **Purpose:** Upload videos, post community posts, retrieve video analytics
- **Documentation:** https://developers.google.com/youtube/v3
- **Base URL(s):** `https://www.googleapis.com/youtube/v3/`
- **Authentication:** OAuth 2.0 (Google)
- **Rate Limits:** 10,000 units per day (quota system)

**Key Endpoints Used:**

- `POST /videos` - Upload video
- `POST /activities` - Create community post
- `GET /videos` - Retrieve video statistics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/youtube/callback`. Requires Google Cloud Project.

### Facebook Graph API

- **Purpose:** Post to Facebook pages, retrieve post insights
- **Documentation:** https://developers.facebook.com/docs/graph-api
- **Base URL(s):** `https://graph.facebook.com/v18.0/`
- **Authentication:** OAuth 2.0
- **Rate Limits:** 200 calls per hour per user

**Key Endpoints Used:**

- `POST /{page-id}/feed` - Create post
- `POST /{page-id}/photos` - Upload photo
- `GET /{post-id}/insights` - Retrieve analytics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/facebook/callback`. Requires Page Access Tokens.

### Instagram Graph API

- **Purpose:** Post photos/videos to Instagram business accounts
- **Documentation:** https://developers.facebook.com/docs/instagram-api
- **Base URL(s):** `https://graph.facebook.com/v18.0/`
- **Authentication:** OAuth 2.0 (via Facebook)
- **Rate Limits:** 25 posts per 24 hours per user

**Key Endpoints Used:**

- `POST /{ig-user-id}/media` - Create media container
- `POST /{ig-user-id}/media_publish` - Publish media
- `GET /{media-id}/insights` - Retrieve insights

**Integration Notes:** Two-step publishing process. Character limit: 2,200 characters.

### Other Supported Platforms

**TikTok, Reddit, Pinterest, Threads, Mastodon, Discord, Slack** - Each with platform-specific OAuth flows, rate limits, and API characteristics. Detailed configurations available in Postiz documentation.

---

## Core Workflows

### OAuth Platform Connection (Twitter Example)

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Frontend
    participant Backend
    participant DB as PostgreSQL
    participant Twitter

    User->>Browser: Click "Connect Twitter"
    Browser->>Backend: GET /api/auth/twitter
    Backend->>Twitter: POST /oauth/request_token
    Twitter-->>Backend: Request token
    Backend->>DB: Store temporary token
    Backend-->>Browser: Redirect to Twitter
    Browser->>Twitter: User authorizes app
    Twitter-->>Browser: Redirect with oauth_verifier
    Browser->>Backend: GET /api/auth/twitter/callback
    Backend->>Twitter: POST /oauth/access_token
    Twitter-->>Backend: Access token
    Backend->>DB: INSERT Integration (encrypted)
    Backend-->>Browser: Redirect to dashboard
    Frontend->>User: Show connected account
```

### Create and Publish Post via MCP

```mermaid
sequenceDiagram
    actor User
    participant MCP as Claude Desktop
    participant Backend
    participant DB as PostgreSQL
    participant Redis
    participant Worker
    participant Twitter

    User->>MCP: "Post to Twitter: Testing MCP!"
    MCP->>Backend: POST /api/posts
    Backend->>DB: INSERT Post (status: PUBLISHING)
    Backend->>Redis: Enqueue PUBLISH_POST job
    Backend-->>MCP: 201 Created

    Worker->>Redis: Dequeue job
    Worker->>DB: SELECT Post + Integration
    Worker->>Twitter: POST /2/tweets
    Twitter-->>Worker: Tweet ID
    Worker->>DB: UPDATE Post (status: PUBLISHED)
    Worker->>Backend: Emit post_published event
    Backend->>MCP: SSE event
    MCP->>User: "Post published successfully!"
```

### Schedule Post for Future

```mermaid
sequenceDiagram
    actor User
    participant MCP
    participant Backend
    participant DB as PostgreSQL
    participant Redis
    participant Cron
    participant Worker
    participant LinkedIn

    User->>MCP: "Schedule LinkedIn post for tomorrow 9 AM"
    MCP->>Backend: POST /api/posts (scheduledFor)
    Backend->>DB: INSERT Post (status: SCHEDULED)
    Backend-->>MCP: Post scheduled

    Note over Cron: Next day at 9:00 AM

    Cron->>DB: SELECT scheduled posts due
    Cron->>Redis: Enqueue PUBLISH_POST job
    Cron->>DB: UPDATE status = PUBLISHING

    Worker->>Redis: Dequeue job
    Worker->>LinkedIn: POST /v2/ugcPosts
    LinkedIn-->>Worker: Share URN
    Worker->>DB: UPDATE status = PUBLISHED
    Worker->>MCP: SSE event
    MCP->>User: "Scheduled post published!"
```

---

## Database Schema

### SQL Schema Definition

```sql
-- PostgreSQL 17 Schema (Postiz Implementation)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_users_email ON users(email);

-- Integrations Table
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    platform_account_id VARCHAR(255) NOT NULL,
    platform_username VARCHAR(255) NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    scopes TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, platform, platform_account_id)
);

CREATE INDEX idx_integrations_user_id ON integrations(user_id);
CREATE INDEX idx_integrations_platform ON integrations(platform);

-- Posts Table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls TEXT[] DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    scheduled_for TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    platforms UUID[] NOT NULL,
    platform_post_ids JSONB DEFAULT '{}',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_for ON posts(scheduled_for);

-- Analytics Table
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    impressions INTEGER DEFAULT 0 NOT NULL,
    likes INTEGER DEFAULT 0 NOT NULL,
    shares INTEGER DEFAULT 0 NOT NULL,
    comments INTEGER DEFAULT 0 NOT NULL,
    clicks INTEGER DEFAULT 0 NOT NULL,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00 NOT NULL,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(post_id, platform)
);

CREATE INDEX idx_analytics_post_id ON analytics(post_id);

-- API Keys Table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    scopes TEXT[] NOT NULL DEFAULT '{}',
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
```

---

## Frontend Architecture

### Component Architecture

**Component Organization:**

```
apps/web/src/
├── components/
│   ├── ui/                        # Shared UI primitives
│   ├── layout/                    # Layout components
│   ├── posts/                     # Post management
│   ├── integrations/              # Platform connections
│   ├── analytics/                 # Analytics visualization
│   └── settings/                  # Settings components
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Auth routes
│   ├── (dashboard)/               # Protected routes
│   └── api/                       # API routes
├── hooks/                         # Custom React hooks
├── lib/                           # Utilities
├── stores/                        # Zustand state
└── styles/                        # Global styles
```

**Component Template Example:**

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';

export function PostEditor() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/posts', { content, platforms: [] });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        Publish
      </Button>
    </div>
  );
}
```

### State Management

**Zustand Store Example:**

```typescript
import { create } from 'zustand';

interface PostsState {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map((p) => p.id === id ? { ...p, ...updates } : p),
  })),
}));
```

### Routing Architecture

**Route Organization (Next.js App Router):**

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── layout.tsx               # Protected layout
│   ├── page.tsx                 # Dashboard home
│   ├── posts/page.tsx
│   ├── calendar/page.tsx
│   ├── analytics/page.tsx
│   ├── integrations/page.tsx
│   └── settings/page.tsx
└── api/
    └── auth/[platform]/callback/route.ts
```

### Frontend Services Layer

**API Client Setup:**

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };
```

---

## Backend Architecture

### Service Architecture

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

### Database Access Layer

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

### Authentication Architecture

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

## Unified Project Structure

```
/Users/sid/Desktop/4. Coding Projects/Postiz/
├── .bmad-core/                    # BMad agent configuration
├── .claude/                       # Claude configuration
├── .serena/                       # Serena MCP configuration
│   └── project.yml
├── CLAUDE.md                      # Project instructions
├── docs/                          # Documentation
│   ├── architecture.md            # THIS DOCUMENT
│   ├── prd.md
│   ├── deployment-plan.md
│   ├── mcp-integration-guide.md
│   └── troubleshooting.md
├── deployment/                    # Deployment configuration
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── scripts/
│   │   ├── backup.sh
│   │   ├── restore.sh
│   │   └── health-check.sh
│   ├── backups/
│   └── uploads/
└── README.md

# Docker Volumes (managed by Docker)
postiz-postgres-data/
postiz-redis-data/
postiz-uploads/
postiz-config/
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  postiz:
    image: ghcr.io/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      MAIN_URL: "${MAIN_URL:-http://localhost:5000}"
      FRONTEND_URL: "${FRONTEND_URL:-http://localhost:5000}"
      NEXT_PUBLIC_BACKEND_URL: "${NEXT_PUBLIC_BACKEND_URL:-http://localhost:5000/api}"
      JWT_SECRET: "${JWT_SECRET}"
      DATABASE_URL: "postgresql://postiz:${POSTGRES_PASSWORD}@postiz-postgres:5432/postiz"
      REDIS_URL: "redis://postiz-redis:6379"
      NOT_SECURED: "true"
      X_API_KEY: "${X_API_KEY:-}"
      X_API_SECRET: "${X_API_SECRET:-}"
      LINKEDIN_CLIENT_ID: "${LINKEDIN_CLIENT_ID:-}"
      LINKEDIN_CLIENT_SECRET: "${LINKEDIN_CLIENT_SECRET:-}"
    volumes:
      - postiz-uploads:/uploads
    depends_on:
      postiz-postgres:
        condition: service_healthy
      postiz-redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postiz-postgres:
    image: postgres:17-alpine
    container_name: postiz-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postiz
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      POSTGRES_DB: postiz
    volumes:
      - postiz-postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postiz"]
      interval: 10s
      timeout: 5s
      retries: 5

  postiz-redis:
    image: redis:7.2-alpine
    container_name: postiz-redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - postiz-redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postiz-postgres-data:
  postiz-redis-data:
  postiz-uploads:

networks:
  postiz-network:
    driver: bridge
```

---

## Development Workflow

### Prerequisites

```bash
# Docker Desktop
docker --version  # 24.0.0+
docker compose version  # v2.20.0+

# Git
git --version  # 2.30.0+

# System Requirements
# RAM: 4GB available
# CPU: 2 vCPUs
# Disk: 10GB free
```

### Initial Setup

```bash
# Navigate to project
cd "/Users/sid/Desktop/4. Coding Projects/Postiz/deployment"

# Create environment file
cp .env.example .env

# Generate secrets
openssl rand -hex 32  # JWT_SECRET
openssl rand -hex 32  # ENCRYPTION_KEY
openssl rand -base64 24  # POSTGRES_PASSWORD

# Edit .env with generated secrets
nano .env

# Pull images
docker compose pull

# Start containers
docker compose up -d

# Wait for startup (30-90 seconds)
docker compose logs -f postiz

# Verify health
curl http://localhost:5000/api/health

# Access web interface
# Open: http://localhost:5000
# Create admin account
```

### Development Commands

```bash
# Container Management
docker compose up -d              # Start all services
docker compose down               # Stop services
docker compose restart postiz     # Restart service
docker compose ps                 # View status

# Logs
docker compose logs -f            # Follow all logs
docker compose logs -f postiz     # Follow Postiz logs
docker compose logs --tail=100    # Last 100 lines

# Database Operations
docker compose exec postiz-postgres psql -U postiz
docker compose exec postiz-postgres pg_dump -U postiz postiz > backup.sql

# Redis Operations
docker compose exec postiz-redis redis-cli

# Health Checks
curl http://localhost:5000/api/health
docker compose exec postiz-postgres pg_isready -U postiz
docker compose exec postiz-redis redis-cli ping

# Updates
docker compose pull postiz
docker compose up -d

# Backups
./scripts/backup.sh
./scripts/restore.sh backups/postiz-YYYYMMDD-HHMMSS.tar.gz
```

### Environment Configuration

**.env.example:**

```bash
# Core URLs
MAIN_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api

# Security Secrets
JWT_SECRET=  # Min 32 chars
ENCRYPTION_KEY=  # 64 hex chars
POSTGRES_PASSWORD=

# OAuth Credentials
X_API_KEY=
X_API_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```

---

## Deployment Architecture

### Deployment Strategy

**Frontend Deployment:**

- **Platform:** Bundled with Backend (Next.js serves both)
- **Build Process:** Pre-built in Docker image
- **CDN/Edge:** None initially (localhost), Nginx for production

**Backend Deployment:**

- **Platform:** Docker container on localhost
- **Deployment Method:** Docker Compose orchestration
- **Scaling Method:** Split via `POSTIZ_APPS` environment variable

### Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|-------------|-------------|---------|
| **Development** | http://localhost:5000 | http://localhost:5000/api | Local testing |
| **Staging** | https://staging.domain.com | https://staging.domain.com/api | Pre-production |
| **Production** | https://postiz.domain.com | https://postiz.domain.com/api | Live system |

### CI/CD Pipeline

**Current:** Manual deployment (using pre-built Postiz images)

**Update Process:**

```bash
./scripts/update-postiz.sh

# Or manually:
docker compose pull postiz
./scripts/backup.sh
docker compose down
docker compose up -d
docker compose logs -f
```

---

## Security and Performance

### Security Requirements

**Frontend Security:**

- **CSP Headers:** Content Security Policy configured in Nginx
- **XSS Prevention:** React automatic escaping, no `dangerouslySetInnerHTML`
- **Secure Storage:** httpOnly cookies for sessions (never localStorage)

**Backend Security:**

- **Input Validation:** NestJS class-validator on all DTOs
- **Rate Limiting:** 100 req/min global, 10 req/min for POST /posts
- **CORS Policy:** Whitelist specific origins, credentials enabled

**Authentication Security:**

- **Token Storage:** httpOnly cookies (session), hashed API keys
- **Session Management:** JWT with 7-day expiration
- **Password Policy:** Minimum 12 characters, bcrypt hashing

**OAuth Token Security:**

- **Encryption:** AES-256-GCM encryption at rest
- **Token Management:** Automated refresh 7 days before expiration
- **Revocation Handling:** Mark isActive=false, maintain audit trail

### Performance Optimization

**Frontend Performance:**

- **Bundle Size Target:** < 500KB initial bundle (gzipped)
- **Loading Strategy:** Route-based code splitting, dynamic imports
- **Caching Strategy:** Static assets 1-year cache, SWR for API data

**Performance Targets:**

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

**Backend Performance:**

- **Response Time Target:** < 500ms for 95th percentile
- **Database Optimization:** Indexed queries, connection pooling
- **Caching Strategy:** Redis caching (5 min TTL for integrations, 1 hour for analytics)

---

## Testing Strategy

### Testing Pyramid

```
E2E Tests (Manual)
/          \
Integration Tests (OAuth, MCP)
/                              \
Deployment Verification    Operational Tests
```

### Test Organization

**Deployment Verification:**

```bash
# deployment/tests/deployment.sh
# Automated health checks:
# - Container status
# - PostgreSQL connectivity
# - Redis connectivity
# - API health endpoint
# - Database schema initialized
# - Disk space available
```

**OAuth Flow Tests (Manual):**

- TC-01: Twitter OAuth connection
- TC-02: LinkedIn OAuth connection
- TC-03: Multi-platform connection
- TC-04: OAuth token refresh
- TC-05: Revoked token handling

**MCP Integration Tests (Manual):**

- TC-MCP-01: MCP server connection
- TC-MCP-02: List connected platforms
- TC-MCP-03: Create immediate post
- TC-MCP-04: Schedule future post
- TC-MCP-05: Multi-platform posting
- TC-MCP-06: Query analytics

**Operational Tests:**

- Backup and restore procedures
- Health check automation
- Disaster recovery validation

---

## Coding Standards

### Critical Fullstack Rules

- **No Hardcoded Credentials:** All secrets in .env, never in Git
- **Environment Variable Access:** Centralized configuration, never direct `process.env`
- **Docker Volume Paths:** Persistent data uses Docker volumes
- **Backup Before Modify:** Always backup before destructive operations
- **Health Check Dependency:** All services have health checks
- **API Key Format:** `ptz_{32+ chars}`, SHA-256 hashed
- **OAuth Callback URLs:** Pattern: `{BASE_URL}/api/auth/{platform}/callback`
- **Timestamp Consistency:** UTC timezone, ISO 8601 format
- **Container Restart Policy:** `restart: unless-stopped` in production

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| **Docker Services** | kebab-case with prefix | `postiz-postgres` |
| **Docker Volumes** | kebab-case with prefix | `postiz-postgres-data` |
| **Environment Variables** | UPPER_SNAKE_CASE | `JWT_SECRET` |
| **Bash Scripts** | kebab-case.sh | `backup.sh` |
| **Config Files** | kebab-case.ext | `docker-compose.yml` |
| **Backup Archives** | prefix-YYYYMMDD-HHMMSS | `postiz-20251028-140000.tar.gz` |

---

## Error Handling Strategy

### Error Response Format

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

### Frontend Error Handling

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

### Backend Error Handling

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

### Worker Error Handling

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

## Monitoring and Observability

### Monitoring Stack

**Current (MVP):**

- **Frontend:** Browser DevTools
- **Backend:** Docker logs
- **Error Tracking:** Console logging
- **Performance:** Docker stats

**Production (Future):**

- **Frontend:** Sentry
- **Backend:** Prometheus + Grafana
- **Error Tracking:** Sentry
- **Performance:** UptimeRobot

### Key Metrics

**Frontend Metrics:**

- Core Web Vitals (LCP, FID, CLS)
- JavaScript errors
- API response times
- User interactions

**Backend Metrics:**

- Request rate (RPS)
- Error rate (%)
- Response time (p50, p95, p99)
- Concurrent connections

**Database Metrics:**

- Query count
- Slow queries (> 500ms)
- Connection pool usage
- Deadlocks

**BullMQ Metrics:**

- Job throughput
- Job latency
- Job failure rate
- Queue depth

### Monitoring Implementation

**Health Check Script:**

```bash
#!/bin/bash
# deployment/scripts/health-check.sh

echo "Postiz Health Check"
echo "==================="

# Container health
docker compose ps | grep -q "Up" && echo "✅ Containers: UP" || echo "❌ Containers: DOWN"

# Service health
curl -s http://localhost:5000/api/health | grep -q "ok" && echo "✅ API: Healthy" || echo "❌ API: Unhealthy"
docker compose exec -T postiz-postgres pg_isready -U postiz > /dev/null && echo "✅ PostgreSQL: UP" || echo "❌ PostgreSQL: DOWN"
docker compose exec -T postiz-redis redis-cli ping > /dev/null && echo "✅ Redis: UP" || echo "❌ Redis: DOWN"

# Resource usage
cpu=$(docker stats --no-stream --format "{{.CPUPerc}}" postiz | sed 's/%//')
mem=$(docker stats --no-stream --format "{{.MemUsage}}" postiz | awk '{print $1}')
disk=$(df / | tail -1 | awk '{print $5}')

echo ""
echo "Resource Usage: CPU ${cpu}%, Memory ${mem}, Disk ${disk}"
```

**Automated Monitoring (Cron):**

```bash
# Run every 5 minutes
*/5 * * * * /opt/postiz-deployment/scripts/health-check.sh
```

### Alert Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| **CPU Usage** | > 70% for 5 min | > 90% for 2 min | Scale up |
| **Memory Usage** | > 80% | > 95% | Restart, increase limit |
| **Disk Usage** | > 80% | > 90% | Clean backups |
| **API Response** | p95 > 1s | p95 > 3s | Investigate |
| **Error Rate** | > 5% | > 15% | Check logs |
| **Container Restarts** | > 2 in 1 hour | > 5 in 1 hour | Investigate crash |

---

**End of Architecture Document**
