/**
 * Progression Types
 */

import type { UserStage } from '@prisma/client';

// Re-export Prisma enum as type alias
export type Stage = UserStage;

export interface StageConfig {
  name: Stage;
  levels: number[];
  focus: string;
  island: string;
  titles: string[];
}

export interface LevelConfig {
  level: number;
  stage: Stage;
  xpRequired: number;
  title: string;
  milestone?: Milestone;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  bonusXP: number;
  badge: string;
  unlocks: string[];
}
