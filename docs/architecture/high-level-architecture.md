# High Level Architecture

## Technical Summary

Postiz is a **self-hosted, container-based social media management platform** deployed via Docker Compose, featuring a Next.js frontend, NestJS backend API, PostgreSQL database, and Redis-backed BullMQ job queue. The architecture follows a **monolithic-with-microservices-option pattern**, running all services in a single container for simplicity, with the ability to split into separate containers (frontend, backend, worker, cron) for production scaling via the `POSTIZ_APPS` environment variable. OAuth 2.0 integration enables secure connections to 18+ social media platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram, TikTok, etc.), while the **MCP (Model Context Protocol) server** exposes a Server-Sent Events (SSE) endpoint at `/api/mcp/{api_key}/sse`, allowing Claude Desktop, Claude Code, Cursor, and custom agentic frameworks to manage social media through natural language. Deployed on localhost:5000 with minimal resource requirements (2GB RAM, 2 vCPUs), this architecture achieves the PRD's goals of cost-effective ($0 ongoing), privacy-focused social media scheduling with AI-powered workflows, eliminating context switching for developers and content creators.

## Platform and Infrastructure Choice

**Platform:** Local macOS/Linux/Windows (WSL2) with Docker Desktop

**Key Services:**

- **Container Orchestration:** Docker Compose v2+
- **Application:** Postiz (ghcr.io/gitroomhq/postiz-app:latest)
- **Database:** PostgreSQL 17 Alpine
- **Cache/Queue:** Redis 7.2
- **Reverse Proxy:** None initially (direct localhost:5000), nginx/Caddy optional for production SSL

**Deployment Host and Regions:** Localhost initially, with migration path to cloud regions (US-East, EU-West, Asia-Pacific) for production scaling

**Rationale:** PRD emphasizes local deployment and $0 ongoing costs. Docker Compose provides sufficient orchestration for 3-container stack without Kubernetes complexity. Migration path to cloud exists if needed.

## Repository Structure

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

## High Level Architecture Diagram

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

## Architectural Patterns

- **Containerized Monolith with Microservices Escape Hatch:** All services run in single Postiz container for simplicity, but can be split via `POSTIZ_APPS` environment variable when scaling needs arise (frontend, backend, worker, cron as separate containers). _Rationale:_ Start simple, scale only when necessary. Docker Compose supports both modes without architecture changes.

- **OAuth 2.0 Provider Pattern:** Postiz acts as OAuth client to 18+ social media platforms, managing token refresh, scope management, and secure credential storage. _Rationale:_ Industry-standard authentication pattern ensures security and platform compliance. Postiz's pre-built OAuth handlers eliminate custom implementation risk.

- **Job Queue Pattern (BullMQ + Redis):** Asynchronous post publishing, scheduling, and platform API calls processed through Redis-backed job queue. _Rationale:_ Decouples API requests from user actions, enables retries, handles rate limits gracefully, supports scheduled posting.

- **MCP Server-Sent Events (SSE) Pattern:** Real-time bidirectional communication between MCP clients and Postiz API using SSE transport over HTTP. _Rationale:_ Simpler than WebSockets for one-way server-to-client streaming, works through firewalls, compatible with all MCP clients (Claude Desktop, Code, Cursor).

- **Configuration-as-Code (Docker Compose):** All infrastructure defined in docker-compose.yml with environment variables for secrets. _Rationale:_ Version-controllable infrastructure, reproducible deployments, easy rollbacks, no manual server configuration.

- **Repository Pattern (Prisma ORM):** Database access abstracted through Prisma ORM (Postiz built-in). _Rationale:_ Type-safe database queries, automatic migrations, multi-database support (PostgreSQL primary, can switch to MySQL/SQLite).

- **Backend for Frontend (BFF) Pattern:** Next.js frontend communicates with NestJS backend API, which orchestrates platform-specific logic. _Rationale:_ Separation of concerns, enables independent scaling of frontend/backend, supports multiple client types (web UI, MCP clients).

- **Circuit Breaker Pattern (Implicit in BullMQ):** Failed platform API calls retry with exponential backoff, preventing cascade failures. _Rationale:_ Social media APIs have rate limits and occasional downtime. Graceful degradation maintains system stability.

---
