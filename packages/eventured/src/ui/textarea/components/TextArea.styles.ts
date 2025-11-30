'use client';

/**
 * TextArea component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module TextArea.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

const StyledWrapper = styled.div<{ theme?: EventureTheme; $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StyledTextArea = styled.textarea<{ theme?: EventureTheme; $hasError?: boolean }>`
  ${({ theme, $hasError = false }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      min-height: 8rem;
      background: ${eventureTheme.colors.surface};
      outline: none;
      color: ${eventureTheme.colors.text.primary};
      padding: 0.5rem 1rem;
      width: 100%;
      font-size: 1rem;
      border-radius: ${eventureTheme.radii.md};
      border: 1px solid ${$hasError ? eventureTheme.colors.danger : eventureTheme.colors.border.default};
      font-family: inherit;
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      resize: vertical;

      &:focus {
        outline: none;
        border-color: ${$hasError ? eventureTheme.colors.danger : eventureTheme.colors.primary};
        box-shadow: 0 0 3px ${$hasError ? eventureTheme.colors.danger : eventureTheme.colors.primary};
      }

      &::placeholder {
        font-style: italic;
        font-weight: 300;
        line-height: 1.875rem;
        color: ${eventureTheme.colors.text.disabled};
      }

      &:disabled {
        background-color: ${eventureTheme.colors.gray.gray200};
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
  }}
`;

const StyledErrorMessage = styled.span<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      color: ${eventureTheme.colors.danger};
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding: 0 0.25rem;
    `;
  }}
`;

export const Styled = {
  Wrapper: StyledWrapper,
  TextArea: StyledTextArea,
  ErrorMessage: StyledErrorMessage,
};
