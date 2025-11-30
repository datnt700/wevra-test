'use client';

/**
 * Icon Styles
 * Emotion-based styles for Icon component
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

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
const getVariantColor = (
  eventureTheme: EventureTheme,
  variant: IconVariant = 'inherit'
): string => {
  const variantMap: Record<IconVariant, string> = {
    base: 'inherit',
    inherit: 'inherit',
    primary: eventureTheme.colors.primary,
    info: eventureTheme.colors.gray.colorCyan,
    success: eventureTheme.colors.success,
    caution: eventureTheme.colors.gray.colorWarning,
    warning: eventureTheme.colors.gray.colorWarning,
    danger: eventureTheme.colors.danger,
  };
  return variantMap[variant];
};

/**
 * Icon wrapper container
 */
const Wrapper = styled.div<WrapperProps>`
  ${({ theme, $variant = 'inherit' }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      width: max-content;
      height: max-content;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: ${getVariantColor(eventureTheme, $variant)};
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
