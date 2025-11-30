# Contributing to Eventure

First off, thank you for considering contributing to Eventure! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and
inclusive environment for everyone.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/eventure.git
   cd eventure
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/eventure-io/eventure.git
   ```

## Development Setup

### Prerequisites

- Node.js 18.18.0 or higher (use nvm: `nvm use`)
- pnpm 10.17.1 or higher
- PostgreSQL database (or Supabase/Neon account)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your credentials

# Set up database
cd apps/web
npx prisma migrate dev
npx prisma generate

# Start development
cd ../..
pnpm dev
```

### Available Commands

```bash
pnpm dev              # Start all apps in dev mode
pnpm dev:web          # Start web app only
pnpm dev:storybook    # Start Storybook only
pnpm build            # Build all apps
pnpm lint             # Lint all workspaces
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code
pnpm type-check       # Type check all workspaces
pnpm test             # Run tests
pnpm commit           # Commit with Commitizen
```

## How to Contribute

### Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml) to report
bugs.

### Suggesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.yml)
to suggest features.

### Improving Documentation

Use the [Documentation template](.github/ISSUE_TEMPLATE/documentation.yml) for
documentation improvements.

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Revert previous commit

### Examples

```bash
feat(auth): add Google OAuth login
fix(events): prevent duplicate event registration
docs(readme): update installation instructions
refactor(core): migrate to Lucide icons
chore(deps): update Next.js to v15.5.0
```

### Using Commitizen

We recommend using Commitizen for commits:

```bash
# Stage your changes
git add .

# Commit with Commitizen
pnpm commit
```

This will guide you through creating a proper conventional commit.

## Pull Request Process

1. **Create a feature branch**:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Commit your changes** using conventional commits:

   ```bash
   pnpm commit
   ```

4. **Keep your branch updated**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to your fork**:

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Open a Pull Request** using our PR template

7. **Address review feedback** if needed

8. **Wait for CI checks** to pass

9. **Get approval** from maintainers

10. **Merge** (maintainers will merge after approval)

### PR Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated documentation accordingly
- [ ] My changes generate no new warnings/errors
- [ ] I have added tests that prove my fix/feature works
- [ ] All new and existing tests pass
- [ ] My commits follow conventional commits
- [ ] I have updated the catalog if I added dependencies

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict mode
- No `any` types (use `unknown` if needed)
- Prefer interfaces over types for objects
- Use type inference where possible

### React/Next.js

- Use functional components with hooks
- Prefer Server Components (use 'use client' only when needed)
- Use Server Actions for mutations
- Follow Next.js App Router conventions

### Styling

- Use Tailwind CSS utility classes
- Use shadcn/ui components from `@eventure/eventured`
- Follow responsive-first approach
- Maintain accessibility standards (WCAG 2.1 AA)

### File Naming

- Components: PascalCase (e.g., `EventForm.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Server Actions: camelCase with 'Action' suffix (e.g., `createEventAction.ts`)
- Routes: kebab-case (e.g., `event-history/`)

### Code Organization

```
feature/
├── _services/      # API calls and business logic
├── _hooks/         # React hooks
├── _components/    # UI components
├── _types/         # TypeScript types
└── page.tsx        # Route page
```

### ESLint & Prettier

- Code must pass ESLint with no warnings
- Code must be formatted with Prettier
- Pre-commit hooks will enforce this

## Testing Guidelines

### Unit Tests

- Write tests for all utilities and business logic
- Use Vitest for testing
- Aim for >80% coverage
- Place tests next to source files: `utils.test.ts`

### Component Tests

- Test user interactions
- Use React Testing Library
- Focus on behavior, not implementation

### E2E Tests (Future)

- Use Playwright for critical flows
- Test event joining flow end-to-end
- Test event creation flow
- Test authentication flow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Database Changes

### Prisma Migrations

Always create migrations for schema changes:

```bash
# Create migration
npx prisma migrate dev --name descriptive_name

# Never use db push in production
# ❌ npx prisma db push
```

### Migration Checklist

- [ ] Migration is reversible
- [ ] Migration is tested locally
- [ ] Migration includes data migration if needed
- [ ] Migration name is descriptive

## pnpm Catalog Dependencies

Always use catalog dependencies:

```json
{
  "dependencies": {
    "new-package": "catalog:"
  }
}
```

1. Add to `pnpm-workspace.yaml` catalog first
2. Reference with `catalog:` in package.json
3. Run `pnpm install`

## Branch Naming

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks

## Questions?

- Open a [Discussion](https://github.com/eventure-io/eventure/discussions)
- Ask in the
  [Q&A section](https://github.com/eventure-io/eventure/discussions/categories/q-a)
- Check [existing issues](https://github.com/eventure-io/eventure/issues)

## License

By contributing, you agree that your contributions will be licensed under the
MIT License.

---

**Thank you for contributing to Eventure! 🎉**
