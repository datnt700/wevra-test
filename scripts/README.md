# Tavia Scripts

Utility scripts for the Tavia monorepo.

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
5. **Updates documentation** - Updates README.md with app-specific info
6. **Cleans up** - Removes node_modules, build artifacts
7. **Installs dependencies** - Runs `pnpm install` at root

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
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── vitest.config.ts        # Vitest config
├── playwright.config.ts    # Playwright config
├── DATABASE.md             # Database setup guide
└── README.md               # App documentation
```

### Features Included

All apps created from this script include:

- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** configuration
- ✅ **i18n** with next-intl (cookie-based)
- ✅ **Prisma ORM** + PostgreSQL setup
- ✅ **Auth.js v5** authentication
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
