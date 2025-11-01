# Tech Stack

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
