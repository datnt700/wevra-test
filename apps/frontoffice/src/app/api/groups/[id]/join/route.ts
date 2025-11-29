/**
 * Join Group API Route
 * POST /api/groups/[id]/join
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

    // Check if group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      select: {
        id: true,
        isPublic: true,
        isActive: true,
        memberCount: true,
        maxMembers: true,
      },
    });

    if (!group) {
      return NextResponse.json({ success: false, error: 'Group not found' }, { status: 404 });
    }

    if (!group.isActive) {
      return NextResponse.json(
        { success: false, error: 'This group is no longer active' },
        { status: 400 }
      );
    }

    // Check if group has reached capacity
    if (group.memberCount >= group.maxMembers) {
      return NextResponse.json(
        { success: false, error: 'Group has reached maximum capacity' },
        { status: 400 }
      );
    }

    // Check if already a member
    const existingMembership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId: session.user.id,
        },
      },
    });

    if (existingMembership) {
      if (existingMembership.status === MembershipStatus.ACTIVE) {
        return NextResponse.json(
          { success: false, error: 'You are already a member of this group' },
          { status: 400 }
        );
      }
      if (existingMembership.status === MembershipStatus.PENDING) {
        return NextResponse.json(
          { success: false, error: 'Your membership request is pending approval' },
          { status: 400 }
        );
      }
      if (existingMembership.status === MembershipStatus.BANNED) {
        return NextResponse.json(
          { success: false, error: 'You have been banned from this group' },
          { status: 403 }
        );
      }
    }

    // Determine status based on group visibility
    const membershipStatus = group.isPublic ? MembershipStatus.ACTIVE : MembershipStatus.PENDING;

    // Create membership
    await prisma.groupMember.create({
      data: {
        groupId,
        userId: session.user.id,
        status: membershipStatus,
      },
    });

    // Update group member count if auto-approved
    if (membershipStatus === MembershipStatus.ACTIVE) {
      await prisma.group.update({
        where: { id: groupId },
        data: { memberCount: { increment: 1 } },
      });
    }

    const message =
      membershipStatus === MembershipStatus.ACTIVE
        ? 'Successfully joined the group!'
        : 'Join request sent! Waiting for approval.';

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Error joining group:', error);
    return NextResponse.json({ success: false, error: 'Failed to join group' }, { status: 500 });
  }
}
