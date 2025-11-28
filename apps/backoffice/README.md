# Tavia Backoffice

> Admin and Restaurant Owner management platform

The Tavia Backoffice is a Next.js 15 application for restaurant and café owners
to manage their establishments, bookings, and tables.

**Note**: This is NOT the customer-facing booking app. Customers will use a
separate application to browse and book restaurants.

## 🎯 Purpose

This application is designed for:

- **Admins**: Manage all restaurants and system settings
- **Restaurant Owners**: Manage their own restaurants, bookings, and tables

Only users with **ADMIN** or **RESTAURANT_OWNER** roles can access this
application.

## Features

- ✅ **Email/Password Authentication** - Secure login with Auth.js (NextAuth)
- ✅ **Role-Based Access Control** - Admin and Restaurant Owner roles
- ✅ **Restaurant Management** - Create, update, and manage restaurant
  information
- ✅ **Booking Management** - View and manage customer bookings
- ✅ **Table Management** - Configure and manage restaurant tables
- ✅ **Next.js 15** with App Router and React 19
- ✅ **TypeScript** for type safety
- ✅ **Database** with Prisma ORM + PostgreSQL
- ✅ **UI Components** - @tavia/taviad design system
- ✅ **Unit Testing** with Vitest + Testing Library
- ✅ **E2E Testing** with Playwright
- ✅ **ESLint 9** flat config for code quality
- ✅ **Prettier** for code formatting
- ✅ **Turborepo** integration for monorepo builds

## Getting Started

### Prerequisites

- Node.js 18.18.0+ (see `.nvmrc` in root)
- pnpm v10.17.1+
- PostgreSQL (via Docker or local installation)

### Installation

From the monorepo root:

```bash
pnpm install
```

### Database Setup

From the `apps/web` directory:

```bash
# One command to set up everything
pnpm db:setup
```

This will:

1. Start PostgreSQL in Docker
2. Run database migrations
3. Seed initial data (including test admin user)

### Development

```bash
# Start development server
pnpm dev:web
# Or from root: pnpm dev

# Development server runs on http://localhost:3000
```

### Default Test Users

After running `pnpm db:seed`, you'll have these test accounts:

**Admin User:**

- Email: `admin@tavia.io`
- Password: `admin123`
- Role: ADMIN

**Restaurant Owner:**

- Email: `owner@example.com`
- Password: `owner123`
- Role: RESTAURANT_OWNER

**Regular User (Cannot access backoffice):**

- Email: `user@example.com`
- Password: `user123`
- Role: USER

### Building

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

Unit tests are located in `__tests__` directories next to the components/modules
they test.

### E2E Tests (Playwright)

```bash
# Run E2E tests (headless)
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Run E2E tests in headed mode (visible browser)
pnpm test:e2e:headed
```

E2E tests are located in the `e2e/` directory.

**Note**: Playwright will automatically start the dev server before running
tests.

### Playwright Browsers Setup

First time running Playwright? Install browsers:

```bash
npx playwright install
```

## Authentication

### Login Flow

1. Navigate to http://localhost:3000
2. You'll be automatically redirected to `/login`
3. Enter your email and password
4. **Only users with ADMIN or RESTAURANT_OWNER roles can access the backoffice**
5. Regular USER role will be denied access
6. After successful login, you'll be redirected to `/dashboard`

### Supported Authentication Methods

Currently:

- ✅ **Email/Password** (Credentials provider)

Future (OAuth disabled for now):

- ⏳ Google OAuth (optional)
- ⏳ GitHub OAuth (optional)

### User Roles

- **ADMIN**: Full access to all restaurants, users, and system settings
- **RESTAURANT_OWNER**: Access to their own restaurants, tables, and bookings
- **USER**: Cannot access backoffice (for customer-facing app only)

### Adding New Users

New backoffice users can be created by:

1. **Admins** - Can create other admins or restaurant owners
2. **System Registration** - (To be implemented) Contact form for new restaurant
   owners

**See [`DATABASE.md`](./DATABASE.md) for complete setup guide.**

## Database

This app uses **Prisma ORM** with **PostgreSQL**.

### Database Commands

```bash
# Docker Management
pnpm docker:up            # Start PostgreSQL container
pnpm docker:down          # Stop PostgreSQL container
pnpm docker:logs          # View PostgreSQL logs
pnpm docker:restart       # Restart container
pnpm docker:clean         # Remove container and volumes (⚠️ deletes data)

# Prisma Commands
pnpm db:setup             # Full setup: Docker + migrations + seed
pnpm db:generate          # Generate Prisma Client
pnpm db:push              # Push schema changes (dev only)
pnpm db:migrate           # Create and apply migration
pnpm db:migrate:deploy    # Apply migrations (production)
pnpm db:seed              # Seed sample data
pnpm db:studio            # Open Prisma Studio GUI (http://localhost:5555)
```

### Database Schema

Key models:

- **User** - Admin, owner, and customer accounts with role field
- **Restaurant** - Restaurant/café information
- **Table** - Restaurant table configurations
- **Booking** - Customer reservations
- **AnalyticsEvent** - Usage tracking
- **Account, Session, VerificationToken** - Auth.js models

### Making Schema Changes

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
pnpm db:migrate
# 3. Verify in Prisma Studio
pnpm db:studio
# 4. Commit migration files
git add prisma/migrations/
```

## Project Structure

```
apps/web/
├── app/
│   ├── (auth)/             # Authentication route group
│   │   ├── login/          # Login page
│   │   └── layout.tsx      # Auth layout
│   ├── dashboard/          # Main dashboard (requires auth)
│   ├── restaurants/        # Restaurant management (to be implemented)
│   ├── bookings/           # Booking management (to be implemented)
│   ├── tables/             # Table management (to be implemented)
│   ├── api/
│   │   └── auth/           # Auth.js API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Root redirect (to /dashboard or /login)
│   └── globals.css         # Global styles
├── components/             # React components
├── lib/
│   ├── auth.ts             # Auth.js configuration (role-based access)
│   ├── prisma.ts           # Prisma client singleton
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── types/
│   └── next-auth.d.ts      # Auth.js type extensions
├── e2e/
│   └── home.spec.ts        # E2E tests
├── tests/
│   └── setup.ts            # Vitest setup
├── docker-compose.yml      # PostgreSQL Docker setup
├── vitest.config.ts        # Vitest configuration
├── playwright.config.ts    # Playwright configuration
└── next.config.js          # Next.js configuration
```

## Code Quality

### Linting

```bash
# Run ESLint
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix
```

### Formatting

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

### Type Checking

```bash
# Run TypeScript type checking
pnpm type-check
```

## Configuration Files

- `next.config.js` - Next.js configuration with next-intl plugin
- `tsconfig.json` - TypeScript configuration (extends monorepo config)
- `eslint.config.js` - ESLint 9 flat config
- `vitest.config.ts` - Vitest test runner configuration
- `playwright.config.ts` - Playwright E2E testing configuration
- `docker-compose.yml` - PostgreSQL Docker setup
- `prisma/schema.prisma` - Database schema definition

## Environment Variables

### Quick Setup

Create `.env` file from the example:

```bash
cp .env.example .env
```

### Required Variables

```env
# Database (shared with frontoffice)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia?schema=public"

# PostgreSQL Docker Container Settings
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=tavia

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-32-char-secret>

# JWT for Mobile Auth (Optional - uses NEXTAUTH_SECRET as fallback)
JWT_SECRET=<generate-32-char-secret>

# App Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Tavia
```

### OAuth Providers (Optional)

For social login functionality:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

📖 **See `docs/OAUTH_QUICKSTART.md` for step-by-step OAuth setup guide**

### Stripe Configuration (Required for Premium Features)

```env
# Stripe Subscription Billing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_MONTHLY_PRICE_ID=price_xxx  # $29/month plan
STRIPE_ANNUAL_PRICE_ID=price_xxx   # $290/year plan
```

### Analytics (Optional)

```env
# Analytics API
ANALYTICS_API_KEY=your-api-key

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_STRIPE=true
```

### Email Configuration (Optional)

For magic links and notifications:

```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@tavia.com
```

### Generate Secrets

**For NEXTAUTH_SECRET and JWT_SECRET:**

```bash
# Method 1: OpenSSL
openssl rand -base64 32

# Method 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Output example: YCOCS7wRIczdIfSbIaDf7vkx5r6R7vQvRNItJAV/OOM=
```

### Environment Types

Next.js supports multiple environment files:

- `.env` - Default for all environments
- `.env.local` - Local overrides (gitignored, highest priority)
- `.env.development` - Development mode (`npm run dev`)
- `.env.production` - Production builds (`npm run build`)
- `.env.test` - Test environment

**Priority:** `.env.local` > `.env.{NODE_ENV}` > `.env`

### Security Best Practices

✅ **DO:**

- Use `NEXT_PUBLIC_` prefix for client-accessible variables
- Store secrets in `.env.local` (gitignored)
- Rotate secrets regularly
- Use environment-specific values

❌ **DON'T:**

- Commit `.env.local` or `.env` files
- Store sensitive data in `NEXT_PUBLIC_` variables
- Use production credentials in development
- Hardcode secrets in source code

See `.env.example` for complete variable list and `DATABASE.md` for setup
details.

## Dependencies

This app uses the monorepo's catalog dependencies pattern. All versions are
defined in the root `pnpm-workspace.yaml`.

Key dependencies:

- `next` - Next.js framework (15.5.5)
- `next-auth` - Authentication with Auth.js v5
- `@prisma/client` - Database ORM
- `@tavia/taviad` - Internal UI component library
- `bcryptjs` - Password hashing
- `zod` - Schema validation
- `@playwright/test` - E2E testing
- `vitest` - Unit testing
- `@testing-library/react` - React testing utilities

## Roadmap

**Completed:**

- ✅ Email/Password authentication
- ✅ Role-based access control
- ✅ Dashboard with stats
- ✅ Restaurant list view

**In Progress:**

- 🔄 Restaurant CRUD operations
- 🔄 Table management
- 🔄 Booking management

**Planned:**

- ⏳ User management (admin only)
- ⏳ Settings page
- ⏳ Analytics dashboard
- ⏳ Email notifications
- ⏳ Audit logs

## API Documentation

When the backoffice is running, access interactive API documentation:

### Interactive Docs (Development)

- **Swagger UI** (Try requests): http://localhost:3000/api/docs/swagger
- **Redoc** (Clean docs): http://localhost:3000/api/docs/redoc
- **OpenAPI JSON**: http://localhost:3000/api/docs

### Production URLs

- **Swagger UI**: https://admin.tavia.io/api/docs/swagger
- **Redoc**: https://admin.tavia.io/api/docs/redoc
- **OpenAPI JSON**: https://admin.tavia.io/api/docs

### When to Use What

**Swagger UI** (`/api/docs/swagger`):

- ✅ Interactive API testing
- ✅ Try requests directly in browser
- ✅ Test authentication flows
- ✅ See request/response examples
- ✅ Best for development and QA

**Redoc** (`/api/docs/redoc`):

- ✅ Clean, professional documentation
- ✅ Better for reading and understanding
- ✅ Mobile-optimized
- ✅ Three-panel layout (nav, content, code)
- ✅ Best for production documentation

### Available API Routes

**Mobile App Endpoints** (`/api/mobile/*`):

- `POST /api/mobile/auth/login` - Login (email/password)
- `POST /api/mobile/auth/signup` - Register new user
- `GET /api/mobile/auth/me` - Get current user (JWT auth)
- `GET /api/mobile/events` - Search events
- `GET /api/mobile/events/:id` - Event details
- `POST /api/mobile/events/:id/join` - Join event (RSVP)

**Webhooks**:

- `POST /api/webhooks` - Generic webhook (HMAC verification)
- `GET /api/webhooks` - Webhook documentation

**Health Check**:

- `GET /api/health` - Service health status

**Authentication** (Auth.js):

- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get session
- `GET /api/auth/csrf` - CSRF token

### Authentication Methods

**Web (Auth.js):**

- Email/Password credentials
- Session-based (cookies)
- Roles: ADMIN, ORGANIZER, MODERATOR

**Mobile (JWT):**

- Email/Password credentials
- Token-based (Bearer tokens)
- Role: ATTENDEE

### Testing APIs

**Using Swagger UI:**

1. Go to http://localhost:3000/api/docs/swagger
2. Click "Authorize" button (top right)
3. For JWT endpoints: Enter `Bearer <your-token>`
4. Click endpoint → "Try it out" → Fill parameters → "Execute"

**Using cURL:**

```bash
# Login
curl -X POST http://localhost:3000/api/mobile/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"attendee1@tavia.io","password":"attendee123"}'

# Get current user (JWT auth)
curl http://localhost:3000/api/mobile/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Search events
curl "http://localhost:3000/api/mobile/events?location=Paris&category=TECH"
```

**Using PowerShell:**

```powershell
# Login
$body = @{
    email = "attendee1@tavia.io"
    password = "attendee123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/mobile/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

# Get current user
$token = "YOUR_JWT_TOKEN"
Invoke-RestMethod -Uri "http://localhost:3000/api/mobile/auth/me" `
    -Headers @{ Authorization = "Bearer $token" }
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth.js Documentation](https://authjs.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Playwright Documentation](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [@tavia/taviad Component Library](../../packages/core/README.md)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Redoc](https://redocly.com/redoc/)
- [OpenAPI Specification](https://swagger.io/specification/)

## Additional Documentation

- [`DATABASE.md`](./DATABASE.md) - Complete database and authentication setup
  guide
- [`DOCKER.md`](./DOCKER.md) - Docker setup and commands
- [`src/app/api/webhooks/README.md`](./src/app/api/webhooks/README.md) - Webhook
  integration guide
