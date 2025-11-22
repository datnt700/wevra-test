# @tavia/env

Type-safe environment variable validation with Zod, default values, and runtime
checks.

## Features

- ✅ **Type-safe**: Full TypeScript support with inferred types
- ✅ **Runtime validation**: Zod schemas catch errors early
- ✅ **Default values**: Provide fallbacks for optional variables
- ✅ **Client/Server split**: Separate validation for browser and Node.js
- ✅ **Helpful errors**: Clear messages when validation fails
- ✅ **Zero runtime overhead**: Validated once at startup
- ✅ **Framework agnostic**: Works with Next.js, Node.js, etc.

## Installation

```bash
pnpm add @tavia/env
```

## Usage

### Basic Example

```typescript
import { createEnv } from '@tavia/env';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    API_KEY: z.string().min(32),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
    NEXT_PUBLIC_APP_NAME: z.string().default('Tavia'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
});

// Usage - fully typed!
console.log(env.DATABASE_URL); // string
console.log(env.NODE_ENV); // 'development' | 'production' | 'test'
console.log(env.NEXT_PUBLIC_APP_URL); // string
```

### Next.js App Example

```typescript
// src/lib/env.ts
import { createEnv } from '@tavia/env';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url(),

    // Auth
    NEXTAUTH_URL: z.string().url().default('http://localhost:3000'),
    NEXTAUTH_SECRET: z.string().min(32),

    // OAuth
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),

    // Stripe
    STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
    STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
});
```

### Advanced Usage

```typescript
import { createEnv } from '@tavia/env';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Port number with default
    PORT: z.coerce.number().default(3000),

    // Boolean flags
    ENABLE_DEBUG: z.coerce.boolean().default(false),

    // Enum with validation
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

    // Comma-separated array
    ALLOWED_ORIGINS: z
      .string()
      .transform((str) => str.split(','))
      .default('http://localhost:3000'),

    // Custom validation
    MAX_FILE_SIZE: z.coerce
      .number()
      .max(10 * 1024 * 1024) // 10MB
      .default(5 * 1024 * 1024), // 5MB
  },

  client: {
    NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
    NEXT_PUBLIC_ENABLE_ANALYTICS: z.coerce.boolean().default(false),
  },

  runtimeEnv: {
    PORT: process.env.PORT,
    ENABLE_DEBUG: process.env.ENABLE_DEBUG,
    LOG_LEVEL: process.env.LOG_LEVEL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  },

  // Skip validation during build (optional)
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
```

## API Reference

### `createEnv(options)`

Creates a validated environment object.

**Options:**

- `server`: Zod schema for server-only variables
- `client`: Zod schema for client-side variables (must start with `NEXT_PUBLIC_`
  in Next.js)
- `runtimeEnv`: Object mapping schema keys to `process.env` values
- `skipValidation`: Skip validation (useful for build tools)
- `onValidationError`: Custom error handler
- `onInvalidAccess`: Custom handler for accessing server vars on client

## Type Safety

The library ensures:

1. **Server variables** cannot be accessed on the client
2. **Client variables** must have the `NEXT_PUBLIC_` prefix (Next.js convention)
3. All variables are validated against Zod schemas at startup
4. TypeScript infers exact types from your schemas

## Error Messages

Clear, actionable error messages:

```
❌ Invalid environment variables:
  - DATABASE_URL: Expected string, received undefined
  - PORT: Expected number, received "invalid"
  - NODE_ENV: Expected "development" | "production" | "test", received "staging"

Fix the above errors to continue.
```

## Best Practices

1. **Define env once**: Create a single `src/lib/env.ts` file
2. **Import everywhere**: Use `import { env } from '@/lib/env'`
3. **Use defaults**: Provide sensible defaults for optional variables
4. **Validate early**: Let the app crash at startup if env is invalid
5. **Document requirements**: Add comments for complex validation

## Migration from Manual Validation

**Before:**

```typescript
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('Missing DATABASE_URL');

const PORT = parseInt(process.env.PORT || '3000');
```

**After:**

```typescript
import { env } from '@/lib/env';

const DATABASE_URL = env.DATABASE_URL; // validated, typed
const PORT = env.PORT; // parsed to number, default 3000
```

## License

MIT
