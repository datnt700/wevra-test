# Generic Next.js 15 Webapp Template

This is a **generic template** for creating new Next.js 15 web applications in
the Tavia monorepo. It contains minimal structure without business-specific
logic.

## 🎯 Purpose

This template provides a clean starting point with:

- ✅ Next.js 15 App Router setup
- ✅ TypeScript configuration
- ✅ Basic internationalization (i18n) with next-intl
- ✅ Prisma ORM setup (no models, just structure)
- ✅ Testing setup with Vitest
- ✅ ESLint configuration
- ✅ Example pages and components
- ❌ **NO business logic** (no booking, restaurant, or domain-specific features)

## 📁 Structure

```
webapp-template/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Home page (example)
│   │   └── about/         # About page (example)
│   └── layout.tsx         # Root layout
├── components/            # Reusable components (examples)
├── lib/                   # Utility functions
├── prisma/               # Prisma schema (minimal)
├── public/               # Static assets
├── messages/             # i18n translations
└── tests/                # Test setup
```

## 🚀 What to Customize

When creating a new app from this template, customize:

1. **Package name**: Update `name` in `package.json` to `@tavia/your-app-name`
2. **Port**: Update port in `package.json` dev script if needed
3. **Prisma models**: Add your database models in `prisma/schema.prisma`
4. **Pages**: Replace example pages with your actual app pages
5. **i18n messages**: Update translations in `messages/` directory
6. **Environment variables**: Copy `.env.example` and configure
7. **README**: Update this file with your app-specific information

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## 📝 Notes

- This template uses `@tavia/core` for UI components
- Prisma schema is minimal - add models as needed
- i18n is configured for English (en) and French (fr) by default
- No authentication is implemented - add as needed
- No API routes included - add in `app/api/` as needed
