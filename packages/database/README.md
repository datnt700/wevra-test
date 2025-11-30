# @eventure/database

Shared database types, enums, and utilities for the Eventure monorepo.

## Purpose

This package provides:

- **Prisma-generated enums** exported for use across apps (backoffice,
  frontoffice, mobile)
- **Shared type definitions** for database models
- **Type utilities** for working with Prisma types

## Usage

```typescript
// Import enums from Prisma
import { UserRole, SubscriptionStatus } from '@eventure/database/enums';

// Use in conditionals
if (user.role === UserRole.ADMIN) {
  // Admin logic
}

// Use in type definitions
type DashboardData = {
  user: {
    role: UserRole;
    subscriptionStatus: SubscriptionStatus;
  };
};
```

## Benefits

1. **Single source of truth** - Enums come directly from Prisma schema
2. **Type safety** - No hardcoded strings like 'ADMIN' or 'PREMIUM'
3. **Shared across apps** - All apps use same types
4. **Easy refactoring** - Change enum in Prisma, changes propagate

## Structure

```
src/
├── index.ts           # Main exports
├── enums/
│   └── index.ts       # Re-export Prisma enums
└── types/
    └── index.ts       # Shared type definitions
```
