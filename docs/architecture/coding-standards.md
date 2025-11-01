# Coding Standards

## Critical Fullstack Rules

- **No Hardcoded Credentials:** All secrets in .env, never in Git
- **Environment Variable Access:** Centralized configuration, never direct `process.env`
- **Docker Volume Paths:** Persistent data uses Docker volumes
- **Backup Before Modify:** Always backup before destructive operations
- **Health Check Dependency:** All services have health checks
- **API Key Format:** `ptz_{32+ chars}`, SHA-256 hashed
- **OAuth Callback URLs:** Pattern: `{BASE_URL}/api/auth/{platform}/callback`
- **Timestamp Consistency:** UTC timezone, ISO 8601 format
- **Container Restart Policy:** `restart: unless-stopped` in production

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| **Docker Services** | kebab-case with prefix | `postiz-postgres` |
| **Docker Volumes** | kebab-case with prefix | `postiz-postgres-data` |
| **Environment Variables** | UPPER_SNAKE_CASE | `JWT_SECRET` |
| **Bash Scripts** | kebab-case.sh | `backup.sh` |
| **Config Files** | kebab-case.ext | `docker-compose.yml` |
| **Backup Archives** | prefix-YYYYMMDD-HHMMSS | `postiz-20251028-140000.tar.gz` |

---
