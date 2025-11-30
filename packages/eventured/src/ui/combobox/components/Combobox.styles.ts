'use client';

/**
 * Combobox component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Combobox.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

type ComboboxVariant = 'default' | 'danger' | 'success' | 'disabled';

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
  variant: ComboboxVariant = 'default'
): VariantStyles => {
  const variantMap: Record<ComboboxVariant, VariantStyles> = {
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
    disabled: {
      bg: eventureTheme.colors.border.default,
      border: eventureTheme.colors.border.default,
      boxShadow: 'none',
      focusBorder: eventureTheme.colors.border.default,
    },
  };

  return variantMap[variant];
};

const StyledWrapper = styled.div<{ $variant?: ComboboxVariant }>`
  ${({ $variant = 'default' }) => `
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    ${
      $variant === 'disabled'
        ? `
      cursor: not-allowed;
      opacity: 0.6;
    `
        : ''
    }
  `}
`;

const StyledInputWrapper = styled.div<{ $variant?: ComboboxVariant }>`
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

const StyledClearBtn = styled.button`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      background-color: transparent;
      border-radius: ${eventureTheme.radii.md};
      color: ${eventureTheme.colors.text.disabled};
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;

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
      height: 3rem;
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

const StyledDropdown = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      max-height: 8rem;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      border-radius: ${eventureTheme.radii.sm};
      background-color: ${eventureTheme.colors.surface};
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
  }}
`;

const StyledOption = styled.li`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      padding: 0.75rem;
      background-color: ${eventureTheme.colors.surface};
      list-style: none;
      transition: background-color 0.2s ease;

      button {
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        color: ${eventureTheme.colors.text.primary};
        font-size: 1rem;
        cursor: pointer;
        padding: 0;
      }

      &:hover {
        background-color: ${eventureTheme.colors.surfaceHover};
      }

      &:active {
        background-color: ${eventureTheme.colors.border.default};
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
  Dropdown: StyledDropdown,
  Option: StyledOption,
};
