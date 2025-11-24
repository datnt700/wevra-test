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
  ANALYTICS: '/dashboard/analytics',
  UPGRADE: '/billing/plans',
} as const;

/**
 * Group Routes
 */
export const GROUP_ROUTES = {
  LIST: '/groups',
  NEW: '/groups/new',
  DETAIL: (id: string) => `/groups/${id}`,
  EDIT: (id: string) => `/groups/${id}/edit`,
  MEMBERS: (id: string) => `/groups/${id}/members`,
  SETTINGS: (id: string) => `/groups/${id}/settings`,
} as const;

/**
 * Event Routes
 */
export const EVENT_ROUTES = {
  LIST: '/events',
  NEW: '/events/new',
  DETAIL: (id: string) => `/events/${id}`,
  EDIT: (id: string) => `/events/${id}/edit`,
  RSVPS: (id: string) => `/events/${id}/rsvps`,
} as const;

/**
 * Member Routes
 */
export const MEMBER_ROUTES = {
  LIST: '/members',
  DETAIL: (id: string) => `/members/${id}`,
} as const;

/**
 * Billing Routes
 */
export const BILLING_ROUTES = {
  PLANS: '/billing/plans',
  SUBSCRIPTION: '/billing/subscription',
  PAYMENT_METHODS: '/billing/payment-methods',
  INVOICES: '/billing/invoices',
} as const;

/**
 * Settings Routes
 */
export const SETTINGS_ROUTES = {
  HOME: '/settings',
  PROFILE: '/settings/profile',
  SECURITY: '/settings/security',
  BRANDING: '/settings/branding',
  NOTIFICATIONS: '/settings/notifications',
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
  BILLING: {
    CREATE_CHECKOUT: '/api/billing/create-checkout',
    WEBHOOK: '/api/billing/webhook',
    PORTAL: '/api/billing/portal',
    CANCEL: '/api/billing/cancel',
  },
  GROUPS: {
    LIST: '/api/groups',
    CREATE: '/api/groups',
    UPDATE: (id: string) => `/api/groups/${id}`,
    DELETE: (id: string) => `/api/groups/${id}`,
  },
  EVENTS: {
    LIST: '/api/events',
    CREATE: '/api/events',
    UPDATE: (id: string) => `/api/events/${id}`,
    DELETE: (id: string) => `/api/events/${id}`,
  },
} as const;

/**
 * All Routes Combined
 */
export const ROUTES = {
  AUTH: AUTH_ROUTES,
  DASHBOARD: DASHBOARD_ROUTES,
  GROUP: GROUP_ROUTES,
  EVENT: EVENT_ROUTES,
  MEMBER: MEMBER_ROUTES,
  BILLING: BILLING_ROUTES,
  SETTINGS: SETTINGS_ROUTES,
  IAM: IAM_ROUTES,
  API: API_ROUTES,
} as const;
