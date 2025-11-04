/**
 * Quiz Types & Interfaces
 */

import type { UserStage } from '@prisma/client';

export type QuestionType = 'multiple-choice' | 'text' | 'scale';

export interface QuizQuestion {
  id: string;
  step: number;
  type: QuestionType;
  question: string;
  description?: string;
  options?: QuizOption[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  required?: boolean;
  placeholder?: string; // For text input questions
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  points?: number; // For scoring
}

export interface QuizAnswer {
  questionId: string;
  value: string | number;
  points?: number;
}

export interface QuizState {
  currentStep: number;
  answers: QuizAnswer[];
  isComplete: boolean;
}

export interface QuizResult {
  stage: UserStage;
  profile: {
    financialAwareness: number; // 0-100
    habitDiscipline: number; // 0-100
    motivation: number; // 0-100
  };
  recommendations: string[];
  nextSteps: string[];
  roadmapPreview: {
    current: string;
    next: string[];
  };
  progression: {
    level: number; // 1-20
    currentXP: number;
    xpToNextLevel: number;
    title: string;
    completionReward: number; // XP earned for completing quiz
  };
}

export interface QuizAnalysis {
  hasIncome: boolean;
  savingsBehavior: 'none' | 'irregular' | 'regular' | 'investing';
  spendingControl: 'impulsive' | 'moderate' | 'controlled';
  debtLevel: 'none' | 'manageable' | 'stressful';
  primaryGoal: string;
  motivationLevel: 'curious' | 'interested' | 'started' | 'committed';
  knowledgeLevel: number; // 0-10
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  learningPreference: 'roadmap' | 'video' | 'gamified' | 'reading';
}

/**
 * Stage type for quiz results (re-exported from Prisma)
 */
export type Stage = UserStage;
