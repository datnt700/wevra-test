'use client';

/**
 * InputNumber component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module InputNumber.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';
import { Button } from '../../button';

type InputVariant = 'default' | 'danger' | 'success' | 'warning' | 'disabled';

interface VariantStyles {
  bg: string;
  border: string;
  boxShadow: string;
  focusBorder: string;
}

/**
 * Get variant styles from theme tokens
 */
const getVariantStyles = (variant: InputVariant = 'default'): VariantStyles => {
  const variantMap: Record<InputVariant, VariantStyles> = {
    default: {
      bg: cssVars.light,
      border: cssVars.light5,
      boxShadow: 'none',
      focusBorder: cssVars.mainColor,
    },
    danger: {
      bg: cssVars.light,
      border: cssVars.colorDanger,
      boxShadow: `0 0 3px ${cssVars.colorDanger}`,
      focusBorder: cssVars.colorDanger,
    },
    success: {
      bg: cssVars.light,
      border: cssVars.colorSuccess,
      boxShadow: `0 0 3px ${cssVars.colorSuccess}`,
      focusBorder: cssVars.colorSuccess,
    },
    warning: {
      bg: cssVars.light,
      border: cssVars.colorWarning,
      boxShadow: `0 0 3px ${cssVars.colorWarning}`,
      focusBorder: cssVars.colorWarning,
    },
    disabled: {
      bg: cssVars.light4,
      border: cssVars.light4,
      boxShadow: 'none',
      focusBorder: cssVars.light4,
    },
  };

  return variantMap[variant];
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StyledInputWrapper = styled.div<{ $variant?: InputVariant }>`
  ${({ $variant = 'default' }) => {
    const styles = getVariantStyles($variant);

    return `
      display: flex;
      align-items: center;
      background-color: ${styles.bg};
      border: 1px solid ${styles.border};
      border-radius: ${radii.md};
      transition: all 0.2s ease-in-out;
      ${styles.boxShadow !== 'none' ? `box-shadow: ${styles.boxShadow};` : ''}

      ${
        $variant === 'disabled'
          ? `
        cursor: not-allowed;
        opacity: 0.6;

        input {
          pointer-events: none;
        }
      `
          : `
        &:focus-within {
          border-color: ${styles.focusBorder};
          box-shadow: 0 0 3px ${styles.focusBorder};
        }
      `
      }
    `;
  }}
`;

const StyledClearBtn = styled(Button)`
  background-color: transparent;
  border-radius: ${radii.md};
  color: ${cssVars.dark6};

  &:hover {
    color: ${cssVars.dark};
  }
`;

const StyledInput = styled.input`
  height: 3rem;
  outline: none;
  color: ${cssVars.dark};
  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 1rem;
  border-radius: ${radii.md};
  border: 0;
  background-color: transparent;

  &::placeholder {
    font-weight: 300;
    line-height: 1.875rem;
    color: ${cssVars.dark6};
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* Remove default number input arrows */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StyledErrorMessage = styled.span`
  color: ${cssVars.colorDanger};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

// Legacy variant class names for backward compatibility
const StyledVariantDefault = styled.div`
  background-color: ${cssVars.light};
  border: 1px solid ${cssVars.light5};
`;

const StyledVariantDanger = styled.div`
  border: 1px solid ${cssVars.colorDanger};
  box-shadow: 0 0 3px ${cssVars.colorDanger};

  &:focus-within {
    border-color: ${cssVars.colorDanger};
  }
`;

const StyledVariantSuccess = styled.div`
  background-color: ${cssVars.light};
  border: 1px solid ${cssVars.colorSuccess};
  box-shadow: 0 0 3px ${cssVars.colorSuccess};
`;

const StyledVariantWarning = styled.div`
  background-color: ${cssVars.light};
  border: 1px solid ${cssVars.colorWarning};
  box-shadow: 0 0 3px ${cssVars.colorWarning};
`;

const StyledVariantDisabled = styled.div`
  background-color: ${cssVars.light4};
  cursor: not-allowed;
  opacity: 0.6;

  .input {
    pointer-events: none;
  }
`;

export const Styled = {
  Wrapper: StyledWrapper,
  InputWrapper: StyledInputWrapper,
  ClearBtn: StyledClearBtn,
  Input: StyledInput,
  ErrorMessage: StyledErrorMessage,
  // Legacy variants for backward compatibility
  Variants: {
    default: StyledVariantDefault,
    danger: StyledVariantDanger,
    success: StyledVariantSuccess,
    warning: StyledVariantWarning,
    disabled: StyledVariantDisabled,
  },
};
