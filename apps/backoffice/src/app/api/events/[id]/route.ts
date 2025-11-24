import { withApiHandler, apiSuccess, NotFoundError, ForbiddenError } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { USER_ROLES } from '@/lib/constants';

export const GET = withApiHandler(async (request, { params }) => {
  const event = await prisma.event.findUnique({
    where: { id: params!.id },
    include: {
      group: {
        select: {
          id: true,
          name: true,
          ownerId: true,
          isPremium: true,
        },
      },
      rsvps: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          rsvps: true,
        },
      },
    },
  });

  if (!event) {
    throw new NotFoundError('Event');
  }

  return apiSuccess({ event });
});

export const PATCH = withApiHandler(async (request, { session, params }) => {
  // Check if user has permission to edit this event
  const event = await prisma.event.findUnique({
    where: { id: params!.id },
    include: {
      group: {
        include: {
          moderators: {
            where: { userId: session!.user!.id },
          },
        },
      },
    },
  });

  if (!event) {
    throw new NotFoundError('Event');
  }

  const isOwner = event.group.ownerId === session!.user!.id;
  const isModerator = event.group.moderators.length > 0;
  const isAdmin = session!.user!.role === USER_ROLES.ADMIN;

  if (!isOwner && !isModerator && !isAdmin) {
    throw new ForbiddenError('You do not have permission to edit this event');
  }

  const body = await request.json();
  const { title, description, startDate, endDate, location, maxAttendees, status } = body;

  const updatedEvent = await prisma.event.update({
    where: { id: params!.id },
    data: {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
      ...(location !== undefined && { location }),
      ...(maxAttendees !== undefined && { maxAttendees }),
      ...(status && { status }),
    },
  });

  return apiSuccess({ event: updatedEvent });
});

export const DELETE = withApiHandler(async (request, { session, params }) => {
  // Check if user has permission to delete this event
  const event = await prisma.event.findUnique({
    where: { id: params!.id },
    include: {
      group: true,
    },
  });

  if (!event) {
    throw new NotFoundError('Event');
  }

  const isOwner = event.group.ownerId === session!.user!.id;
  const isAdmin = session!.user!.role === USER_ROLES.ADMIN;

  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('Only the group owner can delete this event');
  }

  // Delete the event (cascade will handle RSVPs)
  await prisma.event.delete({
    where: { id: params!.id },
  });

  return apiSuccess({ success: true });
});
