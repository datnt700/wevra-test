'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

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
 * Get variant colors from theme
 */
const getVariantColors = (theme: TaviaTheme, variant: AlertVariant = 'info'): VariantColors => {
  const variantMap: Record<AlertVariant, VariantColors> = {
    success: {
      base: theme.colors.success,
      light: theme.colors.successLight,
      dark: theme.colors.gray.colorGreenDark,
      bg: theme.colors.successLight + '20', // 20 = 12% opacity
    },
    warning: {
      base: theme.colors.warning,
      light: theme.colors.warningLight,
      dark: theme.colors.gray.colorYellowDark,
      bg: theme.colors.warningLight + '20',
    },
    danger: {
      base: theme.colors.danger,
      light: theme.colors.dangerLight,
      dark: theme.colors.gray.colorRedDark,
      bg: theme.colors.dangerLight + '20',
    },
    error: {
      base: theme.colors.danger,
      light: theme.colors.dangerLight,
      dark: theme.colors.gray.colorRedDark,
      bg: theme.colors.dangerLight + '20',
    },
    info: {
      base: theme.colors.info,
      light: theme.colors.infoLight,
      dark: theme.colors.gray.colorCyanDark,
      bg: theme.colors.infoLight + '20',
    },
  };

  return variantMap[variant];
};

/**
 * Styled components for the Alert.
 */
export const Styled: any = {
  Wrapper: styled.div<StyledWrapperProps>`
    ${({ theme, $variant = 'info', $isFilled = false }) => {
      const taviaTheme = theme as TaviaTheme;
      const colors = getVariantColors(taviaTheme, $variant);

      const baseStyles = `
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
      `;

      if ($isFilled) {
        return `
          ${baseStyles}
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
        ${baseStyles}
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
