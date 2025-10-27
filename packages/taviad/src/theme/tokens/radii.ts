/**
 * Border Radius Tokens
 * Direct access to theme border radius values
 * Similar to cssVars pattern for consistent usage across components
 */
export const radii = {
  none: '0',
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  full: '9999px',
} as const;

export type RadiiToken = keyof typeof radii;
