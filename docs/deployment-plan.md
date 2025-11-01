# Postiz Fork & Deploy Plan with MCP Integration

**Date:** October 28, 2025
**Objective:** Fork Postiz, deploy locally, configure for target platforms, and integrate MCP server
**Timeline:** 2-3 days
**Status:** Ready to Execute

---

## 🎯 Executive Summary

This plan outlines the complete process to:
1. Fork the Postiz repository to your GitHub account
2. Deploy Postiz locally using Docker Compose
3. Configure OAuth for target social media platforms
4. Set up MCP server integration for Claude Desktop
5. Test the complete workflow

**Key Benefits:**
- ✅ Self-hosted social media scheduling
- ✅ Support for 18+ platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram, TikTok, etc.)
- ✅ MCP integration for Claude Desktop/Cursor
- ✅ Complete control over your data
- ✅ Zero ongoing costs

---

## 📋 Prerequisites

### System Requirements
- **OS:** macOS, Linux, or Windows with WSL2
- **RAM:** Minimum 2GB available
- **CPU:** 2 vCPUs
- **Disk:** 5GB free space
- **Software:**
  - Docker Desktop (latest version)
  - Docker Compose v2+
  - Git
  - Text editor (VSCode recommended)

### API Credentials Needed
Gather OAuth credentials for platforms you want to support:
- **Twitter/X:** API Key & Secret
- **LinkedIn:** Client ID & Secret
- **YouTube:** Client ID & Secret
- **Facebook:** App ID & Secret
- **Instagram:** (via Facebook)
- **TikTok:** Client ID & Secret
- **Others:** See full list in configuration section

---

## 🚀 Phase 1: Fork & Setup (30 minutes)

### Step 1.1: Fork the Repository

```bash
# Go to GitHub and fork the repository
# Visit: https://github.com/gitroomhq/postiz-app
# Click "Fork" button (top right)
# Select your account as the destination
```

### Step 1.2: Clone Your Fork

```bash
# Clone to your local machine
cd ~/Desktop/4.\ Coding\ Projects/
git clone https://github.com/YOUR_USERNAME/postiz-app.git postiz-fork
cd postiz-fork

# Add upstream remote for updates
git remote add upstream https://github.com/gitroomhq/postiz-app.git

# Verify remotes
git remote -v
```

### Step 1.3: Create Working Directory Structure

```bash
# Create deployment directory
mkdir -p ~/postiz-deployment
cd ~/postiz-deployment

# Create required subdirectories
mkdir -p config
mkdir -p uploads
mkdir -p backups
```

---

## 🐳 Phase 2: Docker Deployment (1-2 hours)

### Step 2.1: Create docker-compose.yml

Create file at `~/postiz-deployment/docker-compose.yml`:

```yaml
services:
  postiz:
    image: ghcr.io/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: always
    environment:
      # === Required Core Settings ===
      MAIN_URL: "http://localhost:5000"
      FRONTEND_URL: "http://localhost:5000"
      NEXT_PUBLIC_BACKEND_URL: "http://localhost:5000/api"
      JWT_SECRET: "CHANGE_ME_TO_RANDOM_STRING_MIN_32_CHARS"
      DATABASE_URL: "postgresql://postiz-user:postiz-password@postiz-postgres:5432/postiz-db-local"
      REDIS_URL: "redis://postiz-redis:6379"
      BACKEND_INTERNAL_URL: "http://localhost:3000"
      IS_GENERAL: "true"

      # === Security Settings ===
      # Set to true for local dev without HTTPS
      NOT_SECURED: "true"
      DISABLE_REGISTRATION: "false"

      # === Storage Settings ===
      STORAGE_PROVIDER: "local"
      UPLOAD_DIRECTORY: "/uploads"
      NEXT_PUBLIC_UPLOAD_DIRECTORY: "/uploads"

      # === Social Media API Settings ===
      # Twitter/X
      X_API_KEY: ""
      X_API_SECRET: ""

      # LinkedIn
      LINKEDIN_CLIENT_ID: ""
      LINKEDIN_CLIENT_SECRET: ""

      # YouTube
      YOUTUBE_CLIENT_ID: ""
      YOUTUBE_CLIENT_SECRET: ""

      # Facebook & Instagram
      FACEBOOK_APP_ID: ""
      FACEBOOK_APP_SECRET: ""

      # TikTok
      TIKTOK_CLIENT_ID: ""
      TIKTOK_CLIENT_SECRET: ""

      # Reddit
      REDDIT_CLIENT_ID: ""
      REDDIT_CLIENT_SECRET: ""

      # Threads
      THREADS_APP_ID: ""
      THREADS_APP_SECRET: ""

      # Pinterest
      PINTEREST_CLIENT_ID: ""
      PINTEREST_CLIENT_SECRET: ""

      # Mastodon
      MASTODON_URL: "https://mastodon.social"
      MASTODON_CLIENT_ID: ""
      MASTODON_CLIENT_SECRET: ""

      # Discord
      DISCORD_CLIENT_ID: ""
      DISCORD_CLIENT_SECRET: ""
      DISCORD_BOT_TOKEN_ID: ""

      # Slack
      SLACK_ID: ""
      SLACK_SECRET: ""
      SLACK_SIGNING_SECRET: ""

      # === Optional AI Settings ===
      OPENAI_API_KEY: ""

      # === Misc Settings ===
      API_LIMIT: 30
      NX_ADD_PLUGINS: false

    volumes:
      - postiz-config:/config/
      - postiz-uploads:/uploads/
    ports:
      - "5000:5000"
    networks:
      - postiz-network
    depends_on:
      postiz-postgres:
        condition: service_healthy
      postiz-redis:
        condition: service_healthy

  postiz-postgres:
    image: postgres:17-alpine
    container_name: postiz-postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: postiz-password
      POSTGRES_USER: postiz-user
      POSTGRES_DB: postiz-db-local
    volumes:
      - postgres-volume:/var/lib/postgresql/data
    networks:
      - postiz-network
    healthcheck:
      test: pg_isready -U postiz-user -d postiz-db-local
      interval: 10s
      timeout: 3s
      retries: 3

  postiz-redis:
    image: redis:7.2
    container_name: postiz-redis
    restart: always
    healthcheck:
      test: redis-cli ping
      interval: 10s
      timeout: 3s
      retries: 3
    volumes:
      - postiz-redis-data:/data
    networks:
      - postiz-network

volumes:
  postgres-volume:
    external: false
  postiz-redis-data:
    external: false
  postiz-config:
    external: false
  postiz-uploads:
    external: false

networks:
  postiz-network:
    external: false
```

### Step 2.2: Generate JWT Secret

```bash
# Generate a secure random string for JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use this alternative:
openssl rand -hex 32

# Copy the output and replace JWT_SECRET in docker-compose.yml
```

### Step 2.3: Start Postiz

```bash
cd ~/postiz-deployment

# Start all services
docker compose up -d

# Watch the logs for startup
docker compose logs -f postiz

# Wait for this message:
# "Server running on http://localhost:5000"
```

### Step 2.4: Verify Installation

```bash
# Check all containers are running
docker compose ps

# Expected output:
# NAME               STATUS          PORTS
# postiz            Up             0.0.0.0:5000->5000/tcp
# postiz-postgres   Up (healthy)   5432/tcp
# postiz-redis      Up (healthy)   6379/tcp

# Test the web interface
open http://localhost:5000
```

---

## 🔐 Phase 3: Platform Configuration (2-4 hours)

### Step 3.1: Create Postiz Admin Account

1. Open http://localhost:5000
2. Click "Sign Up"
3. Create your admin account
4. Verify email (if configured)

### Step 3.2: Configure Twitter/X

**Get API Credentials:**

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create a new project/app
3. Generate API Key & Secret
4. Set callback URL: `http://localhost:5000/api/auth/twitter/callback`
5. Enable OAuth 1.0a

**Update docker-compose.yml:**

```bash
# Stop services
docker compose down

# Edit docker-compose.yml and add:
X_API_KEY: "your-twitter-api-key"
X_API_SECRET: "your-twitter-api-secret"

# Restart services
docker compose up -d
```

**Connect in Postiz:**

1. Log into Postiz
2. Go to Settings → Integrations
3. Click "Connect Twitter"
4. Authorize the app
5. Test by creating a draft post

### Step 3.3: Configure LinkedIn

**Get API Credentials:**

1. Go to https://www.linkedin.com/developers/apps
2. Create a new app
3. Add "Sign In with LinkedIn using OpenID Connect" product
4. Set redirect URL: `http://localhost:5000/api/auth/linkedin/callback`
5. Copy Client ID & Client Secret

**Update docker-compose.yml:**

```bash
docker compose down

# Add to environment:
LINKEDIN_CLIENT_ID: "your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET: "your-linkedin-client-secret"

docker compose up -d
```

**Connect in Postiz:**

1. Settings → Integrations → Connect LinkedIn
2. Authorize with your LinkedIn account
3. Test posting

### Step 3.4: Configure YouTube

**Get API Credentials:**

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/youtube/callback`
6. Copy Client ID & Client Secret

**Update docker-compose.yml:**

```bash
docker compose down

# Add to environment:
YOUTUBE_CLIENT_ID: "your-youtube-client-id"
YOUTUBE_CLIENT_SECRET: "your-youtube-client-secret"

docker compose up -d
```

### Step 3.5: Configure Facebook & Instagram

**Get API Credentials:**

1. Go to https://developers.facebook.com/
2. Create a new app
3. Add Facebook Login product
4. Set redirect URI: `http://localhost:5000/api/auth/facebook/callback`
5. Copy App ID & App Secret

**Update docker-compose.yml:**

```bash
docker compose down

# Add to environment:
FACEBOOK_APP_ID: "your-facebook-app-id"
FACEBOOK_APP_SECRET: "your-facebook-app-secret"

docker compose up -d
```

### Step 3.6: Configure Additional Platforms

Repeat similar process for:
- **TikTok:** https://developers.tiktok.com/
- **Reddit:** https://www.reddit.com/prefs/apps
- **Pinterest:** https://developers.pinterest.com/
- **Threads:** Via Facebook/Instagram integration

**Note:** Each platform requires setting up OAuth apps with specific redirect URIs pointing to your Postiz instance.

---

## 🔌 Phase 4: MCP Server Integration (30 minutes)

### Step 4.1: Get Postiz API Key

1. Log into Postiz at http://localhost:5000
2. Go to Settings → Public API
3. Click "Generate API Key"
4. Copy the API key (format: `ptz_xxxxx`)
5. Copy the MCP Server URL shown in the MCP section

### Step 4.2: Configure Claude Desktop

**For macOS:**

```bash
# Open Claude Desktop config
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**For Linux:**

```bash
# Open Claude Desktop config
nano ~/.config/Claude/claude_desktop_config.json
```

**For Windows:**

```powershell
# Open Claude Desktop config
notepad %APPDATA%\Claude\claude_desktop_config.json
```

### Step 4.3: Add Postiz MCP Configuration

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "postiz": {
      "url": "http://localhost:5000/api/mcp/YOUR_API_KEY_HERE/sse",
      "description": "Postiz social media scheduling"
    }
  }
}
```

**Replace `YOUR_API_KEY_HERE` with your actual API key from Step 4.1**

### Step 4.4: Restart Claude Desktop

```bash
# Completely quit Claude Desktop
# On macOS: Cmd+Q
# On Windows/Linux: Close all windows

# Restart Claude Desktop
# The MCP indicator should appear in the bottom-right corner
```

### Step 4.5: Verify MCP Connection

In Claude Desktop, try:

```
Can you connect to Postiz and schedule a test post to Twitter for tomorrow at 9 AM?
```

If working correctly, Claude will:
1. Confirm MCP connection to Postiz
2. Show available social accounts
3. Create and schedule the post
4. Return a confirmation with post ID

---

## ✅ Phase 5: Testing & Verification (1 hour)

### Step 5.1: Manual Testing via Web UI

**Test Immediate Posting:**

1. Log into Postiz
2. Click "Create Post"
3. Select Twitter
4. Write: "Testing Postiz deployment! 🚀"
5. Click "Post Now"
6. Verify on Twitter

**Test Scheduled Posting:**

1. Create another post
2. Select LinkedIn
3. Schedule for 1 hour from now
4. Click "Schedule"
5. Go to Calendar view
6. Verify post is scheduled

### Step 5.2: Test via MCP (Claude Desktop)

**Test 1: List Connected Accounts**

```
Show me all my connected social media accounts in Postiz
```

**Test 2: Create Immediate Post**

```
Post this to Twitter: "Testing MCP integration with Postiz! This is amazing! 🎉"
```

**Test 3: Schedule Post**

```
Schedule this LinkedIn post for tomorrow at 10 AM:
"Excited to share that I've successfully deployed Postiz with MCP integration!
Self-hosted social media management is the future. #OpenSource #SelfHosted"
```

**Test 4: Check Scheduled Posts**

```
Show me all my scheduled posts in Postiz
```

### Step 5.3: Test Multi-Platform Posting

```
Create a post and publish it to Twitter, LinkedIn, and Facebook simultaneously:
"Multi-platform posting is now live! Postiz + MCP = productivity boost 🚀"
```

### Step 5.4: Verify Analytics

1. Wait for posts to be published
2. Go to Postiz → Analytics
3. Check engagement metrics
4. Verify data is being tracked

---

## 🔧 Phase 6: Customization & Configuration (Optional)

### Enable AI Content Generation

```bash
# Get OpenAI API key from: https://platform.openai.com/api-keys

# Update docker-compose.yml:
docker compose down

# Add:
OPENAI_API_KEY: "sk-your-openai-api-key"

docker compose up -d
```

**Test AI Features:**

1. Create new post
2. Click "Generate with AI"
3. Provide prompt
4. Review and edit generated content

### Configure Team Collaboration

1. Go to Settings → Team
2. Click "Invite Member"
3. Set role (Admin, Editor, Viewer)
4. Send invitation

### Set Up Post Templates

1. Create a new post
2. Write your template content
3. Click "Save as Template"
4. Name it (e.g., "Daily Update", "Product Launch")
5. Reuse templates for future posts

---

## 📦 Phase 7: Backup & Maintenance

### Create Backup Script

Create `~/postiz-deployment/backup.sh`:

```bash
#!/bin/bash

BACKUP_DIR=~/postiz-deployment/backups
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="postiz_backup_$TIMESTAMP.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup PostgreSQL database
docker exec postiz-postgres pg_dump -U postiz-user postiz-db-local > $BACKUP_DIR/db_$TIMESTAMP.sql

# Backup uploads
docker cp postiz:/uploads $BACKUP_DIR/uploads_$TIMESTAMP

# Backup config
docker cp postiz:/config $BACKUP_DIR/config_$TIMESTAMP

# Create compressed archive
cd $BACKUP_DIR
tar -czf $BACKUP_FILE db_$TIMESTAMP.sql uploads_$TIMESTAMP config_$TIMESTAMP

# Clean up temporary files
rm -rf db_$TIMESTAMP.sql uploads_$TIMESTAMP config_$TIMESTAMP

# Keep only last 7 backups
ls -t postiz_backup_*.tar.gz | tail -n +8 | xargs rm -f

echo "Backup completed: $BACKUP_FILE"
```

**Make executable and run:**

```bash
chmod +x ~/postiz-deployment/backup.sh
~/postiz-deployment/backup.sh
```

### Schedule Automatic Backups (macOS/Linux)

```bash
# Add to crontab
crontab -e

# Add this line for daily backups at 3 AM:
0 3 * * * ~/postiz-deployment/backup.sh
```

### Update Postiz

```bash
# Pull latest image
docker compose pull

# Restart with new image
docker compose down
docker compose up -d

# Check logs
docker compose logs -f postiz
```

### Keep Your Fork Updated

```bash
cd ~/Desktop/4.\ Coding\ Projects/postiz-fork

# Fetch upstream changes
git fetch upstream

# Merge into your main branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

---

## 🐛 Troubleshooting

### Issue: Cannot Connect to Postiz

**Solution:**

```bash
# Check if containers are running
docker compose ps

# Check logs
docker compose logs postiz

# Restart services
docker compose restart
```

### Issue: OAuth Callback Errors

**Solution:**

1. Verify redirect URIs match exactly in platform developer settings
2. Check that callback URLs use correct protocol (http vs https)
3. Ensure API keys are correctly set in docker-compose.yml

### Issue: MCP Connection Failed

**Solution:**

1. Verify API key is correct in `claude_desktop_config.json`
2. Ensure Postiz is running: `docker compose ps`
3. Check MCP URL format: `http://localhost:5000/api/mcp/YOUR_KEY/sse`
4. Restart Claude Desktop completely

### Issue: Database Connection Errors

**Solution:**

```bash
# Check PostgreSQL is healthy
docker compose ps

# Reset database (WARNING: deletes all data)
docker compose down -v
docker compose up -d
```

### Issue: Redis Connection Errors

**Solution:**

```bash
# Check Redis is running
docker exec -it postiz-redis redis-cli ping

# Should return: PONG

# If not, restart Redis
docker compose restart postiz-redis
```

---

## 📊 Resource Usage

**Expected Resource Consumption:**

- **RAM:** 1.5-2.5 GB
- **CPU:** 5-15% idle, 30-60% during posting
- **Disk:** 2-5 GB (including database)
- **Network:** Minimal (~1 MB/day)

**Monitor Resources:**

```bash
# Check container resource usage
docker stats postiz postiz-postgres postiz-redis
```

---

## 🚀 Advanced Configuration

### Use External PostgreSQL

If you have an existing PostgreSQL instance:

```yaml
# Remove postiz-postgres service from docker-compose.yml
# Update DATABASE_URL:
DATABASE_URL: "postgresql://user:password@your-postgres-host:5432/postiz"
```

### Use External Redis

```yaml
# Remove postiz-redis service
# Update REDIS_URL:
REDIS_URL: "redis://your-redis-host:6379"
```

### Enable HTTPS

```bash
# Install Caddy or Nginx reverse proxy
# Configure SSL certificate
# Update environment variables:
MAIN_URL: "https://postiz.yourdomain.com"
FRONTEND_URL: "https://postiz.yourdomain.com"
NEXT_PUBLIC_BACKEND_URL: "https://postiz.yourdomain.com/api"
NOT_SECURED: "false"
```

### Scale for High Volume

```yaml
# Split services into separate containers
services:
  postiz-frontend:
    environment:
      POSTIZ_APPS: "frontend"

  postiz-backend:
    environment:
      POSTIZ_APPS: "backend"

  postiz-worker:
    environment:
      POSTIZ_APPS: "worker cron"
```

---

## 📝 Next Steps

### Immediate (This Week)

- [ ] Fork repository
- [ ] Deploy locally
- [ ] Connect 2-3 priority platforms
- [ ] Set up MCP integration
- [ ] Test basic posting workflow

### Short-Term (Next Week)

- [ ] Connect remaining platforms
- [ ] Configure team access
- [ ] Set up post templates
- [ ] Enable AI features
- [ ] Create backup schedule

### Long-Term (Next Month)

- [ ] Monitor analytics
- [ ] Optimize posting schedule
- [ ] Contribute improvements upstream
- [ ] Consider custom features
- [ ] Evaluate production deployment

---

## 🎯 Success Criteria

✅ **Deployment Successful When:**

1. All Docker containers running healthy
2. Web interface accessible at http://localhost:5000
3. Admin account created
4. At least 2 platforms connected via OAuth
5. Successfully posted to at least 1 platform
6. MCP connection working in Claude Desktop
7. Scheduled post created and executed
8. Backup script created and tested

---

## 📞 Support Resources

**Official Postiz Resources:**
- GitHub: https://github.com/gitroomhq/postiz-app
- Documentation: https://docs.postiz.com
- Discord: (link in GitHub README)

**MCP Resources:**
- MCP Documentation: https://modelcontextprotocol.io
- Claude Desktop Help: https://support.claude.com

**Your Local Documentation:**
- Evaluation: `/docs/postiz-eval.md`
- Docker Setup: `/docs/postic-docker-compost.md`
- This Plan: `/docs/deployment-plan.md`

---

## 🎉 Conclusion

This plan provides a complete roadmap to:
1. ✅ Fork and deploy Postiz locally
2. ✅ Configure your priority social media platforms
3. ✅ Integrate MCP server with Claude Desktop
4. ✅ Test and verify the complete workflow

**Estimated Time Investment:**
- Initial Setup: 2-3 hours
- Platform Configuration: 2-4 hours
- MCP Integration: 30 minutes
- Testing: 1 hour
- **Total: 6-9 hours spread over 2-3 days**

**Expected Outcome:**
A fully functional, self-hosted social media management platform with AI-powered scheduling capabilities accessible directly from Claude Desktop.

---

**Ready to get started? Begin with Phase 1: Fork & Setup!**
