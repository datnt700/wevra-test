/**
 * Environment variable validation and type-safe access
 *
 * Uses @tavia/env for runtime validation with Zod schemas.
 * All variables are validated on app startup with helpful error messages.
 *
 * @example
 * ```ts
 * import { env } from '@/lib/env';
 *
 * // Server-only (will throw on client)
 * const dbUrl = env.DATABASE_URL;
 * const apiKey = env.STRIPE_SECRET_KEY;
 *
 * // Client-safe (available everywhere)
 * const appUrl = env.NEXT_PUBLIC_APP_URL;
 * ```
 */

import { createEnv, envHelpers } from '@tavia/env';
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
      .default('postgresql://postgres:postgres@localhost:5432/tavia?schema=public'),

    // PostgreSQL Docker Container (for local development)
    POSTGRES_USER: z.string().default('postgres'),
    POSTGRES_PASSWORD: z.string().default('postgres'),
    POSTGRES_DB: z.string().default('tavia'),

    // NextAuth.js
    NEXTAUTH_URL: envHelpers.url('http://localhost:3000'),
    NEXTAUTH_SECRET: z
      .string()
      .min(32)
      .default('development-secret-change-in-production-min-32-chars'),

    // JWT for Mobile Auth (uses NEXTAUTH_SECRET as fallback)
    JWT_SECRET: z.string().min(32).optional(),

    // OAuth Providers (all optional - enable as needed)
    GOOGLE_CLIENT_ID: envHelpers.optionalString(),
    GOOGLE_CLIENT_SECRET: envHelpers.optionalString(),
    APPLE_CLIENT_ID: envHelpers.optionalString(),
    APPLE_CLIENT_SECRET: envHelpers.optionalString(),
    FACEBOOK_CLIENT_ID: envHelpers.optionalString(),
    FACEBOOK_CLIENT_SECRET: envHelpers.optionalString(),
    GITHUB_CLIENT_ID: envHelpers.optionalString(),
    GITHUB_CLIENT_SECRET: envHelpers.optionalString(),

    // Analytics API (optional)
    ANALYTICS_API_KEY: envHelpers.optionalString(),

    // Email (optional - for magic links, notifications)
    EMAIL_SERVER_HOST: z.string().default('smtp.gmail.com'),
    EMAIL_SERVER_PORT: z.coerce.number().default(587),
    EMAIL_SERVER_USER: envHelpers.optionalString(),
    EMAIL_SERVER_PASSWORD: envHelpers.optionalString(),
    EMAIL_FROM: envHelpers.email().default('noreply@tavia.com'),

    // Stripe Subscription Billing (REQUIRED for Premium features)
    STRIPE_SECRET_KEY: z
      .string()
      .refine((key) => key.startsWith('sk_'), {
        message: 'STRIPE_SECRET_KEY must start with sk_',
      })
      .optional()
      .or(z.literal('')),
    STRIPE_WEBHOOK_SECRET: z
      .string()
      .refine((key) => !key || key.startsWith('whsec_'), {
        message: 'STRIPE_WEBHOOK_SECRET must start with whsec_',
      })
      .optional()
      .or(z.literal('')),

    // Generic Webhook Secret (for custom webhooks)
    WEBHOOK_SECRET: z.string().min(32).default('dev-webhook-secret-change-in-production'),
    STRIPE_MONTHLY_PRICE_ID: z
      .string()
      .refine((id) => !id || id.startsWith('price_'), {
        message: 'STRIPE_MONTHLY_PRICE_ID must start with price_',
      })
      .optional()
      .or(z.literal('')),
    STRIPE_ANNUAL_PRICE_ID: z
      .string()
      .refine((id) => !id || id.startsWith('price_'), {
        message: 'STRIPE_ANNUAL_PRICE_ID must start with price_',
      })
      .optional()
      .or(z.literal('')),
  },

  /**
   * Client-side environment variables
   * These are exposed to the browser and must be prefixed with NEXT_PUBLIC_
   */
  client: {
    // App Configuration
    NEXT_PUBLIC_APP_URL: envHelpers.url('http://localhost:3000'),
    NEXT_PUBLIC_APP_NAME: z.string().default('Tavia'),

    // Feature Flags
    NEXT_PUBLIC_ENABLE_ANALYTICS: envHelpers.boolean(false),
    NEXT_PUBLIC_ENABLE_STRIPE: envHelpers.boolean(true),

    // Stripe (client-side)
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
      .string()
      .refine((key) => !key || key.startsWith('pk_'), {
        message: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must start with pk_',
      })
      .optional()
      .or(z.literal('')),
  },

  /**
   * Runtime environment mapping
   * Maps schema keys to actual process.env values
   */
  runtimeEnv: {
    // Node
    NODE_ENV: process.env.NODE_ENV,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,

    // NextAuth
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,

    // OAuth
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
    APPLE_CLIENT_SECRET: process.env.APPLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

    // Analytics
    ANALYTICS_API_KEY: process.env.ANALYTICS_API_KEY,

    // Email
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,

    // Stripe (server)
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_MONTHLY_PRICE_ID: process.env.STRIPE_MONTHLY_PRICE_ID,
    STRIPE_ANNUAL_PRICE_ID: process.env.STRIPE_ANNUAL_PRICE_ID,

    // Generic Webhook
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,

    // Client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    NEXT_PUBLIC_ENABLE_STRIPE: process.env.NEXT_PUBLIC_ENABLE_STRIPE,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
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
  isDevelopment: env.NODE_ENV === 'development',

  /** Check if running in production */
  isProduction: env.NODE_ENV === 'production',

  /** Check if running in test */
  isTest: env.NODE_ENV === 'test',

  /** Check if analytics is enabled */
  isAnalyticsEnabled: env.NEXT_PUBLIC_ENABLE_ANALYTICS,

  /** Check if Stripe is enabled */
  isStripeEnabled: env.NEXT_PUBLIC_ENABLE_STRIPE && !!env.STRIPE_SECRET_KEY,

  /** Check if OAuth provider is configured */
  hasGoogleOAuth: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
  hasAppleOAuth: !!env.APPLE_CLIENT_ID && !!env.APPLE_CLIENT_SECRET,
  hasFacebookOAuth: !!env.FACEBOOK_CLIENT_ID && !!env.FACEBOOK_CLIENT_SECRET,
  hasGithubOAuth: !!env.GITHUB_CLIENT_ID && !!env.GITHUB_CLIENT_SECRET,

  /** Get full app URL with path */
  getAppUrl: (path = '') => {
    const url = env.NEXT_PUBLIC_APP_URL;
    return path ? `${url}${path.startsWith('/') ? '' : '/'}${path}` : url;
  },
};
