# Postiz Self-Hosted Deployment with MCP Integration - Product Requirements Document (PRD)

**Version:** 0.3
**Date:** October 28, 2025
**Author:** John (PM Agent)
**Status:** Ready for Implementation

**Archon Project ID:** `df92dc16-e00c-4f66-b083-468ee5df4037`
**GitHub Repository:** https://github.com/gitroomhq/postiz-app
**Architecture Document:** `docs/architecture.md` (Winston, Architect)

---

## Goals and Background Context

### Goals

- Deploy a self-hosted Postiz instance locally using Docker Compose for complete control over social media management
- Configure OAuth integration for priority social media platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram)
- Enable MCP (Model Context Protocol) server integration with any MCP-compatible client (Claude Desktop, Claude Code, Cursor, or any agentic framework) for natural language social media management
- Establish automated backup and maintenance procedures for production reliability
- Achieve cost-effective social media scheduling ($0 ongoing costs vs. paid alternatives like Buffer/Hypefury)
- Support 18+ social media platforms through a single unified interface
- Enable AI-powered content generation and scheduling workflows

### Success Criteria

The deployment is considered successful when:

1. **Deployment Speed:** Complete stack deployed and healthy in < 2 hours (NFR1: < 2 minutes for containers)
2. **Platform Coverage:** Successfully connected and posted to ≥ 3 social media platforms
3. **MCP Integration:** At least 1 MCP client successfully creates and schedules posts via natural language
4. **Performance:** MCP API responses < 3 seconds (NFR3)
5. **Reliability:** 7 consecutive days of successful automated backups
6. **Resource Efficiency:** System operates within 2.5GB RAM, 2 vCPUs (NFR2)

### Background Context

This project addresses the need for a self-hosted, privacy-focused social media management solution that integrates seamlessly with AI development workflows. The existing Postiz open-source platform (24.1k GitHub stars) provides enterprise-grade scheduling, queue management, and multi-platform support that would take 2-3 weeks to build custom. By deploying Postiz with MCP integration, we gain immediate access to professional social media management capabilities directly from Claude Desktop, eliminating context switching and enabling AI-assisted content workflows. The deployment plan leverages Docker Compose for infrastructure simplicity and includes comprehensive OAuth configuration for secure platform connections.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-28 | 0.1 | Initial PRD creation | John (PM Agent) |
| 2025-10-28 | 0.2 | Added Success Criteria, Out of Scope, Checklist Results | John (PM Agent) |
| 2025-10-28 | 0.3 | Added Archon project integration with 22 task mappings | John (PM Agent) |

---

## Archon Task Mapping

All stories from this PRD have been created as tasks in Archon project management system.

### Epic 1: Foundation & Local Deployment

| Story | Archon Task ID |
|-------|----------------|
| Story 1.1: Fork and Clone Postiz Repository | `74640981-6f48-457e-803f-82bd269f7069` |
| Story 1.2: Create Docker Compose Configuration | `6d8c90dd-b87a-46f8-b0b7-394b6416950f` |
| Story 1.3: Deploy Postiz Container Stack | `8b161e3c-dc90-4665-acf3-d2c39d954669` |
| Story 1.4: Verify Installation and Create Admin Account | `8d35ee8a-ed55-4dcc-a96b-5e7e8eb3da01` |

### Epic 2: Social Media Platform Integration

| Story | Archon Task ID |
|-------|----------------|
| Story 2.1: Configure Twitter/X OAuth Integration | `a13372e4-c063-48bb-8ba4-69b2c09b2a7d` |
| Story 2.2: Configure LinkedIn OAuth Integration | `50fe5212-6183-4c21-90af-58522bc49bf2` |
| Story 2.3: Configure YouTube OAuth Integration | `28f3f370-e4d5-43c6-b2b8-ed318adefcb9` |
| Story 2.4: Configure Facebook & Instagram OAuth Integration | `4e288791-c652-406c-96cc-369581b05465` |
| Story 2.5: Verify Multi-Platform Posting | `c53db958-858f-431a-a7ba-807d1164a2e1` |

### Epic 3: MCP Server Integration & Client Configuration

| Story | Archon Task ID |
|-------|----------------|
| Story 3.1: Generate Postiz API Key for MCP Access | `90b0f249-0f23-4ee2-ad5d-23ba9a500a4c` |
| Story 3.2: Configure Claude Desktop MCP Client | `69600729-39d5-477b-95eb-0e6d2771c220` |
| Story 3.3: Configure Claude Code MCP Client | `daa85e62-b36f-435f-b852-9b6555a88315` |
| Story 3.4: Configure Cursor MCP Client (Optional) | `b09132c6-28f8-4411-9bb5-c4b6258d8c48` |
| Story 3.5: Verify Natural Language Post Creation via MCP | `39582f51-5c37-41a1-8b2b-d376a39f23c6` |
| Story 3.6: Verify Post Scheduling via MCP | `26621280-2f0f-4bbe-8d1d-5a57ad1dfee6` |
| Story 3.7: Verify Analytics and Account Management via MCP | `22459fe2-a398-41c7-b011-bc7ddc88d385` |

### Epic 4: Production Readiness & Maintenance

| Story | Archon Task ID |
|-------|----------------|
| Story 4.1: Create Automated Backup Script | `afc174ca-f7c3-48c1-a305-afb1989b3cc5` |
| Story 4.2: Schedule Automated Daily Backups | `3f647d50-0f9b-4165-b40d-3a14266edb9c` |
| Story 4.3: Implement Monitoring and Logging Practices | `0c9ae447-fe82-42bb-9f83-d708e089fb07` |
| Story 4.4: Document Troubleshooting Procedures | `df6d1cb4-4b13-439f-9d02-a6473dfb6c82` |
| Story 4.5: Validate End-to-End Workflow | `b35a8ac5-353e-410f-a35b-d2467f936c40` |
| Story 4.6: Create Operations Runbook | `7377e01b-d5c0-4bb0-97dc-ed72acd57d3c` |

---

## Requirements

### Functional Requirements

**FR1:** The system shall fork the Postiz repository (github.com/gitroomhq/postiz-app) to a user-controlled GitHub account for independent version control and customization

**FR2:** The system shall deploy Postiz locally using Docker Compose with PostgreSQL, Redis, and the Postiz application container running on port 5000

**FR3:** The system shall support OAuth 2.0 authentication configuration for multiple social media platforms including Twitter/X, LinkedIn, YouTube, Facebook, Instagram, TikTok, Reddit, Pinterest, Threads, Mastodon, Discord, and Slack

**FR4:** The system shall expose an MCP server endpoint at `/api/mcp/{api_key}/sse` using Server-Sent Events (SSE) transport protocol

**FR5:** The system shall allow any MCP-compatible client (Claude Desktop, Claude Code, Cursor, custom agentic frameworks) to connect and interact with the Postiz API through the MCP protocol

**FR6:** The system shall enable users to create, schedule, and publish social media posts to connected platforms via MCP natural language commands

**FR7:** The system shall support multi-platform posting, allowing a single post to be published simultaneously to multiple social media accounts

**FR8:** The system shall provide post scheduling capabilities with specific date/time targeting and recurring post options

**FR9:** The system shall support media uploads (images, videos) for social media posts through both the web UI and MCP interface

**FR10:** The system shall track and display analytics for published posts including engagement metrics across all connected platforms

**FR11:** The system shall provide a web-based admin interface accessible at localhost:5000 for account management, platform connections, and post monitoring

**FR12:** The system shall generate and manage API keys with configurable scopes (posts:write, posts:read, analytics:read) for MCP server authentication

**FR13:** The system shall support draft post creation, allowing posts to be saved without immediate publication

**FR14:** The system shall implement automated backup procedures for PostgreSQL database, configuration files, and uploaded media

**FR15:** The system shall integrate with OpenAI API (optional) for AI-powered content generation and suggestion features

### Non-Functional Requirements

**NFR1:** The system shall start all Docker containers and reach healthy status within 2 minutes of running `docker compose up -d`

**NFR2:** The system shall consume no more than 2.5GB RAM and 2 vCPUs under normal operation to support deployment on minimal hardware

**NFR3:** The MCP server shall respond to API requests within 3 seconds under normal load conditions

**NFR4:** The system shall store all sensitive credentials (JWT secrets, API keys, OAuth tokens) using environment variables and Docker secrets, never in plain text files

**NFR5:** The system shall maintain 99% uptime for core posting and scheduling functionality when properly deployed with Docker restart policies

**NFR6:** The system shall persist all data (database, uploads, configuration) using Docker volumes to survive container restarts

**NFR7:** The system shall support deployment on macOS, Linux, and Windows (with WSL2) Docker environments without platform-specific modifications

**NFR8:** The system shall implement proper health checks for PostgreSQL and Redis containers to prevent cascade failures

**NFR9:** The system shall log all MCP API requests and errors to stdout for debugging and monitoring purposes

**NFR10:** The system shall retain backup archives for at least 7 days with automated cleanup of older backups

**NFR11:** The system shall support SSL/TLS configuration for production deployment scenarios through reverse proxy integration

**NFR12:** The OAuth callback URLs shall be configurable to support both local development (http://localhost:5000) and production deployment (https://domain.com)

---

## Technical Assumptions

### Repository Structure: Monorepo (Postiz)

We will be working with Postiz's existing NX monorepo structure. No new repository creation needed - we fork the existing gitroomhq/postiz-app repository.

### Service Architecture: Monolith with Optional Microservices Scaling

**Architecture Decision:**
- **Development/Small Scale:** Single container running all Postiz services (frontend, backend, worker, cron)
- **Production/High Scale:** Split into separate containers via POSTIZ_APPS environment variable:
  - Frontend container (Next.js)
  - Backend container (NestJS API)
  - Worker container (BullMQ job processor)
  - Cron container (scheduled tasks)

**Rationale:** Start simple with monolith deployment, enable microservices scaling only when needed. This follows Postiz's documented architecture and avoids premature optimization.

### Testing Requirements: Manual Testing + Postiz's Built-in Tests

**Testing Strategy:**
- **Manual verification:** Web UI testing, MCP integration testing, OAuth flow testing (documented in Phase 5 of deployment plan)
- **Built-in tests:** Leverage Postiz's existing test suite (not modified)
- **Integration testing:** MCP client connection tests, multi-platform posting tests
- **No custom test development required** for initial deployment

**Rationale:** This is a deployment/integration project, not greenfield development. Focus testing on integration points (OAuth, MCP) rather than Postiz's core functionality.

### Additional Technical Assumptions and Requests

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

## Epic List

**Epic 1: Foundation & Local Deployment**
*Goal:* Establish the foundational Postiz infrastructure locally with Docker, PostgreSQL, and Redis running healthy, and verify basic web UI access with admin account creation.

**Epic 2: Social Media Platform Integration**
*Goal:* Configure OAuth authentication for priority social media platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram) and verify successful posting to at least one platform.

**Epic 3: MCP Server Integration & Client Configuration**
*Goal:* Enable MCP server endpoint in Postiz, configure MCP clients (Claude Desktop, Claude Code, Cursor), and verify natural language post creation and scheduling through any MCP client.

**Epic 4: Production Readiness & Maintenance**
*Goal:* Implement automated backup procedures, establish monitoring practices, document troubleshooting procedures, and validate the complete end-to-end workflow for production use.

---

## Out of Scope (MVP)

The following items are explicitly out of scope for the initial deployment:

- **Production HTTPS Deployment:** Local HTTP sufficient for MVP; production SSL via reverse proxy deferred to Phase 2
- **Additional Platforms:** TikTok, Reddit, Pinterest, Dribbble, Threads, Mastodon, Discord, Slack deferred to Phase 2
- **Custom Postiz Features:** Using Postiz as-is; no modifications to core functionality
- **Mobile Applications:** Desktop/web-based deployment only
- **Multi-Tenant Setup:** Single-user/small team deployment; multi-tenancy not configured
- **Advanced Analytics:** Using Postiz built-in analytics; custom dashboards deferred
- **CI/CD Pipeline:** Manual deployment; automated pipelines deferred to Phase 2
- **High-Availability Setup:** Single-instance deployment; clustering/failover not configured
- **Custom Branding:** Using default Postiz branding and UI
- **Email Notifications:** Postiz has built-in notifications; custom email workflows not configured

---

## Epic 1: Foundation & Local Deployment

**Expanded Goal:**
Establish the foundational Postiz infrastructure by forking the repository, configuring Docker Compose with all required environment variables, deploying the containerized stack (Postiz app, PostgreSQL, Redis), and verifying the system is accessible with a functional admin account. This epic delivers a working self-hosted Postiz instance accessible at localhost:5000.

### Story 1.1: Fork and Clone Postiz Repository

**As a** developer,
**I want** to fork the Postiz repository to my GitHub account and clone it locally,
**so that** I have independent version control and can track upstream changes while maintaining customization flexibility.

#### Acceptance Criteria:

1. Postiz repository is forked from gitroomhq/postiz-app to user's GitHub account
2. Forked repository is cloned to local machine at designated project directory
3. Git remote 'upstream' is configured pointing to gitroomhq/postiz-app
4. Git remote 'origin' is configured pointing to user's forked repository
5. `git remote -v` command displays both origin and upstream remotes correctly
6. Local working directory exists with all Postiz source files present

### Story 1.2: Create Docker Compose Configuration

**As a** DevOps engineer,
**I want** to create a docker-compose.yml file with all required environment variables and service definitions,
**so that** I can deploy the complete Postiz stack with a single command.

#### Acceptance Criteria:

1. docker-compose.yml file created in ~/postiz-deployment directory with three services: postiz, postiz-postgres, postiz-redis
2. JWT_SECRET environment variable is generated using cryptographically secure random string (minimum 32 characters)
3. All required core environment variables are configured: MAIN_URL, FRONTEND_URL, NEXT_PUBLIC_BACKEND_URL, DATABASE_URL, REDIS_URL, BACKEND_INTERNAL_URL, IS_GENERAL
4. PostgreSQL service configured with health check (pg_isready) and persistent volume
5. Redis service configured with health check (redis-cli ping) and persistent volume
6. Postiz service configured with depends_on conditions for healthy postgres and redis
7. Port 5000 is exposed for web interface access
8. Docker networks and volumes are defined for service isolation and data persistence
9. NOT_SECURED environment variable set to "true" for local development without HTTPS
10. Placeholder environment variables added for all social media platform OAuth credentials (empty strings initially)

### Story 1.3: Deploy Postiz Container Stack

**As a** system administrator,
**I want** to start all Postiz Docker containers and verify they reach healthy status,
**so that** the application infrastructure is running and ready for configuration.

#### Acceptance Criteria:

1. `docker compose up -d` executes successfully without errors
2. All three containers (postiz, postiz-postgres, postiz-redis) are in "Up" status within 2 minutes
3. PostgreSQL container passes health check (status: healthy)
4. Redis container passes health check (status: healthy)
5. Postiz container logs show "Server running on http://localhost:5000" message
6. `docker compose ps` shows all containers with healthy status
7. No error messages present in container logs (`docker compose logs`)
8. Docker volumes are created and mounted correctly (postgres-volume, postiz-redis-data, postiz-config, postiz-uploads)
9. Port 5000 is accessible and not blocked by firewall

### Story 1.4: Verify Installation and Create Admin Account

**As a** platform administrator,
**I want** to access the Postiz web interface and create an admin account,
**so that** I can manage the platform and configure social media integrations.

#### Acceptance Criteria:

1. Web browser successfully loads http://localhost:5000 without connection errors
2. Postiz landing page displays with sign-up option
3. Admin account is created with valid email and secure password
4. User can successfully log into Postiz dashboard after account creation
5. Dashboard displays main navigation: Posts, Calendar, Analytics, Settings
6. Settings page is accessible and shows configuration options
7. Public API settings page is accessible (for future MCP integration)
8. No JavaScript errors in browser console
9. User session persists after browser refresh (cookies working correctly)

---

## Epic 2: Social Media Platform Integration

**Expanded Goal:**
Configure OAuth 2.0 authentication for priority social media platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram) by creating developer applications on each platform, adding credentials to Postiz environment variables, and establishing authorized connections. This epic delivers functional multi-platform posting capability, validating the core value proposition of Postiz as a unified social media management interface.

### Story 2.1: Configure Twitter/X OAuth Integration

**As a** social media manager,
**I want** to connect my Twitter/X account to Postiz via OAuth,
**so that** I can create, schedule, and publish tweets through the Postiz interface.

#### Acceptance Criteria:

1. Twitter Developer account is created at developer.twitter.com
2. New Twitter app is created in Developer Portal with project configuration
3. OAuth 1.0a is enabled for the Twitter app
4. Callback URL is set to `http://localhost:5000/api/auth/twitter/callback`
5. API Key and API Secret are generated and securely copied
6. Postiz Docker containers are stopped (`docker compose down`)
7. docker-compose.yml is updated with X_API_KEY and X_API_SECRET environment variables
8. Postiz Docker containers are restarted (`docker compose up -d`)
9. Postiz Settings → Integrations page shows "Connect Twitter" option
10. OAuth authorization flow completes successfully when clicking "Connect Twitter"
11. Connected Twitter account is displayed in Postiz dashboard with username/handle
12. Test draft post is created successfully via Postiz UI for Twitter
13. Twitter account appears in platform selection when creating new posts

### Story 2.2: Configure LinkedIn OAuth Integration

**As a** professional content creator,
**I want** to connect my LinkedIn account to Postiz via OAuth,
**so that** I can publish professional content and updates through the Postiz interface.

#### Acceptance Criteria:

1. LinkedIn Developer account is created at linkedin.com/developers/apps
2. New LinkedIn app is created with appropriate product selections
3. "Sign In with LinkedIn using OpenID Connect" product is added to the app
4. Redirect URL is set to `http://localhost:5000/api/auth/linkedin/callback`
5. Client ID and Client Secret are generated and securely copied
6. docker-compose.yml is updated with LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET environment variables
7. Postiz containers are restarted with new configuration
8. OAuth authorization flow completes successfully when clicking "Connect LinkedIn"
9. Connected LinkedIn account/page is displayed in Postiz dashboard
10. Test draft post is created successfully via Postiz UI for LinkedIn
11. LinkedIn account appears in platform selection when creating new posts

### Story 2.3: Configure YouTube OAuth Integration

**As a** video content creator,
**I want** to connect my YouTube channel to Postiz via OAuth,
**so that** I can schedule video uploads and community posts through the Postiz interface.

#### Acceptance Criteria:

1. Google Cloud Console project is created at console.cloud.google.com
2. YouTube Data API v3 is enabled for the project
3. OAuth 2.0 credentials are created (Web application type)
4. Authorized redirect URI is set to `http://localhost:5000/api/auth/youtube/callback`
5. Client ID and Client Secret are generated and securely copied
6. docker-compose.yml is updated with YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET environment variables
7. Postiz containers are restarted with new configuration
8. OAuth authorization flow completes successfully when clicking "Connect YouTube"
9. Connected YouTube channel is displayed in Postiz dashboard with channel name
10. YouTube channel appears in platform selection when creating new posts
11. Test community post draft is created successfully via Postiz UI

### Story 2.4: Configure Facebook & Instagram OAuth Integration

**As a** brand social media manager,
**I want** to connect my Facebook page and Instagram business account to Postiz via OAuth,
**so that** I can manage visual content and updates across both Meta platforms.

#### Acceptance Criteria:

1. Facebook Developer account is created at developers.facebook.com
2. New Facebook app is created with appropriate configuration
3. Facebook Login product is added to the app
4. Valid redirect URI is set to `http://localhost:5000/api/auth/facebook/callback`
5. App ID and App Secret are copied from app dashboard
6. docker-compose.yml is updated with FACEBOOK_APP_ID and FACEBOOK_APP_SECRET environment variables
7. Postiz containers are restarted with new configuration
8. OAuth authorization flow completes successfully for Facebook when clicking "Connect Facebook"
9. Connected Facebook page is displayed in Postiz dashboard
10. Instagram business account connected to Facebook page is automatically available in Postiz
11. Both Facebook and Instagram appear as separate platform options when creating posts
12. Test draft posts are created successfully for both Facebook and Instagram
13. Image upload functionality works for both platforms

### Story 2.5: Verify Multi-Platform Posting

**As a** social media manager,
**I want** to publish a single post to multiple platforms simultaneously,
**so that** I can efficiently distribute content without manual duplication.

#### Acceptance Criteria:

1. New post is created in Postiz with text content suitable for all platforms
2. Multiple platforms are selected simultaneously (minimum: Twitter, LinkedIn, Facebook)
3. "Post Now" button publishes the post immediately to all selected platforms
4. Postiz dashboard shows successful posting status for all platforms
5. Each platform's native interface (Twitter web, LinkedIn web, Facebook web) displays the published post
6. Post content appears correctly formatted on each platform
7. Timestamp of posts on all platforms are within 1 minute of each other
8. Postiz Analytics page shows the multi-platform post with engagement metrics from all platforms
9. No error messages appear in Postiz UI or container logs during posting

---

## Epic 3: MCP Server Integration & Client Configuration

**Expanded Goal:**
Enable the MCP (Model Context Protocol) server endpoint in Postiz by generating API keys, configure multiple MCP-compatible clients (Claude Desktop, Claude Code, Cursor) to connect to the Postiz MCP server, and verify natural language post creation, scheduling, and management workflows through any connected MCP client. This epic delivers the key differentiator: AI-powered social media management without leaving the development environment.

### Story 3.1: Generate Postiz API Key for MCP Access

**As a** platform administrator,
**I want** to generate a secure API key in Postiz with appropriate scopes for MCP access,
**so that** MCP clients can authenticate and interact with the Postiz API.

#### Acceptance Criteria:

1. User logs into Postiz web interface at http://localhost:5000
2. Settings page is accessible from main navigation
3. "Public API" tab is visible and accessible in Settings
4. "Generate New API Key" button is present and functional
5. API key is generated successfully with format `ptz_` followed by random alphanumeric string
6. Generated API key is displayed once and user is warned it cannot be retrieved again
7. API key is securely copied and stored in password manager or secure notes
8. MCP Server URL is displayed in the Public API section with format: `http://localhost:5000/api/mcp/{api_key}/sse`
9. MCP Server URL is copied for use in client configuration
10. API key has required scopes: posts:write, posts:read, analytics:read

### Story 3.2: Configure Claude Desktop MCP Client

**As a** Claude Desktop user,
**I want** to connect Claude Desktop to my Postiz MCP server,
**so that** I can manage social media posts through natural language conversations in Claude.

#### Acceptance Criteria:

1. Claude Desktop configuration file location is identified based on OS (macOS: ~/Library/Application Support/Claude/, Linux: ~/.config/Claude/, Windows: %APPDATA%\Claude/)
2. claude_desktop_config.json file is opened in text editor
3. New mcpServers entry is added for "postiz" with correct SSE endpoint URL including API key
4. JSON configuration is valid (proper syntax, commas, brackets, quotes)
5. Configuration includes description field: "Postiz social media scheduling"
6. Claude Desktop is completely quit (not just window closed) using Cmd+Q (macOS) or equivalent
7. Claude Desktop is restarted and fully loads
8. MCP indicator icon appears in bottom-right corner of Claude Desktop input box
9. MCP indicator shows "postiz" server as connected when clicked/hovered
10. Test query in Claude Desktop confirms connection: "Are you connected to Postiz?" returns positive confirmation
11. No error messages appear in Claude Desktop or Postiz container logs

### Story 3.3: Configure Claude Code MCP Client

**As a** developer using Claude Code,
**I want** to connect Claude Code to my Postiz MCP server,
**so that** I can manage social media posts directly from my coding environment without context switching.

#### Acceptance Criteria:

1. Claude Code MCP configuration file or settings are accessed
2. Postiz MCP server configuration is added with SSE endpoint URL including API key
3. Configuration is saved and Claude Code is restarted if necessary
4. MCP connection indicator shows Postiz server as connected
5. Test command confirms Claude Code can access Postiz: "Show me my connected social media accounts in Postiz"
6. Claude Code successfully retrieves and displays list of connected platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram)
7. No authentication or connection errors appear

### Story 3.4: Configure Cursor MCP Client (Optional)

**As a** developer using Cursor IDE,
**I want** to connect Cursor to my Postiz MCP server,
**so that** I can manage social media posts from within my IDE during content development.

#### Acceptance Criteria:

1. Cursor MCP configuration settings are accessed
2. Postiz MCP server configuration is added with SSE endpoint URL
3. Configuration is saved and Cursor is restarted if necessary
4. MCP connection is verified in Cursor interface
5. Test query confirms Cursor can interact with Postiz API
6. Connected social media accounts are retrievable through Cursor

### Story 3.5: Verify Natural Language Post Creation via MCP

**As a** content creator using an MCP client,
**I want** to create and publish social media posts using natural language commands,
**so that** I can efficiently manage content without switching to the Postiz web interface.

#### Acceptance Criteria:

1. MCP client (Claude Desktop, Claude Code, or Cursor) is actively connected to Postiz
2. Natural language command successfully creates immediate post: "Post this to Twitter: 'Testing MCP integration with Postiz! 🚀'"
3. Postiz receives the request and creates the post
4. Post is successfully published to Twitter
5. MCP client returns confirmation with post ID and status
6. Post is visible in Twitter web interface within 1 minute
7. Post appears in Postiz dashboard with correct timestamp and platform
8. Draft post creation works: "Create a draft post for LinkedIn: 'Excited to share our new MCP integration!'"
9. Draft post is created but not published, visible in Postiz dashboard as "Draft" status
10. Multi-platform posting works: "Post this to Twitter, LinkedIn, and Facebook: 'Multi-platform posting via MCP! 🎉'"
11. All three platforms receive and publish the post successfully

### Story 3.6: Verify Post Scheduling via MCP

**As a** social media manager using an MCP client,
**I want** to schedule posts for future publication using natural language time specifications,
**so that** I can plan content distribution without manual scheduling in the web UI.

#### Acceptance Criteria:

1. Scheduled post is created via natural language: "Schedule this tweet for tomorrow at 9 AM: 'Good morning! Starting the day with productivity tips.'"
2. MCP client parses the time specification correctly (tomorrow at 9 AM)
3. Postiz creates scheduled post with correct future timestamp
4. MCP client returns confirmation with post ID, scheduled time, and platform
5. Scheduled post appears in Postiz Calendar view with correct date and time
6. Post status shows as "Scheduled" in Postiz dashboard
7. Relative time scheduling works: "Schedule a LinkedIn post for 2 hours from now: 'Breaking news announcement!'"
8. List scheduled posts command works: "Show me all my scheduled posts in Postiz"
9. MCP client returns list of scheduled posts with IDs, platforms, content preview, and scheduled times
10. Cancel scheduled post works: "Cancel the post scheduled for tomorrow at 9 AM on Twitter"
11. Cancelled post is removed from Postiz Calendar and no longer appears in scheduled posts list

### Story 3.7: Verify Analytics and Account Management via MCP

**As a** social media analyst using an MCP client,
**I want** to retrieve analytics and account information through natural language queries,
**so that** I can monitor performance without opening the Postiz dashboard.

#### Acceptance Criteria:

1. Account listing command works: "Show me all my connected social media accounts in Postiz"
2. MCP client returns complete list with platform names, usernames/handles, and connection status
3. Analytics query works: "Show me analytics for my last 10 Twitter posts"
4. MCP client retrieves and displays post performance data including impressions, likes, retweets, replies
5. Platform-specific analytics work: "What's the engagement rate on my recent LinkedIn posts?"
6. MCP client calculates and returns engagement metrics based on Postiz analytics data
7. Scheduled posts summary works: "How many posts do I have scheduled this week?"
8. MCP client returns count of scheduled posts grouped by platform and day
9. All queries complete within 5 seconds under normal conditions
10. Error messages are clear and actionable if queries fail (e.g., "No analytics data available for this post yet")

---

## Epic 4: Production Readiness & Maintenance

**Expanded Goal:**
Implement automated backup procedures for PostgreSQL database, configuration files, and uploaded media, establish monitoring and logging practices for operational visibility, document comprehensive troubleshooting procedures for common issues, and validate the complete end-to-end workflow from OAuth configuration through MCP-based posting. This epic delivers production-grade reliability and operational sustainability for long-term Postiz usage.

### Story 4.1: Create Automated Backup Script

**As a** system administrator,
**I want** an automated backup script for all critical Postiz data,
**so that** I can recover from data loss, corruption, or accidental deletion.

#### Acceptance Criteria:

1. Bash script is created at ~/postiz-deployment/backup.sh with proper shebang (#!/bin/bash)
2. Script creates backups directory at ~/postiz-deployment/backups if it doesn't exist
3. PostgreSQL database dump is created using `docker exec postiz-postgres pg_dump`
4. Backup includes complete database: users, posts, schedules, analytics, OAuth tokens
5. Configuration files are backed up from postiz:/config directory
6. Uploaded media files are backed up from postiz:/uploads directory
7. All backup components are combined into single compressed archive (.tar.gz) with timestamp
8. Temporary individual backup files are cleaned up after archive creation
9. Backup retention logic keeps only the last 7 backup archives, deleting older ones
10. Script is executable (chmod +x backup.sh)
11. Manual execution completes successfully: ~/postiz-deployment/backup.sh
12. Backup archive can be extracted and contains all expected components
13. Backup completion message displays with archive filename and timestamp

### Story 4.2: Schedule Automated Daily Backups

**As a** system administrator,
**I want** backups to run automatically on a daily schedule,
**so that** I have consistent recovery points without manual intervention.

#### Acceptance Criteria:

1. Crontab entry is created for daily backup execution at 3:00 AM local time
2. Cron syntax is correct: `0 3 * * * ~/postiz-deployment/backup.sh`
3. Crontab is installed using `crontab -e` command
4. Cron service is verified as running on the system
5. Backup script executes successfully when triggered by cron (test with adjusted time)
6. Backup logs are captured (optional: redirect stdout/stderr to log file)
7. Backup archives accumulate over 7 days showing daily execution
8. Disk space usage is monitored to ensure backups don't exhaust storage
9. Failed backup notifications are documented (optional: email alerts on failure)

### Story 4.3: Implement Monitoring and Logging Practices

**As a** DevOps engineer,
**I want** to monitor container health and review logs for troubleshooting,
**so that** I can proactively identify and resolve issues before they impact users.

#### Acceptance Criteria:

1. Docker container status monitoring command is documented: `docker compose ps`
2. Real-time log viewing command is documented: `docker compose logs -f postiz`
3. Resource usage monitoring command is documented: `docker stats postiz postiz-postgres postiz-redis`
4. Container resource limits are validated: RAM usage stays under 2.5GB, CPU under 60% during normal operation
5. Health check endpoints are verified: PostgreSQL (pg_isready), Redis (redis-cli ping), Postiz (/api/health)
6. Log rotation strategy is documented (Docker handles automatically, but confirm logs don't exhaust disk)
7. Key log messages to monitor are documented: OAuth errors, MCP connection failures, platform API errors, database connection errors
8. Alert thresholds are defined: container restarts >3 in 1 hour, memory usage >90%, disk usage >85%
9. Monitoring commands are added to README or operations documentation
10. Sample monitoring cron job is documented (optional: periodic health checks)

### Story 4.4: Document Troubleshooting Procedures

**As a** support engineer,
**I want** comprehensive troubleshooting documentation for common issues,
**so that** I can quickly diagnose and resolve problems without escalation.

#### Acceptance Criteria:

1. Troubleshooting guide is created in docs/troubleshooting.md
2. "Cannot Connect to Postiz" issue documented with solutions: check containers, restart services, verify port 5000
3. "OAuth Callback Errors" issue documented with solutions: verify redirect URIs, check API keys, ensure HTTPS/HTTP matches
4. "MCP Connection Failed" issue documented with solutions: verify API key, check Postiz running, validate JSON config, restart Claude Desktop
5. "Database Connection Errors" issue documented with solutions: check PostgreSQL health, verify DATABASE_URL, reset database (with warning)
6. "Redis Connection Errors" issue documented with solutions: check Redis health, test redis-cli ping, restart Redis container
7. "Container Won't Start" issue documented with solutions: check Docker logs, verify port conflicts, ensure sufficient resources
8. "Posts Not Publishing" issue documented with solutions: verify OAuth tokens valid, check platform API status, review Postiz logs
9. Each issue includes: symptoms, root cause analysis, step-by-step solution, verification steps
10. Troubleshooting guide includes escalation path for unresolved issues (GitHub issues, community Discord)
11. Common log error messages are documented with interpretations
12. Quick reference table included: Issue → Primary Command → Expected Resolution Time

### Story 4.5: Validate End-to-End Workflow

**As a** product owner,
**I want** to execute a complete end-to-end workflow validation,
**so that** I can confirm all epic deliverables are integrated and functioning correctly.

#### Acceptance Criteria:

1. All Docker containers are running and healthy (Epic 1 validation)
2. At least 3 social media platforms are connected via OAuth (Epic 2 validation)
3. At least 1 MCP client is configured and connected (Epic 3 validation)
4. Backup script executes successfully and creates valid archive (Epic 4 validation)
5. **End-to-End Test 1:** Create immediate post via MCP client → Post publishes to Twitter → Post appears in Postiz dashboard → Post visible on Twitter web
6. **End-to-End Test 2:** Schedule post via MCP client for 30 minutes from now → Post appears in Postiz Calendar → Scheduled post executes at correct time → Post appears on LinkedIn
7. **End-to-End Test 3:** Create multi-platform post via web UI → Post publishes to Twitter, LinkedIn, Facebook simultaneously → All posts appear in respective platforms within 2 minutes
8. **End-to-End Test 4:** Query analytics via MCP client → Analytics data returns for recent posts → Data matches Postiz dashboard analytics
9. **End-to-End Test 5:** Manual backup → Restore test (optional: restore to test environment) → Data integrity verified
10. All 5 end-to-end tests pass without errors
11. Success criteria document is updated with completion status
12. Project is marked as "Production Ready" in documentation

### Story 4.6: Create Operations Runbook

**As a** system administrator,
**I want** a comprehensive operations runbook,
**so that** I have reference documentation for routine maintenance, updates, and operational tasks.

#### Acceptance Criteria:

1. Operations runbook is created in docs/operations-runbook.md
2. **Daily Operations** section documents: check container health, review logs for errors, verify scheduled posts executing
3. **Weekly Operations** section documents: review backup archives, check disk space usage, update OAuth tokens if expiring
4. **Monthly Operations** section documents: review analytics for unusual patterns, rotate API keys, update Postiz to latest version
5. **Update Procedure** documented: pull latest image, stop containers, backup data, restart with new image, verify health
6. **Rollback Procedure** documented: identify last known good version, restore containers, restore backup if needed, verify functionality
7. **Adding New Platform** procedure documented: create developer app, add credentials to docker-compose.yml, restart containers, connect in UI
8. **Revoking Access** procedure documented: disconnect platform in UI, remove credentials from docker-compose.yml, restart containers
9. **Scaling Procedure** documented: split services (frontend, backend, worker), update docker-compose.yml, increase resources
10. **Migration Procedure** documented: backup data, export docker volumes, import to new system, update URLs, verify connectivity
11. **Emergency Contact** section includes: GitHub issues link, Discord community link, local documentation references
12. Runbook includes estimated time for each operation and required access level

---

## Checklist Results Report

**PRD Evaluated:** Postiz Self-Hosted Deployment with MCP Integration
**Evaluation Date:** October 28, 2025
**Evaluator:** John (PM Agent)

### Executive Summary

**Overall PRD Completeness:** 88% ✅
**MVP Scope Appropriateness:** Just Right ✅
**Readiness for Architecture Phase:** **READY** ✅

This is a well-structured deployment/integration PRD with clear requirements, comprehensive epic breakdown, and detailed acceptance criteria. The project scope is appropriately sized for a 2-3 day implementation timeline. The document provides sufficient technical guidance for an architect to design the deployment architecture and implementation approach.

### Category Analysis

| Category                         | Status  | Critical Issues |
| -------------------------------- | ------- | --------------- |
| 1. Problem Definition & Context  | PARTIAL | Minor: Could enhance with explicit problem statement format |
| 2. MVP Scope Definition          | PASS    | Well-bounded scope with clear epic structure |
| 3. User Experience Requirements  | PASS    | Appropriately leverages existing Postiz UI |
| 4. Functional Requirements       | PASS    | 15 clear, testable requirements |
| 5. Non-Functional Requirements   | PASS    | 12 specific requirements with measurable criteria |
| 6. Epic & Story Structure        | PASS    | 4 epics, 18 stories, comprehensive acceptance criteria |
| 7. Technical Guidance            | PASS    | Detailed technical assumptions with rationale |
| 8. Cross-Functional Requirements | PASS    | Integration and operational requirements covered |
| 9. Clarity & Communication       | PASS    | Well-structured, clear language |

**Legend:** PASS (90%+ complete), PARTIAL (60-89%), FAIL (<60%)

### Key Strengths

1. **Comprehensive Epic/Story Structure:** 18 detailed stories with specific acceptance criteria (avg 10 criteria per story)
2. **Clear Technical Guidance:** Technology stack, architecture decisions, and rationale well-documented
3. **Appropriate Scope:** MVP sized for 2-3 day implementation with realistic timeline
4. **Strong Requirements:** 15 functional and 12 non-functional requirements with measurable criteria
5. **Deployment Focus:** Appropriate for deployment/integration project (not greenfield development)

### Identified Improvements (Addressed)

**High Priority (Completed):**
- ✅ Added explicit out-of-scope section
- ✅ Defined quantified success metrics with measurable criteria

**Medium Priority (Optional):**
- User personas documentation (implicit in goals, explicit definition optional)
- Technical risks documentation (addressed in story rationale sections)

**Low Priority (Optional):**
- Architecture diagram (text structure is clear and sufficient)
- Future enhancements roadmap (Phase 2 items in out-of-scope section)

### MVP Scope Assessment

**Scope Evaluation:** ✅ **Just Right** - Appropriately sized for 2-3 day implementation

**Timeline Realism:**
- Epic 1: 2-3 hours (infrastructure deployment)
- Epic 2: 2-4 hours (OAuth configuration, varies by platform approval times)
- Epic 3: 30 minutes (MCP client configuration)
- Epic 4: 1-2 hours (backup scripts and documentation)
- **Total:** 6-9 hours of actual work, spread over 2-3 days

### Technical Readiness Assessment

**Clarity of Technical Constraints:** ✅ **Excellent**
- Docker Compose v2+ required
- Minimum hardware specs clear (2GB RAM, 2 vCPUs)
- Platform compatibility defined (macOS, Linux, Windows/WSL2)
- Pre-built images strategy documented

**Identified Technical Considerations:**
1. **OAuth Platform Approvals** - Some platforms require app review (mitigation: start with Twitter)
2. **MCP Client Variations** - Each client configures differently (mitigation: separate stories per client)
3. **Port Availability** - Port 5000 may conflict with existing services (mitigation: documented in troubleshooting)

### Final Decision

**Status:** ✅ **READY FOR ARCHITECT**

The PRD and epics are comprehensive, properly structured, and ready for architectural design. An architect can proceed immediately with designing the deployment architecture and implementation approach.

**Recommended Next Steps:**
1. **Immediate:** Proceed to architecture phase
2. **Parallel:** Begin Epic 1 (Foundation & Local Deployment) while architect reviews
3. **Documentation:** Use this PRD as reference for all implementation decisions

---

## Next Steps

### UX Expert Prompt

**Note:** This is a deployment/integration project using Postiz's existing UI. No custom UX design is required for MVP. The Postiz web interface at localhost:5000 provides all necessary UI functionality for:
- Account management and platform connections
- Post creation, scheduling, and publishing
- Analytics dashboard
- Settings and configuration

**If UX work is needed in future phases:**

Review the completed Postiz deployment PRD and existing Postiz UI at localhost:5000. Focus on:

1. **User Flow Analysis:** Evaluate the existing Postiz UI flows for post creation, scheduling, and analytics
2. **MCP Natural Language Interface:** Document common user commands and expected responses for MCP clients
3. **Onboarding Experience:** Create quick-start guide for first-time users connecting social media accounts
4. **Documentation Enhancement:** Design user-friendly documentation with screenshots and workflow diagrams

**Deliverables (if needed):**
- User flow documentation for common tasks
- MCP command reference guide with examples
- Visual quick-start guide for deployment and configuration

---

### Architect Prompt

You are the Technical Architect for the Postiz Self-Hosted Deployment with MCP Integration project. Review the completed PRD and create the technical architecture and implementation plan.

**Your Mission:**

Design the deployment architecture and create detailed implementation guidance for deploying Postiz locally with Docker Compose and integrating the MCP server with Claude Desktop, Claude Code, and Cursor clients.

**Key Inputs:**

1. **PRD Document:** `docs/prd.md` (this document)
2. **Existing Documentation:**
   - `docs/deployment-plan.md` - Complete 7-phase deployment guide (880+ lines)
   - `docs/mcp-integration-guide.md` - MCP server setup and troubleshooting
   - `docs/postiz-eval.md` - Technology evaluation and decision rationale
3. **Upstream Repository:** https://github.com/gitroomhq/postiz-app (24.1k stars, actively maintained)

**Technical Constraints:**

- **Infrastructure:** Docker Compose (not Kubernetes), PostgreSQL 17, Redis 7.2
- **Architecture:** Monolith deployment (single container) with optional microservices scaling
- **OAuth:** Platform-specific implementations (Twitter OAuth 1.0a, others OAuth 2.0)
- **MCP Protocol:** Server-Sent Events (SSE) transport at `/api/mcp/{api_key}/sse`
- **Resources:** Maximum 2.5GB RAM, 2 vCPUs (NFR2)
- **Timeline:** Implementation completable in 6-9 hours over 2-3 days

**Your Deliverables:**

1. **System Architecture Document** (`docs/architecture.md`):
   - Component diagram: Docker containers, networks, volumes, external services
   - Data flow diagrams: OAuth flows, MCP request/response, posting workflows
   - Security architecture: API key management, OAuth token storage, environment variable handling
   - Deployment topology: Local development vs. future production considerations

2. **Implementation Guide** (`docs/implementation-guide.md`):
   - Epic-by-epic implementation approach
   - Docker Compose configuration details
   - OAuth setup procedures for each platform (Twitter, LinkedIn, YouTube, Facebook, Instagram)
   - MCP server configuration for each client type
   - Testing procedures and validation checklists

3. **Technical Decisions Document** (`docs/technical-decisions.md`):
   - Rationale for Docker Compose over Kubernetes
   - Pre-built images vs. building from source
   - Monolith vs. microservices architecture trade-offs
   - SSE transport for MCP (vs. WebSocket alternatives)
   - Backup strategy (bash script vs. dedicated backup service)

**Focus Areas:**

1. **Simplicity:** This is a deployment project, not greenfield development. Leverage Postiz's existing architecture.
2. **Reliability:** Ensure proper health checks, restart policies, and backup procedures
3. **Security:** Proper secrets management, OAuth token security, API key rotation
4. **Maintainability:** Clear procedures for updates, troubleshooting, and scaling
5. **MCP Integration:** Ensure multiple MCP clients can connect reliably

**Critical Success Factors:**

- All Docker containers start and reach healthy status within 2 minutes (NFR1)
- OAuth callbacks work correctly for all configured platforms
- MCP API responds within 3 seconds (NFR3)
- System operates within resource constraints (NFR2)
- Backup script successfully preserves all data

**Getting Started:**

1. Review all four epics in the PRD (Foundation, Platform Integration, MCP, Production Readiness)
2. Read the existing deployment-plan.md for detailed implementation steps
3. Examine the technical assumptions section for technology choices
4. Design the architecture with emphasis on local deployment first, production later
5. Create implementation guidance that developers can follow step-by-step

**Questions to Address:**

- How should environment variables be organized in docker-compose.yml?
- What's the restart strategy if PostgreSQL or Redis fails?
- How do we handle OAuth token expiration and refresh?
- What monitoring approach is sufficient for MVP vs. production?
- How do we test MCP integration without deploying to all clients?

**Expected Timeline:**

- Architecture design: 2-4 hours
- Implementation guide creation: 2-3 hours
- Technical decisions documentation: 1 hour
- **Total:** 5-8 hours for complete architecture deliverables

**Success Metric:**

A developer should be able to follow your architecture and implementation guide to successfully deploy Postiz with MCP integration in 6-9 hours without prior Postiz experience.

---

**End of PRD Document v0.2**
