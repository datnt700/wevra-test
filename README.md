# Tavia

**Tavia** is a community networking platform built as a **microservices-first
monorepo** with Next.js 15, using a **Freemium model** that empowers Organizers
to easily create groups, host events, and grow their communities, while
providing Attendees unlimited access to discover and join activities.

The platform acts as a **broker between two sides**:

- **Organizers (B2B)** who need tools to manage and grow communities
- **Attendees (B2C)** who want to discover relevant activities

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) with React Server Components
- **Auth**: Auth.js (NextAuth) with role-based access control (Admin, Organizer,
  Attendee, Moderator)
- **Database**: PostgreSQL via Prisma ORM (shared between apps)
- **Payments**: Stripe for subscription billing (Monthly/Annual plans)
- **Analytics**: @tavia/analytics (in-house event tracking SDK)
- **UI Components**: @tavia/taviad (60+ components with Emotion + Radix UI)
- **Styling**: Emotion CSS-in-JS + Framer Motion animations
- **i18n**: next-intl (cookie-based, modular)
- **API**: Fastify 5 (analytics service) + NestJS 11 (event service)
- **Testing**: Vitest + Testing Library + Playwright
- **State Management**: React Query (@tanstack/react-query)
- **Realtime**: Supabase Realtime for notifications (Phase 2)
- **Package Manager**: pnpm v10.19.0 with catalog dependencies
- **Monorepo**: Turborepo for build orchestration and caching
- **Docker**: PostgreSQL 16 Alpine for local development
- **Deployment**: Vercel (fully serverless)

## 📦 Monorepo Structure

```
tavia/
├── apps/
│   ├── backoffice/       # Event organizer management (port 3000)
│   ├── frontoffice/      # User event discovery & participation (port 3003)
│   ├── analytics/        # Fastify event tracking API (port 3001)
│   ├── event-service/    # NestJS microservice (port 3002)
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

## 🎯 Product Vision & Model

### Freemium Business Model

Tavia uses a **two-sided platform** (broker model) connecting:

- **Organizers (B2B)**: Community managers who create and host events
- **Attendees (B2C)**: Individuals discovering and joining activities

### Monetization Strategy

**Free Plan** (Organizers)

- ✅ Create 1 group with max 50 members
- ✅ Host up to 2 events per month
- ✅ Basic tools: RSVP, simple chat, manual approvals
- ⚠️ Platform watermark on pages
- ❌ No analytics or custom branding

**Premium Plan** (Organizers - Pro/Business)

- 🚀 Unlimited groups and members
- 🚀 Unlimited events per month
- 📊 Advanced analytics (growth, retention, engagement)
- 🎨 Custom branding (logo, colors, domain)
- 👥 Add moderators and co-hosts
- 🤖 Automated member management
- 📈 Growth insights and retention curves

**Attendees** (Always Free)

- 🎉 Unlimited group joining
- 🎉 Unlimited event participation
- 🔍 Advanced discovery and recommendations

## 🎯 Key Features

### Frontoffice (Attendee App) - B2C

- 🔍 **Discovery**: Browse events by location, category, date, and interests
- 👥 **Communities**: Join unlimited groups and participate
- 📅 **RSVP**: Reserve spots for events with automatic notifications
- ⭐ **Engagement**: Rate events and provide feedback
- 🗺️ **Location**: GPS-based distance calculation
- 🔔 **Notifications**: Push/email reminders for upcoming events
- 📱 **Mobile-responsive**: Seamless experience across devices
- 🌐 **Multi-language**: English/Vietnamese support

### Backoffice (Organizer Management) - B2B

**Free Tier Features:**

- 🎯 Create 1 group (max 50 members)
- 📅 Host 2 events per month
- 👥 Manual member approval
- 📊 Basic counts (members, RSVPs)
- 🎫 Simple RSVP management
- ✉️ Email notifications

**Premium Tier Features:**

- 🚀 **Unlimited**: Groups, members, and events
- 📊 **Advanced Analytics**: Growth charts, attendance rates, retention curves,
  top attendees
- 🎨 **Custom Branding**: Logo, colors, theme, optional domain
- 👥 **Team Management**: Add moderators and co-hosts
- 🤖 **Automation**: Auto-approval rules, member segmentation, bulk actions
- 📈 **Insights**: Engagement heatmaps, behavior data
- 🔐 **Premium Support**: Priority assistance

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
pnpm dev:frontoffice  # User app (localhost:3003)
pnpm dev:backoffice   # Organizer app (localhost:3000)
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

- 10 sample events across different categories (Tech, Music, Sports, Arts)
- 5 groups (2 Free tier with 50 member limit, 3 Premium with unlimited)
- 5 test users: 1 admin, 2 organizers (1 free, 1 premium), 2 attendees
- 20+ RSVPs demonstrating event participation
- Sample analytics data for Premium features

**Test Users:**

| Email                   | Password     | Role      | Subscription | Access                                       |
| ----------------------- | ------------ | --------- | ------------ | -------------------------------------------- |
| admin@tavia.io          | admin123     | Admin     | N/A          | Full system access                           |
| organizer.free@tavia.io | organizer123 | Organizer | Free         | 1 group (50 max), 2 events/month, basic      |
| organizer.pro@tavia.io  | organizer123 | Organizer | Premium      | Unlimited groups/events, analytics, branding |
| attendee1@tavia.io      | attendee123  | Attendee  | Free         | Unlimited joining and participation          |
| attendee2@tavia.io      | attendee123  | Attendee  | Free         | Unlimited joining and participation          |

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

- Event data managed in backoffice appears instantly in frontoffice
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

- **Frontoffice** (3003): User-facing event discovery and participation
- **Backoffice** (3000): Organizer event and group management dashboard
- **Analytics** (3001): Event tracking API (Fastify)
- **Event Service** (3002): Event microservice (NestJS)

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
import { useSearchEvents } from '@/hooks/useEvents';

const { data, isLoading } = useSearchEvents({
  location: 'Paris',
  category: 'TECH',
  date: '2025-12-01',
});
```

### Server Actions Pattern

Next.js 15 server actions for type-safe API calls:

- `searchEventsAction()` - Search events with filters
- `getEventByIdAction()` - Single event details
- `getFeaturedEventsAction()` - Featured events
- `joinEventAction()` - Join an event
- `getEventGroupsAction()` - List event groups

### Role-Based Access Control (RBAC)

- **ATTENDEE**: Browse/join events and groups, unlimited participation
  (frontoffice)
- **ORGANIZER**: Create/manage events and groups with Free or Premium features
  (backoffice)
- **MODERATOR**: Assist organizers with group management (Premium feature)
- **ADMIN**: Full system access, user management, subscription oversight
  (backoffice)

### Freemium Logic & Feature Flags

Central permission service checks plan limits:

```typescript
// Feature flag checks
canCreateGroup(user); // Free: 1 group, Premium: unlimited
canCreateEvent(user, groupId); // Free: 2/month, Premium: unlimited
getMaxMembers(groupId); // Free: 50, Premium: unlimited
canAccessAnalytics(user); // Premium only
canCustomizeBranding(user); // Premium only
```

**Upsell Triggers:**

- Group hits 50 members → Upgrade modal
- Creating 3rd event of month → Block + Premium paywall
- Accessing analytics → Premium paywall
- Customizing branding → Premium paywall

### Stripe Subscription Management

- Monthly and Annual billing cycles
- Instant Premium feature unlock on upgrade
- Graceful downgrade: freeze premium features, preserve data
- Webhook handling for payment events
- Trial period support (optional)

### Atomic Operations

Prisma transactions prevent duplicate event registrations and ensure data
consistency.

## 📊 Product Goals & Success Metrics

### Business Objectives

1. **Acquire Organizers**: Generous Free tier to attract community builders
2. **Maximize Attendee Liquidity**: Unlimited joining and participation to grow
   the network
3. **Drive Premium Conversions**: High-value features incentivize upgrades
4. **Ecosystem Growth**: More groups → more events → more users → more paid
   organizers

### Key Performance Indicators (KPIs)

**Activation Metrics:**

- New group creation rate
- First event creation rate (within 7 days of signup)
- Time to first member invite

**Engagement Metrics:**

- Monthly Active Attendees (MAA)
- Events per group (avg)
- RSVPs per event (avg)
- Event attendance rate (%)
- Member retention in groups (30/60/90 day)

**Revenue Metrics:**

- Free → Premium conversion rate (%)
- Monthly Recurring Revenue (MRR)
- Average Revenue Per Organizer (ARPO)
- Organizer churn rate (%)
- Lifetime Value (LTV) / Customer Acquisition Cost (CAC)

**Platform Health:**

- Groups created per week
- Events hosted per week
- Total platform RSVPs
- Organizer/Attendee ratio

## 🗓️ Product Roadmap

### Phase 1: MVP (Current Development)

**Core Features:**

- ✅ User authentication (email + social login)
- ✅ Free Plan: 1 group (max 50 members), 2 events/month
- ✅ Group creation and management
- ✅ Event CRUD with RSVP system
- ✅ Basic analytics (counts and lists)
- ✅ Manual member approval
- ✅ Email notifications
- ✅ Attendee discovery (browse groups/events)

**Premium Features:**

- 🚧 Stripe subscription billing (Monthly/Annual)
- 🚧 Unlimited groups and events
- 🚧 Advanced analytics dashboard
- 🚧 Custom branding (logo, colors)
- 🚧 Member auto-approval rules

**Infrastructure:**

- ✅ Next.js 15 App Router
- ✅ PostgreSQL + Prisma ORM
- ✅ @tavia/taviad component library
- 🚧 Stripe integration
- 🚧 Feature flag system

### Phase 2: Growth & Automation (Q2 2025)

**Organizer Features:**

- 👥 Moderator roles and permissions
- 🤖 Automated member segmentation (active/inactive)
- 📊 Engagement heatmaps
- 📈 Growth forecasting
- 🔄 Recurring events
- 💌 Bulk email campaigns
- 📱 Mobile app notifications

**Attendee Features:**

- 🎯 AI-powered event recommendations
- 🏆 Gamification (badges, leaderboards)
- 💬 In-app messaging
- 📅 Personal event calendar sync

**Platform:**

- ⚡ Real-time notifications (Supabase Realtime)
- 🔍 Advanced search filters
- 📍 Geolocation-based discovery
- 🌐 Additional language support

### Phase 3: Marketplace & Monetization (Q3-Q4 2025)

**Premium Expansion:**

- 🎫 Paid events and ticketing
- 💳 Payment processing for organizers
- 📊 Revenue sharing model
- 🏢 Enterprise plan (white-label, API access)

**Platform Growth:**

- 🤝 Integration marketplace (Zoom, Meet, Calendar)
- 🔌 Public API for developers
- 🎨 Custom domain support
- 📱 Native mobile apps (iOS/Android)
- 🌍 Multi-region deployment

**AI & Insights:**

- 🧠 ML-based attendee matching
- 📈 Predictive analytics for organizers
- 🎤 AI event description generator
- 📸 Automated content moderation

### Future Considerations (2026+)

- Affiliate/referral program for organizers
- Community marketplace (sponsors, vendors)
- Live streaming integration
- Virtual event support (hybrid events)
- B2B Enterprise solutions

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

Critical event participation flows:

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

### AWS Amplify (Recommended for Now)

Simple deployment for backoffice and frontoffice:

**1. Deploy Backoffice:**

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. **New app → Host web app → GitHub** → Select `tavia` repo
3. App name: `tavia-backoffice`
4. Build settings: Auto-detected from `amplify.yml`
5. Add environment variables (see below)
6. **Save and deploy**

**2. Deploy Frontoffice:**

1. Create second Amplify app: `tavia-frontoffice`
2. Same repo/branch
3. Build settings: Use `amplify-frontoffice.yml`
4. Add environment variables
5. **Save and deploy**

**Environment Variables (Both Apps):**

```bash
# Database (shared between both apps)
DATABASE_URL=postgresql://user:password@host:5432/tavia

# Backoffice additional vars:
NEXTAUTH_URL=https://admin.tavia.io
NEXTAUTH_SECRET=<generate-32-char-secret>
JWT_SECRET=<generate-32-char-secret>
WEBHOOK_SECRET=<generate-32-char-secret>
NEXT_PUBLIC_APP_URL=https://admin.tavia.io

# Frontoffice additional vars:
NEXT_PUBLIC_APP_URL=https://app.tavia.io
```

**Generate Secrets:**

```bash
# Run 3 times for NEXTAUTH_SECRET, JWT_SECRET, WEBHOOK_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Database Options:**

- **Neon PostgreSQL** (Serverless, FREE tier) - Recommended for MVP
- **AWS RDS** (Managed, $13-26/month)
- **Supabase** (Includes Realtime features)

**Custom Domains:**

- Add `admin.tavia.io` → backoffice
- Add `app.tavia.io` → frontoffice
- SSL certificates provisioned automatically

**Cost:** ~$20-30/month (with free database tier)

### Terraform (Production Infrastructure)

For production-grade deployment with auto-scaling, see `terraform/README.md`:

- ECS Fargate for containerized apps
- RDS PostgreSQL with Multi-AZ
- Application Load Balancer with HTTPS
- Auto-scaling (2-10 tasks)
- CloudWatch monitoring
- **Cost:** ~$170-220/month

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Database Migrations

```bash
# Run migrations before deploy
DATABASE_URL="postgresql://..." pnpm --filter=backoffice db:migrate:deploy
```

## 📖 Documentation

### Project Documentation

- **Project Architecture**: `.github/copilot-instructions.md`
- **Component Library**: `pnpm dev:storybook` → http://localhost:6006
- **Database Schema**: `apps/backoffice/prisma/schema.prisma`
- **Generator Templates**: `templates/` directory

### App-Specific READMEs

- **Backoffice**: `apps/backoffice/README.md`
  - Authentication setup
  - API routes documentation
  - Webhook integration
  - Role-based access control
  - Feature flags and Freemium model

- **Frontoffice**: `apps/frontoffice/README.md`
  - Server actions pattern
  - React Query setup
  - Event discovery flow
  - RSVP system

- **Mobile**: `apps/mobile/README.md`
  - Expo setup
  - Platform-specific storage
  - API configuration
  - Testing on physical devices

### Package Documentation

- **@tavia/taviad**: `packages/taviad/README.md` - 60+ web components
- **@tavia/taviax**: `packages/taviax/README.md` - React Native components
- **@tavia/analytics**: `packages/analytics/README.md` - Event tracking SDK
- **@tavia/env**: `packages/env/README.md` - Type-safe environment variables
- **@tavia/logger**: `packages/logger/README.md` - Structured logging
- **@tavia/module-generator**: `packages/module-generator/README.md` - Feature
  scaffolding

### Deployment & Infrastructure

- **AWS Amplify**: See "Deployment" section above
- **Terraform**: `terraform/README.md` - Production infrastructure as code
- **Database Setup**: `apps/backoffice/DATABASE.md`
- **Docker**: `apps/backoffice/DOCKER.md`

### API Documentation

**Interactive API Docs** (when backoffice is running):

- **Swagger UI**: http://localhost:3000/api/docs/swagger (Try requests directly)
- **Redoc**: http://localhost:3000/api/docs/redoc (Clean documentation)
- **OpenAPI JSON**: http://localhost:3000/api/docs

**Available API Routes:**

- `/api/mobile/*` - Mobile app endpoints (CORS enabled)
- `/api/webhooks` - Generic webhook with HMAC verification
- `/api/health` - Health check endpoint
- `/api/auth/[...nextauth]` - Auth.js authentication

See backoffice README for detailed API documentation.

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

**Built with ❤️ for event organizers and communities**

**Microservices-first architecture • 60+ components • Full TypeScript •
Production-ready**
