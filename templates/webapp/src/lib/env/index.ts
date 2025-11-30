/**
 * Environment variable validation and type-safe access
 *
 * Uses @Eventure/env for runtime validation with Zod schemas.
 * All variables are validated on app startup with helpful error messages.
 *
 * @example
 * ```ts
 * import { env, envUtils } from '@/lib/env';
 *
 * // Server-only (will throw on client)
 * const dbUrl = env.DATABASE_URL;
 *
 * // Client-safe (available everywhere)
 * const appUrl = env.NEXT_PUBLIC_APP_URL;
 * ```
 */

import { createEnv, envHelpers } from '@Eventure/env';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Server-side environment variables
   * These are ONLY available on the server (API routes, server components, etc.)
   */
  server: {
    // Node Environment
    NODE_ENV: envHelpers.nodeEnv(),

    // Database
    DATABASE_URL: z
      .string()
      .url()
      .default('postgresql://postgres:postgres@localhost:5432/{app-name}?schema=public'),

    // PostgreSQL Docker Container (for local development)
    POSTGRES_USER: z.string().default('postgres'),
    POSTGRES_PASSWORD: z.string().default('postgres'),
    POSTGRES_DB: z.string().default('{app-name}'),

    // Analytics API (optional)
    ANALYTICS_API_URL: z.string().url().default('http://localhost:3001'),
    ANALYTICS_API_KEY: envHelpers.optionalString(),
  },

  /**
   * Client-side environment variables
   * These are exposed to the browser and must be prefixed with NEXT_PUBLIC_
   */
  client: {
    // App Configuration
    NEXT_PUBLIC_APP_URL: envHelpers.url('http://localhost:{port}'),
    NEXT_PUBLIC_APP_NAME: z.string().default('{app-name}'),

    // Analytics
    NEXT_PUBLIC_ANALYTICS_ENABLED: envHelpers.boolean(true),
    NEXT_PUBLIC_ANALYTICS_DEBUG: envHelpers.boolean(false),
  },

  /**
   * Runtime environment mapping
   * Maps schema keys to actual process.env values
   */
  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    ANALYTICS_API_URL: process.env.ANALYTICS_API_URL,
    ANALYTICS_API_KEY: process.env.ANALYTICS_API_KEY,

    // Client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
    NEXT_PUBLIC_ANALYTICS_DEBUG: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG,
  },

  /**
   * Skip validation during build (optional)
   * Set SKIP_ENV_VALIDATION=true to skip validation
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});

/**
 * Utility functions derived from env
 */
export const envUtils = {
  /** Check if running in development */
  isDevelopment: () => env.NODE_ENV === 'development',

  /** Check if running in production */
  isProduction: () => env.NODE_ENV === 'production',

  /** Check if running in test */
  isTest: () => env.NODE_ENV === 'test',

  /** Check if analytics is enabled */
  isAnalyticsEnabled: () => env.NEXT_PUBLIC_ANALYTICS_ENABLED,

  /** Get full app URL with path */
  getAppUrl: (path = '') => {
    const url = env.NEXT_PUBLIC_APP_URL;
    return path ? `${url}${path.startsWith('/') ? '' : '/'}${path}` : url;
  },

  /** Get analytics API URL with path */
  getAnalyticsUrl: (path = '') => {
    const url = env.ANALYTICS_API_URL;
    return path ? `${url}${path.startsWith('/') ? '' : '/'}${path}` : url;
  },
} as const;
