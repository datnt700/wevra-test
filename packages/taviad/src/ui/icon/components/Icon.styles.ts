'use client';

/**
 * Icon Styles
 * Emotion-based styles for Icon component
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

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
const getVariantColor = (variant: IconVariant = 'inherit'): string => {
  const variantMap: Record<IconVariant, string> = {
    base: 'inherit',
    inherit: 'inherit',
    primary: cssVars.mainColor,
    info: cssVars.colorCyan,
    success: cssVars.colorSuccess,
    caution: cssVars.colorWarning,
    warning: cssVars.colorWarning,
    danger: cssVars.colorDanger,
  };
  return variantMap[variant];
};

/**
 * Icon wrapper container
 */
const Wrapper = styled.div<WrapperProps>`
  ${({ $variant = 'inherit' }) => `
    width: max-content;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${getVariantColor($variant)};
    }
  `}
`;

/**
 * Exported styled components
 */
export const Styled = {
  Wrapper,
};
