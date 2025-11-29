/**
 * Group Server Actions
 * Server-side functions for group operations (join, leave)
 */
'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { type ActionResponse, MembershipStatus } from '@tavia/database';

/**
 * Join a group
 * Creates a group membership with PENDING or ACTIVE status based on group visibility
 */
export async function joinGroup(groupId: string): Promise<ActionResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Authentication required' };
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
      return { success: false, error: 'Group not found' };
    }

    if (!group.isActive) {
      return { success: false, error: 'This group is no longer active' };
    }

    // Check if group has reached capacity
    if (group.memberCount >= group.maxMembers) {
      return { success: false, error: 'Group has reached maximum capacity' };
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
        return { success: false, error: 'You are already a member of this group' };
      }
      if (existingMembership.status === MembershipStatus.PENDING) {
        return { success: false, error: 'Your membership request is pending approval' };
      }
      if (existingMembership.status === MembershipStatus.BANNED) {
        return { success: false, error: 'You have been banned from this group' };
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

    revalidatePath(`/groups/${groupId}`);

    const message =
      membershipStatus === MembershipStatus.ACTIVE
        ? 'Successfully joined the group!'
        : 'Join request sent! Waiting for approval.';

    return { success: true, message };
  } catch (error) {
    console.error('Error joining group:', error);
    return { success: false, error: 'Failed to join group. Please try again.' };
  }
}

/**
 * Leave a group
 * Removes user's membership from the group
 */
export async function leaveGroup(groupId: string): Promise<ActionResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Authentication required' };
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
      return { success: false, error: 'You are not a member of this group' };
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

    revalidatePath(`/groups/${groupId}`);

    return { success: true, message: 'Successfully left the group' };
  } catch (error) {
    console.error('Error leaving group:', error);
    return { success: false, error: 'Failed to leave group. Please try again.' };
  }
}
