# Requirements

## Functional Requirements

**FR1:** The system shall fork the Postiz repository (github.com/gitroomhq/postiz-app) to a user-controlled GitHub account for independent version control and customization

**FR2:** The system shall deploy Postiz locally using Docker Compose with PostgreSQL, Redis, and the Postiz application container running on port 5000

**FR3:** The system shall support OAuth 2.0 authentication configuration for multiple social media platforms including Twitter/X, LinkedIn, YouTube, Facebook, Instagram, TikTok, Reddit, Pinterest, Threads, Mastodon, Discord, and Slack

**FR4:** The system shall expose an MCP server endpoint at `/api/mcp/{api_key}/sse` using Server-Sent Events (SSE) transport protocol

**FR5:** The system shall allow any MCP-compatible client (Claude Desktop, Claude Code, Cursor, custom agentic frameworks) to connect and interact with the Postiz API through the MCP protocol

**FR6:** The system shall enable users to create, schedule, and publish social media posts to connected platforms via MCP natural language commands

**FR7:** The system shall support multi-platform posting, allowing a single post to be published simultaneously to multiple social media accounts

**FR8:** The system shall provide post scheduling capabilities with specific date/time targeting and recurring post options

**FR9:** The system shall support media uploads (images, videos) for social media posts through both the web UI and MCP interface

**FR10:** The system shall track and display analytics for published posts including engagement metrics across all connected platforms

**FR11:** The system shall provide a web-based admin interface accessible at localhost:5000 for account management, platform connections, and post monitoring

**FR12:** The system shall generate and manage API keys with configurable scopes (posts:write, posts:read, analytics:read) for MCP server authentication

**FR13:** The system shall support draft post creation, allowing posts to be saved without immediate publication

**FR14:** The system shall implement automated backup procedures for PostgreSQL database, configuration files, and uploaded media

**FR15:** The system shall integrate with OpenAI API (optional) for AI-powered content generation and suggestion features

## Non-Functional Requirements

**NFR1:** The system shall start all Docker containers and reach healthy status within 2 minutes of running `docker compose up -d`

**NFR2:** The system shall consume no more than 2.5GB RAM and 2 vCPUs under normal operation to support deployment on minimal hardware

**NFR3:** The MCP server shall respond to API requests within 3 seconds under normal load conditions

**NFR4:** The system shall store all sensitive credentials (JWT secrets, API keys, OAuth tokens) using environment variables and Docker secrets, never in plain text files

**NFR5:** The system shall maintain 99% uptime for core posting and scheduling functionality when properly deployed with Docker restart policies

**NFR6:** The system shall persist all data (database, uploads, configuration) using Docker volumes to survive container restarts

**NFR7:** The system shall support deployment on macOS, Linux, and Windows (with WSL2) Docker environments without platform-specific modifications

**NFR8:** The system shall implement proper health checks for PostgreSQL and Redis containers to prevent cascade failures

**NFR9:** The system shall log all MCP API requests and errors to stdout for debugging and monitoring purposes

**NFR10:** The system shall retain backup archives for at least 7 days with automated cleanup of older backups

**NFR11:** The system shall support SSL/TLS configuration for production deployment scenarios through reverse proxy integration

**NFR12:** The OAuth callback URLs shall be configurable to support both local development (http://localhost:5000) and production deployment (https://domain.com)

---
