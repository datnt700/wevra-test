import { withApiHandler, apiSuccess, NotFoundError, ForbiddenError } from '@/lib/api';
import prisma from '@/lib/prisma';
import { USER_ROLES } from '@/lib/constants';

export const GET = withApiHandler(async (request, { params }) => {
  const group = await prisma.group.findUnique({
    where: { id: params!.id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      members: {
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
      moderators: {
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
          members: true,
          events: true,
        },
      },
    },
  });

  if (!group) {
    throw new NotFoundError('Group');
  }

  return apiSuccess({ group });
});

export const PATCH = withApiHandler(async (request, { session, params }) => {
  // Check if user is owner or moderator
  const group = await prisma.group.findUnique({
    where: { id: params!.id },
    include: {
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
    throw new ForbiddenError('You do not have permission to edit this group');
  }

  const body = await request.json();
  const { name, description, location, category } = body;

  const updatedGroup = await prisma.group.update({
    where: { id: params!.id },
    data: {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(location !== undefined && { location }),
      ...(category !== undefined && { category }),
    },
  });

  return apiSuccess({ group: updatedGroup });
});

export const DELETE = withApiHandler(async (request, { session, params }) => {
  // Check if user is owner
  const group = await prisma.group.findUnique({
    where: { id: params!.id },
  });

  if (!group) {
    throw new NotFoundError('Group');
  }

  const isOwner = group.ownerId === session!.user!.id;
  const isAdmin = session!.user!.role === USER_ROLES.ADMIN;

  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('Only the group owner can delete this group');
  }

  // Delete the group (cascade will handle members, moderators, events)
  await prisma.group.delete({
    where: { id: params!.id },
  });

  return apiSuccess({ success: true });
});
