# Security and Performance

## Security Requirements

**Frontend Security:**

- **CSP Headers:** Content Security Policy configured in Nginx
- **XSS Prevention:** React automatic escaping, no `dangerouslySetInnerHTML`
- **Secure Storage:** httpOnly cookies for sessions (never localStorage)

**Backend Security:**

- **Input Validation:** NestJS class-validator on all DTOs
- **Rate Limiting:** 100 req/min global, 10 req/min for POST /posts
- **CORS Policy:** Whitelist specific origins, credentials enabled

**Authentication Security:**

- **Token Storage:** httpOnly cookies (session), hashed API keys
- **Session Management:** JWT with 7-day expiration
- **Password Policy:** Minimum 12 characters, bcrypt hashing

**OAuth Token Security:**

- **Encryption:** AES-256-GCM encryption at rest
- **Token Management:** Automated refresh 7 days before expiration
- **Revocation Handling:** Mark isActive=false, maintain audit trail

## Performance Optimization

**Frontend Performance:**

- **Bundle Size Target:** < 500KB initial bundle (gzipped)
- **Loading Strategy:** Route-based code splitting, dynamic imports
- **Caching Strategy:** Static assets 1-year cache, SWR for API data

**Performance Targets:**

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

**Backend Performance:**

- **Response Time Target:** < 500ms for 95th percentile
- **Database Optimization:** Indexed queries, connection pooling
- **Caching Strategy:** Redis caching (5 min TTL for integrations, 1 hour for analytics)

---
