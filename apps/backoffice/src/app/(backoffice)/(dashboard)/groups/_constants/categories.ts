/**
 * Group Categories Configuration
 * Centralized list of available group categories
 */

export const GROUP_CATEGORIES = ['FOOD', 'SPORTS', 'ARTS'] as const;

export type GroupCategory = (typeof GROUP_CATEGORIES)[number];
