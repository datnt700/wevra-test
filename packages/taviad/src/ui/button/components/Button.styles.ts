'use client';

/**
 * Button component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Button.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'link' | 'tertiary' | 'danger' | 'info';
type ButtonShape = 'default' | 'round' | 'rounded' | 'square' | 'pill' | 'circle';

interface VariantColors {
  bg: string;
  color: string;
  hoverBg: string;
  activeBg: string;
  border: string;
  shadow?: string;
}

/**
 * Get variant colors from theme
 */
const getVariantColors = (theme: TaviaTheme, variant: ButtonVariant = 'primary'): VariantColors => {
  const variantMap: Record<ButtonVariant, VariantColors> = {
    primary: {
      bg: theme.colors.primary,
      color: '#ffffff',
      hoverBg: theme.colors.primary,
      activeBg: theme.colors.primary,
      border: theme.colors.primary,
      shadow: theme.colors.primary,
    },
    secondary: {
      bg: '#ffffff',
      color: theme.colors.primary,
      hoverBg: `${theme.colors.gray.mainColorLight}05`,
      activeBg: '#ffffff',
      border: theme.colors.gray.gray300,
    },
    tertiary: {
      bg: theme.colors.gray.gray100,
      color: theme.colors.gray.gray900,
      hoverBg: theme.colors.gray.gray200,
      activeBg: theme.colors.gray.gray200,
      border: theme.colors.gray.gray200,
    },
    dark: {
      bg: theme.colors.gray.gray900,
      color: '#ffffff',
      hoverBg: theme.colors.gray.gray800,
      activeBg: theme.colors.gray.gray700,
      border: theme.colors.gray.gray900,
    },
    link: {
      bg: 'transparent',
      color: theme.colors.primary,
      hoverBg: 'transparent',
      activeBg: 'transparent',
      border: 'transparent',
    },
    danger: {
      bg: theme.colors.danger,
      color: '#ffffff',
      hoverBg: theme.colors.danger,
      activeBg: theme.colors.danger,
      border: theme.colors.danger,
    },
    info: {
      bg: theme.colors.info,
      color: '#ffffff',
      hoverBg: theme.colors.info,
      activeBg: theme.colors.info,
      border: theme.colors.info,
    },
  };

  return variantMap[variant] || variantMap.primary;
};

/**
 * Styled Button component with variant support
 */
const StyledButton = styled.button<{
  $variant?: ButtonVariant;
  $shape?: ButtonShape;
  $isLoading?: boolean;
}>`
  ${({ theme, $variant = 'primary', $shape = 'default', $isLoading = false }) => {
    const taviaTheme = theme as TaviaTheme;
    const colors = getVariantColors(taviaTheme, $variant);

    // Shape-specific styles
    const shapeStyles: Record<ButtonShape, string> = {
      default: 'border-radius: 6px; padding: 0.5rem 1rem;',
      pill: 'border-radius: 2.25rem; padding: 0.5rem 1.5rem;',
      round: 'border-radius: 12px; padding: 0.5rem 1rem;',
      rounded: 'border-radius: 1rem; padding: 1.125rem 2rem;', // Gaming/Duolingo style
      square: 'border-radius: 6px; padding: 0.5rem 1rem;',
      circle: 'border-radius: 50%; padding: 0.5rem; width: 3rem; height: 3rem;',
    };

    // Variant-specific enhancements
    const isPrimary = $variant === 'primary';
    const isSecondary = $variant === 'secondary';

    return `
      /* Base styles */
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      ${$shape === 'rounded' ? 'height: auto;' : 'height: 3rem;'}
      width: ${$shape === 'rounded' ? '100%' : 'max-content'};
      font-weight: ${$shape === 'rounded' ? '700' : '500'};
      font-size: ${$shape === 'rounded' ? '1.125rem' : '1rem'};
      ${$shape === 'rounded' ? 'text-transform: uppercase;' : ''}
      cursor: ${$isLoading ? 'not-allowed' : 'pointer'};
      border: ${isSecondary && $shape === 'rounded' ? '3px' : '1px'} solid ${colors.border};
      transition: all 0.15s ease;

      /* Shape styles */
      ${shapeStyles[$shape] || shapeStyles.default}

      /* Color styles */
      background-color: ${colors.bg};
      color: ${colors.color};

      /* Shadow for primary rounded buttons (Gaming style) */
      ${isPrimary && $shape === 'rounded' && colors.shadow ? `box-shadow: 0 4px 12px ${colors.shadow}30;` : ''}

      /* Interactive states */
      &:hover:not(:disabled) {
        background-color: ${colors.hoverBg};
        ${isPrimary && $shape === 'rounded' ? 'filter: brightness(1.1);' : ''}
        ${isSecondary && $shape === 'rounded' ? `border-color: ${colors.color};` : ''}
        transform: translateY(-2px);
        ${isPrimary && $shape === 'rounded' && colors.shadow ? `box-shadow: 0 6px 20px ${colors.shadow}40;` : 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'}
      }

      &:active:not(:disabled) {
        background-color: ${colors.activeBg};
        transform: ${isSecondary && $shape === 'rounded' ? 'scale(0.98)' : 'translateY(0)'};
        ${isPrimary && $shape === 'rounded' && colors.shadow ? `box-shadow: 0 2px 8px ${colors.shadow}30;` : 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'}
      }

      &:focus-visible {
        outline: 2px solid ${colors.border};
        outline-offset: 2px;
      }

      &:disabled {
        background-color: ${taviaTheme.colors.gray.gray400};
        color: ${taviaTheme.colors.gray.gray600};
        border-color: ${taviaTheme.colors.gray.gray400};
        cursor: not-allowed;
        opacity: 0.6;
      }

      /* Content styles */
      .content {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        svg {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    `;
  }}
`;

export const Styled = {
  Button: StyledButton,
};
