# Epic 3: MCP Server Integration & Client Configuration

**Expanded Goal:**
Enable the MCP (Model Context Protocol) server endpoint in Postiz by generating API keys, configure multiple MCP-compatible clients (Claude Desktop, Claude Code, Cursor) to connect to the Postiz MCP server, and verify natural language post creation, scheduling, and management workflows through any connected MCP client. This epic delivers the key differentiator: AI-powered social media management without leaving the development environment.

## Story 3.1: Generate Postiz API Key for MCP Access

**As a** platform administrator,
**I want** to generate a secure API key in Postiz with appropriate scopes for MCP access,
**so that** MCP clients can authenticate and interact with the Postiz API.

### Acceptance Criteria:

1. User logs into Postiz web interface at http://localhost:5000
2. Settings page is accessible from main navigation
3. "Public API" tab is visible and accessible in Settings
4. "Generate New API Key" button is present and functional
5. API key is generated successfully with format `ptz_` followed by random alphanumeric string
6. Generated API key is displayed once and user is warned it cannot be retrieved again
7. API key is securely copied and stored in password manager or secure notes
8. MCP Server URL is displayed in the Public API section with format: `http://localhost:5000/api/mcp/{api_key}/sse`
9. MCP Server URL is copied for use in client configuration
10. API key has required scopes: posts:write, posts:read, analytics:read

## Story 3.2: Configure Claude Desktop MCP Client

**As a** Claude Desktop user,
**I want** to connect Claude Desktop to my Postiz MCP server,
**so that** I can manage social media posts through natural language conversations in Claude.

### Acceptance Criteria:

1. Claude Desktop configuration file location is identified based on OS (macOS: ~/Library/Application Support/Claude/, Linux: ~/.config/Claude/, Windows: %APPDATA%\Claude/)
2. claude_desktop_config.json file is opened in text editor
3. New mcpServers entry is added for "postiz" with correct SSE endpoint URL including API key
4. JSON configuration is valid (proper syntax, commas, brackets, quotes)
5. Configuration includes description field: "Postiz social media scheduling"
6. Claude Desktop is completely quit (not just window closed) using Cmd+Q (macOS) or equivalent
7. Claude Desktop is restarted and fully loads
8. MCP indicator icon appears in bottom-right corner of Claude Desktop input box
9. MCP indicator shows "postiz" server as connected when clicked/hovered
10. Test query in Claude Desktop confirms connection: "Are you connected to Postiz?" returns positive confirmation
11. No error messages appear in Claude Desktop or Postiz container logs

## Story 3.3: Configure Claude Code MCP Client

**As a** developer using Claude Code,
**I want** to connect Claude Code to my Postiz MCP server,
**so that** I can manage social media posts directly from my coding environment without context switching.

### Acceptance Criteria:

1. Claude Code MCP configuration file or settings are accessed
2. Postiz MCP server configuration is added with SSE endpoint URL including API key
3. Configuration is saved and Claude Code is restarted if necessary
4. MCP connection indicator shows Postiz server as connected
5. Test command confirms Claude Code can access Postiz: "Show me my connected social media accounts in Postiz"
6. Claude Code successfully retrieves and displays list of connected platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram)
7. No authentication or connection errors appear

## Story 3.4: Configure Cursor MCP Client (Optional)

**As a** developer using Cursor IDE,
**I want** to connect Cursor to my Postiz MCP server,
**so that** I can manage social media posts from within my IDE during content development.

### Acceptance Criteria:

1. Cursor MCP configuration settings are accessed
2. Postiz MCP server configuration is added with SSE endpoint URL
3. Configuration is saved and Cursor is restarted if necessary
4. MCP connection is verified in Cursor interface
5. Test query confirms Cursor can interact with Postiz API
6. Connected social media accounts are retrievable through Cursor

## Story 3.5: Verify Natural Language Post Creation via MCP

**As a** content creator using an MCP client,
**I want** to create and publish social media posts using natural language commands,
**so that** I can efficiently manage content without switching to the Postiz web interface.

### Acceptance Criteria:

1. MCP client (Claude Desktop, Claude Code, or Cursor) is actively connected to Postiz
2. Natural language command successfully creates immediate post: "Post this to Twitter: 'Testing MCP integration with Postiz! 🚀'"
3. Postiz receives the request and creates the post
4. Post is successfully published to Twitter
5. MCP client returns confirmation with post ID and status
6. Post is visible in Twitter web interface within 1 minute
7. Post appears in Postiz dashboard with correct timestamp and platform
8. Draft post creation works: "Create a draft post for LinkedIn: 'Excited to share our new MCP integration!'"
9. Draft post is created but not published, visible in Postiz dashboard as "Draft" status
10. Multi-platform posting works: "Post this to Twitter, LinkedIn, and Facebook: 'Multi-platform posting via MCP! 🎉'"
11. All three platforms receive and publish the post successfully

## Story 3.6: Verify Post Scheduling via MCP

**As a** social media manager using an MCP client,
**I want** to schedule posts for future publication using natural language time specifications,
**so that** I can plan content distribution without manual scheduling in the web UI.

### Acceptance Criteria:

1. Scheduled post is created via natural language: "Schedule this tweet for tomorrow at 9 AM: 'Good morning! Starting the day with productivity tips.'"
2. MCP client parses the time specification correctly (tomorrow at 9 AM)
3. Postiz creates scheduled post with correct future timestamp
4. MCP client returns confirmation with post ID, scheduled time, and platform
5. Scheduled post appears in Postiz Calendar view with correct date and time
6. Post status shows as "Scheduled" in Postiz dashboard
7. Relative time scheduling works: "Schedule a LinkedIn post for 2 hours from now: 'Breaking news announcement!'"
8. List scheduled posts command works: "Show me all my scheduled posts in Postiz"
9. MCP client returns list of scheduled posts with IDs, platforms, content preview, and scheduled times
10. Cancel scheduled post works: "Cancel the post scheduled for tomorrow at 9 AM on Twitter"
11. Cancelled post is removed from Postiz Calendar and no longer appears in scheduled posts list

## Story 3.7: Verify Analytics and Account Management via MCP

**As a** social media analyst using an MCP client,
**I want** to retrieve analytics and account information through natural language queries,
**so that** I can monitor performance without opening the Postiz dashboard.

### Acceptance Criteria:

1. Account listing command works: "Show me all my connected social media accounts in Postiz"
2. MCP client returns complete list with platform names, usernames/handles, and connection status
3. Analytics query works: "Show me analytics for my last 10 Twitter posts"
4. MCP client retrieves and displays post performance data including impressions, likes, retweets, replies
5. Platform-specific analytics work: "What's the engagement rate on my recent LinkedIn posts?"
6. MCP client calculates and returns engagement metrics based on Postiz analytics data
7. Scheduled posts summary works: "How many posts do I have scheduled this week?"
8. MCP client returns count of scheduled posts grouped by platform and day
9. All queries complete within 5 seconds under normal conditions
10. Error messages are clear and actionable if queries fail (e.g., "No analytics data available for this post yet")

---
