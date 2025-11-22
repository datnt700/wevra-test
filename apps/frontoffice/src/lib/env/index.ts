import { createEnv, envHelpers } from '@tavia/env';
import { z } from 'zod';

/**
 * Frontoffice Environment Configuration
 *
 * Validates and provides type-safe access to environment variables.
 * Uses @tavia/env package for centralized validation logic.
 *
 * Architecture:
 * - Server vars: Only accessible on server (API routes, server components)
 * - Client vars: Must have NEXT_PUBLIC_ prefix, accessible everywhere
 * - Defaults: All optional variables have sensible defaults for development
 *
 * Usage:
 * ```ts
 * import { env, envUtils } from '@/lib/env';
 *
 * // Server-side only
 * const dbUrl = env.DATABASE_URL;
 *
 * // Client-side accessible
 * const appUrl = env.NEXT_PUBLIC_APP_URL;
 *
 * // Utility functions
 * if (envUtils.isDevelopment()) { ... }
 * const backofficeUrl = envUtils.getBackofficeUrl();
 * ```
 */

export const env = createEnv({
  /**
   * Server-side environment variables
   * Only accessible in server components, API routes, and server actions
   */
  server: {
    // Node Environment
    NODE_ENV: envHelpers.nodeEnv(),

    // Database (shared with backoffice)
    DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/tavia'),

    // Analytics API
    ANALYTICS_API_URL: z.string().url().default('http://localhost:3001'),
    ANALYTICS_API_KEY: z.string().optional(),
  },

  /**
   * Client-side environment variables
   * Must have NEXT_PUBLIC_ prefix
   * Accessible in both server and client components
   */
  client: {
    // App URLs
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3003'),
    NEXT_PUBLIC_BACKOFFICE_URL: z.string().url().default('http://localhost:3000'),

    // Analytics
    NEXT_PUBLIC_ANALYTICS_ENABLED: envHelpers.boolean().default(true),
    NEXT_PUBLIC_ANALYTICS_DEBUG: envHelpers.boolean().default(false),
  },

  /**
   * Runtime environment variables mapping
   * Maps process.env to the validation schema
   */
  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    ANALYTICS_API_URL: process.env.ANALYTICS_API_URL,
    ANALYTICS_API_KEY: process.env.ANALYTICS_API_KEY,

    // Client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BACKOFFICE_URL: process.env.NEXT_PUBLIC_BACKOFFICE_URL,
    NEXT_PUBLIC_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
    NEXT_PUBLIC_ANALYTICS_DEBUG: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG,
  },

  /**
   * Skip validation during build
   * Useful for Docker builds where env vars are injected at runtime
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

/**
 * Environment utility functions
 * Provides convenient helpers for common environment checks
 */
export const envUtils = {
  /**
   * Check if running in development mode
   */
  isDevelopment: () => env.NODE_ENV === 'development',

  /**
   * Check if running in production mode
   */
  isProduction: () => env.NODE_ENV === 'production',

  /**
   * Check if running in test mode
   */
  isTest: () => env.NODE_ENV === 'test',

  /**
   * Check if analytics is enabled
   */
  isAnalyticsEnabled: () => env.NEXT_PUBLIC_ANALYTICS_ENABLED,

  /**
   * Check if analytics debug mode is enabled
   */
  isAnalyticsDebug: () => env.NEXT_PUBLIC_ANALYTICS_DEBUG,

  /**
   * Get the full app URL with path
   */
  getAppUrl: (path = '') => {
    const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  },

  /**
   * Get the backoffice URL
   */
  getBackofficeUrl: (path = '') => {
    const baseUrl = env.NEXT_PUBLIC_BACKOFFICE_URL.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  },

  /**
   * Get the analytics API URL
   */
  getAnalyticsUrl: (path = '') => {
    const baseUrl = env.ANALYTICS_API_URL.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  },
} as const;

/**
 * Type exports for use in other files
 */
export type Env = typeof env;
export type EnvUtils = typeof envUtils;
