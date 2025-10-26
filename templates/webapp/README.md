# Webapp Template# Generic Next.js 15 Webapp Template

A production-ready Next.js 15 webapp template for the Tavia monorepo, featuring
modern best practices, internationalization, and complete testing setup.This is
a **generic template** for creating new Next.js 15 web applications in

the Tavia monorepo. It contains minimal structure without business-specific

## 🎯 Featureslogic.

- ✅ **Next.js 15** with App Router and React 19## 🎯 Purpose

- ✅ **TypeScript** for type safety

- ✅ **Modular i18n** with next-intl (English & Vietnamese)This template
  provides a clean starting point with:

- ✅ **Prisma ORM** with PostgreSQL Docker setup

- ✅ **@tavia/core** UI component library with Emotion styling- ✅ Next.js 15
  App Router setup

- ✅ **@tavia/analytics** SDK for event tracking- ✅ TypeScript configuration

- ✅ **Vitest** with Testing Library and Istanbul coverage- ✅ Basic
  internationalization (i18n) with next-intl

- ✅ **ESLint 9** flat config with strict rules- ✅ Prisma ORM setup (no models,
  just structure)

- ✅ **React Hook Form** with Zod validation- ✅ Testing setup with Vitest

- ✅ **Framer Motion** for animations- ✅ ESLint configuration

- ✅ Example pages and components

## 📁 Project Structure- ❌ **NO business logic** (no booking, restaurant, or domain-specific features)

````## 📁 Structure

src/

├── app/                     # Next.js App Router pages```

│   ├── layout.tsx          # Root layout with providerswebapp-template/

│   └── page.tsx            # Home page├── app/                    # Next.js App Router

├── components/             # React components│   ├── [locale]/          # Internationalized routes

│   ├── AnalyticsProvider.tsx│   │   ├── page.tsx       # Home page (example)

│   └── ClientProviders.tsx│   │   └── about/         # About page (example)

├── i18n/                   # Internationalization│   └── layout.tsx         # Root layout

│   ├── config.ts           # Locale configuration├── components/            # Reusable components (examples)

│   └── request.ts          # Modular i18n loader├── lib/                   # Utility functions

├── lib/                    # Utilities and helpers├── prisma/               # Prisma schema (minimal)

│   ├── prisma.ts           # Database client├── public/               # Static assets

│   └── utils.ts            # Utility functions├── messages/             # i18n translations

└── messages/               # Translation files (modular)└── tests/                # Test setup

    ├── en/                 # English translations```

    │   ├── common.json

    │   ├── navigation.json## 🚀 What to Customize

    │   ├── home.json

    │   ├── actions.jsonWhen creating a new app from this template, customize:

    │   ├── auth.json

    │   └── errors.json1. **Package name**: Update `name` in `package.json` to `@tavia/your-app-name`

    └── vi/                 # Vietnamese translations2. **Port**: Update port in `package.json` dev script if needed

        └── ... (same structure)3. **Prisma models**: Add your database models in `prisma/schema.prisma`

```4. **Pages**: Replace example pages with your actual app pages

5. **i18n messages**: Update translations in `messages/` directory

## 🚀 Getting Started6. **Environment variables**: Copy `.env.example` and configure

7. **README**: Update this file with your app-specific information

### Prerequisites

## 🛠️ Development

- Node.js 18.18.0+

- pnpm 10.17.1```bash

- Docker (for PostgreSQL)# Install dependencies

pnpm install

### Development

# Run development server

```bashpnpm dev

# Install dependencies (from monorepo root)

pnpm install# Build for production

pnpm build

# Start PostgreSQL with Docker

pnpm docker:up# Run tests

pnpm test

# Generate Prisma client```

pnpm db:generate

## 📝 Notes

# Run database migrations

pnpm db:migrate- This template uses `@tavia/core` for UI components

- Prisma schema is minimal - add models as needed

# Start development server- i18n is configured for English (en) and French (fr) by default

pnpm dev- No authentication is implemented - add as needed

```- No API routes included - add in `app/api/` as needed


Visit `http://localhost:3000`

## 🗄️ Database

This template uses PostgreSQL via Docker Compose.

```bash
# Start database
pnpm docker:up

# Stop database
pnpm docker:down

# View logs
pnpm docker:logs

# Clean (remove volume)
pnpm docker:clean

# Full setup (Docker + migrate + seed)
pnpm db:setup
````

### Prisma Commands

```bash
# Generate Prisma Client
pnpm db:generate

# Push schema changes (dev)
pnpm db:push

# Create migration
pnpm db:migrate

# Deploy migrations (prod)
pnpm db:migrate:deploy

# Prisma Studio (GUI)
pnpm db:studio

# Seed database
pnpm db:seed
```

## 🌐 Internationalization

This template uses **modular i18n** structure with next-intl.

### Supported Locales

- `en` - English (default)
- `vi` - Vietnamese

### Translation Files

Located in `src/messages/{locale}/`:

- `common.json` - Common app strings
- `navigation.json` - Navigation labels
- `home.json` - Home page content
- `actions.json` - Action buttons (save, cancel, etc.)
- `auth.json` - Authentication strings
- `errors.json` - Error messages

### Usage in Components

```tsx
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('home');
  return <h1>{t('title')}</h1>;
}
```

### Locale Detection

Priority order:

1. `NEXT_LOCALE` cookie
2. `Accept-Language` header
3. Default locale (`en`)

## 🧪 Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Coverage Thresholds

- Lines: 30%
- Functions: 30%
- Branches: 30%
- Statements: 30%

Coverage includes:

- `src/lib/**/*.{ts,tsx}`
- `src/components/**/*.{ts,tsx}`

Excluded:

- Styled components (`**/styles.ts`)
- Prisma client
- Config files

## 📦 Available Scripts

```bash
pnpm dev              # Start dev server (Turbopack)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Lint (max 0 warnings)
pnpm lint:fix         # Auto-fix lint issues
pnpm type-check       # TypeScript check
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm clean            # Clean build artifacts
pnpm test             # Run tests
pnpm test:watch       # Test watch mode
pnpm test:coverage    # Coverage report
```

## 🎨 UI Components

This template uses **@tavia/core** component library with Emotion styling.

```tsx
import { Button, Card, Input } from '@tavia/core';

export default function Example() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

See [@tavia/core documentation](../../packages/core/README.md) for all available
components.

## 📊 Analytics

Integrated with **@tavia/analytics** SDK:

```tsx
// Already configured in src/components/AnalyticsProvider.tsx
// Auto-tracks page views

// Manual event tracking:
import { trackEvent } from '@tavia/analytics';

trackEvent('button_click', { label: 'Sign Up' });
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and update:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Your App Name

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/yourdb?schema=public"
POSTGRES_DB=yourdb

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Next.js Config

- **React Compiler**: Enabled for performance
- **Emotion**: Compiler support enabled
- **next-intl**: Configured with modular message loading

## 🏗️ Architecture Patterns

### Providers Setup

```tsx
// src/app/layout.tsx
<ClientProviders>
  {' '}
  {/* GlobalStyles (Emotion) */}
  <NextIntlClientProvider>
    {' '}
    {/* i18n */}
    <AnalyticsProvider>
      {' '}
      {/* Event tracking */}
      {children}
    </AnalyticsProvider>
  </NextIntlClientProvider>
</ClientProviders>
```

### Modular i18n Loading

Uses `Promise.all` for parallel loading:

```typescript
// src/i18n/request.ts
const [common, navigation, home, actions, auth, errors] = await Promise.all([
  import(`../messages/${locale}/common.json`),
  // ... more modules
]);
```

### Form Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## 🚨 Common Issues

### TypeScript Errors

If you see module errors, install dependencies:

```bash
pnpm install
```

### React Version Conflicts

This template uses React 19.2.0. All dependencies are centralized in
`pnpm-workspace.yaml` catalogs.

### Database Connection

Ensure Docker is running:

```bash
docker ps  # Check if postgres container is running
pnpm docker:up  # Start if not running
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [@tavia/core Components](../../packages/core/README.md)
- [@tavia/analytics SDK](../../packages/analytics/README.md)

## 📝 License

Private - Tavia Monorepo
