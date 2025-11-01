# Epic 2: Social Media Platform Integration

**Expanded Goal:**
Configure OAuth 2.0 authentication for priority social media platforms (Twitter, LinkedIn, YouTube, Facebook, Instagram) by creating developer applications on each platform, adding credentials to Postiz environment variables, and establishing authorized connections. This epic delivers functional multi-platform posting capability, validating the core value proposition of Postiz as a unified social media management interface.

## Story 2.1: Configure Twitter/X OAuth Integration

**As a** social media manager,
**I want** to connect my Twitter/X account to Postiz via OAuth,
**so that** I can create, schedule, and publish tweets through the Postiz interface.

### Acceptance Criteria:

1. Twitter Developer account is created at developer.twitter.com
2. New Twitter app is created in Developer Portal with project configuration
3. OAuth 1.0a is enabled for the Twitter app
4. Callback URL is set to `http://localhost:5000/api/auth/twitter/callback`
5. API Key and API Secret are generated and securely copied
6. Postiz Docker containers are stopped (`docker compose down`)
7. docker-compose.yml is updated with X_API_KEY and X_API_SECRET environment variables
8. Postiz Docker containers are restarted (`docker compose up -d`)
9. Postiz Settings → Integrations page shows "Connect Twitter" option
10. OAuth authorization flow completes successfully when clicking "Connect Twitter"
11. Connected Twitter account is displayed in Postiz dashboard with username/handle
12. Test draft post is created successfully via Postiz UI for Twitter
13. Twitter account appears in platform selection when creating new posts

## Story 2.2: Configure LinkedIn OAuth Integration

**As a** professional content creator,
**I want** to connect my LinkedIn account to Postiz via OAuth,
**so that** I can publish professional content and updates through the Postiz interface.

### Acceptance Criteria:

1. LinkedIn Developer account is created at linkedin.com/developers/apps
2. New LinkedIn app is created with appropriate product selections
3. "Sign In with LinkedIn using OpenID Connect" product is added to the app
4. Redirect URL is set to `http://localhost:5000/api/auth/linkedin/callback`
5. Client ID and Client Secret are generated and securely copied
6. docker-compose.yml is updated with LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET environment variables
7. Postiz containers are restarted with new configuration
8. OAuth authorization flow completes successfully when clicking "Connect LinkedIn"
9. Connected LinkedIn account/page is displayed in Postiz dashboard
10. Test draft post is created successfully via Postiz UI for LinkedIn
11. LinkedIn account appears in platform selection when creating new posts

## Story 2.3: Configure YouTube OAuth Integration

**As a** video content creator,
**I want** to connect my YouTube channel to Postiz via OAuth,
**so that** I can schedule video uploads and community posts through the Postiz interface.

### Acceptance Criteria:

1. Google Cloud Console project is created at console.cloud.google.com
2. YouTube Data API v3 is enabled for the project
3. OAuth 2.0 credentials are created (Web application type)
4. Authorized redirect URI is set to `http://localhost:5000/api/auth/youtube/callback`
5. Client ID and Client Secret are generated and securely copied
6. docker-compose.yml is updated with YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET environment variables
7. Postiz containers are restarted with new configuration
8. OAuth authorization flow completes successfully when clicking "Connect YouTube"
9. Connected YouTube channel is displayed in Postiz dashboard with channel name
10. YouTube channel appears in platform selection when creating new posts
11. Test community post draft is created successfully via Postiz UI

## Story 2.4: Configure Facebook & Instagram OAuth Integration

**As a** brand social media manager,
**I want** to connect my Facebook page and Instagram business account to Postiz via OAuth,
**so that** I can manage visual content and updates across both Meta platforms.

### Acceptance Criteria:

1. Facebook Developer account is created at developers.facebook.com
2. New Facebook app is created with appropriate configuration
3. Facebook Login product is added to the app
4. Valid redirect URI is set to `http://localhost:5000/api/auth/facebook/callback`
5. App ID and App Secret are copied from app dashboard
6. docker-compose.yml is updated with FACEBOOK_APP_ID and FACEBOOK_APP_SECRET environment variables
7. Postiz containers are restarted with new configuration
8. OAuth authorization flow completes successfully for Facebook when clicking "Connect Facebook"
9. Connected Facebook page is displayed in Postiz dashboard
10. Instagram business account connected to Facebook page is automatically available in Postiz
11. Both Facebook and Instagram appear as separate platform options when creating posts
12. Test draft posts are created successfully for both Facebook and Instagram
13. Image upload functionality works for both platforms

## Story 2.5: Verify Multi-Platform Posting

**As a** social media manager,
**I want** to publish a single post to multiple platforms simultaneously,
**so that** I can efficiently distribute content without manual duplication.

### Acceptance Criteria:

1. New post is created in Postiz with text content suitable for all platforms
2. Multiple platforms are selected simultaneously (minimum: Twitter, LinkedIn, Facebook)
3. "Post Now" button publishes the post immediately to all selected platforms
4. Postiz dashboard shows successful posting status for all platforms
5. Each platform's native interface (Twitter web, LinkedIn web, Facebook web) displays the published post
6. Post content appears correctly formatted on each platform
7. Timestamp of posts on all platforms are within 1 minute of each other
8. Postiz Analytics page shows the multi-platform post with engagement metrics from all platforms
9. No error messages appear in Postiz UI or container logs during posting

---
