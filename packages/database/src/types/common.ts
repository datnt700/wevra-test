import type { UserRole, SubscriptionStatus } from '@prisma/client';

/**
 * Basic user info shared across apps
 */
export interface UserBasicInfo {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  subscriptionStatus: SubscriptionStatus;
}

/**
 * Group summary for lists/cards
 */
export interface GroupSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  isPremium: boolean;
  memberCount: number;
  isPublic: boolean;
}

/**
 * Event summary for lists/cards
 */
export interface EventSummary {
  id: string;
  title: string;
  startDate: Date | string;
  location: string | null;
  isFree: boolean;
  price: number | null;
  currency: string | null;
}

/**
 * Common action response type for server actions and API routes
 */
export interface ActionResponse<T = void> {
  success: boolean;
  error?: string;
  message?: string;
  data?: T;
}
