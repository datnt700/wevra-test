import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserRewardStats } from '@/lib/rewards';

/**
 * GET /api/user/stats
 * Fetch current user's reward statistics (XP, coins, level)
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getUserRewardStats(session.user.id);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 });
  }
}
