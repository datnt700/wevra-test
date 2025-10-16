import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

interface InputWrapperProps {
  $isDisabled: boolean;
  $isReadOnly: boolean;
  $hasError: boolean;
}

interface InputProps {
  $hasError: boolean;
}

const getInputWrapperStyles = (props: InputWrapperProps) => {
  const { $isDisabled, $isReadOnly, $hasError } = props;

  const borderColor = $hasError ? cssVars.colorDanger : cssVars.gray500;
  const focusBorderColor = $hasError ? cssVars.colorDanger : cssVars.mainColor;
  const backgroundColor = $isDisabled || $isReadOnly ? cssVars.gray100 : cssVars.gray0;
  const disabledBorderColor = cssVars.gray300;

  return {
    borderColor: $isDisabled || $isReadOnly ? disabledBorderColor : borderColor,
    focusBorderColor,
    backgroundColor,
    isInteractive: !($isDisabled || $isReadOnly),
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
      border-radius: 0.375rem;
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
      color: ${cssVars.gray900};
      ${$hasError ? `background: ${cssVars.gray300};` : ''}

      &::placeholder {
        font-style: italic;
        font-weight: 300;
        color: ${cssVars.gray500};
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
