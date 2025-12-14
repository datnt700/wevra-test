/**
 * Shared types export
 * Central export for all shared types across the application
 */

// Export all type modules here
// Example: export * from './user';
// Example: export * from './product';
// _types.ts (ví dụ)
export type QuizQuestionOption = {
  id: string;
  value: string;
  points: number;
};

export type QuizQuestion =
  | {
      id: string;
      step: number;
      type: 'multiple-choice';
      required: boolean;
      options: QuizQuestionOption[];
    }
  | {
      id: string;
      step: number;
      type: 'text';
      required: boolean;
    }
  | {
      id: string;
      step: number;
      type: 'scale';
      required: boolean;
      scaleMin: number;
      scaleMax: number;
    };

export {};
