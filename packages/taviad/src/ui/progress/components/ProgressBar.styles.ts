'use client';

/**
 * ProgressBar styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module ProgressBar.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

interface ProgressBarProps {
  $isIndeterminate?: boolean;
  $variant?: ProgressVariant;
}

/**
 * Get background color for progress bar based on variant
 */
const getVariantColor = (variant: ProgressVariant = 'default'): string => {
  const variantMap: Record<ProgressVariant, string> = {
    success: cssVars.colorSuccess,
    warning: cssVars.colorWarning,
    error: cssVars.colorDanger,
    default: cssVars.mainColor,
  };

  return variantMap[variant];
};

/**
 * Wrapper container for progress bar and label
 */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

/**
 * Progress bar track (background)
 */
const Track = styled.div`
  width: 100%;
  max-width: 20rem;
  height: 0.5rem;
  border-radius: ${radii.md};
  background-color: ${cssVars.light4};
  position: relative;
  overflow: hidden;
`;

/**
 * Progress bar fill with animation support
 * Uses transient props ($) to avoid DOM warnings
 */
const Fill = styled.div<ProgressBarProps>`
  ${({ $isIndeterminate = false, $variant = 'default' }) => {
    const color = getVariantColor($variant);

    return `
      position: absolute;
      height: 100%;
      border-radius: ${radii.md};
      background-color: ${color};
      transition: transform 0.3s ease-in-out;

      ${
        $isIndeterminate
          ? `
        /* Indeterminate animation */
        width: 40%;
        animation: indeterminateProgress 1.5s ease-in-out infinite;

        @keyframes indeterminateProgress {
          0% {
            left: -40%;
          }
          50% {
            left: 50%;
          }
          100% {
            left: 110%;
          }
        }
      `
          : `
        /* Determinate progress */
        width: 100%;
        left: -100%;
      `
      }
    `;
  }}
`;

/**
 * Label for displaying progress percentage or status
 */
const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${cssVars.dark};
`;

export const Styled = {
  Wrapper,
  Track,
  Fill,
  Label,
};
