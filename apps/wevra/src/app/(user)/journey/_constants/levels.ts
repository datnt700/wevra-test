/**
 * Wevra Level Configurations
 * 
 * Each level includes:
 * - Theme & Goal
 * - Tasks with XP rewards
 * - Milestone achievement
 * - AI Insight
 * - Level-up conditions
 */

import type { LevelData } from '../_types';

/**
 * Level 1 - Awareness
 * "See your money clearly."
 */
export const LEVEL_1_AWARENESS: LevelData = {
  level: 1,
  title: 'Awareness',
  subtitle: 'See your money clearly.',
  goal: 'Build awareness of where money goes and remove avoidance.',
  tasks: [
    {
      id: 'l1-quiz',
      title: 'Take the Money Mindset Quiz',
      type: 'reflection',
      xpReward: 15,
      completed: false,
      description: 'Understand your financial starting point',
      actionType: 'quiz',
    },
    {
      id: 'l1-expenses',
      title: 'List your 3 main monthly expenses',
      type: 'manual',
      xpReward: 20,
      completed: false,
      description: 'Identify where most of your money goes',
      actionType: 'expense-entry',
    },
    {
      id: 'l1-track',
      title: 'Track 3 days of spending',
      type: 'action',
      xpReward: 50,
      completed: false,
      description: 'Log every purchase for 3 consecutive days',
      actionType: 'spending-tracker',
    },
    {
      id: 'l1-emotion',
      title: 'Write one emotion you feel about money',
      type: 'text',
      xpReward: 15,
      completed: false,
      description: 'Reflect on your relationship with money',
      actionType: 'reflection',
    },
    {
      id: 'l1-goal',
      title: 'Set a tiny goal ("Save €20 this week")',
      type: 'goal',
      xpReward: 40,
      completed: false,
      description: 'Create your first achievable financial goal',
      actionType: 'goal-setting',
    },
  ],
  milestone: {
    name: 'Money Mirror',
    description: 'You faced your finances. That\'s courage.',
    badge: '🪞',
    xpReward: 100,
  },
  aiInsight: 'You\'re beginning to take control. Let\'s focus next on consistency — knowing where money moves daily.',
  unlocks: 'Level 2 – Tracker',
};

/**
 * All Levels Configuration
 */
export const LEVELS: Record<number, LevelData> = {
  1: LEVEL_1_AWARENESS,
  // Level 2-20 will be added progressively
};

/**
 * Get Level Data
 */
export function getLevelData(level: number): LevelData | null {
  return LEVELS[level] || null;
}

/**
 * Calculate Level Progress
 */
export function calculateLevelProgress(levelData: LevelData): {
  completedTasks: number;
  totalTasks: number;
  earnedXP: number;
  totalXP: number;
  percentage: number;
} {
  const completedTasks = levelData.tasks.filter((task) => task.completed).length;
  const totalTasks = levelData.tasks.length;
  const earnedXP = levelData.tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.xpReward, 0);
  const totalXP = levelData.tasks.reduce((sum, task) => sum + task.xpReward, 0);
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return {
    completedTasks,
    totalTasks,
    earnedXP,
    totalXP,
    percentage,
  };
}

/**
 * Check if level is complete
 */
export function isLevelComplete(levelData: LevelData): boolean {
  return levelData.tasks.every((task) => task.completed);
}
