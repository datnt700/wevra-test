/**
 * Wevra Journey & Progression System Types
 */

import type { UserStage } from '@prisma/client';

/**
 * Progression System Types
 */

// Re-export Prisma enum as type alias
export type Stage = UserStage;

export interface StageConfig {
  name: Stage;
  levels: number[]; // e.g., [1, 2, 3, 4, 5]
  focus: string;
  island: string; // Visual theme
  titles: string[]; // Rank titles for this stage
}

export interface LevelConfig {
  level: number;
  stage: Stage;
  xpRequired: number; // Total XP needed to reach this level
  title: string;
  milestone?: Milestone;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  bonusXP: number;
  badge: string; // Badge icon/emoji
  unlocks: string[]; // What content this unlocks
}

export interface UserProgress {
  currentLevel: number;
  currentStage: Stage;
  totalXP: number;
  badges: string[]; // Milestone IDs
  completedMilestones: string[];
  streak: number; // Days
  lastActivity: Date;
}

/**
 * Task System Types
 */
export type TaskType =
  | 'reflection'
  | 'action'
  | 'manual'
  | 'goal'
  | 'text'
  | 'review'
  | 'habit'
  | 'planner'
  | 'learn'
  | 'streak'
  | 'quiz';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  xpReward: number;
  completed: boolean;
  completedAt?: Date;
  description?: string;
  actionType?: 'quiz' | 'expense-entry' | 'reflection' | 'goal-setting' | 'spending-tracker';
}

export interface LevelData {
  level: number;
  title: string;
  subtitle: string;
  goal: string;
  tasks: Task[];
  milestone: {
    name: string;
    description: string;
    badge: string;
    xpReward: number;
  };
  aiInsight: string;
  unlocks?: string; // Next level or stage
}

export interface TaskProgress {
  taskId: string;
  levelId: number;
  completedAt: Date;
  xpEarned: number;
}
