'use client';

/**
 * ProgressBar styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module ProgressBar.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

interface ProgressBarProps {
  $isIndeterminate?: boolean;
  $variant?: ProgressVariant;
}

/**
 * Get background color for progress bar based on variant
 */
const getVariantColor = (
  eventureTheme: EventureTheme,
  variant: ProgressVariant = 'default'
): string => {
  const variantMap: Record<ProgressVariant, string> = {
    success: eventureTheme.colors.success,
    warning: eventureTheme.colors.gray.gray600,
    error: eventureTheme.colors.danger,
    default: eventureTheme.colors.primary,
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
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      width: 100%;
      max-width: 20rem;
      height: 0.5rem;
      border-radius: ${eventureTheme.radii.md};
      background-color: ${eventureTheme.colors.gray.gray200};
      position: relative;
      overflow: hidden;
    `;
  }}
`;

/**
 * Progress bar fill with animation support
 * Uses transient props ($) to avoid DOM warnings
 */
const Fill = styled.div<ProgressBarProps>`
  ${({ theme, $isIndeterminate = false, $variant = 'default' }) => {
    const eventureTheme = theme as EventureTheme;
    const color = getVariantColor(eventureTheme, $variant);

    return `
      position: absolute;
      height: 100%;
      border-radius: ${eventureTheme.radii.md};
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
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      font-size: 0.875rem;
      font-weight: 500;
      color: ${eventureTheme.colors.text.primary};
    `;
  }}
`;

export const Styled = {
  Wrapper,
  Track,
  Fill,
  Label,
};
