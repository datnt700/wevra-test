/**
 * Checkbox component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Checkbox.styles
 */
import styled from '@emotion/styled';
import { Checkbox as RadixCheckbox } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';
import { styleVars } from '../../../theme/tokens/variables';

type CheckboxSize = 'sm' | 'default' | 'md' | 'lg';

interface SizeStyles {
  size: string;
  fontSize: string;
}

/**
 * Get size styles from theme tokens
 */
const getSizeStyles = (size: CheckboxSize = 'default'): SizeStyles => {
  const sizeMap: Record<CheckboxSize, SizeStyles> = {
    sm: {
      size: '1rem',
      fontSize: '0.75rem',
    },
    default: {
      size: '1.5rem',
      fontSize: '1rem',
    },
    md: {
      size: '1.5rem',
      fontSize: '1rem',
    },
    lg: {
      size: '1.75rem',
      fontSize: '1.25rem',
    },
  };

  return sizeMap[size];
};

const StyledCheckboxWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledCheckboxRoot = styled(RadixCheckbox.Root)<{
  $isDisabled?: boolean;
  $size?: CheckboxSize;
}>`
  ${({ $isDisabled, $size = 'default' }) => {
    const styles = getSizeStyles($size);

    return `
      background-color: ${cssVars.light};
      width: ${styles.size};
      height: ${styles.size};
      border-radius: ${styleVars.borderRadiusSmall};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      border: 1px solid ${cssVars.dark};
      transition: all 0.2s ease-in-out;

      ${
        $isDisabled
          ? `
        opacity: 0.5;
      `
          : `
        &:hover {
          background-color: ${cssVars.mainColorLight6};
          border-color: ${cssVars.mainColor};
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${cssVars.mainColor};
        }

        &[data-state="checked"] {
          background-color: ${cssVars.mainColor};
          border-color: ${cssVars.mainColor};

          &:hover {
            background-color: ${cssVars.mainColorDark};
          }
        }
      `
      }
    `;
  }}
`;

const StyledCheckboxIndicator = styled(RadixCheckbox.Indicator)<{ $size?: string }>`
  color: ${cssVars.light};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledCheckboxLabel = styled.label<{ $size?: CheckboxSize }>`
  ${({ $size = 'default' }) => {
    const styles = getSizeStyles($size);

    return `
      color: ${cssVars.dark};
      font-size: ${styles.fontSize};
      line-height: 1.5;
      cursor: pointer;
      user-select: none;
      transition: color 0.2s ease;

      &:hover {
        color: ${cssVars.mainColor};
      }
    `;
  }}
`;

export const Styled = {
  CheckboxWrapper: StyledCheckboxWrapper,
  CheckboxRoot: StyledCheckboxRoot,
  CheckboxIndicator: StyledCheckboxIndicator,
  CheckboxLabel: StyledCheckboxLabel,
};
