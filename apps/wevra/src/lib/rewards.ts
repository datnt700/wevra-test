/**
 * Reward Service
 * Handles XP and Coin awards, level progression, and transaction history
 */

import prisma from '@/lib/prisma';

// XP per level (250 XP to level up)
const XP_PER_LEVEL = 250;

// Maximum level
const MAX_LEVEL = 20;

/**
 * Calculate level from total XP
 */
export function calculateLevel(totalXP: number): number {
  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  return Math.min(level, MAX_LEVEL);
}

/**
 * Calculate current XP in current level
 */
export function calculateCurrentXP(totalXP: number): number {
  return totalXP % XP_PER_LEVEL;
}

/**
 * Calculate XP needed for next level
 */
export function calculateXPForNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= MAX_LEVEL) return 0;
  return XP_PER_LEVEL - calculateCurrentXP(totalXP);
}

/**
 * Award XP to a user
 */
export async function awardXP(params: {
  userId: string;
  amount: number;
  source: string;
  description: string;
  relatedId?: string;
  type: 'QUEST' | 'LESSON' | 'CHALLENGE' | 'HABIT' | 'MILESTONE' | 'BONUS';
}) {
  const { userId, amount, source, description, relatedId, type } = params;

  return await prisma.$transaction(async (tx) => {
    // Get current user stats
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { totalXP: true, currentLevel: true },
    });

    if (!user) throw new Error('User not found');

    // Calculate new totals
    const newTotalXP = user.totalXP + amount;
    const newLevel = calculateLevel(newTotalXP);
    const newCurrentXP = calculateCurrentXP(newTotalXP);
    const leveledUp = newLevel > user.currentLevel;

    // Update user
    await tx.user.update({
      where: { id: userId },
      data: {
        totalXP: newTotalXP,
        currentXP: newCurrentXP,
        currentLevel: newLevel,
      },
    });

    // Create transaction record
    const transaction = await tx.xPTransaction.create({
      data: {
        userId,
        amount,
        totalXP: newTotalXP,
        level: newLevel,
        type,
        source,
        description,
        relatedId,
      },
    });

    return {
      transaction,
      leveledUp,
      oldLevel: user.currentLevel,
      newLevel,
      totalXP: newTotalXP,
      currentXP: newCurrentXP,
    };
  });
}

/**
 * Award Coins to a user
 */
export async function awardCoins(params: {
  userId: string;
  amount: number;
  source: string;
  description: string;
  relatedId?: string;
  type: 'EARNED' | 'BONUS';
}) {
  const { userId, amount, source, description, relatedId, type } = params;

  return await prisma.$transaction(async (tx) => {
    // Get current user stats
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { coinBalance: true, totalCoinsEarned: true },
    });

    if (!user) throw new Error('User not found');

    // Calculate new totals
    const newBalance = user.coinBalance + amount;
    const newTotalEarned = user.totalCoinsEarned + amount;

    // Update user
    await tx.user.update({
      where: { id: userId },
      data: {
        coinBalance: newBalance,
        totalCoinsEarned: newTotalEarned,
      },
    });

    // Create transaction record
    const transaction = await tx.coinTransaction.create({
      data: {
        userId,
        amount,
        balance: newBalance,
        type,
        source,
        description,
        relatedId,
      },
    });

    return {
      transaction,
      newBalance,
      totalEarned: newTotalEarned,
    };
  });
}

/**
 * Spend Coins
 */
export async function spendCoins(params: {
  userId: string;
  amount: number;
  source: string;
  description: string;
  relatedId?: string;
}) {
  const { userId, amount, source, description, relatedId } = params;

  return await prisma.$transaction(async (tx) => {
    // Get current user stats
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { coinBalance: true, totalCoinsSpent: true },
    });

    if (!user) throw new Error('User not found');
    if (user.coinBalance < amount) throw new Error('Insufficient coins');

    // Calculate new totals
    const newBalance = user.coinBalance - amount;
    const newTotalSpent = user.totalCoinsSpent + amount;

    // Update user
    await tx.user.update({
      where: { id: userId },
      data: {
        coinBalance: newBalance,
        totalCoinsSpent: newTotalSpent,
      },
    });

    // Create transaction record
    const transaction = await tx.coinTransaction.create({
      data: {
        userId,
        amount: -amount,
        balance: newBalance,
        type: 'SPENT',
        source,
        description,
        relatedId,
      },
    });

    return {
      transaction,
      newBalance,
      totalSpent: newTotalSpent,
    };
  });
}

/**
 * Award both XP and Coins (common pattern)
 */
export async function awardReward(params: {
  userId: string;
  xp: number;
  coins: number;
  source: string;
  description: string;
  relatedId?: string;
  xpType: 'QUEST' | 'LESSON' | 'CHALLENGE' | 'HABIT' | 'MILESTONE' | 'BONUS';
}) {
  const { userId, xp, coins, source, description, relatedId, xpType } = params;

  const [xpResult, coinResult] = await Promise.all([
    awardXP({
      userId,
      amount: xp,
      source,
      description: `${description} (XP)`,
      relatedId,
      type: xpType,
    }),
    awardCoins({
      userId,
      amount: coins,
      source,
      description: `${description} (Coins)`,
      relatedId,
      type: 'EARNED',
    }),
  ]);

  return {
    xp: xpResult,
    coins: coinResult,
  };
}

/**
 * Get user's transaction history
 */
export async function getUserTransactions(userId: string, limit = 50) {
  const [xpTransactions, coinTransactions] = await Promise.all([
    prisma.xPTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    }),
    prisma.coinTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    }),
  ]);

  // Merge and sort by date
  const allTransactions = [
    ...xpTransactions.map((t) => ({ ...t, transactionType: 'XP' as const })),
    ...coinTransactions.map((t) => ({ ...t, transactionType: 'COIN' as const })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return allTransactions.slice(0, limit);
}

/**
 * Get user's reward stats
 */
export async function getUserRewardStats(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      currentLevel: true,
      currentXP: true,
      totalXP: true,
      coinBalance: true,
      totalCoinsEarned: true,
      totalCoinsSpent: true,
    },
  });

  if (!user) throw new Error('User not found');

  return {
    level: user.currentLevel,
    currentXP: user.currentXP,
    totalXP: user.totalXP,
    xpForNextLevel: calculateXPForNextLevel(user.totalXP),
    coinBalance: user.coinBalance,
    totalCoinsEarned: user.totalCoinsEarned,
    totalCoinsSpent: user.totalCoinsSpent,
  };
}
