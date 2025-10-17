import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

interface InputWrapperProps {
  $status: 'default' | 'error';
}

const getStatusStyles = (status: 'default' | 'error') => {
  const statusMap = {
    default: {
      borderColor: cssVars.light4,
      focusBorderColor: cssVars.mainColor,
      focusShadow: `0 0 3px ${cssVars.mainColor}`,
    },
    error: {
      borderColor: cssVars.colorDanger,
      focusBorderColor: cssVars.colorDanger,
      focusShadow: `0 0 3px ${cssVars.colorDanger}`,
    },
  };

  return statusMap[status];
};

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledInputWrapper = styled.div<InputWrapperProps>`
  ${({ $status }) => {
    const styles = getStatusStyles($status);
    return `
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      min-height: 3rem;
      width: 100%;
      background-color: ${cssVars.light};
      border: 1px solid ${styles.borderColor};
      border-radius: ${radii.md};

      &:focus-within {
        border-color: ${styles.focusBorderColor};
        box-shadow: ${styles.focusShadow};
      }
    `;
  }}
`;

const StyledInput = styled.input`
  flex-grow: 1;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  font-size: 1rem;
  color: ${cssVars.dark};

  &::placeholder {
    font-style: italic;
    font-weight: 300;
    color: ${cssVars.dark6};
  }
`;

const StyledTagsSuggestion = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${cssVars.light};
  border: 1px solid ${cssVars.light4};
  border-radius: ${radii.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.25rem;

  div {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${cssVars.light3};
    }

    &:first-of-type {
      border-top-left-radius: ${radii.md};
      border-top-right-radius: ${radii.md};
    }

    &:last-of-type {
      border-bottom-left-radius: ${radii.md};
      border-bottom-right-radius: ${radii.md};
    }
  }
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Tags: StyledTags,
  InputWrapper: StyledInputWrapper,
  Input: StyledInput,
  TagsSuggestion: StyledTagsSuggestion,
};
