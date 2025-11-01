# Development Workflow

## Prerequisites

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

## Initial Setup

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

## Development Commands

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

## Environment Configuration

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
