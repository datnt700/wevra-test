import {
  withApiHandler,
  apiSuccess,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  PlanLimitError,
} from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { canCreateEvent, getEventsCountThisMonth } from '@/lib/features';
import { USER_ROLES } from '@/lib/constants';

export const GET = withApiHandler(async (request, { session }) => {
  // Get user's events (owned or moderated groups)
  const events = await prisma.event.findMany({
    where: {
      group: {
        OR: [
          { ownerId: session!.user!.id },
          {
            moderators: {
              some: { userId: session!.user!.id },
            },
          },
        ],
      },
    },
    include: {
      group: {
        select: {
          id: true,
          name: true,
          isPremium: true,
        },
      },
      _count: {
        select: {
          rsvps: true,
        },
      },
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  return apiSuccess({ events });
});

export const POST = withApiHandler(async (request, { session }) => {
  const body = await request.json();
  const { groupId, title, description, startDate, endDate, location, category, capacity } = body;

  if (!groupId || !title || !startDate) {
    throw new BadRequestError('Group ID, title, and start date are required');
  }

  // Check if user has permission to create events in this group
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      owner: {
        select: {
          id: true,
          subscriptionStatus: true,
        },
      },
      moderators: {
        where: { userId: session!.user!.id },
      },
    },
  });

  if (!group) {
    throw new NotFoundError('Group');
  }

  const isOwner = group.ownerId === session!.user!.id;
  const isModerator = group.moderators.length > 0;
  const isAdmin = session!.user!.role === USER_ROLES.ADMIN;

  if (!isOwner && !isModerator && !isAdmin) {
    throw new ForbiddenError('You do not have permission to create events in this group');
  }

  // Check event limit for the month (only for non-premium users)
  const eventsThisMonth = await getEventsCountThisMonth(groupId, session!.user!.id);
  const userWithEvents = {
    id: session!.user!.id,
    subscriptionStatus: group.owner.subscriptionStatus,
    groupCount: 0,
  };

  if (!canCreateEvent(userWithEvents, groupId, eventsThisMonth)) {
    throw new PlanLimitError(
      `You've reached your 2 events per month limit. Upgrade to Premium for unlimited events.`,
      { needsUpgrade: true, current: eventsThisMonth }
    );
  }

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Create the event
  const event = await prisma.event.create({
    data: {
      groupId,
      createdById: session!.user!.id,
      title,
      slug,
      description,
      category: category || 'General',
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      location,
      capacity: capacity || null,
      status: 'DRAFT',
    },
  });

  return apiSuccess({ event });
});
