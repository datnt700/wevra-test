'use client';

/**
 * Font Face Declarations
 *
 * NOTE: Fonts are loaded via CDN in the GlobalStyles component.
 * This file exports empty CSS for backward compatibility with existing code.
 *
 * The actual font loading happens through @import statements in GlobalStyles:
 * - Gilroy: https://diverse-public.s3.eu-west-3.amazonaws.com/fonts/fonts.css
 * - Gotham: https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/gotham.css
 *
 * @module fonts
 * @see GlobalStyles component (theme/global.tsx) for actual font imports
 */
import { css } from '@emotion/react';

/**
 * Font face declarations (empty - fonts loaded via CDN)
 *
 * This export maintains backward compatibility for code that imports `fontFaces`.
 * The actual fonts are loaded automatically when you use the GlobalStyles component.
 *
 * @example
 * ```tsx
 * import { GlobalStyles } from '@tavia/core';
 *
 * // Fonts are automatically loaded
 * function App() {
 *   return (
 *     <>
 *       <GlobalStyles />
 *       <YourComponents />
 *     </>
 *   );
 * }
 * ```
 */
export const fontFaces = css``;
