# Generic Fastify 5 API Template

This is a **generic template** for creating new Fastify 5 API microservices in
the Tavia monorepo. It contains minimal structure without business-specific
logic.

## 🎯 Purpose

This template provides a clean starting point with:

- ✅ Fastify 5 framework setup
- ✅ TypeScript with ES modules
- ✅ Prisma ORM setup (no models, just structure)
- ✅ Security middleware (CORS, Helmet, Rate limiting)
- ✅ Health check endpoints
- ✅ Example routes with validation
- ✅ Error handling patterns
- ❌ **NO business logic** (no analytics, tracking, or domain-specific features)

## 📁 Structure

```
simple-api-template/
├── src/
│   ├── app.ts              # Fastify app configuration
│   ├── server.ts           # Server entry point
│   ├── lib/                # Utility functions
│   │   └── prisma.ts       # Prisma client singleton
│   └── routes/             # API routes
│       ├── health.ts       # Health check endpoints
│       └── example.ts      # Example CRUD routes
├── prisma/
│   └── schema.prisma       # Prisma schema (minimal)
└── tsup.config.ts          # Build configuration
```

## 🚀 What to Customize

When creating a new API from this template, customize:

1. **Package name**: Update `name` in `package.json` to `@tavia/your-api-name`
2. **Port**: Update port in `src/server.ts` (use range 4000-4099)
3. **Prisma models**: Add your database models in `prisma/schema.prisma`
4. **Routes**: Replace example routes with your actual API endpoints
5. **Environment variables**: Copy `.env.example` and configure
6. **README**: Update this file with your API-specific information
7. **Validation schemas**: Update Zod schemas for your data models

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Run in development mode with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Prisma Studio (database GUI)
pnpm db:studio
```

## 🗄️ Database

This template uses PostgreSQL with Prisma ORM.

### Prisma Commands

```bash
# Generate Prisma Client
pnpm db:generate

# Push schema changes (dev)
pnpm db:push

# Create migration
pnpm db:migrate

# Prisma Studio (GUI)
pnpm db:studio

# Seed database
pnpm db:seed
```

**Note**: Add Docker Compose if you need a local PostgreSQL instance. See
`apps/restaurant-service/docker-compose.yml` for reference.

## 📝 API Endpoints

### Health Checks

- `GET /health` - Basic health check
- `GET /health/ready` - Readiness probe (checks database)

### Example Routes

- `GET /api/examples` - List all examples
- `GET /api/examples/:id` - Get example by ID
- `POST /api/examples` - Create new example
- `PUT /api/examples/:id` - Update example
- `DELETE /api/examples/:id` - Delete example

Replace these with your actual API endpoints.

## 🔒 Security

Pre-configured security middleware:

- **CORS**: Configurable origins
- **Helmet**: Security headers
- **Rate Limiting**: 100 requests per 15 minutes per IP

Adjust settings in `src/app.ts` as needed.

## 📝 Notes

- Uses ES modules (`"type": "module"`)
- Prisma schema is minimal - add models as needed
- Health checks include database connectivity test
- Example routes demonstrate validation patterns
- Error handling is centralized in app.ts
