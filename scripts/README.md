# Eventure Scripts

Utility scripts for the Eventure monorepo.

## Quick Reference

| Script          | Purpose                  | Template                                          | Port Range | Command                  |
| --------------- | ------------------------ | ------------------------------------------------- | ---------- | ------------------------ |
| `create-app.js` | Next.js web applications | `templates/webapp`                                | 3000-3099  | `pnpm create:app <name>` |
| `create-api.js` | API microservices        | `templates/simple-api` or `templates/complex-api` | 4000-4099  | `pnpm create:api <name>` |

> **Note:** These scripts use **generic templates** from the `templates/`
> directory, not production apps from `apps/`.

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

1. **Copies template** - Uses `templates/webapp` as the generic starting point
2. **Updates package.json** - Sets the app name (`@eventure/<app-name>`) and
   description
3. **Assigns unique port** - Automatically assigns a port based on app name
   (3000-3099)
4. **Creates .env.local** - Sets up environment variables with correct port and
   database URL
5. **Updates documentation** - Updates README.md with app-specific info
6. **Cleans up** - Removes node_modules, build artifacts
7. **Installs dependencies** - Runs `pnpm install` at root

> **Note:** The template does NOT include Docker, Auth.js, or analytics features
> by default. Add these as needed for your specific app.

### Generated Structure

```
apps/<app-name>/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Home page (example)
│   │   └── about/         # About page (example)
│   └── layout.tsx         # Root layout
├── components/            # Reusable components (examples)
├── lib/                   # Utility functions (prisma, utils)
├── prisma/               # Database schema (minimal Example model)
├── messages/             # i18n translations (en, fr)
├── i18n/                 # i18n configuration
├── tests/                # Vitest setup
├── public/               # Static assets
├── package.json          # Updated with app name
├── .env.local            # Environment variables (generated from .env.example)
├── .env.example          # Environment template
├── tsconfig.json         # TypeScript config
├── next.config.js        # Next.js config with next-intl
├── vitest.config.ts      # Vitest config
└── README.md             # App documentation (updated)
```

> **Note:** Docker, DATABASE.md, DOCKER.md, Auth.js, and E2E tests are NOT
> included in the generic template. Add these as needed.

### Features Included

All apps created from this script include:

- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** configuration
- ✅ **i18n** with next-intl (en, fr by default)
- ✅ **Prisma ORM** setup (PostgreSQL ready, minimal schema)
- ✅ **@eventure/eventured** UI component library
- ✅ **Vitest** testing setup
- ✅ **ESLint 9** flat config
- ✅ **Example pages** (home, about with i18n)

> **Note:** Auth.js, Docker, E2E tests, Analytics SDK, Emotion, and Framer
> Motion are NOT included by default. Add these features as needed for your
> specific application.

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

2. **Update environment variables:** Edit `.env.local` with your database
   configuration

3. **Add your Prisma models:** Edit `prisma/schema.prisma` with your data models

4. **Generate Prisma client:**

   ```bash
   pnpm db:generate
   ```

5. **Push database schema:**

   ```bash
   pnpm db:push
   ```

6. **Start development:**

   ```bash
   pnpm dev
   ```

7. **Visit your app:**
   ```
   http://localhost:<assigned-port>
   ```

### Customization

After creation, you can customize:

- **Port:** Edit `dev` script in `package.json`
- **Database:** Update Prisma schema in `prisma/schema.prisma`
- **i18n:** Add/remove languages in `i18n/request.ts` and `messages/`
- **Pages:** Replace example pages in `app/[locale]/` with your actual pages
- **Components:** Add your components in `components/`
- **Add features:** Docker setup, Auth.js, analytics, E2E tests as needed

### Notes

- The script uses `templates/webapp` as the generic starting point
- All apps share the same monorepo dependencies via catalog
- Template is **minimal** - add features (Docker, Auth, etc.) as needed for your
  use case
- Remove example pages after adding your actual application pages

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

🚀 Eventure API Generator

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

🚀 Eventure API Generator

? What name would you like to use for the API? event-service
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

**Examples**: Event management service, user service, payment processing

### What Each Type Creates

#### Simple API (Fastify)

#### Simple API (Fastify)

Uses `templates/simple-api` as the generic template.

**What it does:**

1. Copies template from `templates/simple-api`
2. Updates package.json, .env files
3. Assigns unique port (4000-4099)
4. Updates README with API-specific info
5. Installs dependencies

**Generated features:**

- ✅ Fastify 5 + TypeScript + ES Modules
- ✅ Prisma ORM setup (minimal Example model)
- ✅ Zod validation
- ✅ Security (CORS, Helmet, Rate Limiting)
- ✅ Health check endpoints
- ✅ Example CRUD routes (customize/replace)
- ✅ Hot reload with tsx
- ✅ ESLint + TypeScript checking

#### Complex API (NestJS)

Uses NestJS CLI to generate fresh project or `templates/complex-api` template.

**What it does:**

1. Generates new NestJS project with CLI (or copies from template)
2. Installs additional dependencies based on transport type:
   - **REST**: Swagger, Prisma, validation, security
   - **GraphQL**: Apollo Server, GraphQL tools
   - **Microservice**: @nestjs/microservices
   - **WebSockets**: Socket.io
3. Creates .env and configuration files
4. Initializes Prisma (for REST/microservice)
5. Sets up example resource module
6. Updates README with setup instructions

**Generated features:**

- ✅ NestJS 11 + TypeScript with decorators
- ✅ Prisma ORM setup (REST/microservice)
- ✅ Environment configuration (@nestjs/config)
- ✅ Validation & transformation (class-validator)
- ✅ Swagger/OpenAPI (REST only)
- ✅ Security (Helmet, CORS)
- ✅ Testing setup (Jest)
- ✅ ESLint + TypeScript
- ✅ Module-based architecture
- ✅ Example resource with CRUD

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
│       └── example.ts      # Example CRUD routes (customize/rename)
├── prisma/
│   └── schema.prisma       # Database schema (minimal Example model)
├── .env                    # Environment variables (generated)
├── .env.example            # Environment template
├── package.json            # API package (updated)
└── README.md               # API documentation (updated)
```

> **Note:** Example routes demonstrate CRUD patterns. Rename `example.ts` to
> match your domain (e.g., `notifications.ts`) and implement your business
> logic.

#### NestJS API Structure

```
apps/<api-name>/
├── src/
│   ├── main.ts             # Application bootstrap with Swagger
│   ├── app.module.ts       # Root module
│   ├── app.controller.ts   # Root controller (health, info)
│   ├── app.service.ts      # Root service
│   ├── prisma/             # Prisma module (global)
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── examples/           # Example resource module
│       ├── examples.module.ts
│       ├── examples.controller.ts
│       ├── examples.service.ts
│       └── dto/
│           ├── create-example.dto.ts
│           └── update-example.dto.ts
├── prisma/                 # Prisma setup (REST/microservice)
│   └── schema.prisma       # Database schema (minimal Example model)
├── test/                   # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env                    # Environment variables (generated)
├── .env.example            # Environment template
├── nest-cli.json           # NestJS CLI config
├── tsconfig.json           # TypeScript config
├── tsconfig.build.json     # Build config
└── README.md               # API documentation (updated)
```

> **Note:** Example resource demonstrates CRUD patterns with DTOs and
> validation. Replace with your actual domain resources (e.g., `restaurants`,
> `users`).

### Port Assignment

Ports are automatically assigned based on API name hash (4000-4099 range):

Examples:

- `notifications` → Port 4047
- `payments` → Port 4023
- `messaging` → Port 4065

> **Note:** Port range changed from 3001-3100 to 4000-4099 to separate APIs from
> web apps.

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
   # Example: npx @nestjs/cli generate resource events
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
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eventure"
   ```

2. **Separate database** - Use dedicated database for the API
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notifications"
   ```

### Troubleshooting

**"Template not found"**

- Ensure `templates/simple-api` or `templates/complex-api` exists
- Run from monorepo root directory

**"API already exists"**

- Choose a different name or delete the existing API

**Port conflict**

- The port is assigned deterministically based on name hash
- Manually change `PORT` in `.env` if needed

**Dependencies not installing**

- Run `pnpm install` manually from the root directory

**Prisma client errors**

- Run `pnpm db:generate` after modifying schema

### Notes

- Simple APIs use `templates/simple-api` as the starting point
- Complex APIs use NestJS CLI or `templates/complex-api`
- All APIs share monorepo dependencies via workspace catalog
- Templates are **minimal** - implement your business logic
- Health checks and security are pre-configured
- Example routes demonstrate patterns - replace with your domain logic

---

## Template System

The generator scripts use **generic templates** from the `templates/` directory:

- **templates/webapp** - Next.js 15 app template (used by `create-app.js`)
- **templates/simple-api** - Fastify 5 API template (used by `create-api.js`
  option 1)
- **templates/complex-api** - NestJS 11 API template (used by `create-api.js`
  option 2)

### Why Templates?

**Before (old approach):**

- ❌ Copied from production apps (`apps/web`, `apps/analytics`)
- ❌ Contained business-specific logic (booking, analytics)
- ❌ Had to strip features after copying
- ❌ Production code mixed with templates

**Now (template approach):**

- ✅ Clean, generic starting points
- ✅ No business logic to remove
- ✅ Minimal setup with examples
- ✅ Clear separation: `templates/` vs `apps/`

### Template Guidelines

Templates should be:

- **Generic** - No business-specific features
- **Minimal** - Essential setup only
- **Example-driven** - Demonstrate patterns with placeholder code
- **Well-documented** - Clear README explaining customization

See [templates/README.md](../templates/README.md) for detailed template
documentation.
