# Epic 4: Production Readiness & Maintenance

**Expanded Goal:**
Implement automated backup procedures for PostgreSQL database, configuration files, and uploaded media, establish monitoring and logging practices for operational visibility, document comprehensive troubleshooting procedures for common issues, and validate the complete end-to-end workflow from OAuth configuration through MCP-based posting. This epic delivers production-grade reliability and operational sustainability for long-term Postiz usage.

## Story 4.1: Create Automated Backup Script

**As a** system administrator,
**I want** an automated backup script for all critical Postiz data,
**so that** I can recover from data loss, corruption, or accidental deletion.

### Acceptance Criteria:

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

## Story 4.2: Schedule Automated Daily Backups

**As a** system administrator,
**I want** backups to run automatically on a daily schedule,
**so that** I have consistent recovery points without manual intervention.

### Acceptance Criteria:

1. Crontab entry is created for daily backup execution at 3:00 AM local time
2. Cron syntax is correct: `0 3 * * * ~/postiz-deployment/backup.sh`
3. Crontab is installed using `crontab -e` command
4. Cron service is verified as running on the system
5. Backup script executes successfully when triggered by cron (test with adjusted time)
6. Backup logs are captured (optional: redirect stdout/stderr to log file)
7. Backup archives accumulate over 7 days showing daily execution
8. Disk space usage is monitored to ensure backups don't exhaust storage
9. Failed backup notifications are documented (optional: email alerts on failure)

## Story 4.3: Implement Monitoring and Logging Practices

**As a** DevOps engineer,
**I want** to monitor container health and review logs for troubleshooting,
**so that** I can proactively identify and resolve issues before they impact users.

### Acceptance Criteria:

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

## Story 4.4: Document Troubleshooting Procedures

**As a** support engineer,
**I want** comprehensive troubleshooting documentation for common issues,
**so that** I can quickly diagnose and resolve problems without escalation.

### Acceptance Criteria:

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

## Story 4.5: Validate End-to-End Workflow

**As a** product owner,
**I want** to execute a complete end-to-end workflow validation,
**so that** I can confirm all epic deliverables are integrated and functioning correctly.

### Acceptance Criteria:

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

## Story 4.6: Create Operations Runbook

**As a** system administrator,
**I want** a comprehensive operations runbook,
**so that** I have reference documentation for routine maintenance, updates, and operational tasks.

### Acceptance Criteria:

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
