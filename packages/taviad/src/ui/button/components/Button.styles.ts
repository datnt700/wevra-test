'use client';

/**
 * Button component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Button.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'link'
  | 'tertiary'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';
type ButtonShape = 'default' | 'round' | 'rounded' | 'square' | 'pill' | 'circle';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
    success: {
      bg: theme.colors.success,
      color: '#ffffff',
      hoverBg: theme.colors.success,
      activeBg: theme.colors.success,
      border: theme.colors.success,
    },
    warning: {
      bg: theme.colors.warning,
      color: '#ffffff',
      hoverBg: theme.colors.warning,
      activeBg: theme.colors.warning,
      border: theme.colors.warning,
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
  $size?: ButtonSize;
  $isLoading?: boolean;
}>`
  ${({ theme, $variant = 'primary', $shape = 'default', $size = 'md', $isLoading = false }) => {
    const taviaTheme = theme as TaviaTheme;
    const colors = getVariantColors(taviaTheme, $variant);

    // Size-specific styles
    const sizeStyles: Record<
      ButtonSize,
      { height: string; padding: string; fontSize: string; iconSize: string }
    > = {
      xs: {
        height: '1.75rem',
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
        iconSize: '0.875rem',
      },
      sm: {
        height: '2.25rem',
        padding: '0.375rem 0.75rem',
        fontSize: '0.875rem',
        iconSize: '1rem',
      },
      md: { height: '3rem', padding: '0.5rem 1rem', fontSize: '1rem', iconSize: '1.25rem' },
      lg: {
        height: '3.5rem',
        padding: '0.625rem 1.5rem',
        fontSize: '1.125rem',
        iconSize: '1.5rem',
      },
      xl: { height: '4rem', padding: '0.75rem 2rem', fontSize: '1.25rem', iconSize: '1.75rem' },
    };

    const size = sizeStyles[$size];

    // Shape-specific styles
    const shapeStyles: Record<ButtonShape, string> = {
      default: `border-radius: 6px; padding: ${size.padding};`,
      pill: `border-radius: 2.25rem; padding: ${size.padding};`,
      round: `border-radius: 12px; padding: ${size.padding};`,
      rounded: 'border-radius: 1rem; padding: 1.125rem 2rem;', // Gaming/Duolingo style (fixed size)
      square: `border-radius: 6px; padding: ${size.padding};`,
      circle: `border-radius: 50%; padding: ${size.padding}; width: ${size.height}; height: ${size.height};`,
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
      ${$shape === 'rounded' ? 'height: auto;' : `height: ${size.height};`}
      width: ${$shape === 'rounded' ? '100%' : 'max-content'};
      font-weight: ${$shape === 'rounded' ? '700' : '500'};
      font-size: ${$shape === 'rounded' ? '1.125rem' : size.fontSize};
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
          width: ${size.iconSize};
          height: ${size.iconSize};
        }
      }
    `;
  }}
`;

export const Styled = {
  Button: StyledButton,
};
