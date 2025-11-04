# Wevra 💰# Wevra Web Application# Wevra App# Wevra Web Application

**Your roadmap to financial growth.**A production-ready Next.js 15 webapp
template for the Tavia monorepo, featuringA

production-ready Next.js 15 webapp template for the Tavia monorepo, featuring

Wevra is a financial education and habit-building web application designed to
help young adults (18–30) build financial awareness, discipline, and long-term
wealth readiness through interactive roadmaps, challenges, and mindset training.

modern best practices, internationalization, and complete testing setup.modern

## 🎯 Missionbest practices, internationalization, and complete testing setup.This is

To make personal finance simple, actionable, and rewarding.a **generic
template** for creating new Next.js 15 web applications in

Wevra helps beginners move from financial confusion → clarity and control
through learning paths, behavioral challenges, and data-driven feedback.This is
a **generic template** for creating new Next.js 15 web applications in

## 👥 Target Audiencethe Tavia monorepo. It contains minimal structure without business-specificthe

Tavia monorepo. It contains minimal structure without business-specific

- **Who**: Students, first-job professionals, early earners

- **Age**: 18–30logic.

- **Pain Points**:
  - Don't know where to start with money## 🎯 Featureslogic.

  - Poor financial habits

  - Overwhelmed by complex finance content## 🎯 Purpose

- **Mindset**: Curious, tech-savvy, self-improvement oriented (Duolingo / Notion
  / Roadmap.sh audience)

- ✅ **Next.js 15** with App Router and React 19## 🎯 Purpose

## 💡 Core Concept

This template provides a clean starting point with:

A personal finance roadmap that teaches, tracks, and transforms your money
mindset.

- ✅ **TypeScript** for type safety

Wevra merges education, habit tracking, and AI-driven insights to help users
understand and improve their relationship with money.

- ✅ Next.js 15 App Router setup

## 🧩 MVP Feature Set

- ✅ TypeScript configuration- ✅ **Modular i18n** with next-intl (English &

### 1️⃣ Onboarding Quiz (Landing) Vietnamese)This template

- 5–10 interactive questions to assess:- ✅ Basic internationalization (i18n)
  with next-intl provides a clean starting
  - Financial awareness point with:

  - Habits and discipline

  - Goals and motivation- ✅ Prisma ORM setup (no models, just structure)

- Output: personalized "stage" (e.g. Starter Saver, Builder, Grower)

- AI (or rules) generates a short recommendation + roadmap preview- ✅ Testing
  setup with Vitest- ✅ **Prisma ORM** with PostgreSQL Docker setup

### 2️⃣ Roadmap System- ✅ ESLint configuration

- ✅ Example pages and components

Users progress through stages like:- ✅ **@tavia/taviad** UI component library
with Emotion styling

- ✅ Next.js 15 App Router setup

- **Starter** → learn basics

- **Stabilizer** → track spending, save- ❌ **NO business logic** (no booking,
  restaurant, or domain-specific features)

- **Builder** → plan, invest

- **Grower** → scale and manage wealth## 📁 Structure- ✅ **@tavia/analytics**
  SDK for event tracking- ✅ TypeScript configuration

Each stage includes:```- ✅ **Vitest** with Testing Library and Istanbul
coverage- ✅ Basic

- Short lessonswevra/ internationalization (i18n) with next-intl

- Practical challenges

- Gamified tracking and progress bar├── app/ # Next.js App Router

### 3️⃣ Dashboard│ ├── [locale]/ # Internationalized routes- ✅ **ESLint 9** flat config with strict rules- ✅ Prisma ORM setup (no models,

- Visual roadmap view (like roadmap.sh)│ │ ├── page.tsx # Home page (example)
  just structure)

- Challenge progress, streaks, and badges

- Suggested next actions or topics│ │ └── about/ # About page (example)

### 4️⃣ AI Insights (Phase 2)│ └── layout.tsx # Root layout- ✅ **React Hook Form** with Zod validation- ✅ Testing setup with Vitest

- Analyze quiz + activity patterns├── components/ # Reusable components
  (examples)

- Suggest personalized steps (e.g., "Try automating savings this week")

- NLP-driven feedback for reflections/journals├── lib/ # Utility functions- ✅
  **Framer Motion** for animations- ✅ ESLint configuration

### 5️⃣ Profile & Tracking (Phase 2)├── prisma/ # Prisma schema (minimal)

- Financial goals (e.g., save €X/month)├── public/ # Static assets- ✅ Example
  pages and components

- Habit tracker (save, budget, learn)

- Achievements & growth visualization├── messages/ # i18n translations

## 💰 Business Model└── tests/ # Test setup## 📁 Project Structure- ❌ **NO business logic** (no booking, restaurant, or domain-specific features)

- **Freemium** — basic roadmap + first challenges free```

- **Premium tier** — unlocks deeper modules, AI insights, and advanced tracking

`````## 📁 Structure

### Future Expansion:

## 🏗️ Module Architecture

- Affiliate/partner integrations (banks, fintech, investments)

- Financial certification or "Wevra Mastery" programsrc/



## ⚙️ Tech StackThis template is designed to work with **@tavia/module-generator** for creating



| Layer              | Tech                                      |feature modules with a standardized architecture.├── app/                     # Next.js App Router pages```

| ------------------ | ----------------------------------------- |

| Frontend           | Next.js 15 (App Router, TypeScript)       |

| UI Components      | @tavia/taviad (Emotion + Radix UI)        |

| Forms & Validation | React Hook Form + Zod                     |### Generate New Modules│   ├── layout.tsx          # Root layout with providerswevra/

| Database           | PostgreSQL (Docker for local dev)         |

| ORM                | Prisma                                    |

| State Management   | Server Components / React Query           |

| Analytics          | @tavia/analytics                          |```bash│   └── page.tsx            # Home page├── app/                    # Next.js App Router

| AI (future)        | OpenAI / Anthropic (quiz insights)        |

| Deployment         | Vercel (frontend + serverless routes)     |# From your app directory (e.g., apps/my-app)



## 🚀 Getting Startedpnpm generate:module├── components/             # React components│   ├── [locale]/          # Internationalized routes



### Prerequisites



- Node.js 22.17.1+ (or version specified in `.nvmrc`)# Interactive prompts will guide you through:│   ├── AnalyticsProvider.tsx│   │   ├── page.tsx       # Home page (example)

- pnpm 10.19.0+

- Docker Desktop (for PostgreSQL)# - Module name (e.g., "bookings", "restaurants")



### Development Setup# - Route group (optional, e.g., "(dashboard)", "(auth)")│   └── ClientProviders.tsx│   │   └── about/         # About page (example)



```bash# - Generates complete module structure automatically

# Navigate to Wevra app

cd apps/wevra```├── i18n/                   # Internationalization│   └── layout.tsx         # Root layout



# Start PostgreSQL database

pnpm docker:up

### Generated Module Structure│   ├── config.ts           # Locale configuration├── components/            # Reusable components (examples)

# Run database migrations

pnpm db:migrate



# Seed sample data (optional)Each module follows this pattern:│   └── request.ts          # Modular i18n loader├── lib/                   # Utility functions

pnpm db:seed



# Start development server

pnpm dev```├── lib/                    # Utilities and helpers├── prisma/               # Prisma schema (minimal)

```

src/app/(route-group)/module-name/

The app will be available at **http://localhost:3085**

├── _components/         # Module-specific components│   ├── prisma.ts           # Database client├── public/               # Static assets

### Database Management

│   ├── ModuleName.tsx

```bash

# Open Prisma Studio (visual database editor)│   ├── ModuleName.styles.ts│   └── utils.ts            # Utility functions├── messages/             # i18n translations

pnpm db:studio

│   └── index.ts

# Create a new migration

pnpm db:migrate├── _types/             # TypeScript types & interfaces└── messages/               # Translation files (modular)└── tests/                # Test setup



# Push schema changes without migration│   ├── ModuleName.ts

pnpm db:push

│   └── index.ts    ├── en/                 # English translations```

# Stop database

pnpm docker:down├── _hooks/             # Custom React hooks



# Clean database (⚠️ deletes all data)│   ├── useModuleName.ts    │   ├── common.json

pnpm docker:clean

```│   └── index.ts



## 📁 Project Structure├── _utils/             # Utility functions    │   ├── navigation.json## 🚀 What to Customize



```│   ├── moduleName.utils.ts

apps/wevra/

├── src/│   └── index.ts    │   ├── home.json

│   ├── app/                 # Next.js App Router

│   │   ├── (auth)/         # Auth routes (login, register)├── _services/          # API calls & external services

│   │   ├── (dashboard)/    # Protected dashboard routes

│   │   ├── api/            # API routes│   ├── moduleName.service.ts    │   ├── actions.jsonWhen creating a new app from this template, customize:

│   │   └── layout.tsx      # Root layout

│   ├── components/│   └── index.ts

│   │   ├── layouts/        # Layout components

│   │   └── ...             # Shared components├── _constants/         # Constants & enums    │   ├── auth.json

│   ├── hooks/              # Custom React hooks

│   ├── i18n/               # Internationalization config│   ├── moduleName.constants.ts

│   ├── lib/

│   │   ├── constants/      # App constants (routes, etc.)│   └── index.ts    │   └── errors.json1. **Package name**: Update `name` in `package.json` to `@tavia/your-app-name`

│   │   ├── prisma.ts       # Prisma client

│   │   └── utils/          # Utility functions├── layout.tsx          # Module layout (if needed)

│   ├── messages/           # i18n translations (en, vi)

│   └── types/              # TypeScript types└── page.tsx            # Module page    └── vi/                 # Vietnamese translations2. **Port**: Update port in `package.json` dev script if needed

├── prisma/

│   ├── schema.prisma       # Database schema```

│   └── seed.ts             # Seed data

├── docker-compose.yml      # PostgreSQL container        └── ... (same structure)3. **Prisma models**: Add your database models in `prisma/schema.prisma`

└── package.json

```**Key Benefits:**



## 🧠 Database Schema- ✅ **Consistent structure** across all modules```4. **Pages**: Replace example pages with your actual app pages



### Core Models- ✅ **Route groups** for organizing related features (e.g., `(dashboard)`, `(auth)`)



- **User** - User accounts with onboarding progress and stage tracking- ✅ **Clear separation** of concerns (_components, _types, _hooks, _services, _utils, _constants)5. **i18n messages**: Update translations in `messages/` directory

- **QuizResult** - Onboarding quiz results and recommendations

- **Lesson** - Learning content organized by stage- ✅ **TypeScript-ready** with proper types and interfaces

- **UserLesson** - User progress through lessons

- **Challenge** - Behavioral challenges (save, track, learn)- ✅ **Barrel exports** for clean imports## 🚀 Getting Started6. **Environment variables**: Copy `.env.example` and configure

- **UserChallenge** - User challenge progress

- **Achievement** - Badges and achievements

- **FinancialGoal** - User financial goals

- **HabitTracking** - Daily habit tracking**Example Usage:**7. **README**: Update this file with your app-specific information



### User Stages



1. **STARTER** - Learn basics```typescript### Prerequisites

2. **STABILIZER** - Track spending, save

3. **BUILDER** - Plan, invest// After generating a "bookings" module in "(dashboard)" route group:

4. **GROWER** - Scale and manage wealth

// src/app/(dashboard)/bookings/_components/BookingList.tsx## 🛠️ Development

## 🔧 Development Commands

// src/app/(dashboard)/bookings/_services/bookings.service.ts

```bash

# Development// src/app/(dashboard)/bookings/page.tsx- Node.js 18.18.0+

pnpm dev                    # Start dev server (localhost:3085)

pnpm build                  # Build for production

pnpm start                  # Start production server

// Clean imports from other parts of your app:- pnpm 10.17.1```bash

# Code Quality

pnpm lint                   # Run ESLintimport { BookingList } from '@/app/(dashboard)/bookings/_components';

pnpm lint:fix               # Auto-fix ESLint issues

pnpm type-check             # TypeScript type checkingimport { getBookings } from '@/app/(dashboard)/bookings/_services';- Docker (for PostgreSQL)# Install dependencies

pnpm format                 # Format with Prettier

```

# Testing

pnpm test                   # Run testspnpm install

pnpm test:watch             # Watch mode

pnpm test:coverage          # Coverage report## 🚀 What to Customize



# Module Generation### Development

pnpm generate:module        # Scaffold new feature module

```When creating a new app from this template, customize:



## 🎨 UI Components# Run development server



Wevra uses **@tavia/taviad** - a comprehensive component library with 60+ components:1. **Package name**: Update `name` in `package.json` to `@tavia/your-app-name`



- **Base**: Button, Badge, Avatar, Tag, etc.2. **Port**: Update port in `package.json` dev script if needed```bashpnpm dev

- **Form**: Input, Select, Checkbox, Switch, etc.

- **Layout**: Card, Divider, Stack, etc.3. **Prisma models**: Add your database models in `prisma/schema.prisma`

- **State**: EmptyState, ErrorState, LoadingState, etc.

- **Radix UI**: Modal, Popover, Tabs, Tooltip, etc.4. **Pages**: Replace example pages with your actual app pages# Install dependencies (from monorepo root)



See [Storybook documentation](../docs) for component usage.5. **i18n messages**: Update translations in `messages/` directory



## 🌐 Internationalization6. **Environment variables**: Copy `.env.example` and configurepnpm install# Build for production



Wevra supports multiple languages using `next-intl`:7. **README**: Update this file with your app-specific information



- English (en) - defaultpnpm build

- Vietnamese (vi)

## 🛠️ Development

Translations are modular, organized by feature in `src/messages/{locale}/`.

# Start PostgreSQL with Docker

## 📈 Roadmap

```bash

### Phase 1 - MVP (Current)

# Install dependenciespnpm docker:up# Run tests

- [x] Database schema design

- [ ] Onboarding quizpnpm install

- [ ] Roadmap visualization

- [ ] Basic lessons and challengespnpm test

- [ ] Dashboard with progress tracking

# Run development server

### Phase 2 - Enhanced Features

pnpm dev# Generate Prisma client```

- [ ] AI-powered insights

- [ ] Financial goals tracking

- [ ] Habit tracking system

- [ ] Advanced analytics# Build for productionpnpm db:generate

- [ ] Premium tier features

pnpm build

### Phase 3 - Scale & Growth

## 📝 Notes

- [ ] Mobile app (React Native)

- [ ] Community features- This template uses `@tavia/taviad` for UI components

- [ ] Partner integrations- Prisma schema is minimal - add models as needed

- [ ] Certification program

This template uses PostgreSQL via Docker Compose.

## 🤝 Contributing

# Start development server- i18n is configured for English (en) and French (fr) by default

Wevra is part of the Tavia monorepo. See the [main repository](../../README.md) for contribution guidelines.

```bash

## 📝 License

# Start databasepnpm dev- No authentication is implemented - add as needed

Part of the Tavia monorepo.

pnpm docker:up

---

```- No API routes included - add in `app/api/` as needed

**Built with ❤️ to empower financial literacy**

# Stop database

**Wevra - Your roadmap to financial growth.**

pnpm docker:down

Visit `http://localhost:3085`

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
pnpm type-check       # TypeScript check
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm clean            # Clean build artifacts
pnpm test             # Run tests

export default function Example() {pnpm test:watch       # Test watch mode

  return (pnpm test:coverage    # Coverage report

    <Card>pnpm generate:module  # Generate new module with @tavia/module-generator

      <Input label="Email" type="email" />```

      <Button variant="primary">Submit</Button>

    </Card>## 🎨 UI Components

  );

<<<<<<< HEAD
}This template uses **@tavia/taviad** component library with Emotion styling.
=======
}This template uses **@tavia/core** component library with Emotion styling.
>>>>>>> 847c9c936c0993d2b0547f5f64e0318fe90e9833

```

```tsx

<<<<<<< HEAD
See [@tavia/taviad documentation](../../packages/core/README.md) for all availableimport { Button, Card, Input } from '@tavia/taviad';
=======
See [@tavia/core documentation](../../packages/core/README.md) for all availableimport { Button, Card, Input } from '@tavia/core';
>>>>>>> 847c9c936c0993d2b0547f5f64e0318fe90e9833

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
import { trackEvent } from '@tavia/analytics';

trackEvent('button_click', { label: 'Sign Up' });

```## 📊 Analytics



## 🔧 ConfigurationIntegrated with **@tavia/analytics** SDK:



### Environment Variables```tsx

// Already configured in src/components/AnalyticsProvider.tsx

Copy `.env.example` to `.env.local` and update:// Auto-tracks page views



```bash// Manual event tracking:

# Appimport { trackEvent } from '@tavia/analytics';

NEXT_PUBLIC_APP_URL=http://localhost:3085

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

NEXT_PUBLIC_APP_URL=http://localhost:3085

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



<<<<<<< HEAD
- This template uses `@tavia/taviad` for UI componentsconst schema = z.object({
=======
- This template uses `@tavia/core` for UI componentsconst schema = z.object({
>>>>>>> 847c9c936c0993d2b0547f5f64e0318fe90e9833

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

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [@tavia/taviad Components](../../packages/taviad/README.md)
- [@tavia/analytics SDK](../../packages/analytics/README.md)
- [@tavia/module-generator](../../packages/module-generator/README.md)

## 📝 License

Private - Tavia Monorepo## 📝 License

Private - Tavia Monorepo
