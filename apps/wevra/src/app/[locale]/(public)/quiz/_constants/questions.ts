import type { QuizQuestionBase } from '../_types';

export const QUIZ_QUESTIONS: QuizQuestionBase[] = [
  {
    id: 'q1-mindset',
    step: 1,
    type: 'multiple-choice',
    required: true,
    description: '',
    options: [
      { id: 'avoid', value: 'avoid', points: 1 },
      { id: 'stressed', value: 'stressed', points: 2 },
      { id: 'confident', value: 'confident', points: 3 },
      { id: 'excited', value: 'excited', points: 4 },
    ],
  },
  {
    id: 'q2-frequency',
    step: 2,
    type: 'multiple-choice',
    required: true,
    description: '',
    options: [
      { id: 'rarely', value: 'rarely', points: 1 },
      { id: 'sometimes', value: 'sometimes', points: 2 },
      { id: 'monthly', value: 'monthly', points: 3 },
      { id: 'weekly', value: 'weekly', points: 4 },
    ],
  },
  {
    id: 'q3-confidence',
    step: 3,
    type: 'multiple-choice',
    required: true,
    description: '',
    options: [
      { id: 'lost', value: 'lost', points: 1 },
      { id: 'learning', value: 'learning', points: 2 },
      { id: 'comfortable', value: 'comfortable', points: 3 },
      { id: 'advanced', value: 'advanced', points: 4 },
    ],
  },
  {
    id: 'q4-savings',
    step: 4,
    type: 'multiple-choice',
    required: true,
    description: '',
    options: [
      { id: 'no-savings', value: 'no-savings', points: 1 },
      { id: 'trying', value: 'trying', points: 2 },
      { id: 'yes-small', value: 'yes-small', points: 3 },
      {
        id: 'yes-automated',
        value: 'yes-automated',
        points: 4,
      },
    ],
  },
  {
    id: 'q5-goal',
    step: 5,
    type: 'multiple-choice',
    required: true,
    description: '',
    options: [
      { id: 'basics', value: 'basics', points: 1 },
      { id: 'emergency', value: 'emergency', points: 2 },
      { id: 'invest', value: 'invest', points: 3 },
      { id: 'wealth', value: 'wealth', points: 4 },
    ],
  },
  {
    id: 'q6-emotion',
    step: 6,
    type: 'multiple-choice',
    required: true,
    description: '',
    options: [
      { id: 'anxious', value: 'anxious', points: 1 },
      { id: 'hopeful', value: 'hopeful', points: 2 },
      { id: 'optimistic', value: 'optimistic', points: 3 },
      { id: 'in-control', value: 'in-control', points: 4 },
    ],
  },
  {
    id: 'q7-reflection',
    step: 7,
    type: 'text',
    required: true,
    description: '',
  },
  {
    id: 'q8-learning',
    step: 8,
    type: 'multiple-choice',
    required: true,
    description: '',
    options: [
      { id: 'guided', value: 'guided', points: 1 },
      { id: 'courses', value: 'courses', points: 2 },
      { id: 'community', value: 'community', points: 3 },
      { id: 'self-driven', value: 'self-driven', points: 4 },
    ],
  },
  {
    id: 'q9-commitment',
    step: 9,
    type: 'scale',
    required: true,
    scaleMin: 0,
    scaleMax: 4,
    description: '',
  },
  {
    id: 'q10-success',
    step: 10,
    type: 'text',
    required: true,
    description: '',
  },
];

export const TOTAL_STEPS = QUIZ_QUESTIONS.length;
