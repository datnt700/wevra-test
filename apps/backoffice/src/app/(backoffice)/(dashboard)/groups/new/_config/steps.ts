/**
 * Create Group Form Configuration
 * Multi-step wizard configuration
 */

export const CREATE_GROUP_STEPS = [
  { id: 1, title: 'Location & Type' },
  { id: 2, title: 'Basic Information' },
  { id: 3, title: 'Details' },
] as const;

export type CreateGroupStep = (typeof CREATE_GROUP_STEPS)[number];
