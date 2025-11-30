# Analytics API

> Eventure's standalone analytics event tracking and statistics API service

A high-performance Fastify-based microservice for collecting, processing, and
analyzing user analytics events from the Eventure platform.

## 🚀 Features

- **Event Ingestion**: Batch processing of analytics events (CLICK, PAGEVIEW,
  CUSTOM)
- **Type-Safe**: Full TypeScript with Zod runtime validation
- **Secure**: CORS, Helmet, Rate Limiting, API Key authentication
- **Database**: PostgreSQL with Prisma ORM
- **Performance**: Built with Fastify 5 for maximum throughput
- **Monitoring**: Health check endpoints with database connectivity checks
- **Statistics**: Event statistics and aggregation endpoints

## 📦 Tech Stack

- **Framework**: Fastify 5.6
- **Language**: TypeScript 5.9
- **ORM**: Prisma 6.18
- **Validation**: Zod 3.25
- **Database**: PostgreSQL 16
- **Logger**: Pino with pino-pretty
- **Build**: tsup (ESM output)
- **Dev**: tsx with watch mode

## 🏗️ Architecture

```
apps/analytics/
├── src/
│   ├── server.ts              # Server entry point & initialization
│   ├── app.ts                 # Fastify app configuration & middleware
│   ├── lib/
│   │   └── prisma.ts          # Prisma client singleton
│   └── routes/
│       ├── health.ts          # Health check endpoints
│       └── analytics.ts       # Analytics event & stats endpoints
├── prisma/
│   └── schema.prisma          # Database schema
├── .env                       # Environment variables (local)
├── .env.example               # Environment template
└── tsconfig.json              # TypeScript configuration
```

## 🔧 Setup

### 1. Install Dependencies

```bash
cd apps/analytics
pnpm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

**Required Environment Variables:**

- `DATABASE_URL`: PostgreSQL connection string
- `ANALYTICS_API_KEY`: Secret key for API authentication
- `PORT`: Server port (default: 3001)
- `CORS_ORIGIN`: Allowed origins (comma-separated)

### 3. Setup Database

Make sure PostgreSQL is running (via Docker or local):

```bash
# If using Docker from apps/web
cd ../web
docker-compose up -d postgres
```

Generate Prisma client:

```bash
pnpm db:generate
```

Run migrations:

```bash
pnpm db:migrate
```

### 4. Start Development Server

```bash
pnpm dev
```

Server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Checks

**GET `/health`** - Basic health check

```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime": 123.456
}
```

**GET `/health/detailed`** - Detailed health with DB check

```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime": 123.456,
  "database": "connected",
  "memory": {
    "heapUsed": 50.5,
    "heapTotal": 100.0,
    "external": 5.2
  }
}
```

### Analytics Events

**POST `/api/events`** - Batch event ingestion

Headers:

```
Authorization: Bearer your-api-key
Content-Type: application/json
```

Body (1-100 events):

```json
{
  "events": [
    {
      "type": "CLICK",
      "timestamp": "2025-10-23T10:30:00.000Z",
      "sessionId": "session-123",
      "url": "https://eventure.so/restaurants",
      "userAgent": "Mozilla/5.0...",
      "elementType": "button",
      "elementText": "Book Now",
      "clickX": 150,
      "clickY": 200
    },
    {
      "type": "PAGEVIEW",
      "timestamp": "2025-10-23T10:29:00.000Z",
      "sessionId": "session-123",
      "url": "https://eventure.so/restaurants",
      "pageTitle": "Restaurants - Eventure",
      "pagePath": "/restaurants"
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "received": 2
}
```

**GET `/api/stats`** - Event statistics

Response:

```json
{
  "total": 1500,
  "byType": {
    "CLICK": 800,
    "PAGEVIEW": 650,
    "CUSTOM": 50
  }
}
```

## 🔒 Authentication

All `/api/*` endpoints require API key authentication:

```
Authorization: Bearer your-api-key-here
```

Set `ANALYTICS_API_KEY` in `.env` file.

## 🛡️ Security Features

- **CORS**: Configurable allowed origins
- **Helmet**: Security headers (XSS, CSP, etc.)
- **Rate Limiting**: 100 requests/minute per IP (configurable)
- **API Key Auth**: Bearer token authentication
- **Validation**: Zod schema validation on all inputs

## 📊 Event Types

### CLICK Events

```typescript
{
  type: "CLICK",
  elementType: string,      // "button", "a", "div", etc.
  elementText: string,      // Text content
  elementId?: string,       // DOM ID
  elementClasses: string[], // CSS classes
  clickX: number,           // X coordinate
  clickY: number,           // Y coordinate
  eventName?: string        // Custom event name
}
```

### PAGEVIEW Events

```typescript
{
  type: "PAGEVIEW",
  pageTitle: string,        // Document title
  pagePath: string          // URL path
}
```

### CUSTOM Events

```typescript
{
  type: "CUSTOM",
  customName: string,       // Event name
  customProperties: object  // Custom data
}
```

## 🗄️ Database Schema

**AnalyticsEvent Model:**

| Field            | Type          | Description             |
| ---------------- | ------------- | ----------------------- |
| `id`             | String (cuid) | Primary key             |
| `type`           | Enum          | CLICK, PAGEVIEW, CUSTOM |
| `timestamp`      | DateTime      | Event occurrence time   |
| `sessionId`      | String?       | User session ID         |
| `url`            | String        | Page URL                |
| `referrer`       | String?       | HTTP referrer           |
| `userAgent`      | String        | Browser user agent      |
| `screenWidth`    | Int?          | Screen width in pixels  |
| `screenHeight`   | Int?          | Screen height in pixels |
| `viewportWidth`  | Int?          | Viewport width          |
| `viewportHeight` | Int?          | Viewport height         |
| `createdAt`      | DateTime      | Record creation time    |

**Indexes:**

- `type` - Filter by event type
- `timestamp` - Time-based queries
- `sessionId` - User session tracking
- `eventName` - Custom event filtering
- `pagePath` - Page-based analytics

## 🧪 Testing

```bash
# Run tests (once implemented)
pnpm test

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 🐳 Docker

The analytics API can connect to the PostgreSQL database from `apps/web`:

```bash
# Start PostgreSQL (from apps/web)
cd ../web
docker-compose up -d postgres

# Check database logs
cd ../analytics
pnpm docker:logs
```

## 📝 Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `pnpm dev`         | Start development server with watch mode |
| `pnpm build`       | Build for production (ESM output)        |
| `pnpm start`       | Start production server                  |
| `pnpm lint`        | Run ESLint                               |
| `pnpm type-check`  | TypeScript type checking                 |
| `pnpm format`      | Format code with Prettier                |
| `pnpm db:generate` | Generate Prisma client                   |
| `pnpm db:migrate`  | Run database migrations                  |
| `pnpm db:push`     | Push schema to database                  |
| `pnpm db:studio`   | Open Prisma Studio                       |

## 🔗 Integration

### With @Eventure/analytics SDK

The SDK (from `packages/analytics`) automatically sends events to this API:

```typescript
// In apps/web or other apps
import { AnalyticsProvider } from '@Eventure/analytics';

<AnalyticsProvider
  apiEndpoint="http://localhost:3001/api/events"
  apiKey="your-api-key"
  batchSize={10}
  flushInterval={5000}
>
  <App />
</AnalyticsProvider>
```

### Environment Variables

Update your web app's `.env`:

```bash
NEXT_PUBLIC_ANALYTICS_API_URL=http://localhost:3001/api/events
NEXT_PUBLIC_ANALYTICS_API_KEY=dev-analytics-api-key-12345
```

## 🚧 Roadmap

- [ ] Add unit tests with Vitest
- [ ] Real-time event streaming (WebSocket)
- [ ] Event filtering and search API
- [ ] Data aggregation endpoints (daily/weekly stats)
- [ ] User session analytics
- [ ] Funnel analysis
- [ ] Data export (CSV, JSON)
- [ ] OpenAPI/Swagger documentation
- [ ] Grafana/Prometheus metrics
- [ ] Separate Docker setup for analytics service

## 📄 License

MIT © Eventure

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) in the root directory.

---

**Port**: 3001 **Status**: ✅ Production Ready **Version**: 0.1.0
