/**
 * Wevra Progression Framework
 *
 * System: 4 Stages × 5 Levels = 20 Total Levels
 * XP: 250 XP per level (progressive)
 * Milestones: Every 2-3 levels
 */

import type { Stage, StageConfig, LevelConfig, Milestone } from '../_types';

/**
 * XP Actions & Rewards
 */
export const XP_REWARDS = {
  QUIZ_COMPLETE: 100,
  LESSON_COMPLETE: 50,
  DAILY_CHALLENGE: 25,
  HABIT_LOG: 10,
  GOAL_ACHIEVED: 100,
  SHARE_PROGRESS: 20,
  REFLECTION: 15,
  MILESTONE_BONUS: 150,
} as const;

/**
 * XP Required per Level (cumulative)
 */
export const XP_PER_LEVEL = 250;

/**
 * Calculate total XP required to reach a level
 */
export function getXPForLevel(level: number): number {
  return level * XP_PER_LEVEL;
}

/**
 * Get level from total XP
 */
export function getLevelFromXP(totalXP: number): number {
  return Math.floor(totalXP / XP_PER_LEVEL) + 1;
}

/**
 * Stage Configurations
 */
export const STAGES: Record<Stage, StageConfig> = {
  STARTER: {
    name: 'STARTER',
    levels: [1, 2, 3, 4, 5],
    focus: 'Build awareness & control',
    island: '🌱 Awareness Island',
    titles: ['Newcomer', 'Aware Learner', 'Budget Explorer', 'Habit Starter', 'Foundation Builder'],
  },
  STABILIZER: {
    name: 'STABILIZER',
    levels: [6, 7, 8, 9, 10],
    focus: 'Automate and sustain habits',
    island: '💪 Consistency Path',
    titles: [
      'Routine Builder',
      'Automation Rookie',
      'Steady Saver',
      'Habit Master',
      'System Creator',
    ],
  },
  BUILDER: {
    name: 'BUILDER',
    levels: [11, 12, 13, 14, 15],
    focus: 'Start investing & planning',
    island: '🚀 Growth Trail',
    titles: [
      'Investor Rookie',
      'Portfolio Starter',
      'Goal Planner',
      'Wealth Seeker',
      'Growth Strategist',
    ],
  },
  GROWER: {
    name: 'GROWER',
    levels: [16, 17, 18, 19, 20],
    focus: 'Optimize, diversify, grow',
    island: '🏆 Mastery Peak',
    titles: ['Optimizer', 'Diversifier', 'Wealth Builder', 'Financial Master', 'Tavia Champion'],
  },
};

/**
 * Milestones (Achievement System)
 */
export const MILESTONES: Record<number, Milestone> = {
  2: {
    id: 'first-budget',
    name: 'Budget Creator',
    description: 'Create your first monthly budget',
    bonusXP: 100,
    badge: '📊',
    unlocks: ['Budget Template', 'Spending Tracker'],
  },
  5: {
    id: 'awareness-master',
    name: 'Awareness Master',
    description: 'Complete all Starter stage lessons',
    bonusXP: 150,
    badge: '🌟',
    unlocks: ['Stabilizer Path', 'Habit Dashboard'],
  },
  7: {
    id: 'auto-saver',
    name: 'Automation Champion',
    description: 'Set up automated savings for 30 days',
    bonusXP: 150,
    badge: '⚙️',
    unlocks: ['Emergency Fund Tracker', 'Savings Goals'],
  },
  10: {
    id: 'consistency-king',
    name: 'Consistency King/Queen',
    description: 'Maintain a 30-day financial habit streak',
    bonusXP: 200,
    badge: '👑',
    unlocks: ['Builder Path', 'Investment Basics Course'],
  },
  13: {
    id: 'first-investment',
    name: 'Investment Pioneer',
    description: 'Complete investment simulation or make first real investment',
    bonusXP: 200,
    badge: '📈',
    unlocks: ['Portfolio Tracker', 'Market Insights'],
  },
  15: {
    id: 'portfolio-builder',
    name: 'Portfolio Builder',
    description: 'Diversify across 3+ asset types',
    bonusXP: 250,
    badge: '💼',
    unlocks: ['Grower Path', 'Advanced Strategies'],
  },
  18: {
    id: 'wealth-strategist',
    name: 'Wealth Strategist',
    description: 'Create a 5-year financial roadmap',
    bonusXP: 300,
    badge: '🎯',
    unlocks: ['Tax Optimization', 'Passive Income Guide'],
  },
  20: {
    id: 'tavia-master',
    name: 'Tavia Master',
    description: 'Reach the highest level of financial mastery',
    bonusXP: 500,
    badge: '🏆',
    unlocks: ['Mentor Program', 'Exclusive Community', 'All Premium Features'],
  },
};

/**
 * Get Stage from Level
 */
export function getStageFromLevel(level: number): Stage {
  if (level <= 5) return 'STARTER';
  if (level <= 10) return 'STABILIZER';
  if (level <= 15) return 'BUILDER';
  return 'GROWER';
}

/**
 * Get Title from Level
 */
export function getTitleFromLevel(level: number): string {
  const stage = getStageFromLevel(level);
  const stageConfig = STAGES[stage];
  const indexInStage = level - (stageConfig.levels[0] ?? 1);
  return stageConfig.titles[indexInStage] ?? stageConfig.titles[0] ?? 'Learner';
}

/**
 * Get Level Config
 */
export function getLevelConfig(level: number): LevelConfig {
  const stage = getStageFromLevel(level);
  const title = getTitleFromLevel(level);
  const milestone = MILESTONES[level];

  return {
    level,
    stage,
    xpRequired: getXPForLevel(level),
    title,
    milestone,
  };
}

/**
 * Calculate Quiz Completion Level
 * Based on quiz stage result, assign starting level
 */
export function getStartingLevelFromQuizStage(quizStage: Stage): number {
  switch (quizStage) {
    case 'STARTER':
      return 1; // Start at level 1
    case 'STABILIZER':
      return 6; // Start at level 6 (beginning of Stabilizer)
    case 'BUILDER':
      return 11; // Start at level 11 (beginning of Builder)
    case 'GROWER':
      return 16; // Start at level 16 (beginning of Grower)
    default:
      return 1;
  }
}
