# Postiz MCP Server Integration Guide

**Date:** October 28, 2025
**Purpose:** Complete guide to integrate Postiz with Claude Desktop using MCP protocol
**Audience:** Developers setting up local MCP server

---

## 🎯 What is MCP Integration?

The Model Context Protocol (MCP) allows Claude Desktop and Cursor to communicate directly with your Postiz instance, enabling you to:

- Schedule social media posts from your chat
- Manage posting calendar
- View analytics
- Control all 18+ supported platforms
- Automate content workflows

**Key Benefit:** Manage social media without leaving your development environment.

---

## 🏗️ Architecture Overview

```
Claude Desktop / Cursor
        ↓
   MCP Protocol (SSE)
        ↓
Postiz API Server (localhost:5000)
        ↓
   BullMQ Queue (Redis)
        ↓
 Platform APIs (Twitter, LinkedIn, etc.)
```

**Transport:** Server-Sent Events (SSE)
**Authentication:** API Key
**Protocol:** HTTP/HTTPS

---

## 📋 Prerequisites

Before setting up MCP integration, ensure:

- ✅ Postiz is deployed and running (http://localhost:5000)
- ✅ At least one social media platform connected
- ✅ Admin account created in Postiz
- ✅ Claude Desktop installed (or Cursor)
- ✅ Docker containers healthy

**Verify Postiz is Running:**

```bash
# Check container status
docker compose ps

# Test API endpoint
curl http://localhost:5000/api/health

# Should return: {"status":"ok"}
```

---

## 🔑 Step 1: Generate Postiz API Key

### Via Web Interface

1. **Log into Postiz:**
   - Open http://localhost:5000
   - Sign in with your admin account

2. **Navigate to Public API:**
   - Click Settings (gear icon)
   - Select "Public API" tab

3. **Generate API Key:**
   - Click "Generate New API Key"
   - Copy the key (format: `ptz_xxxxx...`)
   - **Store securely** - you won't be able to see it again!

4. **Copy MCP Server URL:**
   - In the "MCP Server" section
   - Copy the full URL shown
   - Format: `http://localhost:5000/api/mcp/[YOUR_KEY]/sse`

### Via API (Alternative)

```bash
# If you prefer API approach
curl -X POST http://localhost:5000/api/keys \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"MCP Integration","scopes":["posts:write","posts:read","analytics:read"]}'
```

---

## 🔧 Step 2: Configure Claude Desktop

### Locate Configuration File

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```bash
~/.config/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

### Quick Access

**macOS:**
```bash
# Open config file
open ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Or open folder in Finder
open ~/Library/Application\ Support/Claude/
```

**Linux:**
```bash
# Edit with nano
nano ~/.config/Claude/claude_desktop_config.json

# Or with VSCode
code ~/.config/Claude/claude_desktop_config.json
```

**Windows:**
```powershell
# Open with notepad
notepad %APPDATA%\Claude\claude_desktop_config.json
```

---

## 📝 Step 3: Add MCP Configuration

### Basic Configuration

Edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "postiz": {
      "url": "http://localhost:5000/api/mcp/ptz_your_api_key_here/sse",
      "description": "Postiz social media scheduling"
    }
  }
}
```

### Configuration with Multiple MCP Servers

If you have other MCP servers configured:

```json
{
  "mcpServers": {
    "postiz": {
      "url": "http://localhost:5000/api/mcp/ptz_your_api_key_here/sse",
      "description": "Postiz social media scheduling"
    },
    "other-server": {
      "url": "http://localhost:3001/mcp",
      "description": "Another MCP server"
    }
  }
}
```

### Configuration with Custom Timeout

For slower networks or large uploads:

```json
{
  "mcpServers": {
    "postiz": {
      "url": "http://localhost:5000/api/mcp/ptz_your_api_key_here/sse",
      "description": "Postiz social media scheduling",
      "timeout": 60000
    }
  }
}
```

### ⚠️ Important Configuration Notes

1. **Replace `ptz_your_api_key_here`** with your actual API key from Step 1
2. **No trailing slash** in the URL
3. **Use `/sse` endpoint** for Server-Sent Events transport
4. **Keep it JSON valid** - watch commas and brackets
5. **Use double quotes** not single quotes

---

## 🔄 Step 4: Restart Claude Desktop

### Complete Restart Required

MCP servers are only loaded at startup, so you must:

1. **Quit Claude Desktop completely:**
   - macOS: Cmd + Q (not just close window)
   - Windows: Right-click taskbar → Exit
   - Linux: Ensure all processes terminated

2. **Verify it's closed:**
   ```bash
   # macOS/Linux
   ps aux | grep -i claude

   # Should return nothing (except grep itself)
   ```

3. **Restart Claude Desktop:**
   - Open normally from Applications
   - Wait for full startup

4. **Check MCP Indicator:**
   - Look for MCP icon in bottom-right of input box
   - Should show "🔌" or similar indicator
   - Hover to see connected servers

---

## ✅ Step 5: Verify MCP Connection

### Visual Verification

**In Claude Desktop, look for:**

1. **MCP Indicator:**
   - Bottom-right of message input
   - Shows connected server count
   - Green/active status

2. **Available Tools:**
   - Click MCP indicator
   - Should list "postiz" server
   - Shows available tools/capabilities

### Test Basic Connection

Ask Claude:

```
Are you connected to Postiz?
```

**Expected Response:**
> Yes, I'm connected to your Postiz instance. I can help you schedule posts, manage your social media accounts, and view analytics.

### Test Account Listing

```
Show me my connected social media accounts in Postiz
```

**Expected Response:**
> Your Postiz instance has the following accounts connected:
> - Twitter: @your_username
> - LinkedIn: Your Name
> - YouTube: Your Channel

### Test Simple Post Creation

```
Create a draft post for Twitter: "Testing MCP integration! 🚀"
```

**Expected Response:**
> I've created a draft post in Postiz with the content "Testing MCP integration! 🚀"
> - Platform: Twitter
> - Status: Draft
> - Post ID: post_xxxxx
> You can review and publish it from the Postiz dashboard.

---

## 🎯 Step 6: Advanced Usage Examples

### Example 1: Schedule Single Post

```
Schedule this tweet for tomorrow at 9 AM:
"Good morning! Starting the day with some productivity tips.
1. Plan your day
2. Take breaks
3. Stay focused
#ProductivityTips"
```

### Example 2: Multi-Platform Post

```
Post this to Twitter, LinkedIn, and Facebook:
"Excited to announce our new feature launch! 🎉
Check it out at example.com/new-feature"
```

### Example 3: Schedule with Media

```
Schedule a LinkedIn post for next Monday at 10 AM with the image at ~/Desktop/product-launch.png:
"Thrilled to introduce our latest innovation! Learn more about how this will transform your workflow."
```

### Example 4: Recurring Posts

```
Set up a recurring daily tweet at 8 AM:
"Good morning! Have a productive day ahead! 🌅"
```

### Example 5: View Scheduled Posts

```
Show me all posts scheduled for this week
```

### Example 6: Cancel Scheduled Post

```
Cancel the post scheduled for tomorrow at 9 AM on Twitter
```

### Example 7: Analytics Query

```
Show me the analytics for my last 10 Twitter posts
```

### Example 8: Bulk Scheduling

```
Schedule these posts for Twitter, one per day at 9 AM starting tomorrow:

Day 1: "Tip #1: Start your day with a clear plan"
Day 2: "Tip #2: Take regular breaks to stay fresh"
Day 3: "Tip #3: Eliminate distractions during focus time"
Day 4: "Tip #4: Review your progress daily"
Day 5: "Tip #5: Celebrate small wins"
```

---

## 🐛 Troubleshooting

### Issue: MCP Indicator Not Showing

**Possible Causes & Solutions:**

1. **Configuration File Invalid:**
   ```bash
   # Validate JSON syntax
   python3 -m json.tool ~/Library/Application\ Support/Claude/claude_desktop_config.json

   # Should not show errors
   ```

2. **Claude Not Fully Restarted:**
   ```bash
   # Force quit all Claude processes (macOS)
   killall Claude

   # Then restart normally
   ```

3. **Wrong File Location:**
   - Verify you edited the correct file
   - Check for backup files like `claude_desktop_config.json.bak`

### Issue: "Cannot Connect to Postiz"

**Solutions:**

1. **Check Postiz is Running:**
   ```bash
   docker compose ps
   curl http://localhost:5000/api/health
   ```

2. **Verify API Key:**
   - Check it's correctly copied
   - No extra spaces or characters
   - Format: `ptz_xxxxx...`

3. **Test API Directly:**
   ```bash
   curl http://localhost:5000/api/mcp/ptz_your_key_here/sse

   # Should open SSE connection
   ```

### Issue: "Permission Denied" or 401 Error

**Solutions:**

1. **Regenerate API Key:**
   - Go to Postiz Settings → Public API
   - Delete old key
   - Generate new key
   - Update config

2. **Check Key Permissions:**
   - Ensure key has required scopes
   - Verify key hasn't expired

### Issue: "Timeout" or Slow Responses

**Solutions:**

1. **Increase Timeout:**
   ```json
   {
     "mcpServers": {
       "postiz": {
         "url": "...",
         "timeout": 120000
       }
     }
   }
   ```

2. **Check Network:**
   ```bash
   # Test latency
   time curl http://localhost:5000/api/health
   ```

3. **Check Docker Resources:**
   ```bash
   docker stats postiz

   # Ensure CPU/Memory not maxed out
   ```

### Issue: MCP Connected but Commands Don't Work

**Solutions:**

1. **Check Postiz Logs:**
   ```bash
   docker compose logs -f postiz

   # Look for errors when running commands
   ```

2. **Verify Platforms Connected:**
   - Log into Postiz web UI
   - Check Settings → Integrations
   - Ensure platforms are authorized

3. **Test via Web UI:**
   - Try creating post manually
   - If that fails, issue is with Postiz not MCP

---

## 🔒 Security Best Practices

### API Key Management

**DO:**
- ✅ Store API keys securely
- ✅ Use different keys for different purposes
- ✅ Rotate keys regularly (monthly)
- ✅ Revoke unused keys
- ✅ Limit key permissions to minimum required

**DON'T:**
- ❌ Share API keys publicly
- ❌ Commit keys to git repositories
- ❌ Use same key across multiple systems
- ❌ Give keys excessive permissions

### Network Security

1. **For Local Development:**
   ```
   ✅ Use http://localhost:5000 (OK for local)
   ```

2. **For Production:**
   ```
   ✅ Use https://postiz.yourdomain.com
   ✅ Configure SSL certificate
   ✅ Set NOT_SECURED=false
   ✅ Use firewall rules
   ```

### Access Control

1. **Limit MCP Access:**
   - Create dedicated user for MCP
   - Assign minimal required permissions
   - Don't use admin account for API

2. **Monitor Usage:**
   - Review API logs regularly
   - Set up alerts for unusual activity
   - Check connected sessions

---

## 📊 MCP Performance Optimization

### Optimize API Response Times

1. **Database Indexing:**
   ```sql
   -- Add if missing (check Postiz source)
   CREATE INDEX IF NOT EXISTS idx_posts_scheduled_at
   ON posts(scheduled_at) WHERE status = 'scheduled';
   ```

2. **Redis Configuration:**
   ```bash
   # Increase maxmemory if needed
   docker exec -it postiz-redis redis-cli CONFIG SET maxmemory 512mb
   ```

3. **Postiz Worker Scaling:**
   ```yaml
   # In docker-compose.yml
   postiz-worker:
     image: ghcr.io/gitroomhq/postiz-app:latest
     environment:
       POSTIZ_APPS: "worker"
     deploy:
       replicas: 2  # Scale workers
   ```

---

## 🔄 Updating MCP Configuration

### Change API Key

1. Generate new key in Postiz
2. Update `claude_desktop_config.json`
3. Restart Claude Desktop
4. Test connection

### Add Rate Limiting

```json
{
  "mcpServers": {
    "postiz": {
      "url": "http://localhost:5000/api/mcp/ptz_your_key/sse",
      "rateLimit": {
        "requests": 100,
        "period": 60000
      }
    }
  }
}
```

### Enable Debug Logging

```json
{
  "mcpServers": {
    "postiz": {
      "url": "http://localhost:5000/api/mcp/ptz_your_key/sse",
      "debug": true
    }
  }
}
```

---

## 🎓 Advanced Integration Patterns

### Pattern 1: Content from Notion → Postiz

```
Read my Notion page "Content Calendar" and schedule all posts for next week to appropriate platforms
```

### Pattern 2: GitHub Activity → Social Posts

```
Check my GitHub activity today and create a summary post for LinkedIn
```

### Pattern 3: Analytics-Driven Posting

```
Analyze my last 20 Twitter posts, identify best-performing times, and schedule my next post accordingly
```

### Pattern 4: Multi-Step Workflow

```
1. Generate a motivational quote using AI
2. Create an image with the quote
3. Schedule it to Instagram for tomorrow at 9 AM
```

---

## 📈 Monitoring MCP Usage

### View API Usage

```bash
# Check Postiz logs for API calls
docker compose logs postiz | grep "api/mcp"

# Count MCP requests today
docker compose logs --since 24h postiz | grep "api/mcp" | wc -l
```

### Monitor Performance

```bash
# Watch real-time stats
docker stats postiz

# Check response times
docker compose logs postiz | grep "api/mcp" | grep "duration"
```

---

## 🚀 Production Deployment Considerations

### Use HTTPS

```json
{
  "mcpServers": {
    "postiz": {
      "url": "https://postiz.yourdomain.com/api/mcp/ptz_your_key/sse"
    }
  }
}
```

### Use Reverse Proxy

Example Nginx config:

```nginx
server {
    listen 443 ssl;
    server_name postiz.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location /api/mcp/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
}
```

### Firewall Configuration

```bash
# Allow only local MCP access
sudo ufw allow from 127.0.0.1 to any port 5000

# Or specific IP ranges for remote clients
sudo ufw allow from 192.168.1.0/24 to any port 5000
```

---

## 📞 Support & Resources

### Official Documentation
- **Postiz Docs:** https://docs.postiz.com
- **MCP Protocol:** https://modelcontextprotocol.io
- **Claude Desktop Help:** https://support.claude.com

### Community Support
- **Postiz Discord:** (link in GitHub README)
- **GitHub Issues:** https://github.com/gitroomhq/postiz-app/issues

### Your Local Docs
- **Evaluation:** `/docs/postiz-eval.md`
- **Deployment Plan:** `/docs/deployment-plan.md`
- **This Guide:** `/docs/mcp-integration-guide.md`

---

## ✅ Integration Checklist

- [ ] Postiz deployed and running
- [ ] Admin account created
- [ ] Social platforms connected
- [ ] API key generated
- [ ] API key stored securely
- [ ] `claude_desktop_config.json` updated
- [ ] Claude Desktop restarted
- [ ] MCP indicator visible
- [ ] Connection test successful
- [ ] First post created via MCP
- [ ] Scheduled post verified
- [ ] Analytics query tested
- [ ] Documentation reviewed

---

## 🎉 Success!

Once all checklist items are complete, you have:

✅ **Working MCP integration** between Claude Desktop and Postiz
✅ **Command-line social media management** without leaving your dev environment
✅ **Automated posting workflows** accessible via natural language
✅ **Complete control** over your social media presence

**You can now manage your entire social media presence directly from Claude!** 🚀

---

**Next:** Test the advanced usage examples and explore automation possibilities!
