'use client';

/**
 * @fileoverview Code component for displaying inline code snippets
 * Styled with Emotion for consistent formatting
 */

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';
import { CodeProps } from '../types';

/**
 * Styled code element with monospace font and subtle background
 */
const StyledCode = styled.code`
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875em;
  padding: 0.2em 0.4em;
  background-color: ${cssVars.light3};
  border: 1px solid ${cssVars.light4};
  border-radius: ${radii.sm};
  color: ${cssVars.dark};
`;

/**
 * Code - Inline code display component
 *
 * @description
 * Displays code snippets with monospace font and subtle styling.
 * Perfect for inline code references in documentation or UI.
 *
 * Features:
 * - Monospace font for readability
 * - Subtle background for visual distinction
 * - Responsive sizing
 * - Supports all HTML code element attributes
 *
 * @example
 * // Basic usage
 * ```tsx
 * <Code>console.log('Hello, world!')</Code>
 * ```
 *
 * @example
 * // In a sentence
 * ```tsx
 * <p>Use <Code>npm install</Code> to install packages</p>
 * ```
 *
 * @example
 * // With custom className
 * ```tsx
 * <Code className="custom-code">const x = 42;</Code>
 * ```
 */
export const Code = ({ children, className, ...other }: CodeProps) => {
  return (
    <StyledCode className={className} {...other}>
      {children}
    </StyledCode>
  );
};

Code.displayName = 'Code';
