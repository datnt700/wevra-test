/**
 * User Role Constants
 * Centralized role definitions to avoid hardcoding strings
 */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
  MODERATOR: 'MODERATOR',
  ATTENDEE: 'ATTENDEE',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Subscription Status Constants
 */
export const SUBSCRIPTION_STATUS = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
  TRIAL: 'TRIAL',
  CANCELED: 'CANCELED',
} as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

/**
 * Check if user has admin access
 */
export const isAdmin = (role?: string) => role === USER_ROLES.ADMIN;

/**
 * Check if user has organizer access
 */
export const isOrganizer = (role?: string) => role === USER_ROLES.ORGANIZER;

/**
 * Check if user has moderator access
 */
export const isModerator = (role?: string) => role === USER_ROLES.MODERATOR;

/**
 * Check if user is attendee
 */
export const isAttendee = (role?: string) => role === USER_ROLES.ATTENDEE;

/**
 * Check if user has backoffice access (Admin, Organizer, or Moderator)
 */
export const hasBackofficeAccess = (role?: string) =>
  role === USER_ROLES.ADMIN || role === USER_ROLES.ORGANIZER || role === USER_ROLES.MODERATOR;

/**
 * Check if user has Premium subscription
 */
export const isPremium = (subscriptionStatus?: string) =>
  subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM ||
  subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL;

/**
 * Check if user has Free subscription
 */
export const isFree = (subscriptionStatus?: string) =>
  subscriptionStatus === SUBSCRIPTION_STATUS.FREE;
