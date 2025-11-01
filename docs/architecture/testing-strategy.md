# Testing Strategy

## Testing Pyramid

```
E2E Tests (Manual)
/          \
Integration Tests (OAuth, MCP)
/                              \
Deployment Verification    Operational Tests
```

## Test Organization

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
