/**
 * User Role Constants
 * Centralized role definitions to avoid hardcoding strings
 */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  RESTAURANT_OWNER: 'RESTAURANT_OWNER',
  USER: 'USER',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Check if user has admin access
 */
export const isAdmin = (role?: string) => role === USER_ROLES.ADMIN;

/**
 * Check if user has manager access
 */
export const isManager = (role?: string) => role === USER_ROLES.MANAGER;

/**
 * Check if user has employee access
 */
export const isEmployee = (role?: string) => role === USER_ROLES.EMPLOYEE;

/**
 * Check if user has restaurant owner access
 */
export const isRestaurantOwner = (role?: string) => role === USER_ROLES.RESTAURANT_OWNER;

/**
 * Check if user has backoffice access (Admin, Manager, Employee, or Restaurant Owner)
 */
export const hasBackofficeAccess = (role?: string) =>
  role === USER_ROLES.ADMIN ||
  role === USER_ROLES.MANAGER ||
  role === USER_ROLES.EMPLOYEE ||
  role === USER_ROLES.RESTAURANT_OWNER;
