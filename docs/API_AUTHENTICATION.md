# API Authentication

> Secure your API requests with API keys and understand authentication best
> practices

All Tavia API requests must be authenticated with a valid API key. This guide
walks you through creating API keys, understanding authentication vs
authorization, and implementing secure API access.

---

## Table of Contents

- [What's the Difference: Authentication vs Authorization?](#whats-the-difference-authentication-vs-authorization)
- [API Key Overview](#api-key-overview)
- [Getting Started](#getting-started)
  - [Step 1: Create an API Key](#step-1-create-an-api-key)
  - [Step 2: Store Your Key Securely](#step-2-store-your-key-securely)
  - [Step 3: Authenticate API Requests](#step-3-authenticate-api-requests)
- [Rate Limiting](#rate-limiting)
- [Response Caching](#response-caching)
- [Best Practices](#best-practices)
- [Production Considerations](#production-considerations)
- [Examples](#examples)

---

## What's the Difference: Authentication vs Authorization?

Imagine you're attending an event at a venue:

**Authentication** verifies your identity, just like the security guard checking
your ID at the door to make sure you are who you claim to be.

- In Tavia, this is done by providing an API key in the `X-API-Key` header
- Every request must include a valid API key
- The API key proves you're an authorized Tavia user

**Authorization** verifies your privileges, just like the ticket scanner
determining which areas you can access—general admission, VIP section, or
backstage.

- In Tavia, this is tied to the user account associated with the API key
- Different users have different permissions (ADMIN, ORGANIZER, MODERATOR,
  ATTENDEE)
- Each API key inherits the permissions of its owner

Once you have your API key, you'll use the same one for every API request until
it expires or is revoked.

---

## API Key Overview

Tavia uses **API keys** for secure, token-based authentication. Each API key has
the following properties:

| Property       | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| **Format**     | `tav_` prefix + 64 hex characters                                 |
| **Storage**    | Securely hashed with bcrypt (not stored in plain text)            |
| **Rate Limit** | Configurable per key (default: 1000 requests/hour)                |
| **Expiration** | Optional expiration date                                          |
| **Tracking**   | Detailed usage logs (endpoint, method, status, response time, IP) |
| **Status**     | ACTIVE, REVOKED, or EXPIRED                                       |

**Example API Key:**

```
tav_a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```

⚠️ **Important:** API keys are only shown once during creation. Store them
securely—they cannot be retrieved later.

---

## Getting Started

Follow these three steps to start making authenticated API requests:

### Step 1: Create an API Key

Generate a new API key using the CLI tool from the `apps/backoffice` directory:

```bash
cd apps/backoffice
pnpm db:create-api-key <email> <name> [rate-limit] [expire-days]
```

**Parameters:**

- `email` (required) - Email of the user who will own this key
- `name` (required) - Descriptive name for the key (e.g., "Production",
  "Development")
- `rate-limit` (optional) - Maximum requests per hour (default: 1000)
- `expire-days` (optional) - Days until expiration (default: no expiration)

**Examples:**

```bash
# Production key with 5000 req/hour, expires in 1 year
pnpm db:create-api-key user@tavia.io "Production" 5000 365

# Development key with default rate limit, expires in 90 days
pnpm db:create-api-key user@tavia.io "Development" 1000 90

# Testing key with low rate limit, no expiration
pnpm db:create-api-key user@tavia.io "Testing" 100
```

**Output:**

```
✅ API Key Created Successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
API Key:    tav_a1b2c3d4e5f6...
Name:       Production
User:       user@tavia.io
Rate Limit: 5000 requests/hour
Expires:    2026-11-29
Status:     ACTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Save this key securely - it won't be shown again!
```

---

### Step 2: Store Your Key Securely

**Best Practices:**

✅ **DO:**

- Store in environment variables (`.env.local`)
- Use a secrets manager (AWS Secrets Manager, HashiCorp Vault)
- Restrict file permissions (`chmod 600` on Unix systems)
- Use different keys for different environments (dev, staging, prod)

❌ **DON'T:**

- Commit keys to version control (add `.env.local` to `.gitignore`)
- Share keys via email, Slack, or other insecure channels
- Hardcode keys in source code
- Use production keys in development

**Example `.env.local`:**

```env
# Tavia API Key
TAVIA_API_KEY=tav_a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456

# Never commit this file to git!
```

---

### Step 3: Authenticate API Requests

Include your API key in the `X-API-Key` header with every request:

#### Authorization Header (Recommended)

```bash
# cURL
curl https://api.tavia.io/v1/groups \
  -H "X-API-Key: tav_your_key_here"

# PowerShell
Invoke-RestMethod -Uri "https://api.tavia.io/v1/groups" `
  -Headers @{ "X-API-Key" = "tav_your_key_here" }
```

#### JavaScript/TypeScript

```typescript
// Fetch API
const response = await fetch('https://api.tavia.io/v1/groups', {
  headers: {
    'X-API-Key': process.env.TAVIA_API_KEY,
  },
});

// Axios
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.tavia.io/v1',
  headers: {
    'X-API-Key': process.env.TAVIA_API_KEY,
  },
});

const { data } = await client.get('/groups');
```

#### Python

```python
import os
import requests

headers = {
    'X-API-Key': os.environ.get('TAVIA_API_KEY')
}

response = requests.get('https://api.tavia.io/v1/groups', headers=headers)
data = response.json()
```

---

## Rate Limiting

API keys have **per-key rate limits** to ensure fair usage and protect against
abuse.

### How It Works

- **Sliding Window:** 1-hour window that moves with each request
- **Default Limit:** 1000 requests per hour (configurable during key creation)
- **Status Code:** `429 Too Many Requests` when limit exceeded
- **Reset:** Gradually resets as requests age out of the 1-hour window

### Response Headers

Every successful response includes rate limit information:

```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4723
X-Response-Time: 45
X-Cache: MISS
```

| Header                  | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `X-RateLimit-Limit`     | Total requests allowed per hour                 |
| `X-RateLimit-Remaining` | Requests remaining in current window            |
| `X-Response-Time`       | Response time in milliseconds                   |
| `X-Cache`               | Cache status (`HIT` or `MISS` for GET requests) |

### Rate Limit Exceeded Error

**Response (429 Too Many Requests):**

```json
{
  "error": "Rate limit exceeded",
  "limit": 5000,
  "remaining": 0,
  "message": "API key rate limit exceeded. Try again later."
}
```

### Handling Rate Limits

```typescript
async function makeRequestWithRetry(url: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, {
      headers: { 'X-API-Key': process.env.TAVIA_API_KEY },
    });

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
      console.log(`Rate limited. Retrying after ${retryAfter}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      continue;
    }

    return response.json();
  }

  throw new Error('Max retries exceeded');
}
```

---

## Response Caching

To improve performance, **GET requests are automatically cached for 1 minute**.

### Cache Behavior

- **Cache Key:** Endpoint + query parameters + API key
- **TTL:** 60 seconds
- **Eviction:** LRU (Least Recently Used) when cache reaches 100 entries
- **Cache Header:** `X-Cache: HIT` or `X-Cache: MISS`

### Example

```bash
# First request (MISS)
curl https://api.tavia.io/v1/groups?category=TECH \
  -H "X-API-Key: tav_your_key"
# X-Cache: MISS
# X-Response-Time: 250

# Second request within 60s (HIT)
curl https://api.tavia.io/v1/groups?category=TECH \
  -H "X-API-Key: tav_your_key"
# X-Cache: HIT
# X-Response-Time: 5
```

### Bypassing Cache

POST, PUT, PATCH, and DELETE requests are **never cached** and always return
fresh data.

---

## Best Practices

Follow these best practices to ensure secure and reliable API access:

### ✅ Security

- **Rotate Keys Regularly:** Change keys every 3-6 months
- **Use Expiration Dates:** Set expiration for temporary or third-party access
- **Monitor Usage:** Check `api_key_usage` table for unusual patterns
- **Revoke Compromised Keys:** Immediately revoke any exposed keys
- **Environment-Specific Keys:** Use separate keys for dev, staging, and
  production

### ✅ Performance

- **Cache Responses:** Leverage automatic caching for GET requests
- **Batch Requests:** Combine multiple operations when possible
- **Monitor Rate Limits:** Check `X-RateLimit-Remaining` header
- **Use Webhooks:** Subscribe to events instead of polling

### ✅ Error Handling

- **Implement Retry Logic:** Handle transient failures with exponential backoff
- **Log Failures:** Track API errors for debugging
- **Validate Responses:** Check status codes and error messages
- **Handle Rate Limits:** Gracefully handle 429 responses

### ❌ Common Mistakes to Avoid

- **Don't** share keys across multiple applications
- **Don't** use production keys in client-side code
- **Don't** ignore rate limit warnings
- **Don't** store keys in public repositories
- **Don't** reuse revoked or expired keys

---

## Production Considerations

### Current Implementation (Development)

The current implementation uses **in-memory storage** for simplicity:

- Rate limiting: In-memory `Map` with sliding window
- Response caching: In-memory `Map` with 1-minute TTL
- Usage tracking: PostgreSQL database

**Limitations:**

- Not distributed (single server only)
- Lost on server restart
- Limited scalability

### Recommended Production Setup

For production environments, migrate to **Redis** for distributed caching and
rate limiting:

#### Rate Limiting with Redis

```typescript
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function checkRateLimit(
  keyPrefix: string,
  limit: number
): Promise<boolean> {
  const hour = Math.floor(Date.now() / 3600000);
  const key = `ratelimit:${keyPrefix}:${hour}`;

  const count = await redis.incr(key);
  await redis.expire(key, 3600); // 1 hour TTL

  return count <= limit;
}
```

#### Response Caching with Redis

```typescript
async function getCachedResponse(cacheKey: string): Promise<any | null> {
  const cached = await redis.get(cacheKey);
  return cached ? JSON.parse(cached) : null;
}

async function setCachedResponse(cacheKey: string, data: any): Promise<void> {
  await redis.setex(cacheKey, 60, JSON.stringify(data)); // 60s TTL
}
```

#### Infrastructure Requirements

- **Redis Cluster:** For high availability and horizontal scaling
- **Load Balancer:** Distribute traffic across multiple API servers
- **Monitoring:** Track API usage, rate limits, and cache hit rates
- **Alerting:** Notify on unusual patterns or rate limit violations

---

## Examples

### Complete Integration Example

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

class TaviaAPIClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string, baseURL = 'https://api.tavia.io/v1') {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL,
      headers: {
        'X-API-Key': apiKey,
      },
    });

    // Add response interceptor for rate limiting
    this.client.interceptors.response.use(
      (response) => {
        // Log rate limit info
        console.log(
          `Rate Limit: ${response.headers['x-ratelimit-remaining']}/${response.headers['x-ratelimit-limit']}`
        );
        console.log(`Response Time: ${response.headers['x-response-time']}ms`);
        console.log(`Cache: ${response.headers['x-cache']}`);
        return response;
      },
      async (error: AxiosError) => {
        if (error.response?.status === 429) {
          const retryAfter = parseInt(
            error.response.headers['retry-after'] || '60'
          );
          console.log(`Rate limited. Retrying after ${retryAfter}s...`);
          await new Promise((resolve) =>
            setTimeout(resolve, retryAfter * 1000)
          );
          return this.client.request(error.config!);
        }
        throw error;
      }
    );
  }

  // Get all groups
  async getGroups(params?: { category?: string; location?: string }) {
    const { data } = await this.client.get('/groups', { params });
    return data;
  }

  // Get group by ID
  async getGroup(id: string) {
    const { data } = await this.client.get(`/groups/${id}`);
    return data;
  }

  // Get events
  async getEvents(params?: { groupId?: string; startDate?: string }) {
    const { data } = await this.client.get('/events', { params });
    return data;
  }
}

// Usage
const client = new TaviaAPIClient(process.env.TAVIA_API_KEY!);

// Fetch groups
const groups = await client.getGroups({ category: 'TECH' });
console.log(`Found ${groups.length} tech groups`);

// Fetch events
const events = await client.getEvents({ groupId: 'group-123' });
console.log(`Found ${events.length} events`);
```

### Error Handling Example

```typescript
try {
  const response = await fetch('https://api.tavia.io/v1/groups', {
    headers: {
      'X-API-Key': process.env.TAVIA_API_KEY,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded');
    } else if (response.status === 403) {
      throw new Error('API key revoked or expired');
    } else {
      throw new Error(`API error: ${response.statusText}`);
    }
  }

  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('API request failed:', error.message);
}
```

---

## Next Steps

Now that you understand API authentication, explore these guides:

- **[API Reference](../apps/backoffice/README.md#api-documentation)** - Full API
  endpoint documentation
- **[Rate Limiting](../apps/backoffice/README.md#rate-limiting)** - Advanced
  rate limiting strategies
- **[Webhooks](../apps/backoffice/src/app/api/webhooks/README.md)** - Real-time
  event notifications
- **[Database Setup](../apps/backoffice/DATABASE.md)** - Database configuration
  and migrations

---

## Need Help?

- **Documentation:** [README.md](../apps/backoffice/README.md)
- **Issues:** [GitHub Issues](https://github.com/tavia-io/tavia/issues)
- **Security:** [SECURITY.md](../SECURITY.md)
- **Contributing:** [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**© 2025 Tavia** • [Privacy Policy](#) • [Terms of Service](#) •
[API Status](#)
