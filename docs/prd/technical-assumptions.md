# Technical Assumptions

## Repository Structure: Monorepo (Postiz)

We will be working with Postiz's existing NX monorepo structure. No new repository creation needed - we fork the existing gitroomhq/postiz-app repository.

## Service Architecture: Monolith with Optional Microservices Scaling

**Architecture Decision:**
- **Development/Small Scale:** Single container running all Postiz services (frontend, backend, worker, cron)
- **Production/High Scale:** Split into separate containers via POSTIZ_APPS environment variable:
  - Frontend container (Next.js)
  - Backend container (NestJS API)
  - Worker container (BullMQ job processor)
  - Cron container (scheduled tasks)

**Rationale:** Start simple with monolith deployment, enable microservices scaling only when needed. This follows Postiz's documented architecture and avoids premature optimization.

## Testing Requirements: Manual Testing + Postiz's Built-in Tests

**Testing Strategy:**
- **Manual verification:** Web UI testing, MCP integration testing, OAuth flow testing (documented in Phase 5 of deployment plan)
- **Built-in tests:** Leverage Postiz's existing test suite (not modified)
- **Integration testing:** MCP client connection tests, multi-platform posting tests
- **No custom test development required** for initial deployment

**Rationale:** This is a deployment/integration project, not greenfield development. Focus testing on integration points (OAuth, MCP) rather than Postiz's core functionality.

## Additional Technical Assumptions and Requests

**Infrastructure:**
- Docker Desktop (latest) with Docker Compose v2+ required
- Minimum 2GB RAM, 2 vCPUs, 5GB disk space
- PostgreSQL 17 Alpine container for database
- Redis 7.2 container for queue management and caching

**Deployment Stack:**
- **Containerization:** Docker Compose (not Kubernetes) for local deployment
- **Database:** PostgreSQL with Prisma ORM (Postiz built-in)
- **Cache/Queue:** Redis with BullMQ (Postiz built-in)
- **Frontend:** Next.js (Postiz built-in)
- **Backend:** NestJS (Postiz built-in)
- **MCP Protocol:** SSE (Server-Sent Events) transport

**Configuration Management:**
- All configuration via environment variables in docker-compose.yml
- No file-based configuration needed
- Secrets managed through Docker environment variables (local dev) or Docker secrets (production)

**OAuth Integration:**
- Platform-specific OAuth 2.0 / OAuth 1.0a implementations (Postiz handles)
- Redirect URIs configured per platform: `http://localhost:5000/api/auth/{platform}/callback`
- Developer accounts required for each social media platform

**MCP Server:**
- Endpoint: `/api/mcp/{api_key}/sse`
- Authentication: API key-based (generated in Postiz UI)
- Transport: Server-Sent Events (SSE)
- Client compatibility: Any MCP-compatible client (Claude Desktop, Claude Code, Cursor, custom frameworks)

**Backup Strategy:**
- Automated bash script for PostgreSQL dumps, config files, and uploads
- 7-day retention with automated cleanup
- Optional cron scheduling for daily backups
- Manual backup capability for critical operations

**Development Tools:**
- Git for version control
- Text editor (VSCode recommended)
- Terminal/command line proficiency assumed
- Browser for web UI access

**Not Required:**
- No custom code development (pure deployment/configuration)
- No build process (using pre-built Docker images)
- No CI/CD pipeline needed initially
- No custom monitoring/observability (Docker logs sufficient for MVP)

---
