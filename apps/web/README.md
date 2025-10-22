# Tavia Web App

The main Next.js 15 web application for Tavia - a café and restaurant booking
platform.

## Features

- ✅ **Next.js 15** with App Router and React 19
- ✅ **TypeScript** for type safety
- ✅ **Internationalization (i18n)** with next-intl (cookie-based, English &
  Vietnamese)
- ✅ **Database** with Prisma ORM + PostgreSQL
- ✅ **Authentication** with Auth.js v5 (credentials + OAuth)
- ✅ **Unit Testing** with Vitest + Testing Library
- ✅ **E2E Testing** with Playwright
- ✅ **ESLint 9** flat config for code quality
- ✅ **Prettier** for code formatting
- ✅ **Turborepo** integration for monorepo builds

## Getting Started

### Prerequisites

- Node.js 18.18.0+ (see `.nvmrc` in root)
- pnpm v10.17.1+

### Installation

From the monorepo root:

```bash
pnpm install
```

### Development

```bash
# Start development server
pnpm dev:web
# Or from root: pnpm dev

# Development server runs on http://localhost:3000
```

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

## Database & Authentication

This app uses **Prisma ORM** with **PostgreSQL** and **Auth.js v5** for
authentication.

### Quick Setup

```bash
# 1. Configure your database URL in .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/tavia_dev?schema=public"

# 2. Generate Prisma Client
pnpm db:generate

# 3. Push schema to database
pnpm db:push

# 4. Seed sample data
pnpm db:seed
```

### Database Commands

```bash
pnpm db:generate          # Generate Prisma Client
pnpm db:push              # Push schema to database (dev)
pnpm db:migrate           # Create migration (production)
pnpm db:seed              # Seed sample data
pnpm db:studio            # Open Prisma Studio GUI
```

### Authentication

Supports multiple authentication methods:

- ✅ Email/Password (credentials)
- ✅ Google OAuth
- ✅ GitHub OAuth

**See [`DATABASE.md`](./DATABASE.md) for complete setup guide.**

## Internationalization (i18n)

The app supports multiple languages using `next-intl` **without routing**
(cookie-based):

- **English (en)** - Default
- **Vietnamese (vi)**

### How It Works

- Locale is stored in a cookie (`NEXT_LOCALE`)
- Falls back to `Accept-Language` header if no cookie is set
- No `/en` or `/vi` URL prefixes needed
- Users switch locales via the LocaleSwitcher component in the header

### Adding a New Language

1. Create a new locale file in `messages/` (e.g., `messages/fr.json`)
2. Add the locale to `i18n/request.ts`:
   ```typescript
   export const locales = ['en', 'vi', 'fr'] as const;
   ```
3. Update the `localeNames` in `components/LocaleSwitcher/LocaleSwitcher.tsx`

### Using Translations in Components

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

### Switching Locales

Users can switch locales using the dropdown in the header. The selection is:

1. Stored in a cookie that expires in 1 year
2. Applied immediately on page reload
3. Remembered across sessions

## Project Structure

```
apps/web/
├── app/
│   ├── layout.tsx          # Root layout with i18n provider & LocaleSwitcher
│   ├── page.tsx            # Home page
│   ├── __tests__/          # Unit tests for pages
│   ├── actions/            # Server actions (locale switching)
│   ├── api/                # API routes
│   ├── globals.css         # Global styles
│   └── fonts/              # Custom fonts
├── components/
│   └── LocaleSwitcher/     # Language switcher component
├── i18n/
│   ├── config.ts           # Shared i18n constants (locales, types)
│   └── request.ts          # i18n request config (cookie-based)
├── messages/
│   ├── en.json             # English translations
│   └── vi.json             # Vietnamese translations
├── lib/
│   ├── auth.ts             # Auth.js configuration
│   ├── prisma.ts           # Prisma client singleton
│   ├── utils.ts            # Utility functions
│   └── __tests__/          # Unit tests for utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── types/
│   └── next-auth.d.ts      # Auth.js type extensions
├── e2e/
│   └── home.spec.ts        # E2E tests
├── tests/
│   └── setup.ts            # Vitest setup
├── vitest.config.ts        # Vitest configuration
├── playwright.config.ts    # Playwright configuration
├── next.config.js          # Next.js configuration with i18n
└── DATABASE.md             # Database & Auth setup guide
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
- `i18n/config.ts` - Shared i18n constants (locales, types)
- `i18n/request.ts` - i18n request configuration (cookie-based)
- `prisma/schema.prisma` - Database schema definition

## Environment Variables

Create a `.env.local` file for local development:

```env
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tavia_dev?schema=public"

# Auth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

See `.env.example` for all available variables and `DATABASE.md` for setup
details.

## Dependencies

This app uses the monorepo's catalog dependencies pattern. All versions are
defined in the root `pnpm-workspace.yaml`.

Key dependencies:

- `next` - Next.js framework
- `next-intl` - Internationalization
- `next-auth` - Authentication
- `@prisma/client` - Database ORM
- `@tavia/core` - Internal UI component library
- `@playwright/test` - E2E testing
- `vitest` - Unit testing
- `@testing-library/react` - React testing utilities

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Auth.js Documentation](https://authjs.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Playwright Documentation](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## Additional Documentation

- [`DATABASE.md`](./DATABASE.md) - Complete database and authentication setup
  guide
