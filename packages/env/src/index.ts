import { z } from 'zod';

/**
 * Environment configuration options
 */
export interface EnvOptions<
  TServer extends Record<string, z.ZodType>,
  TClient extends Record<string, z.ZodType>,
> {
  /**
   * Server-side environment variables schema
   * These are only available on the server
   */
  server?: TServer;

  /**
   * Client-side environment variables schema
   * These must be prefixed with NEXT_PUBLIC_ in Next.js
   */
  client?: TClient;

  /**
   * Runtime environment object (process.env)
   * Maps schema keys to actual environment values
   */
  runtimeEnv: Record<string, string | undefined>;

  /**
   * Skip validation (useful during build)
   * @default false
   */
  skipValidation?: boolean;

  /**
   * Called when validation fails
   */
  onValidationError?: (error: z.ZodError) => never;

  /**
   * Called when server env is accessed on client
   */
  onInvalidAccess?: (variable: string) => never;
}

/**
 * Infer types from environment schemas
 */
export type EnvOutput<
  TServer extends Record<string, z.ZodType>,
  TClient extends Record<string, z.ZodType>,
> = z.infer<z.ZodObject<TServer>> & z.infer<z.ZodObject<TClient>>;

/**
 * Format validation errors into readable messages
 */
function formatErrors(errors: z.ZodIssue[]): string {
  const errorMessages = errors.map((error) => {
    const path = error.path.join('.');
    return `  - ${path}: ${error.message}`;
  });

  return `❌ Invalid environment variables:\n${errorMessages.join('\n')}\n\nFix the above errors to continue.`;
}

/**
 * Default validation error handler
 */
function defaultOnValidationError(error: z.ZodError): never {
  console.error(formatErrors(error.issues));
  throw new Error('Environment validation failed');
}

/**
 * Default invalid access handler
 */
function defaultOnInvalidAccess(variable: string): never {
  throw new Error(
    `❌ Attempted to access server-side environment variable "${variable}" on the client.\n` +
      `This is not allowed. Server variables are only available in server components, API routes, and server actions.`
  );
}

/**
 * Check if code is running on the client
 */
function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Create type-safe environment variables with validation
 *
 * @example
 * ```ts
 * import { createEnv } from '@tavia/env';
 * import { z } from 'zod';
 *
 * export const env = createEnv({
 *   server: {
 *     DATABASE_URL: z.string().url(),
 *     API_KEY: z.string().min(32),
 *   },
 *   client: {
 *     NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
 *   },
 *   runtimeEnv: {
 *     DATABASE_URL: process.env.DATABASE_URL,
 *     API_KEY: process.env.API_KEY,
 *     NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
 *   },
 * });
 * ```
 */
export function createEnv<
  TServer extends Record<string, z.ZodType> = Record<string, never>,
  TClient extends Record<string, z.ZodType> = Record<string, never>,
>(options: EnvOptions<TServer, TClient>): EnvOutput<TServer, TClient> {
  const {
    server = {} as TServer,
    client = {} as TClient,
    runtimeEnv,
    skipValidation = false,
    onValidationError = defaultOnValidationError,
    onInvalidAccess = defaultOnInvalidAccess,
  } = options;

  // Skip validation if requested (e.g., during build)
  if (skipValidation) {
    return runtimeEnv as EnvOutput<TServer, TClient>;
  }

  // Validate client variables have NEXT_PUBLIC_ prefix
  const clientPrefix = 'NEXT_PUBLIC_';
  for (const key of Object.keys(client)) {
    if (!key.startsWith(clientPrefix)) {
      throw new Error(
        `❌ Client environment variable "${key}" must start with "${clientPrefix}".\n` +
          `Rename it to "${clientPrefix}${key}" or move it to server schema.`
      );
    }
  }

  // Combine server and client schemas
  const serverSchema = z.object(server);
  const clientSchema = z.object(client);
  const combinedSchema = serverSchema.merge(clientSchema);

  // Validate environment variables
  const parsed = combinedSchema.safeParse(runtimeEnv);

  if (!parsed.success) {
    onValidationError(parsed.error);
  }

  // Create proxy to prevent accessing server vars on client
  const env = new Proxy(parsed.data as EnvOutput<TServer, TClient>, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;

      // Allow access to client variables anywhere
      if (prop.startsWith(clientPrefix)) {
        return target[prop as keyof typeof target];
      }

      // Block server variables on client
      if (isClient()) {
        onInvalidAccess(prop);
      }

      return target[prop as keyof typeof target];
    },
  });

  return env;
}

/**
 * Helper to create common Zod schemas for environment variables
 */
export const envHelpers = {
  /**
   * Port number with default
   */
  port: (defaultPort = 3000) => z.coerce.number().int().positive().default(defaultPort),

  /**
   * Boolean flag with default
   */
  boolean: (defaultValue = false) => z.coerce.boolean().default(defaultValue),

  /**
   * URL with optional default
   */
  url: (defaultUrl?: string) => {
    const schema = z.string().url();
    return defaultUrl ? schema.default(defaultUrl) : schema;
  },

  /**
   * Comma-separated list to array
   */
  list: (defaultValue?: string) => {
    const schema = z.string().transform((str) => str.split(',').map((s) => s.trim()));
    return defaultValue ? schema.default(defaultValue) : schema;
  },

  /**
   * Node environment enum
   */
  nodeEnv: () => z.enum(['development', 'production', 'test']).default('development'),

  /**
   * Optional string that can be empty
   */
  optionalString: () => z.string().optional(),

  /**
   * Email address
   */
  email: () => z.string().email(),

  /**
   * File size in bytes with max limit
   */
  fileSize: (maxBytes: number, defaultBytes?: number) => {
    const schema = z.coerce.number().max(maxBytes);
    return defaultBytes ? schema.default(defaultBytes) : schema;
  },
};
