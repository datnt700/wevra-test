# Generic NestJS 11 API Template

This is a **generic template** for creating new NestJS 11 API microservices in
the Tavia monorepo. It contains minimal structure without business-specific
logic.

## 🎯 Purpose

This template provides a clean starting point with:

- ✅ NestJS 11 framework setup
- ✅ TypeScript with decorators
- ✅ Prisma ORM integration (no models, just structure)
- ✅ Swagger/OpenAPI documentation
- ✅ Health check module
- ✅ Example resource module with CRUD operations
- ✅ Validation with class-validator
- ✅ Testing setup (unit + e2e)
- ❌ **NO business logic** (no restaurant, booking, or domain-specific features)

## 📁 Structure

```
complex-api-template/
├── src/
│   ├── main.ts               # Application entry point
│   ├── app.module.ts         # Root module
│   ├── app.controller.ts     # Root controller
│   ├── app.service.ts        # Root service
│   ├── prisma/               # Prisma module
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── examples/             # Example resource module
│       ├── examples.module.ts
│       ├── examples.controller.ts
│       ├── examples.service.ts
│       └── dto/
│           ├── create-example.dto.ts
│           └── update-example.dto.ts
├── test/                     # E2E tests
└── prisma/
    └── schema.prisma         # Prisma schema (minimal)
```

## 🚀 What to Customize

When creating a new API from this template, customize:

1. **Package name**: Update `name` in `package.json` to `@tavia/your-api-name`
2. **Port**: Update port in `src/main.ts` (use range 4000-4099)
3. **Prisma models**: Add your database models in `prisma/schema.prisma`
4. **Resource modules**: Replace example module with your actual resources
5. **DTOs**: Create validation DTOs for your data models
6. **Environment variables**: Copy `.env.example` and configure
7. **README**: Update this file with your API-specific information
8. **Swagger metadata**: Update API documentation in `src/main.ts`

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start PostgreSQL with Docker
pnpm docker:up

# Generate Prisma client
pnpm prisma:generate

# Run in development mode with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start:prod

# Run tests
pnpm test
pnpm test:e2e

# Prisma Studio (database GUI)
pnpm prisma:studio
```

## 🗄️ Database

This template uses PostgreSQL via Docker Compose.

### Docker Commands

```bash
# Start database
pnpm docker:up

# Stop database
pnpm docker:down

# View logs
pnpm docker:logs

# Clean (remove volume)
pnpm docker:clean
```

### Prisma Commands

```bash
# Generate Prisma Client
pnpm prisma:generate

# Push schema changes (dev)
pnpm db:push

# Create migration
pnpm prisma:migrate

# Deploy migrations (prod)
pnpm prisma:migrate:deploy

# Check migration status
pnpm prisma:migrate:status

# Prisma Studio (GUI)
pnpm prisma:studio

# Seed database
pnpm prisma:seed

# Reset database (⚠️ deletes all data)
pnpm prisma:reset
```

## 📝 API Endpoints

### Health Checks

- `GET /` - API info
- `GET /health` - Health check

### Example Resource

- `GET /examples` - List all examples
- `GET /examples/:id` - Get example by ID
- `POST /examples` - Create new example
- `PATCH /examples/:id` - Update example
- `DELETE /examples/:id` - Delete example

### API Documentation

- `GET /api` - Swagger UI (development only)
- `GET /api-json` - OpenAPI JSON spec

Replace example endpoints with your actual API resources.

## 🔒 Validation

Uses `class-validator` for DTO validation:

- Automatic validation on all endpoints
- Custom validation decorators supported
- Type-safe request/response handling

## 📊 Swagger Documentation

Pre-configured Swagger/OpenAPI documentation:

- Auto-generated from decorators
- Available at `/api` in development
- Disabled in production

## 📝 Notes

- Uses NestJS CLI for module generation
- Prisma schema is minimal - add models as needed
- Example resource demonstrates CRUD patterns
- Validation happens automatically via DTOs
- Global exception filters handle errors
- Health checks for monitoring
