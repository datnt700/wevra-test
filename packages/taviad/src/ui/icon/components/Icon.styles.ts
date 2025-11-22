'use client';

/**
 * Icon Styles
 * Emotion-based styles for Icon component
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

/**
 * Icon variant types
 */
type IconVariant =
  | 'base'
  | 'inherit'
  | 'primary'
  | 'info'
  | 'success'
  | 'caution'
  | 'warning'
  | 'danger';

interface WrapperProps {
  $variant?: IconVariant;
}

/**
 * Get color based on variant
 */
const getVariantColor = (taviaTheme: TaviaTheme, variant: IconVariant = 'inherit'): string => {
  const variantMap: Record<IconVariant, string> = {
    base: 'inherit',
    inherit: 'inherit',
    primary: taviaTheme.colors.primary,
    info: taviaTheme.colors.gray.colorCyan,
    success: taviaTheme.colors.success,
    caution: taviaTheme.colors.gray.colorWarning,
    warning: taviaTheme.colors.gray.colorWarning,
    danger: taviaTheme.colors.danger,
  };
  return variantMap[variant];
};

/**
 * Icon wrapper container
 */
const Wrapper = styled.div<WrapperProps>`
  ${({ theme, $variant = 'inherit' }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      width: max-content;
      height: max-content;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: ${getVariantColor(taviaTheme, $variant)};
      }
    `;
  }}
`;

/**
 * Exported styled components
 */
export const Styled = {
  Wrapper,
};
