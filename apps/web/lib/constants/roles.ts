/**
 * User Role Constants
 * Centralized role definitions to avoid hardcoding strings
 */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  RESTAURANT_OWNER: 'RESTAURANT_OWNER',
  USER: 'USER',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Check if user has admin access
 */
export const isAdmin = (role?: string) => role === USER_ROLES.ADMIN;

/**
 * Check if user has restaurant owner access
 */
export const isRestaurantOwner = (role?: string) => role === USER_ROLES.RESTAURANT_OWNER;

/**
 * Check if user has backoffice access (Admin or Restaurant Owner)
 */
export const hasBackofficeAccess = (role?: string) =>
  role === USER_ROLES.ADMIN || role === USER_ROLES.RESTAURANT_OWNER;
