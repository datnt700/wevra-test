'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

interface InputWrapperProps {
  $isDisabled: boolean;
  $isReadOnly: boolean;
  $hasError: boolean;
}

interface InputProps {
  $hasError: boolean;
}

interface WrapperStyles {
  backgroundColor: string;
  borderColor: string;
  focusBorderColor: string;
  isInteractive: boolean;
}

const getInputWrapperStyles = (
  taviaTheme: TaviaTheme,
  { $isDisabled, $isReadOnly, $hasError }: InputWrapperProps
): WrapperStyles => {
  if ($isDisabled || $isReadOnly) {
    return {
      backgroundColor: taviaTheme.colors.surfaceHover,
      borderColor: taviaTheme.colors.border.default,
      focusBorderColor: taviaTheme.colors.border.default,
      isInteractive: false,
    };
  }

  return {
    backgroundColor: taviaTheme.colors.surface,
    borderColor: $hasError ? taviaTheme.colors.danger : taviaTheme.colors.border.default,
    focusBorderColor: $hasError ? taviaTheme.colors.danger : taviaTheme.colors.primary,
    isInteractive: true,
  };
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StyledInputWrapper = styled.div<InputWrapperProps>`
  ${({ theme, $isDisabled, $isReadOnly, $hasError }) => {
    const taviaTheme = theme as TaviaTheme;
    const styles = getInputWrapperStyles(taviaTheme, { $isDisabled, $isReadOnly, $hasError });
    return `
      display: flex;
      align-items: center;
      background-color: ${styles.backgroundColor};
      border: 1px solid ${styles.borderColor};
      border-radius: ${taviaTheme.radii.md};
      pointer-events: ${styles.isInteractive ? 'auto' : 'none'};

      &:focus-within {
        border-color: ${styles.focusBorderColor};
        box-shadow: 0 0 3px ${styles.focusBorderColor};
      }
    `;
  }}
`;

const StyledInput = styled.input<InputProps>`
  ${({ theme, $hasError }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      flex-grow: 1;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      padding: 0;
      font-size: 1rem;
      color: ${taviaTheme.colors.text.primary};
      text-align: center;
      ${$hasError ? `background: ${taviaTheme.colors.border.default};` : ''}

      &::placeholder {
        font-style: italic;
        font-weight: 300;
        color: ${taviaTheme.colors.text.disabled};
      }

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
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

export const Styled = {
  Wrapper: StyledWrapper,
  InputWrapper: StyledInputWrapper,
  Input: StyledInput,
  ErrorMessage: StyledErrorMessage,
};
