/**
 * Group Categories Configuration
 * Centralized list of available group categories
 */

export const GROUP_CATEGORIES = ['Food', 'Sports', 'Arts'] as const;

export type GroupCategory = (typeof GROUP_CATEGORIES)[number];
