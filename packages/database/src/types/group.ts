import { Prisma } from '@prisma/client';

/**
 * Prisma query validators for Group-related data
 * Uses Prisma.validator for type-safe query definitions
 */

// Basic group with counts (for list views)
export const groupWithCountsSelect = Prisma.validator<Prisma.GroupSelect>()({
  id: true,
  name: true,
  description: true,
  category: true,
  location: true,
  image: true,
  isPremium: true,
  isPublic: true,
  _count: {
    select: {
      members: true,
      events: true,
    },
  },
});

// Group with owner details (for detail views)
export const groupWithOwnerSelect = Prisma.validator<Prisma.GroupSelect>()({
  id: true,
  name: true,
  description: true,
  category: true,
  location: true,
  image: true,
  isPremium: true,
  isPublic: true,
  ownerId: true,
  owner: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
  _count: {
    select: {
      members: true,
      events: true,
    },
  },
});

// Group member with user details
export const groupMemberWithUserSelect = Prisma.validator<Prisma.GroupMemberSelect>()({
  id: true,
  status: true,
  role: true,
  joinedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  },
});

// Group detail with owner and membership info (for attendee views)
export const groupDetailSelect = Prisma.validator<Prisma.GroupSelect>()({
  id: true,
  name: true,
  slug: true,
  description: true,
  image: true,
  category: true,
  isPublic: true,
  isPremium: true,
  memberCount: true,
  maxMembers: true,
  location: true,
  owner: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
  _count: {
    select: {
      events: true,
    },
  },
});

/**
 * Derived types from Prisma queries
 * These types automatically update when the schema changes
 */

// Group with basic counts (used in list views)
export type GroupWithCounts = Prisma.GroupGetPayload<{
  select: typeof groupWithCountsSelect;
}>;

// Group with owner details (used in detail views)
export type GroupWithOwner = Prisma.GroupGetPayload<{
  select: typeof groupWithOwnerSelect;
}>;

// Group member with user data
export type GroupMemberWithUser = Prisma.GroupMemberGetPayload<{
  select: typeof groupMemberWithUserSelect;
}>;

// Group detail for attendee views (includes owner and counts)
export type GroupDetail = Prisma.GroupGetPayload<{
  select: typeof groupDetailSelect;
}>;
