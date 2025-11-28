/**
 * Dashboard Actions
 *
 * Server actions for fetching dashboard data
 */

'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@tavia/database/enums';
import type { DashboardData } from '../types';
import { dashboardGroupSelect, dashboardEventSelect } from '../types';

/**
 * Fetch dashboard data for the authenticated user
 *
 * @returns Dashboard data including stats, recent groups, and recent events
 * @throws Error if user is not authenticated
 */
export async function getDashboardData(): Promise<DashboardData> {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  const userRole = session.user.role;

  // Determine if user can see all data (ADMIN) or only their own
  const isAdmin = userRole === UserRole.ADMIN;

  const [groupsCount, eventsCount, membersCount, recentGroups, recentEvents] = await Promise.all([
    // Groups count
    isAdmin
      ? prisma.group.count({ where: { isActive: true } })
      : prisma.group.count({ where: { ownerId: userId, isActive: true } }),

    // Events count
    isAdmin
      ? prisma.event.count({ where: { isActive: true } })
      : prisma.event.count({
          where: {
            group: { ownerId: userId },
            isActive: true,
          },
        }),

    // Members count (total members across all groups)
    isAdmin
      ? prisma.groupMember.count()
      : prisma.groupMember.count({
          where: { group: { ownerId: userId } },
        }),

    // Recent groups (last 5) - uses Prisma validator type
    isAdmin
      ? prisma.group.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          where: { isActive: true },
          select: dashboardGroupSelect,
        })
      : prisma.group.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          where: { ownerId: userId, isActive: true },
          select: dashboardGroupSelect,
        }),

    // Recent events (last 5) - uses Prisma validator type
    isAdmin
      ? prisma.event.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          where: { isActive: true },
          select: dashboardEventSelect,
        })
      : prisma.event.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          where: {
            group: { ownerId: userId },
            isActive: true,
          },
          select: dashboardEventSelect,
        }),
  ]);

  return {
    stats: {
      groups: groupsCount,
      events: eventsCount,
      members: membersCount,
    },
    recentGroups: recentGroups.map((group) => ({
      ...group,
      createdAt: group.createdAt.toISOString(),
      memberCount: group._count.members,
    })),
    recentEvents: recentEvents.map((event) => ({
      ...event,
      createdAt: event.createdAt.toISOString(),
      startDate: event.startDate.toISOString(),
      attendeeCount: event._count.rsvps,
      price: event.price ? Number(event.price) : null,
    })),
    user: {
      name: session.user.name || 'User',
      email: session.user.email || '',
      role: userRole,
      subscriptionStatus: session.user.subscriptionStatus || 'FREE',
    },
  };
}
