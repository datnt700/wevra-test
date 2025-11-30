/**
 * Eventure Mobile UI Theme
 * Central theme configuration for React Native components
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  radii,
  typography,
} as const;

export type Theme = typeof theme;

// Re-export tokens for convenience
export { colors } from './colors';
export { spacing } from './spacing';
export { radii } from './radii';
export { typography } from './typography';

export type { ColorName } from './colors';
export type { SpacingSize } from './spacing';
export type { RadiiSize } from './radii';
export type { FontSize, FontWeight, LineHeight } from './typography';
