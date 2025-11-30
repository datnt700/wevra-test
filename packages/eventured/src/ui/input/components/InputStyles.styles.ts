'use client';

/**
 * Input component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module InputStyles.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';
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
  eventureTheme: EventureTheme,
  variant: InputVariant = 'default'
): VariantStyles => {
  const variantMap: Record<InputVariant, VariantStyles> = {
    default: {
      bg: eventureTheme.colors.surface,
      border: eventureTheme.colors.text.tertiary,
      boxShadow: 'none',
      focusBorder: eventureTheme.colors.primary,
    },
    danger: {
      bg: eventureTheme.colors.surface,
      border: eventureTheme.colors.danger,
      boxShadow: `0 0 3px ${eventureTheme.colors.danger}`,
      focusBorder: eventureTheme.colors.danger,
    },
    success: {
      bg: eventureTheme.colors.surface,
      border: eventureTheme.colors.success,
      boxShadow: `0 0 3px ${eventureTheme.colors.success}`,
      focusBorder: eventureTheme.colors.success,
    },
    warning: {
      bg: eventureTheme.colors.surface,
      border: eventureTheme.colors.gray.colorWarning,
      boxShadow: `0 0 3px ${eventureTheme.colors.gray.colorWarning}`,
      focusBorder: eventureTheme.colors.gray.colorWarning,
    },
    disabled: {
      bg: eventureTheme.colors.border.default,
      border: eventureTheme.colors.border.default,
      boxShadow: 'none',
      focusBorder: eventureTheme.colors.border.default,
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
    const eventureTheme = theme as EventureTheme;
    const styles = getVariantStyles(eventureTheme, $variant);

    return `
      display: flex;
      align-items: center;
      background-color: ${styles.bg};
      border: 1px solid ${styles.border};
      border-radius: ${eventureTheme.radii.md};
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
    const eventureTheme = theme as EventureTheme;
    return `
      background-color: transparent;
      border-radius: ${eventureTheme.radii.md};
      color: ${eventureTheme.colors.text.disabled};

      &:hover {
        color: ${eventureTheme.colors.text.primary};
      }
    `;
  }}
`;

const StyledInput = styled.input`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      height: 2.5rem;
      outline: none;
      color: ${eventureTheme.colors.text.primary};
      padding: 0.5rem 1rem;
      width: 100%;
      font-size: 1rem;
      border-radius: ${eventureTheme.radii.md};
      border: 0;
      background-color: transparent;

      &::placeholder {
        font-weight: 300;
        line-height: 1.875rem;
        color: ${eventureTheme.colors.text.disabled};
      }

      &:disabled {
        cursor: not-allowed;
      }

      /* Autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px ${eventureTheme.colors.surfaceHover} inset !important;
        -webkit-text-fill-color: ${eventureTheme.colors.text.primary} !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
  }}
`;

const StyledErrorMessage = styled.span`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      color: ${eventureTheme.colors.danger};
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
    const eventureTheme = theme as EventureTheme;
    return `
      background-color: ${eventureTheme.colors.surface};
      border: 1px solid ${eventureTheme.colors.text.tertiary};
    `;
  }}
`;

const StyledVariantDanger = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      border: 1px solid ${eventureTheme.colors.danger};
      box-shadow: 0 0 3px ${eventureTheme.colors.danger};

      &:focus-within {
        border-color: ${eventureTheme.colors.danger};
      }
    `;
  }}
`;

const StyledVariantSuccess = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      background-color: ${eventureTheme.colors.surface};
      border: 1px solid ${eventureTheme.colors.success};
      box-shadow: 0 0 3px ${eventureTheme.colors.success};
    `;
  }}
`;

const StyledVariantWarning = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      background-color: ${eventureTheme.colors.surface};
      border: 1px solid ${eventureTheme.colors.gray.colorWarning};
      box-shadow: 0 0 3px ${eventureTheme.colors.gray.colorWarning};
    `;
  }}
`;

const StyledVariantDisabled = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      background-color: ${eventureTheme.colors.border.default};
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
