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

Create a new API microservice in the monorepo with interactive prompts -
supports both simple Fastify APIs and complex NestJS microservices.

### Usage

```bash
# Interactive mode (recommended)
pnpm create:api

# With API name
pnpm create:api <api-name>
```

### Interactive Prompts

The script will ask you:

1. **API Name** - What to call your API (e.g., `notifications`, `payments`)
2. **API Type** - Choose between:
   - **Simple API** (Fastify) - Lightweight, fast, simple REST API
   - **Complex API** (NestJS) - Full-featured microservice with advanced
     features

#### For NestJS APIs (Complex)

3. **Transport Layer** - Choose your communication protocol:
   - **REST API** - HTTP endpoints with Swagger documentation
   - **GraphQL (code first)** - Schema generated from TypeScript
   - **GraphQL (schema first)** - Schema defined in .graphql files
   - **Microservice (non-HTTP)** - TCP, Redis, NATS, gRPC, etc.
   - **WebSockets** - Real-time bidirectional communication

### Example Sessions

#### Creating a Simple Fastify API

```bash
$ pnpm create:api

🚀 Tavia API Generator

? What name would you like to use for the API? notifications
? Which type of API would you like to create?
  1) Simple API (Fastify - Lightweight, fast, simple REST API)
  2) Complex API (NestJS - Full-featured microservice with advanced features)

Enter your choice (1 or 2): 1

🚀 Creating new Fastify API service: notifications
...
✅ API service created successfully!
```

#### Creating a NestJS REST API

```bash
$ pnpm create:api

🚀 Tavia API Generator

? What name would you like to use for the API? restaurant-service
? Which type of API would you like to create?
  1) Simple API (Fastify - Lightweight, fast, simple REST API)
  2) Complex API (NestJS - Full-featured microservice with advanced features)

Enter your choice (1 or 2): 2

? What transport layer do you use?
  1) REST API (HTTP endpoints with Swagger docs)
  2) GraphQL - code first
  3) GraphQL - schema first
  4) Microservice - non-HTTP (TCP, Redis, NATS, gRPC, etc.)
  5) WebSockets

Enter your choice (1-5): 1

📦 Generating NestJS project with CLI...
...
✅ NestJS microservice created successfully!
```

### API Type Comparison

| Feature            | Simple API (Fastify)            | Complex API (NestJS)             |
| ------------------ | ------------------------------- | -------------------------------- |
| **Best for**       | Microservices, lightweight APIs | Enterprise apps, complex domains |
| **Setup time**     | ~30 seconds                     | ~2 minutes                       |
| **Performance**    | Very fast (30k+ req/s)          | Fast (20k+ req/s)                |
| **Learning curve** | Low                             | Medium-High                      |
| **Architecture**   | Minimal, flexible               | Module-based, opinionated        |
| **Validation**     | Zod                             | class-validator                  |
| **Documentation**  | Manual                          | Auto-generated Swagger           |
| **DI Container**   | Manual                          | Built-in                         |
| **Testing**        | Manual setup                    | Built-in Jest                    |
| **Microservices**  | Manual                          | Built-in transports              |

### When to Choose What

#### Choose **Simple API (Fastify)** when:

✅ Building a single-purpose microservice ✅ Need maximum performance ✅ Small
team, simple requirements ✅ Quick prototype or POC ✅ Internal APIs with simple
logic

**Examples**: Rate limiting service, webhook handler, simple CRUD API

#### Choose **Complex API (NestJS)** when:

✅ Building a full-featured backend ✅ Need structured architecture (modules,
DI, etc.) ✅ Multiple developers working together ✅ Complex business logic ✅
Need Swagger documentation ✅ Want built-in microservice support

**Examples**: Restaurant management, user service, payment processing

### What Each Type Creates

#### Simple API (Fastify)

#### Simple API (Fastify)

Uses `apps/analytics` as template.

**What it does:**

1. Copies template from analytics API
2. Updates package.json, .env files
3. Assigns unique port (3002-3100)
4. Creates example routes
5. Configures Prisma for PostgreSQL
6. Sets up health check endpoints
7. Installs dependencies

**Generated features:**

- ✅ Fastify 5 + TypeScript 5.9
- ✅ Prisma ORM + PostgreSQL
- ✅ Zod validation
- ✅ Security (CORS, Helmet, Rate Limiting)
- ✅ Health check endpoints
- ✅ Pino logger
- ✅ Hot reload with tsx
- ✅ ESLint + Prettier

#### Complex API (NestJS)

Uses NestJS CLI to generate fresh project.

**What it does:**

1. Generates new NestJS project with CLI
2. Installs additional dependencies based on transport type:
   - **REST**: Swagger, Prisma, validation, security
   - **GraphQL**: Apollo Server, GraphQL tools
   - **Microservice**: @nestjs/microservices
   - **WebSockets**: Socket.io
3. Creates .env and docker-compose.yml
4. Initializes Prisma (for REST/microservice)
5. Adds custom scripts (prisma:_, db:_)
6. Updates README with setup instructions

**Generated features:**

- ✅ NestJS 11 + TypeScript
- ✅ Prisma ORM + PostgreSQL (REST/microservice)
- ✅ Docker Compose for database
- ✅ Environment configuration (@nestjs/config)
- ✅ Validation & transformation (class-validator)
- ✅ Swagger/OpenAPI (REST only)
- ✅ Security (Helmet, CORS)
- ✅ Testing setup (Jest)
- ✅ ESLint + Prettier
- ✅ Module-based architecture

### Generated Structure

#### Fastify API Structure

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
│   └── schema.prisma       # Database schema
├── .env                    # Environment variables
├── package.json            # API package
└── README.md               # API documentation
```

#### NestJS API Structure

```
apps/<api-name>/
├── src/
│   ├── main.ts             # Application bootstrap
│   ├── app.module.ts       # Root module
│   ├── app.controller.ts   # Health check endpoint
│   └── app.service.ts      # Root service
├── prisma/                 # Prisma setup (REST/microservice)
│   └── schema.prisma
├── test/                   # E2E tests
├── .env                    # Environment variables
├── docker-compose.yml      # PostgreSQL container
├── prisma.config.ts        # Prisma configuration
└── README.md               # API documentation
```

### Port Assignment

Ports are automatically assigned based on API name hash:

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

#### For NestJS APIs

1. **Navigate to API:**

   ```bash
   cd apps/<api-name>
   ```

2. **Start PostgreSQL:**

   ```bash
   docker-compose up -d
   ```

3. **Customize Prisma schema:** Edit `prisma/schema.prisma` with your data
   models

4. **Generate Prisma client:**

   ```bash
   pnpm prisma:generate
   ```

5. **Run migrations:**

   ```bash
   pnpm prisma:migrate
   ```

6. **Generate resources (CRUD modules):**

   ```bash
   npx @nestjs/cli generate resource <name>
   # Example: npx @nestjs/cli generate resource restaurants
   ```

7. **Start development:**

   ```bash
   pnpm start:dev
   ```

8. **Visit your API:**
   ```
   http://localhost:<assigned-port>/api/v1
   http://localhost:<assigned-port>/api/docs  (Swagger - REST only)
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
