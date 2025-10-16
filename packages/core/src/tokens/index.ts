/**
 * Design tokens barrel export
 * Re-exports all tokens from theme/tokens for convenience
 * @module tokens
 * @deprecated Import directly from '@tavia/core/theme' or '@tavia/core' instead
 */

// Re-export all tokens from theme/tokens
export { typography } from '../theme/tokens/typography';
export { cssVars, darkThemeCssVars, semanticColors } from '../theme/tokens/colors';
export { layout, styleVars } from '../theme/tokens/variables';
export { fontFaces } from '../theme/tokens/fonts';

// Type exports
export type { CSSObject } from '@emotion/react';
