# Tavia

**Tavia** is a modern café and restaurant booking platform built as a
**microservices-first monorepo** with Next.js 15, designed for both customers
(booking tables) and restaurant owners (managing venues and reservations).

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) with React Server Components
- **Auth**: Auth.js (NextAuth) with role-based access control
- **Database**: PostgreSQL via Prisma ORM (shared between apps)
- **Analytics**: @tavia/analytics (in-house event tracking SDK)
- **UI Components**: @tavia/taviad (60+ components with Emotion + Radix UI)
- **Styling**: Emotion CSS-in-JS + Framer Motion animations
- **i18n**: next-intl (cookie-based, modular)
- **API**: Fastify 5 (analytics service) + NestJS 11 (restaurant service)
- **Testing**: Vitest + Testing Library + Playwright
- **State Management**: React Query (@tanstack/react-query)
- **Package Manager**: pnpm v10.19.0 with catalog dependencies
- **Monorepo**: Turborepo for build orchestration and caching
- **Docker**: PostgreSQL 16 Alpine for local development
- **Deployment**: Vercel (fully serverless)

## 📦 Monorepo Structure

```
tavia/
├── apps/
│   ├── backoffice/       # Restaurant management (port 3000)
│   ├── frontoffice/      # Customer restaurant discovery (port 3003)
│   ├── analytics/        # Fastify event tracking API (port 3001)
│   ├── restaurant-service/ # NestJS microservice (port 3002)
│   └── docs/             # Storybook documentation (port 6006)
├── packages/
│   ├── taviad/           # @tavia/taviad - 60+ UI components
│   ├── mobile-ui/        # @tavia/mobile-ui - React Native components
│   ├── analytics/        # @tavia/analytics - Event tracking SDK
│   ├── module-generator/ # Feature module scaffolding
│   ├── eslint-config/    # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
├── scripts/
│   ├── create-app.js     # Next.js webapp generator
│   ├── create-api.js     # Fastify/NestJS API generator
│   ├── create-mobile.js  # Expo mobile app generator
│   └── setup-database.js # Database setup automation
├── templates/            # Generator templates (webapp, simple-api, complex-api, mobile-app)
├── pnpm-workspace.yaml   # Workspace config with catalogs
└── turbo.json            # Turborepo pipeline config
```

## 🎯 Key Features

### Frontoffice (Customer App)

- 🔍 Browse and search restaurants by location, cuisine, and price range
- 📅 Real-time table booking with React Query
- ⭐ Restaurant ratings and reviews
- 🗺️ GPS-based distance calculation
- 📱 Mobile-responsive design
- 🌐 Multi-language support (English/Vietnamese)

### Backoffice (Restaurant Management)

- 🏪 Manage multiple restaurants
- 📊 Dashboard with booking analytics
- 👥 User management (Admin, Owner, Customer roles)
- 📅 Configure opening hours and table capacity
- 🎫 Accept/reject/manage reservations
- � Secure authentication with Auth.js

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: v22.17.1+ (`.nvmrc` specifies 18.18.0 for CI)
- **pnpm**: v10.19.0+
- **Docker Desktop**: For PostgreSQL database

### Quick Start

```bash
# Clone the repository
git clone https://github.com/tavia-io/tavia.git
cd tavia

# Install dependencies
pnpm install

# Set up database (Docker + migrations + seed)
pnpm db:setup

# Start development servers
pnpm dev:frontoffice  # Customer app (localhost:3003)
pnpm dev:backoffice   # Admin app (localhost:3000)
```

### Database Setup

Both frontoffice and backoffice share the same PostgreSQL database:

```bash
# Automated setup (recommended)
pnpm db:setup

# Or manual setup:
cd apps/backoffice
pnpm docker:up          # Start PostgreSQL container
pnpm db:migrate         # Run migrations
pnpm db:seed            # Seed sample data
pnpm db:studio          # Open Prisma Studio GUI
```

**Database Connection:**

- Host: `localhost:5432`
- Database: `tavia`
- User: `postgres`
- Password: `postgres`

**Seeded Data:**

- 6 restaurants (Le Jardin Secret, Sushi Master, Trattoria Bella, etc.)
- 24 tables (4 per restaurant)
- 3 test users (see below)
- 2 sample bookings

**Test Users:**

| Email             | Password | Role             | Access                 |
| ----------------- | -------- | ---------------- | ---------------------- |
| admin@tavia.io    | admin123 | Admin            | Full backoffice access |
| owner@example.com | owner123 | Restaurant Owner | Own restaurants        |
| user@example.com  | user123  | Customer         | Frontoffice only       |

### Environment Variables

**Backoffice** (`apps/backoffice/.env`):

```env
# Database (shared with frontoffice)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia?schema=public"
```

**Frontoffice** (`apps/frontoffice/.env`):

```env
# Database (shared with backoffice)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia?schema=public"

# Auth
NEXTAUTH_URL="http://localhost:3003"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# Analytics Service
NEXT_PUBLIC_ANALYTICS_URL="http://localhost:3001"
```

## 🚦 Development Commands

```bash
# Development
pnpm dev                  # All apps (backoffice + docs)
pnpm dev:backoffice       # Backoffice app (localhost:3000)
pnpm dev:frontoffice      # Frontoffice app (localhost:3003)
pnpm dev:storybook        # Storybook (localhost:6006)

# Generate new applications
pnpm create:app <name>    # Next.js webapp (auto-port 3000-3099)
pnpm create:api <name>    # Fastify/NestJS API (auto-port 4000-4099)
pnpm create:mobile <name> # Expo mobile app

# Examples:
pnpm create:app admin             # Creates apps/admin on port 3089
pnpm create:app customer-portal   # Creates apps/customer-portal on port 3042
pnpm create:api notifications     # Fastify or NestJS (interactive choice)

# Each generated webapp includes:
# - Next.js 15 + TypeScript + Turbopack
# - Modular i18n (7 modules: common, navigation, home, actions, auth, dashboard, errors)
# - Docker PostgreSQL + Prisma
# - @tavia/taviad components + @tavia/analytics
# - Emotion GlobalStyles + React Query
# - Vitest + Playwright
# - Deterministic ports (same name = same port)

# Building & Quality
pnpm build                # Build all with Turborepo
pnpm build --filter=frontoffice  # Build specific app
pnpm lint                 # Lint all (ESLint 9)
pnpm lint:fix             # Auto-fix
pnpm format               # Prettier format
pnpm type-check           # TypeScript check

# Testing
cd packages/taviad
pnpm test                 # Run tests
pnpm test:coverage        # Coverage (80% threshold)
pnpm test:watch           # Watch mode

# Git (ALWAYS USE)
pnpm commit               # Commitizen (conventional commits)
# Pre-commit hooks auto-run: Prettier + type-check
```

## 🗄️ Database Commands

```bash
# Automated Setup (recommended)
pnpm db:setup             # Complete setup: Docker + migrate + seed

# Docker PostgreSQL
cd apps/backoffice        # Or any app with Docker setup
pnpm docker:up            # Start PostgreSQL container
pnpm docker:down          # Stop PostgreSQL container
pnpm docker:logs          # View PostgreSQL logs
pnpm docker:restart       # Restart container
pnpm docker:clean         # Remove container and volumes (⚠️ deletes data)

# Prisma Migrations
pnpm db:generate          # Generate Prisma Client
pnpm db:migrate           # Create migration (development)
pnpm db:migrate:deploy    # Apply migrations (production)
pnpm db:seed              # Seed sample data
pnpm db:studio            # Open Prisma Studio GUI
pnpm db:push              # Push schema without migration

# Complete reset (development only)
pnpm docker:clean         # Remove everything
pnpm docker:up            # Fresh start
pnpm db:migrate           # Recreate schema
pnpm db:seed              # Reseed data
```

### Shared Database Architecture

Both frontoffice and backoffice use the **same PostgreSQL database** (`tavia`):

```
┌─────────────────┐
│  PostgreSQL DB  │
│   "tavia"       │
│  Port: 5432     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼────┐ ┌──▼──────┐
│Backoffice│ │Frontoffice│
│Port 3000│ │Port 3003│
└─────────┘ └─────────┘
```

**Benefits:**

- Restaurant data managed in backoffice appears instantly in frontoffice
- Single source of truth
- No data synchronization needed
- Shared user authentication

## 📚 Component Library (@tavia/taviad)

60+ production-ready React components with full TypeScript support:

**Categories:**

- **Base** (9): Avatar, Badge, Button, ButtonGroup, Code, Icon, Image, Spinner,
  Tag
- **Radix UI** (8): Accordion, Checkbox, DropdownMenu, Modal, Popover, Radio,
  Tabs, Tooltip
- **Form** (19): Calendar, Field, Form, Input, InputNumber, InputSearch,
  InputTags, Label, Select, Combobox, Switch, Slider, TextArea, FileUpload,
  ImageUpload, RichTextEditor, Text
- **Dialog** (4): Alert, Drawer, MenuBar, Toast
- **Layout** (10): Card, Divider, GoogleMap, LeafletMap, MapboxMap,
  LoadingScreen, ScrollBox, Skeleton, Stack, ThemeProvider
- **Navigation** (4): Breadcrumb, Link, Pagination, Sidebar
- **State** (5): EmptyState, ErrorState, LoadingLogo, LoadingState, Progress
- **Table** (2): DataTable, Table

**Features:**

- ✅ Emotion CSS-in-JS with theme tokens
- ✅ Radix UI primitives for accessibility
- ✅ Lucide React icons
- ✅ Responsive design
- ✅ 15-50 tests per component (Vitest)
- ✅ Storybook documentation

```bash
# View component library
pnpm dev:storybook
# Open http://localhost:6006

# Import components
import { Button, Modal, Input, Card } from '@tavia/taviad';
```

## 🏗️ Architecture Patterns

### Microservices-First Monorepo

Each app is an independent service:

- **Frontoffice** (3003): Customer-facing restaurant discovery
- **Backoffice** (3000): Restaurant management dashboard
- **Analytics** (3001): Event tracking API (Fastify)
- **Restaurant Service** (3002): Restaurant microservice (NestJS)

### Shared Database Pattern

Single PostgreSQL database shared between frontoffice/backoffice for real-time
consistency.

### React Query for Data Fetching

Frontoffice uses `@tanstack/react-query` for:

- Automatic caching (5-15 min stale times)
- Loading/error states
- Optimistic updates
- Background refetching

```typescript
// Example usage
import { useSearchRestaurants } from '@/hooks/useRestaurants';

const { data, isLoading } = useSearchRestaurants({
  location: 'Paris',
  guests: 2,
});
```

### Server Actions Pattern

Next.js 15 server actions for type-safe API calls:

- `searchRestaurantsAction()` - Search with filters
- `getRestaurantByIdAction()` - Single restaurant
- `getFeaturedRestaurantsAction()` - Top-rated

### Role-Based Access Control (RBAC)

- `USER`: Browse restaurants, create bookings (frontoffice)
- `RESTAURANT_OWNER`: Manage own venues (backoffice)
- `ADMIN`: Full system access (backoffice)

### Atomic Operations

Prisma transactions prevent double-booking and ensure data consistency.

## 📝 pnpm Catalog Dependencies

Centralized dependency management in `pnpm-workspace.yaml`. **NEVER hardcode
versions.**

```json
// ✅ CORRECT - Use catalog
{
  "dependencies": {
    "next": "catalog:",
    "@emotion/react": "catalog:emotion",
    "@tavia/taviad": "workspace:*"
  }
}

// ❌ WRONG - Hardcoded version
{
  "dependencies": {
    "next": "^15.5.5"
  }
}
```

**Adding dependencies:**

1. Add to `pnpm-workspace.yaml`:
   ```yaml
   catalog:
     new-package: ^1.0.0
   ```
2. Reference in package.json:
   ```json
   { "dependencies": { "new-package": "catalog:" } }
   ```
3. Run `pnpm install`

**Available catalogs:**

- `catalog:` - Main dependencies
- `catalog:emotion` - Emotion packages
- `catalog:next14`, `catalog:next15` - Next.js versions
- `catalog:expo` - React Native/Expo

**Exceptions:** App-specific dependencies (e.g., `sonner` in backoffice) can be
added directly with versions.

## 🧪 Testing

### Component Testing

60+ components in `@tavia/taviad` with 15-50 tests each:

```bash
cd packages/taviad
pnpm test              # Run tests
pnpm test:coverage     # Coverage report (80% threshold)
pnpm test:watch        # Watch mode
```

**Test categories:**

1. Basic rendering
2. Props and variants
3. User interactions
4. Accessibility (ARIA)
5. Display names

### E2E Testing (Playwright)

Critical booking flows:

```bash
cd apps/frontoffice
pnpm test:e2e          # Run Playwright tests
```

### CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`):

- ✅ Lint (ESLint 9)
- ✅ Type check (TypeScript)
- ✅ Build (Turborepo)
- ✅ Test (Vitest)
- ✅ Commitlint

**Triggers:** Push to main/develop, all PRs

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy frontoffice
cd apps/frontoffice
vercel --prod

# Deploy backoffice
cd apps/backoffice
vercel --prod
```

### Environment Variables

Set in Vercel project settings:

- `DATABASE_URL` - Production PostgreSQL (Neon, Supabase, etc.)
- `NEXTAUTH_URL` - Production URL
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`

### Database Migrations

```bash
# Production migrations (run before deploy)
cd apps/backoffice
npx prisma migrate deploy
```

### Production Database

Use managed PostgreSQL:

- **Neon** (recommended, serverless)
- **Supabase** (includes Realtime)
- **AWS RDS**
- **Digital Ocean Managed Databases**

**Important:**

- Enable SSL connections
- Set up connection pooling (Prisma Data Proxy or PgBouncer)
- Regular automated backups
- Use strong passwords

## 📖 Documentation

- **Project Architecture**: See `.github/copilot-instructions.md`
- **Component Library**: `pnpm dev:storybook` → http://localhost:6006
- **Database Schema**: `apps/backoffice/prisma/schema.prisma`
- **Generator Templates**: `templates/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `pnpm commit` (Commitizen)
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

### Coding Guidelines

- ✅ Use TypeScript for all code
- ✅ Follow ESLint 9 flat config
- ✅ Use pnpm catalog dependencies (never hardcode versions)
- ✅ Write 15-50 tests per component
- ✅ Use Emotion for styling (NO SCSS)
- ✅ Prefix unused variables with `_`
- ✅ Use conventional commits (`feat:`, `fix:`, `docs:`, etc.)
- ✅ Update Storybook for new components
- ✅ Run `pnpm lint:fix` and `pnpm format` before commit

### Git Workflow

```bash
git checkout -b feat/your-feature
# Make changes
pnpm commit  # Interactive Commitizen prompt
git push origin feat/your-feature
```

**Pre-commit hooks** auto-run:

- Prettier formatting
- TypeScript type-check

## Acknowledgments

- [Next.js 15](https://nextjs.org/) - React framework
- [Turborepo](https://turborepo.org/) - Monorepo build system
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
- [Lucide React](https://lucide.dev/) - Icon library
- [Prisma](https://www.prisma.io/) - Database ORM
- [Emotion](https://emotion.sh/) - CSS-in-JS
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Fastify](https://fastify.dev/) - Fast web framework
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Vitest](https://vitest.dev/) - Blazing fast unit testing

## 📞 Support

- **Email**: support@tavia.io
- **GitHub Issues**: [Open an issue](https://github.com/tavia-io/tavia/issues)
- **Documentation**: See `.github/copilot-instructions.md`

---

**Built with ❤️ for the restaurant industry**

**Microservices-first architecture • 60+ components • Full TypeScript •
Production-ready**
