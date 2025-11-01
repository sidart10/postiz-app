# Unified Project Structure

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

## docker-compose.yml

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
