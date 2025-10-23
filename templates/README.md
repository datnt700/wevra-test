# Tavia Project Templates

This directory contains **generic templates** for creating new applications and
API services in the Tavia monorepo. These templates provide clean starting
points without business-specific logic.

## 🎯 Purpose

Templates are **not production applications**. They are:

- ✅ Clean, minimal starting points for new projects
- ✅ Pre-configured with Tavia monorepo structure
- ✅ Include essential setup (TypeScript, ESLint, Prisma, etc.)
- ✅ Contain placeholder code and examples
- ❌ **NO business logic** (no booking, analytics, restaurant features)
- ❌ **NOT deployed** or used in production

## 📁 Available Templates

### 1. **webapp** - Next.js 15 Web Application

Generic Next.js template for creating web applications.

**Technology Stack:**

- Next.js 15 + React 19
- TypeScript
- next-intl (i18n)
- Prisma ORM
- @tavia/core UI components
- Vitest + Testing Library

**Use when:** Creating any customer-facing or internal web application.

**Generate:** `pnpm create:app my-app-name`

**See:** [webapp/README.md](./webapp/README.md)

---

### 2. **simple-api** - Fastify 5 API

Lightweight Fastify template for creating simple REST APIs.

**Technology Stack:**

- Fastify 5
- TypeScript + ES Modules
- Prisma ORM
- Zod validation
- Security middleware (CORS, Helmet, Rate Limiting)
- tsup for building

**Use when:** Creating simple REST APIs, microservices, or backend services that
don't need full NestJS features.

**Generate:** `pnpm create:api my-api-name` → Choose option 1

**See:** [simple-api/README.md](./simple-api/README.md)

---

### 3. **complex-api** - NestJS 11 Microservice

Full-featured NestJS template for creating complex microservices.

**Technology Stack:**

- NestJS 11
- TypeScript with decorators
- Prisma ORM (global module)
- Swagger/OpenAPI docs
- class-validator + class-transformer
- Jest testing
- REST, GraphQL, or Microservice transport

**Use when:** Creating complex microservices with advanced features (DI,
middleware, guards, interceptors, GraphQL, etc.).

**Generate:** `pnpm create:api my-api-name` → Choose option 2

**See:** [complex-api/README.md](./complex-api/README.md)

---

## 🚀 Using Templates

### Generate New Application (Next.js)

```bash
# From monorepo root
pnpm create:app my-app-name
```

This will:

1. Copy `templates/webapp` to `apps/my-app-name`
2. Update package.json, README, and configuration files
3. Set up unique port (3000 + offset)
4. Install dependencies
5. Ready to customize

### Generate New API (Fastify or NestJS)

```bash
# From monorepo root
pnpm create:api my-api-name
```

You'll be prompted to choose:

- **Option 1:** Simple API (Fastify) - copies from `templates/simple-api`
- **Option 2:** Complex API (NestJS) - uses NestJS CLI or copies from
  `templates/complex-api`

---

## 🔧 Template Maintenance

### Adding New Dependencies

When adding dependencies to templates, **always use catalog references**:

```json
{
  "dependencies": {
    "new-package": "catalog:",
    "@tavia/core": "workspace:*"
  }
}
```

Update `pnpm-workspace.yaml` catalog first, then reference in template.

### Updating Templates

Templates should be updated when:

- Core dependencies are upgraded (Next.js, Fastify, NestJS)
- New best practices are established
- Monorepo structure changes
- Security updates require configuration changes

**DO NOT:**

- Add business logic to templates
- Include specific features (booking, analytics, etc.)
- Add dependencies that aren't universally needed
- Create overly complex templates

### Testing Templates

Before committing template changes:

```bash
# Test webapp template
pnpm create:app test-webapp-$(date +%s)
cd apps/test-webapp-*
pnpm install
pnpm dev  # Verify it works
cd ../..
rm -rf apps/test-webapp-*

# Test simple-api template
pnpm create:api test-api-$(date +%s)
# Choose option 1
cd apps/test-api-*
pnpm install
pnpm dev
cd ../..
rm -rf apps/test-api-*
```

---

## 📊 Templates vs Apps

### **templates/** - Generic Starters

- Minimal, clean starting points
- No business logic
- Example/placeholder code
- Not deployed to production
- Used by generator scripts

**Example:** `templates/webapp` has example home/about pages with placeholder
content.

### **apps/** - Production Applications

- Real, deployed applications
- Business-specific logic
- Production features
- Used by customers/internal teams
- Independent deployment

**Example:** `apps/web` is the main Tavia web app with booking, auth, restaurant
features.

---

## 📚 Additional Resources

- [Generator Scripts Documentation](../scripts/README.md)
- [Monorepo Structure](../README.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Catalog Dependencies](../pnpm-workspace.yaml)

---

## 🤝 Contributing

When adding or updating templates:

1. Keep them **generic and minimal**
2. Remove **all business logic**
3. Add **helpful comments** explaining customization points
4. Update **README.md** in the template
5. Test generation with scripts
6. Update this file with new templates

---

**Remember:** Templates are **starting points**, not complete applications. They
should be customized for each specific use case.
