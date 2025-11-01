# API Specification

## REST API Specification

```yaml
openapi: 3.0.0
info:
  title: Postiz REST API
  version: 2.8.0
  description: |
    REST API for Postiz social media management platform.
    Authentication via API key (Bearer token) or session cookies.

    Base URL: http://localhost:5000/api

servers:
  - url: http://localhost:5000/api
    description: Local development server
  - url: https://your-domain.com/api
    description: Production deployment (with SSL)

security:
  - ApiKeyAuth: []
  - SessionAuth: []

components:
  securitySchemes:
    ApiKeyAuth:
      type: http
      scheme: bearer
      bearerFormat: API Key (ptz_xxxxx...)
    SessionAuth:
      type: apiKey
      in: cookie
      name: postiz_session

  schemas:
    Post:
      type: object
      required:
        - content
        - platforms
      properties:
        id:
          type: string
          format: uuid
        content:
          type: string
          maxLength: 10000
        mediaUrls:
          type: array
          items:
            type: string
        status:
          type: string
          enum: [DRAFT, SCHEDULED, PUBLISHING, PUBLISHED, FAILED]
        scheduledFor:
          type: string
          format: date-time
          nullable: true
        publishedAt:
          type: string
          format: date-time
          nullable: true
        platforms:
          type: array
          items:
            type: string
            format: uuid
        platformPostIds:
          type: object
          additionalProperties:
            type: string

    Integration:
      type: object
      properties:
        id:
          type: string
          format: uuid
        platform:
          type: string
        platformUsername:
          type: string
        isActive:
          type: boolean

    Analytics:
      type: object
      properties:
        postId:
          type: string
          format: uuid
        platform:
          type: string
        impressions:
          type: integer
        likes:
          type: integer
        shares:
          type: integer
        comments:
          type: integer
        engagementRate:
          type: number

    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object
            timestamp:
              type: string
            requestId:
              type: string

paths:
  /health:
    get:
      summary: Health check endpoint
      security: []
      responses:
        '200':
          description: Service healthy

  /posts:
    get:
      summary: List all posts
      parameters:
        - name: status
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
      responses:
        '200':
          description: List of posts

    post:
      summary: Create a new post
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Post'
      responses:
        '201':
          description: Post created

  /posts/{postId}:
    get:
      summary: Get post by ID
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Post details

    put:
      summary: Update post
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Post updated

    delete:
      summary: Delete post
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Post deleted

  /posts/{postId}/publish:
    post:
      summary: Publish post immediately
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Post queued for publishing

  /integrations:
    get:
      summary: List connected social media accounts
      responses:
        '200':
          description: List of integrations

  /analytics/{postId}:
    get:
      summary: Get post analytics
      parameters:
        - name: postId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Analytics data

  /mcp/{apiKey}/sse:
    get:
      summary: MCP Server-Sent Events endpoint
      description: Real-time event stream for MCP clients
      security: []
      parameters:
        - name: apiKey
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: SSE stream established
          content:
            text/event-stream:
              schema:
                type: string
```

---
