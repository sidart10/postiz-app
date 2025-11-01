# External APIs

## Twitter/X API

- **Purpose:** Post tweets, retrieve tweet analytics
- **Documentation:** https://developer.twitter.com/en/docs/twitter-api
- **Base URL(s):** `https://api.twitter.com/2/`
- **Authentication:** OAuth 1.0a
- **Rate Limits:** 300 tweets per 3-hour window

**Key Endpoints Used:**

- `POST /2/tweets` - Create tweet
- `GET /2/tweets/:id` - Retrieve tweet details
- `GET /2/tweets/:id/metrics` - Get tweet analytics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/twitter/callback`. Character limit: 280 characters.

## LinkedIn API

- **Purpose:** Post updates to LinkedIn profiles/pages, retrieve engagement metrics
- **Documentation:** https://learn.microsoft.com/en-us/linkedin/
- **Base URL(s):** `https://api.linkedin.com/v2/`
- **Authentication:** OAuth 2.0
- **Rate Limits:** 500,000 API calls per day (application-level)

**Key Endpoints Used:**

- `POST /ugcPosts` - Create post
- `GET /socialActions/{shareUrn}/likes` - Get likes
- `GET /organizationalEntityShareStatistics` - Get analytics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/linkedin/callback`. Tokens expire after 60 days.

## YouTube Data API v3

- **Purpose:** Upload videos, post community posts, retrieve video analytics
- **Documentation:** https://developers.google.com/youtube/v3
- **Base URL(s):** `https://www.googleapis.com/youtube/v3/`
- **Authentication:** OAuth 2.0 (Google)
- **Rate Limits:** 10,000 units per day (quota system)

**Key Endpoints Used:**

- `POST /videos` - Upload video
- `POST /activities` - Create community post
- `GET /videos` - Retrieve video statistics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/youtube/callback`. Requires Google Cloud Project.

## Facebook Graph API

- **Purpose:** Post to Facebook pages, retrieve post insights
- **Documentation:** https://developers.facebook.com/docs/graph-api
- **Base URL(s):** `https://graph.facebook.com/v18.0/`
- **Authentication:** OAuth 2.0
- **Rate Limits:** 200 calls per hour per user

**Key Endpoints Used:**

- `POST /{page-id}/feed` - Create post
- `POST /{page-id}/photos` - Upload photo
- `GET /{post-id}/insights` - Retrieve analytics

**Integration Notes:** Callback URL: `http://localhost:5000/api/auth/facebook/callback`. Requires Page Access Tokens.

## Instagram Graph API

- **Purpose:** Post photos/videos to Instagram business accounts
- **Documentation:** https://developers.facebook.com/docs/instagram-api
- **Base URL(s):** `https://graph.facebook.com/v18.0/`
- **Authentication:** OAuth 2.0 (via Facebook)
- **Rate Limits:** 25 posts per 24 hours per user

**Key Endpoints Used:**

- `POST /{ig-user-id}/media` - Create media container
- `POST /{ig-user-id}/media_publish` - Publish media
- `GET /{media-id}/insights` - Retrieve insights

**Integration Notes:** Two-step publishing process. Character limit: 2,200 characters.

## Other Supported Platforms

**TikTok, Reddit, Pinterest, Threads, Mastodon, Discord, Slack** - Each with platform-specific OAuth flows, rate limits, and API characteristics. Detailed configurations available in Postiz documentation.

---
