/**
 * Responsive breakpoints for media queries
 * Mobile-first approach: use min-width queries
 */
export const breakpoints = {
  mobile: '950px',
  xs: '400px',
  sm: '640px', // Small devices (landscape phones)
  md: '768px', // Medium devices (tablets)
  lg: '1024px', // Large devices (desktops)
  xl: '1280px', // Extra large devices
  '2xl': '1536px', // 2X large devices
} as const;

/**
 * Media query helpers for Emotion
 * Usage: ${mq.md} { ... }
 */
export const mq = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  mobile: `@media (min-width: ${breakpoints.mobile})`,
} as const;

/**
 * Max-width media queries (for targeting smaller screens)
 * Usage: ${mqMax.md} { ... }
 */
export const mqMax = {
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
  '2xl': `@media (max-width: ${breakpoints['2xl']})`,
  mobile: `@media (max-width: ${breakpoints.mobile})`,
} as const;
