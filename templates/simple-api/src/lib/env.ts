/**
 * Environment variable validation for Fastify API
 *
 * Uses @eventure/env for type-safe environment configuration.
 * All variables are validated on server startup.
 *
 * @example
 * ```ts
 * import { env, envUtils } from './lib/env';
 *
 * const port = env.PORT;
 * const dbUrl = env.DATABASE_URL;
 *
 * if (envUtils.isDevelopment()) {
 *   console.log('Running in development mode');
 * }
 * ```
 */

import { createEnv, envHelpers } from '@eventure/env';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Server-side environment variables
   * All variables are server-side for API
   */
  server: {
    // Node Environment
    NODE_ENV: envHelpers.nodeEnv(),

    // Server Configuration
    PORT: envHelpers.port(4000),
    HOST: z.string().default('0.0.0.0'),

    // Logging
    LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

    // CORS
    ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),

    // Database (optional - if using Prisma)
    DATABASE_URL: z
      .string()
      .url()
      .default('postgresql://postgres:postgres@localhost:5432/{app-name}'),
  },

  /**
   * Runtime environment mapping
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    LOG_LEVEL: process.env.LOG_LEVEL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    DATABASE_URL: process.env.DATABASE_URL,
  },

  /**
   * Skip validation during build
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});

/**
 * Utility functions
 */
export const envUtils = {
  /** Check if running in development */
  isDevelopment: () => env.NODE_ENV === 'development',

  /** Check if running in production */
  isProduction: () => env.NODE_ENV === 'production',

  /** Check if running in test */
  isTest: () => env.NODE_ENV === 'test',

  /** Get allowed origins as array */
  getAllowedOrigins: () => env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()),

  /** Get server URL */
  getServerUrl: () => `http://${env.HOST}:${env.PORT}`,
} as const;
