'use client';

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

type AlertVariant = 'success' | 'warning' | 'info' | 'danger' | 'error';

interface StyledWrapperProps {
  $variant?: AlertVariant;
  $isFilled?: boolean;
}

interface VariantColors {
  base: string;
  light: string;
  dark: string;
  bg: string;
}

/**
 * Get variant colors from theme tokens
 */
const getVariantColors = (variant: AlertVariant = 'info'): VariantColors => {
  const variantMap: Record<AlertVariant, VariantColors> = {
    success: {
      base: cssVars.colorSuccess,
      light: cssVars.colorSuccessLight,
      dark: cssVars.colorGreenDark,
      bg: cssVars.colorSuccessLight + '20', // 20 = 12% opacity
    },
    warning: {
      base: cssVars.colorWarning,
      light: cssVars.colorWarningLight,
      dark: cssVars.colorYellowDark,
      bg: cssVars.colorWarningLight + '20',
    },
    danger: {
      base: cssVars.colorDanger,
      light: cssVars.colorDangerLight,
      dark: cssVars.colorRedDark,
      bg: cssVars.colorDangerLight + '20',
    },
    error: {
      base: cssVars.colorDanger,
      light: cssVars.colorDangerLight,
      dark: cssVars.colorRedDark,
      bg: cssVars.colorDangerLight + '20',
    },
    info: {
      base: cssVars.colorCyan,
      light: cssVars.colorCyanLight,
      dark: cssVars.colorCyanDark,
      bg: cssVars.colorCyanLight + '20',
    },
  };

  return variantMap[variant];
};

/**
 * Styled components for the Alert.
 */
export const Styled: any = {
  Wrapper: styled.div<StyledWrapperProps>`
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    min-height: 3rem;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;

    ${({ $variant = 'info', $isFilled = false }) => {
      const colors = getVariantColors($variant);

      if ($isFilled) {
        return `
          color: ${colors.dark};
          background-color: ${colors.bg};
          border: 1px solid ${colors.light};
          box-shadow: 0 0 5px ${colors.bg};

          &:hover {
            border-color: ${colors.base};
            box-shadow: 0 0 8px ${colors.bg};
          }
        `;
      }

      return `
        color: ${colors.base};
        background-color: transparent;
        border: 1px solid ${colors.base};
        box-shadow: none;

        &:hover {
          border-color: ${colors.dark};
          background-color: ${colors.bg};
        }
      `;
    }}
  `,

  Title: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1rem;

    span[aria-hidden='true'] {
      display: flex;
      align-items: center;
    }
  `,

  Description: styled.p`
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.9;
    line-height: 1.5;
  `,
};
