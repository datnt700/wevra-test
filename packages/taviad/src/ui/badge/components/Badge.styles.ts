'use client';

/**
 * Badge component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Badge.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface VariantColors {
  bg: string;
  color: string;
  hoverBg?: string;
}

const getVariantColors = (theme: TaviaTheme, variant: BadgeVariant): VariantColors => {
  const variantMap: Record<BadgeVariant, VariantColors> = {
    default: {
      bg: theme.colors.gray.light4,
      color: theme.colors.text.primary,
      hoverBg: theme.colors.surfaceHover,
    },
    primary: {
      bg: `${theme.colors.primary}15`,
      color: theme.colors.primary,
      hoverBg: `${theme.colors.primary}25`,
    },
    secondary: {
      bg: theme.colors.gray.gray200,
      color: theme.colors.gray.gray900,
      hoverBg: theme.colors.gray.gray300,
    },
    success: {
      bg: `${theme.colors.success}15`,
      color: theme.colors.success,
      hoverBg: `${theme.colors.success}25`,
    },
    warning: {
      bg: `${theme.colors.warning}15`,
      color: theme.colors.warning,
      hoverBg: `${theme.colors.warning}25`,
    },
    danger: {
      bg: `${theme.colors.danger}15`,
      color: theme.colors.danger,
      hoverBg: `${theme.colors.danger}25`,
    },
    info: {
      bg: `${theme.colors.info}15`,
      color: theme.colors.info,
      hoverBg: `${theme.colors.info}25`,
    },
  };

  return variantMap[variant];
};

/**
 * Badge wrapper with interactive states
 */
export const WrapperStyled = styled.div<{
  $variant?: BadgeVariant;
  $size?: BadgeSize;
  $isClickable?: boolean;
  $hasUrl?: boolean;
}>`
  ${({ theme, $variant = 'default', $size = 'md', $isClickable, $hasUrl }) => {
    const taviaTheme = theme as TaviaTheme;
    const colors = getVariantColors(taviaTheme, $variant);

    const sizeStyles: Record<BadgeSize, { padding: string; fontSize: string; height: string }> = {
      xs: { padding: '0.125rem 0.375rem', fontSize: '0.625rem', height: '1rem' },
      sm: { padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '1.25rem' },
      md: { padding: '0.25rem 0.5rem', fontSize: '0.875rem', height: '1.5rem' },
      lg: { padding: '0.375rem 0.75rem', fontSize: '1rem', height: '2rem' },
    };

    const size = sizeStyles[$size];

    return `
      position: relative;
      display: flex;
      max-width: 100%;
      align-items: center;
      justify-content: center;
      padding: ${size.padding};
      background-color: ${colors.bg};
      border-radius: ${taviaTheme.radii.md};
      color: ${colors.color};
      width: max-content;
      min-height: ${size.height};
      font-size: ${size.fontSize};
      font-weight: 500;
      line-height: 1;
      transition: all 0.2s ease-in-out;
      cursor: ${$isClickable || $hasUrl ? 'pointer' : 'default'};

      ${
        $isClickable
          ? `
        &:hover {
          background-color: ${colors.hoverBg || colors.bg};
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        &:active {
          transform: translateY(0);
          box-shadow: none;
        }
      `
          : ''
      }

      ${
        $hasUrl
          ? `
        &:hover {
          background-color: ${colors.hoverBg || colors.bg};
          transform: translateY(-1px);

          a.body {
            text-decoration: underline;
          }
        }

        &:active {
          transform: translateY(0);
        }
      `
          : ''
      }
    `;
  }}
`;

/**
 * Badge body container
 */
export const BodyStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

/**
 * Badge content wrapper
 */
export const ContentStyled = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;
