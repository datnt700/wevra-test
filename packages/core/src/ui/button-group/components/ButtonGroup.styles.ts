import styled from '@emotion/styled';
import type { ButtonGroupVariant, ButtonGroupOrientation } from '../types';

interface VariantStyles {
  gap: string;
  flexDirection: string;
  border?: string;
}

const getVariantStyles = (
  variant: ButtonGroupVariant,
  orientation: ButtonGroupOrientation
): VariantStyles => {
  const variantMap: Record<ButtonGroupVariant, VariantStyles> = {
    default: {
      gap: '0.5rem', // 8px spacing between buttons
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
    },
    attached: {
      gap: '0',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
    },
  };

  return variantMap[variant];
};

interface StyledProps {
  $variant?: ButtonGroupVariant;
  $orientation?: ButtonGroupOrientation;
}

const StyledButtonGroup = styled.div<StyledProps>`
  ${({ $variant = 'default', $orientation = 'horizontal' }) => {
    const styles = getVariantStyles($variant, $orientation);
    return `
      display: flex;
      align-items: ${$orientation === 'vertical' ? 'stretch' : 'center'};
      flex-direction: ${styles.flexDirection};
      gap: ${styles.gap};
      flex-wrap: ${$orientation === 'vertical' ? 'nowrap' : 'wrap'};

      ${
        $variant === 'attached'
          ? `
        > * {
          margin: 0;
          border-radius: 0;
        }

        ${
          $orientation === 'horizontal'
            ? `
          > *:first-of-type {
            border-top-left-radius: 0.375rem;
            border-bottom-left-radius: 0.375rem;
          }

          > *:last-of-type {
            border-top-right-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
          }

          > *:not(:last-of-type) {
            border-right-width: 0;
          }
        `
            : `
          > *:first-of-type {
            border-top-left-radius: 0.375rem;
            border-top-right-radius: 0.375rem;
          }

          > *:last-of-type {
            border-bottom-left-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
          }

          > *:not(:last-of-type) {
            border-bottom-width: 0;
          }
        `
        }
      `
          : ''
      }
    `;
  }}
`;

export const Styled = {
  ButtonGroup: StyledButtonGroup,
};
