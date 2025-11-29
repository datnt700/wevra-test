'use client';

/**
 * TextArea component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module TextArea.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

const StyledWrapper = styled.div<{ theme?: TaviaTheme; $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StyledTextArea = styled.textarea<{ theme?: TaviaTheme; $hasError?: boolean }>`
  ${({ theme, $hasError = false }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      min-height: 8rem;
      background: ${taviaTheme.colors.surface};
      outline: none;
      color: ${taviaTheme.colors.text.primary};
      padding: 0.5rem 1rem;
      width: 100%;
      font-size: 1rem;
      border-radius: ${taviaTheme.radii.md};
      border: 1px solid ${$hasError ? taviaTheme.colors.danger : taviaTheme.colors.border.default};
      font-family: inherit;
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      resize: vertical;

      &:focus {
        outline: none;
        border-color: ${$hasError ? taviaTheme.colors.danger : taviaTheme.colors.primary};
        box-shadow: 0 0 3px ${$hasError ? taviaTheme.colors.danger : taviaTheme.colors.primary};
      }

      &::placeholder {
        font-style: italic;
        font-weight: 300;
        line-height: 1.875rem;
        color: ${taviaTheme.colors.text.disabled};
      }

      &:disabled {
        background-color: ${taviaTheme.colors.gray.gray200};
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
  }}
`;

const StyledErrorMessage = styled.span<{ theme?: TaviaTheme }>`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      color: ${taviaTheme.colors.danger};
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
