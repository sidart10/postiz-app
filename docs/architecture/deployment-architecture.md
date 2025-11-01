# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**

- **Platform:** Bundled with Backend (Next.js serves both)
- **Build Process:** Pre-built in Docker image
- **CDN/Edge:** None initially (localhost), Nginx for production

**Backend Deployment:**

- **Platform:** Docker container on localhost
- **Deployment Method:** Docker Compose orchestration
- **Scaling Method:** Split via `POSTIZ_APPS` environment variable

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|-------------|-------------|---------|
| **Development** | http://localhost:5000 | http://localhost:5000/api | Local testing |
| **Staging** | https://staging.domain.com | https://staging.domain.com/api | Pre-production |
| **Production** | https://postiz.domain.com | https://postiz.domain.com/api | Live system |

## CI/CD Pipeline

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
