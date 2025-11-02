/**
 * Application Route Constants
 * Centralized route definitions to avoid hardcoding paths
 */

/**
 * Authentication Routes
 */
export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

/**
 * Dashboard Routes
 */
export const DASHBOARD_ROUTES = {
  HOME: '/dashboard',
} as const;

/**
 * Restaurant Routes
 */
export const RESTAURANT_ROUTES = {
  LIST: '/restaurants',
  NEW: '/restaurants/new',
  DETAIL: (id: string) => `/restaurants/${id}`,
  EDIT: (id: string) => `/restaurants/${id}/edit`,
} as const;

/**
 * Booking Routes
 */
export const BOOKING_ROUTES = {
  LIST: '/bookings',
  NEW: '/bookings/new',
  DETAIL: (id: string) => `/bookings/${id}`,
} as const;

/**
 * Table Routes
 */
export const TABLE_ROUTES = {
  LIST: '/tables',
  NEW: '/tables/new',
  DETAIL: (id: string) => `/tables/${id}`,
} as const;

/**
 * Settings Routes
 */
export const SETTINGS_ROUTES = {
  HOME: '/settings',
  PROFILE: '/settings/profile',
  SECURITY: '/settings/security',
} as const;

/**
 * IAM (Identity and Access Management) Routes
 */
export const IAM_ROUTES = {
  LIST: '/iam',
  NEW: '/iam/new',
  DETAIL: (id: string) => `/iam/${id}`,
  EDIT: (id: string) => `/iam/${id}/edit`,
} as const;

/**
 * API Routes
 */
export const API_ROUTES = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',
    PROVIDERS: '/api/auth/providers',
    CSRF: '/api/auth/csrf',
  },
} as const;

/**
 * All Routes Combined
 */
export const ROUTES = {
  AUTH: AUTH_ROUTES,
  DASHBOARD: DASHBOARD_ROUTES,
  RESTAURANT: RESTAURANT_ROUTES,
  BOOKING: BOOKING_ROUTES,
  TABLE: TABLE_ROUTES,
  SETTINGS: SETTINGS_ROUTES,
  IAM: IAM_ROUTES,
  API: API_ROUTES,
} as const;
