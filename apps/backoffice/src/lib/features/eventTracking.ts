/**
 * Event Tracking Utilities
 * Helper functions for tracking events per month for plan limits
 */

import { prisma } from '../prisma';

/**
 * Get the number of events created this month for a specific group
 */
export async function getEventsCountThisMonth(groupId: string, userId: string): Promise<number> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const count = await prisma.event.count({
    where: {
      groupId,
      createdById: userId,
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  return count;
}

/**
 * Get total number of groups owned by a user
 */
export async function getUserGroupCount(userId: string): Promise<number> {
  const count = await prisma.group.count({
    where: {
      ownerId: userId,
      isActive: true,
    },
  });

  return count;
}

/**
 * Check if group has reached member capacity
 */
export async function isGroupAtCapacity(groupId: string): Promise<boolean> {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: {
      memberCount: true,
      maxMembers: true,
    },
  });

  if (!group) return false;

  return group.memberCount >= group.maxMembers;
}

/**
 * Update group member count
 */
export async function updateGroupMemberCount(groupId: string): Promise<void> {
  const memberCount = await prisma.groupMember.count({
    where: {
      groupId,
      status: 'ACTIVE',
    },
  });

  await prisma.group.update({
    where: { id: groupId },
    data: { memberCount },
  });
}

/**
 * Update event RSVP counts
 */
export async function updateEventRSVPCounts(eventId: string): Promise<void> {
  const [rsvpCount, attendeeCount] = await Promise.all([
    prisma.eventRSVP.count({
      where: {
        eventId,
        status: { in: ['GOING', 'INTERESTED'] },
      },
    }),
    prisma.eventRSVP.count({
      where: {
        eventId,
        status: 'GOING',
      },
    }),
  ]);

  await prisma.event.update({
    where: { id: eventId },
    data: {
      rsvpCount,
      attendeeCount,
    },
  });
}
