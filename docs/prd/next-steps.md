# Next Steps

## UX Expert Prompt

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

## Architect Prompt

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
