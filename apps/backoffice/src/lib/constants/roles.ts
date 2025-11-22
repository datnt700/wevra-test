/**
 * User Role Constants
 * Centralized role definitions to avoid hardcoding strings
 *
 * Note: Prefer importing UserRole and SubscriptionStatus enums directly from @prisma/client
 * These constants are kept for backward compatibility and convenience
 */
import {
  UserRole as PrismaUserRole,
  SubscriptionStatus as PrismaSubscriptionStatus,
} from '@prisma/client';

export const USER_ROLES = {
  ADMIN: PrismaUserRole.ADMIN,
  ORGANIZER: PrismaUserRole.ORGANIZER,
  MODERATOR: PrismaUserRole.MODERATOR,
  ATTENDEE: PrismaUserRole.ATTENDEE,
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Subscription Status Constants
 * @deprecated Use SubscriptionStatus enum from @prisma/client instead
 */
export const SUBSCRIPTION_STATUS = {
  FREE: PrismaSubscriptionStatus.FREE,
  PREMIUM: PrismaSubscriptionStatus.PREMIUM,
  TRIAL: PrismaSubscriptionStatus.TRIAL,
  CANCELED: PrismaSubscriptionStatus.CANCELED,
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
export const isPremium = (subscriptionStatus?: PrismaSubscriptionStatus | string) =>
  subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM ||
  subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL;

/**
 * Check if user has Free subscription
 */
export const isFree = (subscriptionStatus?: PrismaSubscriptionStatus | string) =>
  subscriptionStatus === SUBSCRIPTION_STATUS.FREE;
