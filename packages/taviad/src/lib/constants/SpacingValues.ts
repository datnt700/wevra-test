/**
 * Spacing scale constants for consistent spacing across the application
 * Based on 8px grid system (4px for fine-tuning)
 * @module SpacingValues
 */

/**
 * Standard spacing scale following 8px grid system
 * Use these values for margins, padding, and gaps
 * @example
 * ```tsx
 * import { SPACING_VALUES } from '@tavia/taviad/lib';
 *
 * const Container = styled.div`
 *   padding: ${SPACING_VALUES.md};
 *   gap: ${SPACING_VALUES.sm};
 * `;
 * ```
 */
export const SPACING_VALUES = {
  /** 2px - Minimal spacing for tight layouts */
  xxs: '2px',
  /** 4px - Extra small spacing, fine-tuning */
  xs: '4px',
  /** 8px - Small spacing, base unit */
  sm: '8px',
  /** 16px - Medium spacing, default gap */
  md: '16px',
  /** 24px - Large spacing, section separation */
  lg: '24px',
  /** 32px - Extra large spacing, major sections */
  xl: '32px',
  /** 48px - Double extra large, page sections */
  xxl: '48px',
  /** 64px - Triple extra large, hero sections */
  xxxl: '64px',
} as const;

/**
 * Spacing values as numbers (for calculations)
 * Useful when you need to do arithmetic with spacing values
 */
export const SPACING_NUMBERS = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Helper function to get spacing value by key
 * @param key - Spacing key (xxs, xs, sm, md, lg, xl, xxl, xxxl)
 * @returns Spacing value as string with px unit
 */
export const getSpacing = (key: keyof typeof SPACING_VALUES): string => {
  return SPACING_VALUES[key];
};

/**
 * Helper function to multiply spacing values
 * @param key - Spacing key
 * @param multiplier - Number to multiply by
 * @returns Calculated spacing as string with px unit
 * @example
 * ```tsx
 * multiplySpacing('md', 2) // returns '32px'
 * ```
 */
export const multiplySpacing = (key: keyof typeof SPACING_NUMBERS, multiplier: number): string => {
  return `${SPACING_NUMBERS[key] * multiplier}px`;
};
