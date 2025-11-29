/**
 * Leave Group API Route
 * POST /api/groups/[id]/leave
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { MembershipStatus } from '@tavia/database';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const { id: groupId } = await params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if membership exists
    const membership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId: session.user.id,
        },
      },
    });

    if (!membership) {
      return NextResponse.json(
        { success: false, error: 'You are not a member of this group' },
        { status: 400 }
      );
    }

    // Delete membership
    await prisma.groupMember.delete({
      where: {
        groupId_userId: {
          groupId,
          userId: session.user.id,
        },
      },
    });

    // Update group member count if was active
    if (membership.status === MembershipStatus.ACTIVE) {
      await prisma.group.update({
        where: { id: groupId },
        data: { memberCount: { decrement: 1 } },
      });
    }

    return NextResponse.json({ success: true, message: 'Successfully left the group' });
  } catch (error) {
    console.error('Error leaving group:', error);
    return NextResponse.json({ success: false, error: 'Failed to leave group' }, { status: 500 });
  }
}
