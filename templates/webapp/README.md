# Generic Next.js 15 Webapp Template# Webapp Template# Generic Next.js 15 Webapp Template

A production-ready Next.js 15 webapp template for the Tavia monorepo, featuringA
production-ready Next.js 15 webapp template for the Tavia monorepo, featuring

modern best practices, internationalization, and complete testing setup.modern
best practices, internationalization, and complete testing setup.This is

a **generic template** for creating new Next.js 15 web applications in

This is a **generic template** for creating new Next.js 15 web applications in

the Tavia monorepo. It contains minimal structure without business-specificthe
Tavia monorepo. It contains minimal structure without business-specific

logic.

## 🎯 Featureslogic.

## 🎯 Purpose

- ✅ **Next.js 15** with App Router and React 19## 🎯 Purpose

This template provides a clean starting point with:

- ✅ **TypeScript** for type safety

- ✅ Next.js 15 App Router setup

- ✅ TypeScript configuration- ✅ **Modular i18n** with next-intl (English &
  Vietnamese)This template

- ✅ Basic internationalization (i18n) with next-intl provides a clean starting
  point with:

- ✅ Prisma ORM setup (no models, just structure)

- ✅ Testing setup with Vitest- ✅ **Prisma ORM** with PostgreSQL Docker setup

- ✅ ESLint configuration

- ✅ Example pages and components- ✅ **@tavia/taviad** UI component library
  with Emotion styling- ✅ Next.js 15

- ❌ **NO business logic** (no booking, restaurant, or domain-specific features)
  App Router setup

## 📁 Structure- ✅ **@tavia/analytics** SDK for event tracking- ✅ TypeScript configuration

```- ✅ **Vitest** with Testing Library and Istanbul coverage- ✅ Basic

webapp-template/  internationalization (i18n) with next-intl

├── app/                    # Next.js App Router

│   ├── [locale]/          # Internationalized routes- ✅ **ESLint 9** flat config with strict rules- ✅ Prisma ORM setup (no models,

│   │   ├── page.tsx       # Home page (example)  just structure)

│   │   └── about/         # About page (example)

│   └── layout.tsx         # Root layout- ✅ **React Hook Form** with Zod validation- ✅ Testing setup with Vitest

├── components/            # Reusable components (examples)

├── lib/                   # Utility functions- ✅ **Framer Motion** for animations- ✅ ESLint configuration

├── prisma/               # Prisma schema (minimal)

├── public/               # Static assets- ✅ Example pages and components

├── messages/             # i18n translations

└── tests/                # Test setup## 📁 Project Structure- ❌ **NO business logic** (no booking, restaurant, or domain-specific features)

```

`````## 📁 Structure

## 🏗️ Module Architecture

src/

This template is designed to work with **@tavia/module-generator** for creating

feature modules with a standardized architecture.├── app/                     # Next.js App Router pages```



### Generate New Modules│   ├── layout.tsx          # Root layout with providerswebapp-template/



```bash│   └── page.tsx            # Home page├── app/                    # Next.js App Router

# From your app directory (e.g., apps/my-app)

pnpm generate:module├── components/             # React components│   ├── [locale]/          # Internationalized routes



# Interactive prompts will guide you through:│   ├── AnalyticsProvider.tsx│   │   ├── page.tsx       # Home page (example)

# - Module name (e.g., "bookings", "restaurants")

# - Route group (optional, e.g., "(dashboard)", "(auth)")│   └── ClientProviders.tsx│   │   └── about/         # About page (example)

# - Generates complete module structure automatically

```├── i18n/                   # Internationalization│   └── layout.tsx         # Root layout



### Generated Module Structure│   ├── config.ts           # Locale configuration├── components/            # Reusable components (examples)



Each module follows this pattern:│   └── request.ts          # Modular i18n loader├── lib/                   # Utility functions



```├── lib/                    # Utilities and helpers├── prisma/               # Prisma schema (minimal)

src/app/(route-group)/module-name/

├── _components/         # Module-specific components│   ├── prisma.ts           # Database client├── public/               # Static assets

│   ├── ModuleName.tsx

│   ├── ModuleName.styles.ts│   └── utils.ts            # Utility functions├── messages/             # i18n translations

│   └── index.ts

├── _types/             # TypeScript types & interfaces└── messages/               # Translation files (modular)└── tests/                # Test setup

│   ├── ModuleName.ts

│   └── index.ts    ├── en/                 # English translations```

├── _hooks/             # Custom React hooks

│   ├── useModuleName.ts    │   ├── common.json

│   └── index.ts

├── _utils/             # Utility functions    │   ├── navigation.json## 🚀 What to Customize

│   ├── moduleName.utils.ts

│   └── index.ts    │   ├── home.json

├── _services/          # API calls & external services

│   ├── moduleName.service.ts    │   ├── actions.jsonWhen creating a new app from this template, customize:

│   └── index.ts

├── _constants/         # Constants & enums    │   ├── auth.json

│   ├── moduleName.constants.ts

│   └── index.ts    │   └── errors.json1. **Package name**: Update `name` in `package.json` to `@tavia/your-app-name`

├── layout.tsx          # Module layout (if needed)

└── page.tsx            # Module page    └── vi/                 # Vietnamese translations2. **Port**: Update port in `package.json` dev script if needed

```

        └── ... (same structure)3. **Prisma models**: Add your database models in `prisma/schema.prisma`

**Key Benefits:**

- ✅ **Consistent structure** across all modules```4. **Pages**: Replace example pages with your actual app pages

- ✅ **Route groups** for organizing related features (e.g., `(dashboard)`, `(auth)`)

- ✅ **Clear separation** of concerns (_components, _types, _hooks, _services, _utils, _constants)5. **i18n messages**: Update translations in `messages/` directory

- ✅ **TypeScript-ready** with proper types and interfaces

- ✅ **Barrel exports** for clean imports## 🚀 Getting Started6. **Environment variables**: Copy `.env.example` and configure



**Example Usage:**7. **README**: Update this file with your app-specific information



```typescript### Prerequisites

// After generating a "bookings" module in "(dashboard)" route group:

// src/app/(dashboard)/bookings/_components/BookingList.tsx## 🛠️ Development

// src/app/(dashboard)/bookings/_services/bookings.service.ts

// src/app/(dashboard)/bookings/page.tsx- Node.js 18.18.0+



// Clean imports from other parts of your app:- pnpm 10.17.1```bash

import { BookingList } from '@/app/(dashboard)/bookings/_components';

import { getBookings } from '@/app/(dashboard)/bookings/_services';- Docker (for PostgreSQL)# Install dependencies

```

pnpm install

## 🚀 What to Customize

### Development

When creating a new app from this template, customize:

# Run development server

1. **Package name**: Update `name` in `package.json` to `@tavia/your-app-name`

2. **Port**: Update port in `package.json` dev script if needed```bashpnpm dev

3. **Prisma models**: Add your database models in `prisma/schema.prisma`

4. **Pages**: Replace example pages with your actual app pages# Install dependencies (from monorepo root)

5. **i18n messages**: Update translations in `messages/` directory

6. **Environment variables**: Copy `.env.example` and configurepnpm install# Build for production

7. **README**: Update this file with your app-specific information

pnpm build

## 🛠️ Development

# Start PostgreSQL with Docker

```bash

# Install dependenciespnpm docker:up# Run tests

pnpm install

pnpm test

# Run development server

pnpm dev# Generate Prisma client```



# Build for productionpnpm db:generate

pnpm build

## 📝 Notes

# Run tests

pnpm test# Run database migrations

```

pnpm db:migrate- This template uses `@tavia/taviad` for UI components

## 🗄️ Database

- Prisma schema is minimal - add models as needed

This template uses PostgreSQL via Docker Compose.

# Start development server- i18n is configured for English (en) and French (fr) by default

```bash

# Start databasepnpm dev- No authentication is implemented - add as needed

pnpm docker:up

```- No API routes included - add in `app/api/` as needed

# Stop database

pnpm docker:down

Visit `http://localhost:3000`

# View logs

pnpm docker:logs## 🗄️ Database



# Clean (remove volume)This template uses PostgreSQL via Docker Compose.

pnpm docker:clean

```bash

# Full setup (Docker + migrate + seed)# Start database

pnpm db:setuppnpm docker:up

```

# Stop database

### Prisma Commandspnpm docker:down



```bash# View logs

# Generate Prisma Clientpnpm docker:logs

pnpm db:generate

# Clean (remove volume)

# Push schema changes (dev)pnpm docker:clean

pnpm db:push

# Full setup (Docker + migrate + seed)

# Create migrationpnpm db:setup

pnpm db:migrate````



# Deploy migrations (prod)### Prisma Commands

pnpm db:migrate:deploy

```bash

# Prisma Studio (GUI)# Generate Prisma Client

pnpm db:studiopnpm db:generate



# Seed database# Push schema changes (dev)

pnpm db:seedpnpm db:push

```

# Create migration

## 🌐 Internationalizationpnpm db:migrate



This template uses **modular i18n** structure with next-intl.# Deploy migrations (prod)

pnpm db:migrate:deploy

### Supported Locales

# Prisma Studio (GUI)

- `en` - English (default)pnpm db:studio

- `vi` - Vietnamese

# Seed database

### Translation Filespnpm db:seed

```

Located in `src/messages/{locale}/`:

## 🌐 Internationalization

- `common.json` - Common app strings

- `navigation.json` - Navigation labelsThis template uses **modular i18n** structure with next-intl.

- `home.json` - Home page content

- `actions.json` - Action buttons (save, cancel, etc.)### Supported Locales

- `auth.json` - Authentication strings

- `errors.json` - Error messages- `en` - English (default)

- `vi` - Vietnamese

### Usage in Components

### Translation Files

```tsx

import { useTranslations } from 'next-intl';Located in `src/messages/{locale}/`:



export default function Page() {- `common.json` - Common app strings

  const t = useTranslations('home');- `navigation.json` - Navigation labels

  return <h1>{t('title')}</h1>;- `home.json` - Home page content

}- `actions.json` - Action buttons (save, cancel, etc.)

```- `auth.json` - Authentication strings

- `errors.json` - Error messages

### Locale Detection

### Usage in Components

Priority order:

```tsx

1. `NEXT_LOCALE` cookieimport { useTranslations } from 'next-intl';

2. `Accept-Language` header

3. Default locale (`en`)export default function Page() {

  const t = useTranslations('home');

## 🧪 Testing  return <h1>{t('title')}</h1>;

}

```bash```

# Run tests

pnpm test### Locale Detection



# Watch modePriority order:

pnpm test:watch

1. `NEXT_LOCALE` cookie

# Coverage report2. `Accept-Language` header

pnpm test:coverage3. Default locale (`en`)

```

## 🧪 Testing

### Coverage Thresholds

```bash

- Lines: 30%# Run tests

- Functions: 30%pnpm test

- Branches: 30%

- Statements: 30%# Watch mode

pnpm test:watch

Coverage includes:

# Coverage report

- `src/lib/**/*.{ts,tsx}`pnpm test:coverage

- `src/components/**/*.{ts,tsx}````



Excluded:### Coverage Thresholds



- Styled components (`**/styles.ts`)- Lines: 30%

- Prisma client- Functions: 30%

- Config files- Branches: 30%

- Statements: 30%

## 📦 Available Scripts

Coverage includes:

```bash

pnpm dev              # Start dev server (Turbopack)- `src/lib/**/*.{ts,tsx}`

pnpm build            # Production build- `src/components/**/*.{ts,tsx}`

pnpm start            # Start production server

pnpm lint             # Lint (max 0 warnings)Excluded:

pnpm lint:fix         # Auto-fix lint issues

pnpm type-check       # TypeScript check- Styled components (`**/styles.ts`)

pnpm format           # Format with Prettier- Prisma client

pnpm format:check     # Check formatting- Config files

pnpm clean            # Clean build artifacts

pnpm test             # Run tests## 📦 Available Scripts

pnpm test:watch       # Test watch mode

pnpm test:coverage    # Coverage report```bash

pnpm generate:module  # Generate new module with @tavia/module-generatorpnpm dev              # Start dev server (Turbopack)

```pnpm build            # Production build

pnpm start            # Start production server

## 🎨 UI Componentspnpm lint             # Lint (max 0 warnings)

pnpm lint:fix         # Auto-fix lint issues

This template uses **@tavia/taviad** component library with Emotion styling.pnpm type-check       # TypeScript check

pnpm format           # Format with Prettier

```tsxpnpm format:check     # Check formatting

import { Button, Card, Input } from '@tavia/taviad';pnpm clean            # Clean build artifacts

pnpm test             # Run tests

export default function Example() {pnpm test:watch       # Test watch mode

  return (pnpm test:coverage    # Coverage report

    <Card>pnpm generate:module  # Generate new module with @tavia/module-generator

      <Input label="Email" type="email" />```

      <Button variant="primary">Submit</Button>

    </Card>## 🎨 UI Components

  );

}This template uses **@tavia/taviad** component library with Emotion styling.

```

```tsx

See [@tavia/taviad documentation](../../packages/core/README.md) for all availableimport { Button, Card, Input } from '@tavia/taviad';

components.

export default function Example() {

## 📊 Analytics  return (

    <Card>

Integrated with **@tavia/analytics** SDK:      <Input label="Email" type="email" />

      <Button variant="primary">Submit</Button>

```tsx    </Card>

// Already configured in src/components/AnalyticsProvider.tsx  );

// Auto-tracks page views}

```

// Manual event tracking:

import { trackEvent } from '@tavia/analytics';See [@tavia/taviad documentation](../../packages/core/README.md) for all available

components.

trackEvent('button_click', { label: 'Sign Up' });

```## 📊 Analytics



## 🔧 ConfigurationIntegrated with **@tavia/analytics** SDK:



### Environment Variables```tsx

// Already configured in src/components/AnalyticsProvider.tsx

Copy `.env.example` to `.env.local` and update:// Auto-tracks page views



```bash// Manual event tracking:

# Appimport { trackEvent } from '@tavia/analytics';

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_APP_NAME=Your App NametrackEvent('button_click', { label: 'Sign Up' });

```

# Database

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/yourdb?schema=public"## 🔧 Configuration

POSTGRES_DB=yourdb

### Environment Variables

# Feature Flags

NEXT_PUBLIC_ENABLE_ANALYTICS=trueCopy `.env.example` to `.env.local` and update:

```

```bash

### Next.js Config# App

NEXT_PUBLIC_APP_URL=http://localhost:3000

- **React Compiler**: Enabled for performanceNEXT_PUBLIC_APP_NAME=Your App Name

- **Emotion**: Compiler support enabled

- **next-intl**: Configured with modular message loading# Database

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/yourdb?schema=public"

## 🏗️ Architecture PatternsPOSTGRES_DB=yourdb



### Providers Setup# Feature Flags

NEXT_PUBLIC_ENABLE_ANALYTICS=true

```tsx```

// src/app/layout.tsx

<ClientProviders>### Next.js Config

  {' '}

  {/* GlobalStyles (Emotion) */}- **React Compiler**: Enabled for performance

  <NextIntlClientProvider>- **Emotion**: Compiler support enabled

    {' '}- **next-intl**: Configured with modular message loading

    {/* i18n */}

    <AnalyticsProvider>## 🏗️ Architecture Patterns

      {' '}

      {/* Event tracking */}### Providers Setup

      {children}

    </AnalyticsProvider>```tsx

  </NextIntlClientProvider>// src/app/layout.tsx

</ClientProviders><ClientProviders>

```  {' '}

  {/* GlobalStyles (Emotion) */}

### Modular i18n Loading  <NextIntlClientProvider>

    {' '}

Uses `Promise.all` for parallel loading:    {/* i18n */}

    <AnalyticsProvider>

```typescript      {' '}

// src/i18n/request.ts      {/* Event tracking */}

const [common, navigation, home, actions, auth, errors] = await Promise.all([      {children}

  import(`../messages/${locale}/common.json`),    </AnalyticsProvider>

  // ... more modules  </NextIntlClientProvider>

]);</ClientProviders>

`````

### Form Validation### Modular i18n Loading

```tsxUses `Promise.all` for parallel loading:

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';```typescript

import { z } from 'zod';// src/i18n/request.ts

const [common, navigation, home, actions, auth, errors] = await Promise.all([

const schema = z.object({ import(`../messages/${locale}/common.json`),

email: z.string().email(), // ... more modules

password: z.string().min(8),]);

});```

const { register, handleSubmit } = useForm({### Form Validation

resolver: zodResolver(schema),

});```tsx

```import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

## 📝 Notesimport { z } from 'zod';



- This template uses `@tavia/taviad` for UI componentsconst schema = z.object({

- Prisma schema is minimal - add models as needed  email: z.string().email(),

- i18n is configured for English (en) and Vietnamese (vi) by default  password: z.string().min(8),

- No authentication is implemented - add as needed});

- No API routes included - add in `app/api/` as needed

- Use `pnpm generate:module` to scaffold new feature modules with proper architectureconst { register, handleSubmit } = useForm({

  resolver: zodResolver(schema),

## 🚨 Common Issues});

```

### TypeScript Errors

## 🚨 Common Issues

If you see module errors, install dependencies:

### TypeScript Errors

```bash

pnpm installIf you see module errors, install dependencies:

```

```bash

### React Version Conflictspnpm install

```

This template uses React 19.2.0. All dependencies are centralized in

`pnpm-workspace.yaml` catalogs.### React Version Conflicts

### Database ConnectionThis template uses React 19.2.0. All dependencies are centralized in

`pnpm-workspace.yaml` catalogs.

Ensure Docker is running:

### Database Connection

```````bash

docker ps  # Check if postgres container is runningEnsure Docker is running:

pnpm docker:up  # Start if not running

``````bash

docker ps  # Check if postgres container is running

## 📚 Resourcespnpm docker:up  # Start if not running

```````

- [Next.js Documentation](https://nextjs.org/docs)

- [next-intl Documentation](https://next-intl.dev/)## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)

- [@tavia/taviad Components](../../packages/core/README.md)-
  [Next.js Documentation](https://nextjs.org/docs)

- [@tavia/analytics SDK](../../packages/analytics/README.md)-
  [next-intl Documentation](https://next-intl.dev/)

- [@tavia/module-generator](../../packages/module-generator/README.md)-
  [Prisma Documentation](https://www.prisma.io/docs)

- [@tavia/taviad Components](../../packages/core/README.md)

## 📝 License- [@tavia/analytics SDK](../../packages/analytics/README.md)

Private - Tavia Monorepo## 📝 License

Private - Tavia Monorepo
