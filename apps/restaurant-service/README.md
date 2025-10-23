# Restaurant Service

A production-ready NestJS microservice for comprehensive café and restaurant management with full CRUD operations, built with best practices and modern TypeScript.

## 🚀 Features

- **Restaurant Management**: Full CRUD operations with soft/hard delete support
- **Menu System**: Categories, items, pricing, dietary information, allergens
- **Table Management**: Status tracking, QR codes, capacity management
- **Order Processing**: Complete order lifecycle from creation to payment
- **Staff Management**: Employee records, roles, schedules
- **Advanced Features**:
  - Pagination and filtering on all list endpoints
  - Slug-based URL routing for SEO
  - Aggregated statistics endpoints
  - Comprehensive validation with class-validator
  - Auto-generated Swagger/OpenAPI documentation
  - Type-safe database access with Prisma

## 🛠️ Tech Stack

- **Framework**: [NestJS 11](https://nestjs.com/) - Progressive Node.js framework
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [Prisma 6.18](https://www.prisma.io/) - Next-generation TypeScript ORM
- **Validation**: [class-validator](https://github.com/typestack/class-validator) + class-transformer
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/) - Interactive API docs
- **Security**: [Helmet](https://helmetjs.github.io/) - HTTP security headers
- **Performance**: Compression middleware for response optimization

## 📂 Project Structure

```
restaurant-service/
├── prisma/
│   └── schema.prisma          # Database schema with 6 models
├── src/
│   ├── main.ts                # Application bootstrap
│   ├── app.module.ts          # Root module
│   ├── app.controller.ts      # Health check endpoint
│   ├── app.service.ts         # Root service
│   ├── prisma/                # Prisma module (global)
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── restaurants/           # Restaurant feature module
│       ├── dto/
│       │   ├── create-restaurant.dto.ts
│       │   └── update-restaurant.dto.ts
│       ├── restaurants.controller.ts
│       ├── restaurants.service.ts
│       └── restaurants.module.ts
├── test/                      # E2E tests
├── .env                       # Environment variables
├── .env.example               # Environment template
└── package.json
```

## 🏗️ Database Schema

**6 Main Models:**

1. **Restaurant** - Core establishment data with geolocation, operating hours, media
2. **Table** - Table management with status, capacity, QR codes
3. **Category** - Menu categorization with display ordering
4. **MenuItem** - Detailed menu items with pricing, allergens, dietary info
5. **Order** - Full order lifecycle tracking with payments
6. **Staff** - Employee management with roles and schedules

**5 Status Enums:**

- `RestaurantStatus`: ACTIVE, TEMPORARILY_CLOSED, PERMANENTLY_CLOSED
- `TableStatus`: AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE
- `MenuItemStatus`: AVAILABLE, OUT_OF_STOCK, DISCONTINUED
- `OrderStatus`: PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED
- `PaymentStatus`: PENDING, PAID, FAILED, REFUNDED

## 🚦 Getting Started

### Prerequisites

- **Node.js**: 18.18.0+ (see root `.nvmrc`)
- **pnpm**: 10.17.1+ (`npm install -g pnpm`)
- **PostgreSQL**: 14+ (local or Docker)

### Installation

```bash
# 1. Install dependencies (from repository root)
pnpm install

# 2. Navigate to service directory
cd apps/restaurant-service

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# 4. Generate Prisma client
pnpm prisma:generate

# 5. Run database migrations
pnpm prisma:migrate

# 6. (Optional) Seed database with sample data
pnpm prisma:seed
```

### Running the Service

```bash
# Development mode with watch
pnpm start:dev

# Production mode
pnpm build
pnpm start:prod

# Debug mode
pnpm start:debug
```

**Service will be available at:**

- API: http://localhost:3002/api/v1
- Swagger Docs: http://localhost:3002/api/docs

## 📡 API Endpoints

### Restaurants

| Method   | Endpoint                             | Description                      |
| -------- | ------------------------------------ | -------------------------------- |
| `POST`   | `/api/v1/restaurants`                | Create new restaurant            |
| `GET`    | `/api/v1/restaurants`                | List all restaurants (paginated) |
| `GET`    | `/api/v1/restaurants/:id`            | Get restaurant by ID             |
| `GET`    | `/api/v1/restaurants/slug/:slug`     | Get restaurant by slug           |
| `GET`    | `/api/v1/restaurants/:id/statistics` | Get aggregated statistics        |
| `PATCH`  | `/api/v1/restaurants/:id`            | Update restaurant                |
| `DELETE` | `/api/v1/restaurants/:id`            | Soft delete (set status CLOSED)  |
| `DELETE` | `/api/v1/restaurants/:id/hard`       | Permanent deletion               |

**Query Parameters (GET /restaurants):**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `city` (string): Filter by city
- `status` (RestaurantStatus): Filter by status

### Example Requests

**Create Restaurant:**

```bash
curl -X POST http://localhost:3002/api/v1/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Artisan Café",
    "email": "contact@artisancafe.com",
    "phone": "+14155551234",
    "address": "123 Main Street",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102",
    "country": "USA",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "cuisine": ["Coffee", "Pastries", "Brunch"],
    "priceRange": "$$",
    "description": "Artisanal coffee and fresh pastries",
    "website": "https://artisancafe.com",
    "operatingHours": {
      "monday": { "open": "07:00", "close": "18:00" },
      "tuesday": { "open": "07:00", "close": "18:00" }
    }
  }'
```

**List Restaurants (Paginated):**

```bash
curl "http://localhost:3002/api/v1/restaurants?page=1&limit=20&city=San%20Francisco"
```

**Get Statistics:**

```bash
curl http://localhost:3002/api/v1/restaurants/1/statistics
```

## 🔧 Available Scripts

### Development

```bash
pnpm start:dev          # Start in watch mode
pnpm start:debug        # Start with debugger
pnpm lint               # Run ESLint
pnpm format             # Format code with Prettier
```

### Database (Prisma)

```bash
pnpm prisma:generate          # Generate Prisma client
pnpm prisma:migrate           # Run migrations (dev)
pnpm prisma:migrate:deploy    # Deploy migrations (production)
pnpm prisma:migrate:status    # Check migration status
pnpm prisma:studio            # Open Prisma Studio GUI
pnpm prisma:seed              # Seed database with sample data
pnpm prisma:reset             # Reset database (⚠️ deletes all data)
pnpm db:push                  # Push schema without migrations
```

### Testing

```bash
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:cov           # Generate coverage report
pnpm test:e2e           # Run end-to-end tests
```

### Build

```bash
pnpm build              # Compile TypeScript to dist/
pnpm start:prod         # Run production build
```

## 🔒 Environment Variables

Create `.env` file in `apps/restaurant-service/`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/restaurant_service"

# Server
PORT=3002
NODE_ENV=development
API_PREFIX=api/v1

# Swagger
SWAGGER_TITLE="Restaurant Service API"
SWAGGER_DESCRIPTION="Comprehensive café and restaurant management API"
SWAGGER_VERSION="1.0"
```

## 📚 Swagger Documentation

Interactive API documentation is automatically generated and available at:

**http://localhost:3002/api/docs**

Features:

- Try out endpoints directly in browser
- View request/response schemas
- See validation rules
- Export OpenAPI spec

## 🧪 Testing

```bash
# Run all unit tests
pnpm test

# Run with coverage
pnpm test:cov

# Run E2E tests
pnpm test:e2e

# Watch mode for TDD
pnpm test:watch
```

## 🏛️ Architecture & Best Practices

### Design Patterns

- **Module-based architecture** for feature isolation
- **Repository pattern** via Prisma service
- **DTO pattern** for validation and transformation
- **Dependency injection** throughout the application
- **Global modules** for shared services (Prisma, Config)

### Validation & Security

- **class-validator** decorators on all DTOs
- **Helmet** for security headers
- **CORS** enabled with configurable origins
- **Whitelist** validation (strips unknown properties)
- **Transform** enabled for automatic type coercion

### Error Handling

- Custom exceptions (NotFoundException, ConflictException)
- Prisma error code handling (P2002, P2025)
- Standardized error responses
- Proper HTTP status codes

### Database Best Practices

- **Indexes** on frequently queried fields (slug, email, status)
- **Cascade deletes** for referential integrity
- **Soft deletes** via status changes (preserves data)
- **Hard deletes** available separately (with caution)
- **Pagination** on all list endpoints
- **Aggregations** for statistics

## 🗺️ Roadmap

**Phase 1: Core CRUD** ✅

- [x] Restaurant management
- [x] Prisma schema with 6 models
- [x] Swagger documentation
- [ ] Menu items module
- [ ] Orders module
- [ ] Tables module
- [ ] Staff module
- [ ] Categories module

**Phase 2: Advanced Features**

- [ ] Authentication & authorization (JWT)
- [ ] Role-based access control (RBAC)
- [ ] File upload for images
- [ ] Real-time updates (WebSockets)
- [ ] Email notifications
- [ ] Rate limiting

**Phase 3: Integration**

- [ ] Analytics integration
- [ ] Payment gateway (Stripe)
- [ ] Reservation system
- [ ] Inventory management
- [ ] Reporting & insights

## 📝 License

Part of the Tavia monorepo. See [LICENSE](../../LICENSE) for details.

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## 📞 Support

For issues and questions:

- Open an issue in the repository
- Check existing documentation
- Review Swagger API docs at `/api/docs`
