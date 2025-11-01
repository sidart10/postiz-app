# Goals and Background Context

## Goals

- Deploy a self-hosted Postiz instance locally using Docker Compose for complete control over social media management
- Configure OAuth integration for priority social media platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram)
- Enable MCP (Model Context Protocol) server integration with any MCP-compatible client (Claude Desktop, Claude Code, Cursor, or any agentic framework) for natural language social media management
- Establish automated backup and maintenance procedures for production reliability
- Achieve cost-effective social media scheduling ($0 ongoing costs vs. paid alternatives like Buffer/Hypefury)
- Support 18+ social media platforms through a single unified interface
- Enable AI-powered content generation and scheduling workflows

## Success Criteria

The deployment is considered successful when:

1. **Deployment Speed:** Complete stack deployed and healthy in < 2 hours (NFR1: < 2 minutes for containers)
2. **Platform Coverage:** Successfully connected and posted to ≥ 3 social media platforms
3. **MCP Integration:** At least 1 MCP client successfully creates and schedules posts via natural language
4. **Performance:** MCP API responses < 3 seconds (NFR3)
5. **Reliability:** 7 consecutive days of successful automated backups
6. **Resource Efficiency:** System operates within 2.5GB RAM, 2 vCPUs (NFR2)

## Background Context

This project addresses the need for a self-hosted, privacy-focused social media management solution that integrates seamlessly with AI development workflows. The existing Postiz open-source platform (24.1k GitHub stars) provides enterprise-grade scheduling, queue management, and multi-platform support that would take 2-3 weeks to build custom. By deploying Postiz with MCP integration, we gain immediate access to professional social media management capabilities directly from Claude Desktop, eliminating context switching and enabling AI-assisted content workflows. The deployment plan leverages Docker Compose for infrastructure simplicity and includes comprehensive OAuth configuration for secure platform connections.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-28 | 0.1 | Initial PRD creation | John (PM Agent) |
| 2025-10-28 | 0.2 | Added Success Criteria, Out of Scope, Checklist Results | John (PM Agent) |
| 2025-10-28 | 0.3 | Added Archon project integration with 22 task mappings | John (PM Agent) |

---
