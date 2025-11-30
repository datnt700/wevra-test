/**
 * Border radius tokens for Eventure Mobile UI
 */

export const radii = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
} as const;

export type RadiiSize = keyof typeof radii;
