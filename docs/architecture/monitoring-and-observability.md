# Monitoring and Observability

## Monitoring Stack

**Current (MVP):**

- **Frontend:** Browser DevTools
- **Backend:** Docker logs
- **Error Tracking:** Console logging
- **Performance:** Docker stats

**Production (Future):**

- **Frontend:** Sentry
- **Backend:** Prometheus + Grafana
- **Error Tracking:** Sentry
- **Performance:** UptimeRobot

## Key Metrics

**Frontend Metrics:**

- Core Web Vitals (LCP, FID, CLS)
- JavaScript errors
- API response times
- User interactions

**Backend Metrics:**

- Request rate (RPS)
- Error rate (%)
- Response time (p50, p95, p99)
- Concurrent connections

**Database Metrics:**

- Query count
- Slow queries (> 500ms)
- Connection pool usage
- Deadlocks

**BullMQ Metrics:**

- Job throughput
- Job latency
- Job failure rate
- Queue depth

## Monitoring Implementation

**Health Check Script:**

```bash
#!/bin/bash
# deployment/scripts/health-check.sh

echo "Postiz Health Check"
echo "==================="

# Container health
docker compose ps | grep -q "Up" && echo "✅ Containers: UP" || echo "❌ Containers: DOWN"

# Service health
curl -s http://localhost:5000/api/health | grep -q "ok" && echo "✅ API: Healthy" || echo "❌ API: Unhealthy"
docker compose exec -T postiz-postgres pg_isready -U postiz > /dev/null && echo "✅ PostgreSQL: UP" || echo "❌ PostgreSQL: DOWN"
docker compose exec -T postiz-redis redis-cli ping > /dev/null && echo "✅ Redis: UP" || echo "❌ Redis: DOWN"

# Resource usage
cpu=$(docker stats --no-stream --format "{{.CPUPerc}}" postiz | sed 's/%//')
mem=$(docker stats --no-stream --format "{{.MemUsage}}" postiz | awk '{print $1}')
disk=$(df / | tail -1 | awk '{print $5}')

echo ""
echo "Resource Usage: CPU ${cpu}%, Memory ${mem}, Disk ${disk}"
```

**Automated Monitoring (Cron):**

```bash
# Run every 5 minutes
*/5 * * * * /opt/postiz-deployment/scripts/health-check.sh
```

## Alert Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| **CPU Usage** | > 70% for 5 min | > 90% for 2 min | Scale up |
| **Memory Usage** | > 80% | > 95% | Restart, increase limit |
| **Disk Usage** | > 80% | > 90% | Clean backups |
| **API Response** | p95 > 1s | p95 > 3s | Investigate |
| **Error Rate** | > 5% | > 15% | Check logs |
| **Container Restarts** | > 2 in 1 hour | > 5 in 1 hour | Investigate crash |

---

**End of Architecture Document**
