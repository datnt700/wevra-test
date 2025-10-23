# Tavia Scripts

Utility scripts for the Tavia monorepo.

## Quick Reference

| Script          | Purpose                   | Template         | Port Range | Command                  |
| --------------- | ------------------------- | ---------------- | ---------- | ------------------------ |
| `create-app.js` | Next.js web applications  | `apps/web`       | 3000-3099  | `pnpm create:app <name>` |
| `create-api.js` | Fastify API microservices | `apps/analytics` | 3001-3100  | `pnpm create:api <name>` |

---

## create-app.js

Create a new Next.js web application in the monorepo systematically.

### Usage

```bash
pnpm create:app <app-name>
```

### Example

```bash
# Create an admin dashboard app
pnpm create:app admin

# Create a customer portal app
pnpm create:app customer-portal

# Create a mobile API app
pnpm create:app mobile-api
```

### What it does

1. **Copies template** - Uses `apps/web` as the template
2. **Updates package.json** - Sets the app name and version
3. **Assigns unique port** - Automatically assigns a port based on app name
   (3001-3099)
4. **Creates .env.local** - Sets up environment variables with correct port
5. **Updates Docker setup** - Configures PostgreSQL container with app-specific
   database
6. **Updates documentation** - Updates README.md, DOCKER.md, DATABASE.md with
   app-specific info
7. **Cleans up** - Removes node_modules, build artifacts
8. **Installs dependencies** - Runs `pnpm install` at root

### Generated Structure

```
apps/<app-name>/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities (auth, prisma, utils)
├── prisma/                 # Database schema and seed
├── messages/               # i18n translations
├── i18n/                   # i18n configuration
├── e2e/                    # Playwright tests
├── tests/                  # Vitest setup
├── public/                 # Static assets
├── package.json            # Updated with app name
├── .env.local              # Environment variables
├── .env.example            # Environment template
├── docker-compose.yml      # PostgreSQL container
├── init-db.sql             # Database initialization
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── vitest.config.ts        # Vitest config
├── playwright.config.ts    # Playwright config
├── DOCKER.md               # Docker setup guide
├── DATABASE.md             # Database setup guide
└── README.md               # App documentation
```

### Features Included

All apps created from this script include:

- ✅ **Next.js 15** with App Router + Turbopack
- ✅ **TypeScript** configuration
- ✅ **i18n** with next-intl (cookie-based)
- ✅ **Prisma ORM** + PostgreSQL setup
- ✅ **Docker** PostgreSQL container
- ✅ **Auth.js v5** authentication
- ✅ **@tavia/analytics** SDK integration
- ✅ **Vitest** unit testing
- ✅ **Playwright** E2E testing
- ✅ **ESLint 9** flat config
- ✅ **Prettier** formatting
- ✅ **Emotion** + **Framer Motion** animations
- ✅ **@tavia/core** component library

### Port Assignment

Ports are automatically assigned based on app name hash:

- `web` → Port 3000 (reserved)
- Other apps → Port 3001-3099 (deterministic based on name)

Examples:

- `admin` → Port 3089
- `customer-portal` → Port 3042
- `mobile-api` → Port 3017

### Naming Rules

App names must:

- Be lowercase
- Start with a letter
- Contain only letters, numbers, and hyphens
- Be unique (not already exist in `apps/`)

✅ Valid: `admin`, `customer-portal`, `mobile-api`, `blog` ❌ Invalid: `Admin`,
`customer_portal`, `123app`, `-invalid`

### After Creation

1. **Navigate to app:**

   ```bash
   cd apps/<app-name>
   ```

2. **Update environment variables:** Edit `.env.local` with your database URL,
   auth secrets, etc.

3. **Set up database:**

   ```bash
   pnpm db:generate
   pnpm db:push
   pnpm db:seed
   ```

4. **Start development:**

   ```bash
   # From root
   pnpm dev

   # Or specific app
   pnpm --filter=<app-name> dev
   ```

5. **Visit your app:**
   ```
   http://localhost:<assigned-port>
   ```

### Customization

After creation, you can customize:

- **Port:** Edit `dev` script in `package.json`
- **Database:** Update Prisma schema in `prisma/schema.prisma`
- **i18n:** Add/remove languages in `i18n/config.ts` and `messages/`
- **Auth providers:** Configure in `lib/auth.ts`
- **Tests:** Add tests in `app/__tests__/` and `e2e/`

### Troubleshooting

**"App already exists"**

- Choose a different name or delete the existing app

**"App name must be lowercase"**

- Use only lowercase letters, numbers, and hyphens

**Port conflict**

- Edit the `dev` script in package.json to use a different port

**Dependencies not installing**

- Run `pnpm install` manually from the root directory

### Related Commands

```bash
# Run specific app
pnpm --filter=<app-name> dev

# Build specific app
pnpm --filter=<app-name> build

# Test specific app
pnpm --filter=<app-name> test

# Lint specific app
pnpm --filter=<app-name> lint
```

### Notes

- The script uses `apps/web` as the template
- All apps share the same monorepo dependencies
- Database setup is optional but configured by default
- Remove unnecessary features after creation if not needed

---

## create-api.js

Create a new Fastify API microservice in the monorepo systematically.

### Usage

```bash
pnpm create:api <api-name>
```

### Example

```bash
# Create a notifications API
pnpm create:api notifications

# Create a payments API
pnpm create:api payments

# Create a messaging API
pnpm create:api messaging
```

### What it does

1. **Copies template** - Uses `apps/analytics` as the template
2. **Updates package.json** - Sets the API name and description
3. **Assigns unique port** - Automatically assigns a port based on API name
   (3002-3100)
4. **Updates environment files** - Configures .env and .env.example with
   API-specific values
5. **Updates Prisma schema** - Sets schema description for the new API
6. **Creates example routes** - Replaces analytics routes with generic example
   routes
7. **Updates README.md** - Customizes documentation for the new API
8. **Cleans up** - Removes build artifacts and template-specific code
9. **Installs dependencies** - Runs `pnpm install` at root

### Generated Structure

```
apps/<api-name>/
├── src/
│   ├── server.ts           # Server entry point
│   ├── app.ts              # Fastify app configuration
│   ├── lib/
│   │   └── prisma.ts       # Prisma client singleton
│   └── routes/
│       ├── health.ts       # Health check endpoints
│       └── example.ts      # Example routes (customize this)
├── prisma/
│   └── schema.prisma       # Database schema (customize this)
├── .env                    # Environment variables
├── .env.example            # Environment template
├── package.json            # Updated with API name
├── tsconfig.json           # TypeScript config
├── tsup.config.ts          # Build config
├── eslint.config.js        # ESLint config
└── README.md               # API documentation
```

### Features Included

All APIs created from this script include:

- ✅ **Fastify 5** high-performance framework
- ✅ **TypeScript 5.9** full type safety
- ✅ **Prisma ORM** for database access
- ✅ **Zod** runtime validation
- ✅ **Security plugins** (CORS, Helmet, Rate Limiting)
- ✅ **Health check endpoints** with DB connectivity
- ✅ **Pino logger** with pretty printing
- ✅ **Hot reload** with tsx watch mode
- ✅ **ESLint + Prettier** code quality
- ✅ **tsup** for fast ESM builds
- ✅ **Workspace integration** (shared configs)

### Port Assignment

Ports are automatically assigned based on API name hash:

- `analytics` → Port 3001 (reserved)
- Other APIs → Port 3002-3100 (deterministic based on name)

Examples:

- `notifications` → Port 3047
- `payments` → Port 3023
- `messaging` → Port 3065

### Naming Rules

API names must:

- Be lowercase
- Start with a letter
- Contain only letters, numbers, and hyphens
- Be unique (not already exist in `apps/`)

✅ Valid: `notifications`, `payments-v2`, `user-service` ❌ Invalid:
`Notifications`, `payments_v2`, `123api`, `-invalid`

### After Creation

1. **Navigate to API:**

   ```bash
   cd apps/<api-name>
   ```

2. **Update environment variables:** Edit `.env` with your database URL, API
   key, CORS origins, etc.

3. **Customize Prisma schema:** Edit `prisma/schema.prisma` with your data
   models

4. **Implement your routes:**
   - Rename `src/routes/example.ts` to match your feature (e.g.,
     `notifications.ts`)
   - Add your business logic
   - Update `src/app.ts` to register your routes

5. **Set up database:**

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

6. **Start development:**

   ```bash
   pnpm dev
   ```

7. **Visit your API:**
   ```
   http://localhost:<assigned-port>/health
   ```

### Files to Customize

After creation, customize these files:

| File                    | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `prisma/schema.prisma`  | Define your database models                  |
| `src/routes/example.ts` | Implement your API routes (rename as needed) |
| `src/app.ts`            | Register your routes and middleware          |
| `.env`                  | Configure environment variables              |
| `README.md`             | Document your API                            |

### Example Route Structure

The generated `example.ts` file provides a basic template:

```typescript
// src/routes/notifications.ts
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function notificationRoutes(app: FastifyInstance) {
  // Define your schemas
  const sendNotificationSchema = z.object({
    userId: z.string(),
    message: z.string(),
    type: z.enum(['email', 'sms', 'push']),
  });

  // Implement your endpoints
  app.post('/api/notifications/send', async (request, reply) => {
    const data = sendNotificationSchema.parse(request.body);

    // Your business logic here
    await app.prisma.notification.create({ data });

    return reply.send({ success: true });
  });
}
```

### Environment Variables

Each API gets these environment variables:

| Variable                 | Description                       | Example                                       |
| ------------------------ | --------------------------------- | --------------------------------------------- |
| `DATABASE_URL`           | PostgreSQL connection string      | `postgresql://user:pass@localhost:5432/myapi` |
| `<API>_API_KEY`          | API authentication key            | `your-secret-api-key-here`                    |
| `PORT`                   | Server port                       | `3002`                                        |
| `HOST`                   | Server host                       | `0.0.0.0`                                     |
| `NODE_ENV`               | Environment                       | `development` / `production`                  |
| `CORS_ORIGIN`            | Allowed origins (comma-separated) | `http://localhost:3000`                       |
| `RATE_LIMIT_MAX`         | Max requests per window           | `100`                                         |
| `RATE_LIMIT_TIME_WINDOW` | Rate limit window                 | `1 minute`                                    |

### Available Scripts

Each API includes these scripts:

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `pnpm dev`         | Start development server with watch mode |
| `pnpm build`       | Build for production (ESM output)        |
| `pnpm start`       | Start production server                  |
| `pnpm lint`        | Run ESLint                               |
| `pnpm type-check`  | TypeScript type checking                 |
| `pnpm format`      | Format code with Prettier                |
| `pnpm db:generate` | Generate Prisma client                   |
| `pnpm db:migrate`  | Run database migrations                  |
| `pnpm db:push`     | Push schema to database                  |
| `pnpm db:studio`   | Open Prisma Studio                       |

### Health Endpoints

Every API includes health check endpoints out of the box:

**GET `/health`** - Basic health check

```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime": 123.456
}
```

**GET `/health/detailed`** - Detailed health with DB check

```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime": 123.456,
  "database": "connected",
  "memory": {
    "heapUsed": 50.5,
    "heapTotal": 100.0
  }
}
```

### Integration with Next.js Apps

Your Fastify APIs can be consumed by Next.js apps in the monorepo:

```typescript
// In apps/web or other Next.js app
const response = await fetch('http://localhost:3002/api/notifications/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NOTIFICATIONS_API_KEY}`,
  },
  body: JSON.stringify({
    userId: 'user123',
    message: 'Hello!',
    type: 'email',
  }),
});
```

### Database Strategy

You can choose to:

1. **Share database with web app** - Use same PostgreSQL database, different
   tables

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia"
   ```

2. **Separate database** - Use dedicated database for the API
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notifications"
   ```

### Troubleshooting

**"Analytics template not found"**

- Make sure `apps/analytics` exists first

**"API already exists"**

- Choose a different name or delete the existing API

**Port conflict**

- The port is assigned deterministically, conflicts are rare
- Manually change `PORT` in `.env` if needed

**Dependencies not installing**

- Run `pnpm install` manually from the root directory

**Prisma client errors**

- Run `pnpm db:generate` after modifying schema

### Related Commands

```bash
# Run specific API
pnpm --filter=<api-name> dev

# Build specific API
pnpm --filter=<api-name> build

# Lint specific API
pnpm --filter=<api-name> lint

# Type check specific API
pnpm --filter=<api-name> type-check
```

### Notes

- The script uses `apps/analytics` as the template
- All APIs share monorepo dependencies via workspace
- Database setup is configured but you define the schema
- Remove example routes and implement your business logic
- Health checks and security are pre-configured
