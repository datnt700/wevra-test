/**
 * Plan Limits Configuration
 * Centralized feature limits for Free and Premium tiers
 */

import { SUBSCRIPTION_STATUS } from '../constants/roles';

export const PLAN_LIMITS = {
  FREE: {
    maxGroups: 1,
    maxMembers: 50,
    maxEventsPerMonth: 2,
    hasAnalytics: false,
    hasCustomBranding: false,
    canAddModerators: false,
    hasAutomation: false,
    hasPrioritySupport: false,
  },
  PREMIUM: {
    maxGroups: Infinity,
    maxMembers: Infinity,
    maxEventsPerMonth: Infinity,
    hasAnalytics: true,
    hasCustomBranding: true,
    canAddModerators: true,
    hasAutomation: true,
    hasPrioritySupport: true,
  },
} as const;

/**
 * User type with subscription info
 */
export interface UserWithSubscription {
  id: string;
  subscriptionStatus: string;
  groupCount?: number;
}

/**
 * Group type
 */
export interface Group {
  id: string;
  isPremium: boolean;
  memberCount: number;
  ownerId: string;
}

/**
 * Check if user can create a new group
 */
export function canCreateGroup(user: UserWithSubscription): boolean {
  if (user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM) return true;
  if (user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL) return true;

  const groupCount = user.groupCount || 0;
  return groupCount < PLAN_LIMITS.FREE.maxGroups;
}

/**
 * Check if user can create an event in a specific group
 * @param user - User creating the event
 * @param groupId - Group ID where event will be created
 * @param eventsThisMonth - Number of events created this month in this group
 */
export function canCreateEvent(
  user: UserWithSubscription,
  groupId: string,
  eventsThisMonth: number
): boolean {
  if (user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM) return true;
  if (user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL) return true;

  return eventsThisMonth < PLAN_LIMITS.FREE.maxEventsPerMonth;
}

/**
 * Get maximum members allowed for a group
 */
export function getMaxMembers(group: Group): number {
  return group.isPremium ? PLAN_LIMITS.PREMIUM.maxMembers : PLAN_LIMITS.FREE.maxMembers;
}

/**
 * Check if user can add members to a group
 */
export function canAddMembers(group: Group): boolean {
  const maxMembers = getMaxMembers(group);
  if (maxMembers === Infinity) return true;

  return group.memberCount < maxMembers;
}

/**
 * Check if user can access analytics
 */
export function canAccessAnalytics(user: UserWithSubscription): boolean {
  return (
    user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM ||
    user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL
  );
}

/**
 * Check if user can customize branding
 */
export function canCustomizeBranding(user: UserWithSubscription): boolean {
  return (
    user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM ||
    user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL
  );
}

/**
 * Check if user can add moderators
 */
export function canAddModerators(user: UserWithSubscription): boolean {
  return (
    user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM ||
    user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL
  );
}

/**
 * Check if user has access to automation features
 */
export function canUseAutomation(user: UserWithSubscription): boolean {
  return (
    user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM ||
    user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL
  );
}

/**
 * Check if user is on Premium plan
 */
export function isPremiumUser(user: UserWithSubscription): boolean {
  return (
    user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM ||
    user.subscriptionStatus === SUBSCRIPTION_STATUS.TRIAL
  );
}

/**
 * Get user's plan limits
 */
export function getUserPlanLimits(user: UserWithSubscription) {
  return isPremiumUser(user) ? PLAN_LIMITS.PREMIUM : PLAN_LIMITS.FREE;
}

/**
 * Get remaining groups user can create
 */
export function getRemainingGroups(user: UserWithSubscription): number {
  if (isPremiumUser(user)) return Infinity;

  const groupCount = user.groupCount || 0;
  const remaining = PLAN_LIMITS.FREE.maxGroups - groupCount;
  return Math.max(0, remaining);
}

/**
 * Get remaining members that can be added to a group
 */
export function getRemainingMembers(group: Group): number {
  const maxMembers = getMaxMembers(group);
  if (maxMembers === Infinity) return Infinity;

  const remaining = maxMembers - group.memberCount;
  return Math.max(0, remaining);
}
