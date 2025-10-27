'use client';

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

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

const getInputWrapperStyles = ({
  $isDisabled,
  $isReadOnly,
  $hasError,
}: InputWrapperProps): WrapperStyles => {
  if ($isDisabled || $isReadOnly) {
    return {
      backgroundColor: cssVars.light3,
      borderColor: cssVars.light4,
      focusBorderColor: cssVars.light4,
      isInteractive: false,
    };
  }

  return {
    backgroundColor: cssVars.light,
    borderColor: $hasError ? cssVars.colorDanger : cssVars.light4,
    focusBorderColor: $hasError ? cssVars.colorDanger : cssVars.mainColor,
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
  ${({ $isDisabled, $isReadOnly, $hasError }) => {
    const styles = getInputWrapperStyles({ $isDisabled, $isReadOnly, $hasError });
    return `
      display: flex;
      align-items: center;
      background-color: ${styles.backgroundColor};
      border: 1px solid ${styles.borderColor};
      border-radius: ${radii.md};
      pointer-events: ${styles.isInteractive ? 'auto' : 'none'};

      &:focus-within {
        border-color: ${styles.focusBorderColor};
        box-shadow: 0 0 3px ${styles.focusBorderColor};
      }
    `;
  }}
`;

const StyledInput = styled.input<InputProps>`
  ${({ $hasError }) => {
    return `
      flex-grow: 1;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      padding: 0;
      font-size: 1rem;
      color: ${cssVars.dark};
      ${$hasError ? `background: ${cssVars.light4};` : ''}

      &::placeholder {
        font-style: italic;
        font-weight: 300;
        color: ${cssVars.dark6};
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
  color: ${cssVars.colorDanger};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Styled = {
  Wrapper: StyledWrapper,
  InputWrapper: StyledInputWrapper,
  Input: StyledInput,
  ErrorMessage: StyledErrorMessage,
};
