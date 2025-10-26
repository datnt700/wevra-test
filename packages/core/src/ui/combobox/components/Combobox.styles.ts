'use client';

/**
 * Combobox component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Combobox.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

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
const getVariantStyles = (variant: ComboboxVariant = 'default'): VariantStyles => {
  const variantMap: Record<ComboboxVariant, VariantStyles> = {
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
    disabled: {
      bg: cssVars.light4,
      border: cssVars.light4,
      boxShadow: 'none',
      focusBorder: cssVars.light4,
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
  background-color: transparent;
  border-radius: ${radii.md};
  color: ${cssVars.dark6};
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

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
`;

const StyledErrorMessage = styled.span`
  color: ${cssVars.colorDanger};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledDropdown = styled.div`
  max-height: 8rem;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  border-radius: ${radii.sm};
  background-color: ${cssVars.light};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledOption = styled.li`
  padding: 0.75rem;
  background-color: ${cssVars.light};
  list-style: none;
  transition: background-color 0.2s ease;

  button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: ${cssVars.dark};
    font-size: 1rem;
    cursor: pointer;
    padding: 0;
  }

  &:hover {
    background-color: ${cssVars.light3};
  }

  &:active {
    background-color: ${cssVars.light4};
  }
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
