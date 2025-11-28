import { Prisma } from '@prisma/client';

/**
 * Prisma query validators for dashboard data
 * Uses Prisma.validator for type-safe query definitions
 */

// Group query with member count
export const dashboardGroupSelect = Prisma.validator<Prisma.GroupSelect>()({
  id: true,
  name: true,
  description: true,
  category: true,
  isPremium: true,
  createdAt: true,
  _count: {
    select: {
      members: true,
    },
  },
});

// Event query with RSVP count and group
export const dashboardEventSelect = Prisma.validator<Prisma.EventSelect>()({
  id: true,
  title: true,
  startDate: true,
  location: true,
  isFree: true,
  price: true,
  currency: true,
  createdAt: true,
  group: {
    select: {
      id: true,
      name: true,
    },
  },
  _count: {
    select: {
      rsvps: true,
    },
  },
});

/**
 * Derived types from Prisma queries
 * These types automatically update when schema changes
 */
export type DashboardGroup = Prisma.GroupGetPayload<{
  select: typeof dashboardGroupSelect;
}>;

export type DashboardEvent = Prisma.EventGetPayload<{
  select: typeof dashboardEventSelect;
}>;

/**
 * Dashboard data structure with serialized dates
 * Used for client-side rendering (dates as ISO strings)
 */
export interface DashboardData {
  stats: {
    groups: number;
    events: number;
    members: number;
  };
  recentGroups: Array<
    Omit<DashboardGroup, 'createdAt' | '_count'> & {
      createdAt: string;
      memberCount: number;
    }
  >;
  recentEvents: Array<
    Omit<DashboardEvent, 'createdAt' | 'startDate' | '_count' | 'price'> & {
      createdAt: string;
      startDate: string;
      attendeeCount: number;
      price: number | null;
    }
  >;
  user: {
    name: string;
    email: string;
    role: string;
    subscriptionStatus: string;
  };
}
