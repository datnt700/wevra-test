import { withApiHandler, apiSuccess, BadRequestError, NotFoundError } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { canAddMembers } from '@/lib/features/planLimits';

export const PATCH = withApiHandler(async (request, { session }) => {
  const context = request as unknown as { params: Promise<{ id: string; memberId: string }> };
  const { id: groupId, memberId } = await context.params;
  const body = await request.json();
  const { action } = body;

  // Verify group exists and user is owner
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: {
      id: true,
      ownerId: true,
      isPremium: true,
      memberCount: true,
    },
  });

  if (!group) {
    throw new NotFoundError('Group');
  }

  if (group.ownerId !== session!.user!.id) {
    throw new BadRequestError('Only the group owner can manage members');
  }

  // Find the member
  const member = await prisma.groupMember.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new NotFoundError('Member');
  }

  if (action === 'approve') {
    // Check if group can add more members
    if (!canAddMembers(group)) {
      throw new BadRequestError(
        'Group has reached maximum capacity. Upgrade to Premium for unlimited members.'
      );
    }

    // Approve member
    const updatedMember = await prisma.groupMember.update({
      where: { id: memberId },
      data: { status: 'ACTIVE' },
    });

    // Increment member count
    await prisma.group.update({
      where: { id: groupId },
      data: { memberCount: { increment: 1 } },
    });

    return apiSuccess({ member: updatedMember });
  }

  throw new BadRequestError('Invalid action');
});

export const DELETE = withApiHandler(async (request, { session }) => {
  const context = request as unknown as { params: Promise<{ id: string; memberId: string }> };
  const { id: groupId, memberId } = await context.params;

  // Verify group exists and user is owner
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: {
      id: true,
      ownerId: true,
    },
  });

  if (!group) {
    throw new NotFoundError('Group');
  }

  if (group.ownerId !== session!.user!.id) {
    throw new BadRequestError('Only the group owner can manage members');
  }

  // Find the member
  const member = await prisma.groupMember.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new NotFoundError('Member');
  }

  // Delete member
  await prisma.groupMember.delete({
    where: { id: memberId },
  });

  // Decrement member count if member was active
  if (member.status === 'ACTIVE') {
    await prisma.group.update({
      where: { id: groupId },
      data: { memberCount: { decrement: 1 } },
    });
  }

  return apiSuccess({ message: 'Member removed successfully' });
});
