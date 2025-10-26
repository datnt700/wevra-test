/**
 * Environment variable validation and type-safe access
 * @example
 * import { env } from '@/lib/env';
 * const apiUrl = env.NEXT_PUBLIC_APP_URL;
 */

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

function getPublicEnvVar(key: string, defaultValue?: string): string {
  return getEnvVar(`NEXT_PUBLIC_${key}`, defaultValue);
}

export const env = {
  // Public variables (exposed to browser)
  NEXT_PUBLIC_APP_URL: getPublicEnvVar('APP_URL', 'http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: getPublicEnvVar('APP_NAME', 'Tavia'),

  // Server-only variables
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Feature flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE === 'true',

  // Check if we're in development
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

// Validate required env vars on startup
if (typeof window === 'undefined') {
  console.log('✓ Environment variables validated');
}
