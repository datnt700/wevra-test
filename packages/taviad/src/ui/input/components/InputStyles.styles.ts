'use client';

/**
 * Input component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module InputStyles.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';
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
const getVariantStyles = (
  taviaTheme: TaviaTheme,
  variant: InputVariant = 'default'
): VariantStyles => {
  const variantMap: Record<InputVariant, VariantStyles> = {
    default: {
      bg: taviaTheme.colors.surface,
      border: taviaTheme.colors.text.tertiary,
      boxShadow: 'none',
      focusBorder: taviaTheme.colors.primary,
    },
    danger: {
      bg: taviaTheme.colors.surface,
      border: taviaTheme.colors.danger,
      boxShadow: `0 0 3px ${taviaTheme.colors.danger}`,
      focusBorder: taviaTheme.colors.danger,
    },
    success: {
      bg: taviaTheme.colors.surface,
      border: taviaTheme.colors.success,
      boxShadow: `0 0 3px ${taviaTheme.colors.success}`,
      focusBorder: taviaTheme.colors.success,
    },
    warning: {
      bg: taviaTheme.colors.surface,
      border: taviaTheme.colors.gray.colorWarning,
      boxShadow: `0 0 3px ${taviaTheme.colors.gray.colorWarning}`,
      focusBorder: taviaTheme.colors.gray.colorWarning,
    },
    disabled: {
      bg: taviaTheme.colors.border.default,
      border: taviaTheme.colors.border.default,
      boxShadow: 'none',
      focusBorder: taviaTheme.colors.border.default,
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
  ${({ theme, $variant = 'default' }) => {
    const taviaTheme = theme as TaviaTheme;
    const styles = getVariantStyles(taviaTheme, $variant);

    return `
      display: flex;
      align-items: center;
      background-color: ${styles.bg};
      border: 1px solid ${styles.border};
      border-radius: ${taviaTheme.radii.md};
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
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      background-color: transparent;
      border-radius: ${taviaTheme.radii.md};
      color: ${taviaTheme.colors.text.disabled};

      &:hover {
        color: ${taviaTheme.colors.text.primary};
      }
    `;
  }}
`;

const StyledInput = styled.input`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      height: 2.5rem;
      outline: none;
      color: ${taviaTheme.colors.text.primary};
      padding: 0.5rem 1rem;
      width: 100%;
      font-size: 1rem;
      border-radius: ${taviaTheme.radii.md};
      border: 0;
      background-color: transparent;

      &::placeholder {
        font-weight: 300;
        line-height: 1.875rem;
        color: ${taviaTheme.colors.text.disabled};
      }

      &:disabled {
        cursor: not-allowed;
      }

      /* Autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px ${taviaTheme.colors.surfaceHover} inset !important;
        -webkit-text-fill-color: ${taviaTheme.colors.text.primary} !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
  }}
`;

const StyledErrorMessage = styled.span`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      color: ${taviaTheme.colors.danger};
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    `;
  }}
`;

// Legacy variant class names for backward compatibility
const StyledVariantDefault = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      background-color: ${taviaTheme.colors.surface};
      border: 1px solid ${taviaTheme.colors.text.tertiary};
    `;
  }}
`;

const StyledVariantDanger = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      border: 1px solid ${taviaTheme.colors.danger};
      box-shadow: 0 0 3px ${taviaTheme.colors.danger};

      &:focus-within {
        border-color: ${taviaTheme.colors.danger};
      }
    `;
  }}
`;

const StyledVariantSuccess = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      background-color: ${taviaTheme.colors.surface};
      border: 1px solid ${taviaTheme.colors.success};
      box-shadow: 0 0 3px ${taviaTheme.colors.success};
    `;
  }}
`;

const StyledVariantWarning = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      background-color: ${taviaTheme.colors.surface};
      border: 1px solid ${taviaTheme.colors.gray.colorWarning};
      box-shadow: 0 0 3px ${taviaTheme.colors.gray.colorWarning};
    `;
  }}
`;

const StyledVariantDisabled = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      background-color: ${taviaTheme.colors.border.default};
      cursor: not-allowed;
      opacity: 0.6;

      .input {
        pointer-events: none;
      }
    `;
  }}
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
