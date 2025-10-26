'use client';

/**
 * TextArea component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module TextArea.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

const StyledWrapper = styled.div<{ $hasError?: boolean }>`
  ${({ $hasError = false }) => `
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    border: 1px solid ${$hasError ? cssVars.colorDanger : cssVars.light5};
    border-radius: ${radii.md};
    transition: all 0.2s ease-in-out;

    &:focus-within {
      border-color: ${$hasError ? cssVars.colorDanger : cssVars.mainColor};
      box-shadow: 0 0 3px ${$hasError ? cssVars.colorDanger : cssVars.mainColor};
    }
  `}
`;

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  ${({ $hasError = false }) => `
    min-height: 8rem;
    background: ${cssVars.light};
    outline: none;
    color: ${cssVars.dark};
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 1rem;
    border-radius: ${radii.md};
    border: 1px solid ${$hasError ? cssVars.colorDanger : cssVars.light5};
    font-family: inherit;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: ${$hasError ? cssVars.colorDanger : cssVars.mainColor};
      box-shadow: 0 0 3px ${$hasError ? cssVars.colorDanger : cssVars.mainColor};
    }

    &::placeholder {
      font-style: italic;
      font-weight: 300;
      line-height: 1.875rem;
      color: ${cssVars.dark6};
    }

    &:disabled {
      background-color: ${cssVars.light4};
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}
`;

const StyledErrorMessage = styled.span`
  color: ${cssVars.colorDanger};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0 0.25rem;
`;

export const Styled = {
  Wrapper: StyledWrapper,
  TextArea: StyledTextArea,
  ErrorMessage: StyledErrorMessage,
};
