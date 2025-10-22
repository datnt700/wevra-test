# Tavia

**Tavia** is a modern, serverless café and restaurant booking platform built
with Next.js 15, designed for both clients (booking tables) and owners (managing
venues and reservations).

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) with React Server Components
- **Auth**: Auth.js (NextAuth) with role-based access control
- **Database**: PostgreSQL via Prisma ORM (Supabase/Neon)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Realtime**: Supabase Realtime for live booking updates
- **Notifications**: Resend (email) + FCM (push notifications)
- **Payments**: Stripe (optional, for deposits)
- **Package Manager**: pnpm with catalog dependencies
- **Monorepo**: Turborepo for build orchestration and caching
- **Deployment**: Vercel (fully serverless)

## 📦 Monorepo Structure

```
tavia/
├── apps/
│   ├── web/              # Next.js 15 app (client + owner interfaces)
│   └── docs/             # Storybook documentation
├── packages/
│   ├── core/             # Shared UI component library
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utilities
│   ├── config/           # Shared configurations
│   ├── eslint-config/    # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
├── pnpm-workspace.yaml   # Workspace config with catalogs
└── turbo.json            # Turborepo pipeline config
```

## 🎯 Key Features

### For Clients

- 🔍 Browse and search cafés/restaurants by location, cuisine, and availability
- 📅 Real-time table booking with instant confirmation
- 🔔 Email and push notifications for booking updates
- ⭐ Review and rate venues
- 📱 Mobile-responsive interface

### For Owners

- 🏪 Manage multiple venues and locations
- 📊 Dashboard with booking analytics
- ⚡ Real-time booking management
- 📅 Configure opening hours and capacity
- 🎫 Accept/reject/manage reservations
- 📈 Track occupancy and revenue

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **pnpm**: v10.17.1+
- **PostgreSQL**: Database (Supabase or Neon recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/tavia-io/tavia.git
cd tavia

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your credentials

# Run database migrations
cd apps/web
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### Environment Variables

Create `apps/web/.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tavia"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase (Realtime)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Email (Resend)
RESEND_API_KEY="re_xxx"

# Stripe (optional)
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
```

## 🚦 Development Commands

```bash
# Start all apps in development mode
pnpm dev

# Start specific app
pnpm dev:web          # Start web app on localhost:3000
pnpm dev:storybook    # Start Storybook on localhost:6006

# Create a new web app systematically
pnpm create:app <app-name>
pnpm create:app admin           # Creates apps/admin on port 3089
pnpm create:app customer-portal # Creates apps/customer-portal on port 3042

# Build all apps
pnpm build

# Build specific app
pnpm build --filter=web
pnpm build --filter=@tavia/docs

# Lint all packages
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

## 🗄️ Database Commands

```bash
# Create and apply migration
npx prisma migrate dev --name add_feature

# Apply migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Reset database (development only)
npx prisma migrate reset
```

## 📚 Component Library

The `@tavia/core` package contains a comprehensive component library with:

- ✅ **50+ React components** built with Emotion and Radix UI
- ✅ **Lucide React icons** for consistent iconography
- ✅ **Responsive design** with mobile-first approach
- ✅ **Accessibility** (WCAG 2.1 AA compliant)
- ✅ **Storybook documentation** with live examples
- ✅ **TypeScript** for type safety

View the component library:

```bash
pnpm dev:storybook
# Open http://localhost:6006
```

## 🏗️ Architecture Patterns

### Serverless-First

All backend logic runs as Next.js API routes or Server Actions. No traditional
server required.

### Role-Based Access Control

- `CLIENT`: Can browse cafés and create bookings
- `OWNER`: Can manage venues and handle reservations

### Atomic Booking Logic

Uses Prisma transactions to prevent double-booking and ensure data consistency.

### Timezone Management

All timestamps stored in UTC, converted to user's timezone on display.

### Real-time Updates

Supabase Realtime for live booking notifications between clients and owners.

## 📝 pnpm Catalog Dependencies

This project uses pnpm catalogs for centralized dependency management. **Never
hardcode versions in package.json**.

```json
{
  "dependencies": {
    "next": "catalog:", // ✅ Use catalog
    "react": "catalog:", // ✅ Use catalog
    "@tavia/core": "workspace:*" // ✅ Internal packages
  }
}
```

Add new dependencies to `pnpm-workspace.yaml` first:

```yaml
catalog:
  new-package: ^1.0.0
```

Then reference in package.json:

```json
{
  "dependencies": {
    "new-package": "catalog:"
  }
}
```

## 🧪 Testing (Coming Soon)

- **E2E Tests**: Playwright for critical booking flows
- **Unit Tests**: Vitest for business logic
- **API Tests**: Test server actions with mock Prisma
- **Visual Tests**: Chromatic for Storybook components

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy to production
vercel --prod

# Or connect your GitHub repo for automatic deployments
```

### Database Migrations

```bash
# Production migrations
npx prisma migrate deploy
```

### Environment Variables

Set all environment variables in your Vercel project settings.

## 📖 Documentation

- **API Documentation**: See `.github/copilot-instructions.md`
- **Component Library**: Run `pnpm dev:storybook`
- **Database Schema**: See `prisma/schema.prisma`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Coding Guidelines

- Use TypeScript for all code
- Follow ESLint and Prettier configurations
- Use pnpm catalog dependencies
- Write tests for new features
- Update Storybook documentation for new components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- Built with [Next.js 15](https://nextjs.org/)
- Monorepo powered by [Turborepo](https://turborepo.org/)
- Components built with [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Database ORM by [Prisma](https://www.prisma.io/)

## 📞 Support

For support, email support@tavia.io or open an issue on GitHub.

---

**Built with ❤️ for the café and restaurant industry**
