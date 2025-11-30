/**
 * Spacing tokens for Eventure Mobile UI
 * Based on 4px/8px grid system
 */

export const spacing = {
  xs: 4, // 0.25rem equivalent
  sm: 8, // 0.5rem equivalent
  md: 12, // 0.75rem equivalent
  base: 16, // 1rem equivalent
  lg: 24, // 1.5rem equivalent
  xl: 32, // 2rem equivalent
  '2xl': 48,
  '3xl': 64,
} as const;

export type SpacingSize = keyof typeof spacing;
