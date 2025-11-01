# Epic 1: Foundation & Local Deployment

**Expanded Goal:**
Establish the foundational Postiz infrastructure by forking the repository, configuring Docker Compose with all required environment variables, deploying the containerized stack (Postiz app, PostgreSQL, Redis), and verifying the system is accessible with a functional admin account. This epic delivers a working self-hosted Postiz instance accessible at localhost:5000.

## Story 1.1: Fork and Clone Postiz Repository

**As a** developer,
**I want** to fork the Postiz repository to my GitHub account and clone it locally,
**so that** I have independent version control and can track upstream changes while maintaining customization flexibility.

### Acceptance Criteria:

1. Postiz repository is forked from gitroomhq/postiz-app to user's GitHub account
2. Forked repository is cloned to local machine at designated project directory
3. Git remote 'upstream' is configured pointing to gitroomhq/postiz-app
4. Git remote 'origin' is configured pointing to user's forked repository
5. `git remote -v` command displays both origin and upstream remotes correctly
6. Local working directory exists with all Postiz source files present

## Story 1.2: Create Docker Compose Configuration

**As a** DevOps engineer,
**I want** to create a docker-compose.yml file with all required environment variables and service definitions,
**so that** I can deploy the complete Postiz stack with a single command.

### Acceptance Criteria:

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

## Story 1.3: Deploy Postiz Container Stack

**As a** system administrator,
**I want** to start all Postiz Docker containers and verify they reach healthy status,
**so that** the application infrastructure is running and ready for configuration.

### Acceptance Criteria:

1. `docker compose up -d` executes successfully without errors
2. All three containers (postiz, postiz-postgres, postiz-redis) are in "Up" status within 2 minutes
3. PostgreSQL container passes health check (status: healthy)
4. Redis container passes health check (status: healthy)
5. Postiz container logs show "Server running on http://localhost:5000" message
6. `docker compose ps` shows all containers with healthy status
7. No error messages present in container logs (`docker compose logs`)
8. Docker volumes are created and mounted correctly (postgres-volume, postiz-redis-data, postiz-config, postiz-uploads)
9. Port 5000 is accessible and not blocked by firewall

## Story 1.4: Verify Installation and Create Admin Account

**As a** platform administrator,
**I want** to access the Postiz web interface and create an admin account,
**so that** I can manage the platform and configure social media integrations.

### Acceptance Criteria:

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
