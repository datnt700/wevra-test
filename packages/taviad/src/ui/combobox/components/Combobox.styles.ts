'use client';

/**
 * Combobox component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Combobox.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

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
  taviaTheme: TaviaTheme,
  variant: ComboboxVariant = 'default'
): VariantStyles => {
  const variantMap: Record<ComboboxVariant, VariantStyles> = {
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
    disabled: {
      bg: taviaTheme.colors.border.default,
      border: taviaTheme.colors.border.default,
      boxShadow: 'none',
      focusBorder: taviaTheme.colors.border.default,
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
    const taviaTheme = theme as TaviaTheme;
    return `
      background-color: transparent;
      border-radius: ${taviaTheme.radii.md};
      color: ${taviaTheme.colors.text.disabled};
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;

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
      height: 3rem;
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

const StyledDropdown = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      max-height: 8rem;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      border-radius: ${taviaTheme.radii.sm};
      background-color: ${taviaTheme.colors.surface};
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
  }}
`;

const StyledOption = styled.li`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      padding: 0.75rem;
      background-color: ${taviaTheme.colors.surface};
      list-style: none;
      transition: background-color 0.2s ease;

      button {
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        color: ${taviaTheme.colors.text.primary};
        font-size: 1rem;
        cursor: pointer;
        padding: 0;
      }

      &:hover {
        background-color: ${taviaTheme.colors.surfaceHover};
      }

      &:active {
        background-color: ${taviaTheme.colors.border.default};
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
