import {
  withApiHandler,
  apiSuccess,
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
  PlanLimitError,
} from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { isGroupAtCapacity, updateGroupMemberCount } from '@/lib/features';
import { USER_ROLES } from '@/lib/constants';

export const POST = withApiHandler(async (request, { session, params }) => {
  const groupId = params!.id;

  // Check if user has permission to add members
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      owner: {
        select: {
          subscriptionStatus: true,
        },
      },
      moderators: {
        where: { userId: session!.user!.id },
      },
      _count: {
        select: {
          members: true,
        },
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
    throw new ForbiddenError('You do not have permission to add members to this group');
  }

  // Check member capacity
  const atCapacity = isGroupAtCapacity({
    subscriptionStatus: group.owner.subscriptionStatus,
    memberCount: group._count.members,
  });

  if (atCapacity) {
    throw new PlanLimitError(
      `Your group has reached the 50 member limit. Upgrade to Premium for unlimited members.`,
      { needsUpgrade: true, current: group._count.members }
    );
  }

  const body = await request.json();
  const { userId, role = 'MEMBER' } = body;

  if (!userId) {
    throw new BadRequestError('User ID is required');
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new NotFoundError('User');
  }

  // Check if user is already a member
  const existingMember = await prisma.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId,
        userId,
      },
    },
  });

  if (existingMember) {
    throw new ConflictError('User is already a member of this group');
  }

  // Add member
  const member = await prisma.groupMember.create({
    data: {
      groupId,
      userId,
      role,
      status: 'ACTIVE',
    },
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
  });

  // Update member count
  await updateGroupMemberCount(groupId);

  return apiSuccess({ member });
});

export const GET = withApiHandler(async (request, { params }) => {
  const groupId = params!.id;

  const members = await prisma.groupMember.findMany({
    where: { groupId },
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
    orderBy: {
      joinedAt: 'asc',
    },
  });

  return apiSuccess({ members });
});
