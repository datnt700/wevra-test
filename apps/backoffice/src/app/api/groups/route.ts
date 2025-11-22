import {
  withApiHandler,
  apiSuccess,
  BadRequestError,
  NotFoundError,
  PlanLimitError,
} from '@/lib/api';
import prisma from '@/lib/prisma';
import { canCreateGroup, getRemainingGroups } from '@/lib/features';
import { USER_ROLES } from '@/lib/constants';

export const GET = withApiHandler(async (request, { session }) => {
  // Get user's groups
  const groups = await prisma.group.findMany({
    where: {
      OR: [
        { ownerId: session!.user!.id },
        {
          moderators: {
            some: { userId: session!.user!.id },
          },
        },
      ],
    },
    include: {
      _count: {
        select: {
          members: true,
          events: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return apiSuccess({ groups });
});

export const POST = withApiHandler(
  async (request, { session }) => {
    // Check if user can create a new group (plan limits)
    const user = await prisma.user.findUnique({
      where: { id: session!.user!.id },
      select: {
        subscriptionStatus: true,
        _count: {
          select: { groups: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    const userWithCount = {
      subscriptionStatus: user.subscriptionStatus,
      groupCount: user._count.groups,
    };

    if (!canCreateGroup(userWithCount)) {
      const remaining = getRemainingGroups(userWithCount);
      throw new PlanLimitError(
        `You've reached your group limit. Upgrade to Premium for unlimited groups.`,
        { needsUpgrade: true, remaining }
      );
    }

    const body = await request.json();
    const { name, description, location, category } = body;

    if (!name) {
      throw new BadRequestError('Group name is required');
    }

    // Create the group
    const group = await prisma.group.create({
      data: {
        name,
        description,
        location,
        category,
        ownerId: session!.user!.id,
        isPremium: userWithCount.subscriptionStatus === 'PREMIUM',
      },
    });

    return apiSuccess({ group });
  },
  { allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.ORGANIZER] }
);
