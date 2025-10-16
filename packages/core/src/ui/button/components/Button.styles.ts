/**
 * Button component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Button.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'link' | 'tertiary' | 'danger' | 'info';
type ButtonShape = 'default' | 'round' | 'square' | 'pill' | 'circle';

interface VariantColors {
  bg: string;
  color: string;
  hoverBg: string;
  activeBg: string;
  border: string;
}

/**
 * Get variant colors from theme tokens
 */
const getVariantColors = (variant: ButtonVariant = 'primary'): VariantColors => {
  const variantMap: Record<ButtonVariant, VariantColors> = {
    primary: {
      bg: cssVars.mainColor,
      color: cssVars.light,
      hoverBg: cssVars.mainColorDark,
      activeBg: cssVars.mainColorDark2,
      border: cssVars.mainColor,
    },
    secondary: {
      bg: cssVars.gray200,
      color: cssVars.dark,
      hoverBg: cssVars.gray300,
      activeBg: cssVars.gray400,
      border: cssVars.gray300,
    },
    tertiary: {
      bg: cssVars.gray100,
      color: cssVars.gray700,
      hoverBg: cssVars.gray200,
      activeBg: cssVars.gray300,
      border: cssVars.gray200,
    },
    dark: {
      bg: cssVars.dark,
      color: cssVars.light,
      hoverBg: cssVars.dark2,
      activeBg: cssVars.dark3,
      border: cssVars.dark,
    },
    link: {
      bg: 'transparent',
      color: cssVars.mainColor,
      hoverBg: 'transparent',
      activeBg: 'transparent',
      border: 'transparent',
    },
    danger: {
      bg: cssVars.colorDanger,
      color: cssVars.light,
      hoverBg: cssVars.colorRedDark,
      activeBg: cssVars.colorDarkredDark,
      border: cssVars.colorDanger,
    },
    info: {
      bg: cssVars.colorCyan,
      color: cssVars.dark,
      hoverBg: cssVars.colorCyanDark,
      activeBg: cssVars.colorCyanDark,
      border: cssVars.colorCyan,
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
  ${({ $variant = 'primary', $shape = 'default', $isLoading = false }) => {
    const colors = getVariantColors($variant);

    // Shape-specific styles
    const shapeStyles: Record<ButtonShape, string> = {
      default: 'border-radius: 6px; padding: 0.5rem 1rem;',
      pill: 'border-radius: 2.25rem; padding: 0.5rem 1.5rem;',
      round: 'border-radius: 12px; padding: 0.5rem 1rem;',
      square: 'border-radius: 6px; padding: 0.5rem 1rem;',
      circle: 'border-radius: 50%; padding: 0.5rem; width: 3rem; height: 3rem;',
    };

    return `
      /* Base styles */
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      height: 3rem;
      width: max-content;
      font-weight: 500;
      font-size: 1rem;
      cursor: ${$isLoading ? 'not-allowed' : 'pointer'};
      border: 1px solid ${colors.border};
      transition: all 0.2s ease-in-out;

      /* Shape styles */
      ${shapeStyles[$shape] || shapeStyles.default}

      /* Color styles */
      background-color: ${colors.bg};
      color: ${colors.color};

      /* Interactive states */
      &:hover:not(:disabled) {
        background-color: ${colors.hoverBg};
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      &:active:not(:disabled) {
        background-color: ${colors.activeBg};
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      &:focus-visible {
        outline: 2px solid ${colors.border};
        outline-offset: 2px;
      }

      &:disabled {
        background-color: ${cssVars.gray300};
        color: ${cssVars.gray500};
        border-color: ${cssVars.gray300};
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
