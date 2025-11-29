/**
 * Group API Routes
 * API endpoints for mobile group operations
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { groupDetailSelect, type MembershipStatus } from '@tavia/database';

/**
 * GET /api/groups/[id]
 * Fetch group details with membership status
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const group = await prisma.group.findUnique({
      where: { id },
      select: groupDetailSelect,
    });

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    // Check if user is the owner
    const isOwner = group.owner.id === session.user.id;

    // Check user's membership status
    let membershipStatus: MembershipStatus | null = null;
    if (!isOwner) {
      const membership = await prisma.groupMember.findUnique({
        where: {
          groupId_userId: {
            groupId: id,
            userId: session.user.id,
          },
        },
        select: {
          status: true,
        },
      });
      membershipStatus = membership?.status || null;
    }

    return NextResponse.json({
      group,
      membershipStatus,
      isOwner,
    });
  } catch (error) {
    console.error('Error fetching group:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
