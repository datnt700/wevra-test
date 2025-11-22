'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

interface InputWrapperProps {
  $status: 'default' | 'error';
}

const getStatusStyles = (taviaTheme: TaviaTheme, status: 'default' | 'error') => {
  const statusMap = {
    default: {
      borderColor: taviaTheme.colors.border.default,
      focusBorderColor: taviaTheme.colors.primary,
      focusShadow: `0 0 3px ${taviaTheme.colors.primary}`,
    },
    error: {
      borderColor: taviaTheme.colors.danger,
      focusBorderColor: taviaTheme.colors.danger,
      focusShadow: `0 0 3px ${taviaTheme.colors.danger}`,
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
  ${({ theme, $status }) => {
    const taviaTheme = theme as TaviaTheme;
    const styles = getStatusStyles(taviaTheme, $status);
    return `
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      min-height: 3rem;
      width: 100%;
      background-color: ${taviaTheme.colors.surface};
      border: 1px solid ${styles.borderColor};
      border-radius: ${taviaTheme.radii.md};

      &:focus-within {
        border-color: ${styles.focusBorderColor};
        box-shadow: ${styles.focusShadow};
      }
    `;
  }}
`;

const StyledInput = styled.input`
  ${({ theme }) => {
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

      &::placeholder {
        font-style: italic;
        font-weight: 300;
        color: ${taviaTheme.colors.text.disabled};
      }
    `;
  }}
`;

const StyledTagsSuggestion = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: ${taviaTheme.colors.surface};
      border: 1px solid ${taviaTheme.colors.border.default};
      border-radius: ${taviaTheme.radii.md};
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10;
      margin-top: 0.25rem;

      div {
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: ${taviaTheme.colors.surfaceHover};
        }

        &:first-of-type {
          border-top-left-radius: ${taviaTheme.radii.md};
          border-top-right-radius: ${taviaTheme.radii.md};
        }

        &:last-of-type {
          border-bottom-left-radius: ${taviaTheme.radii.md};
          border-bottom-right-radius: ${taviaTheme.radii.md};
        }
      }
    `;
  }}
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Tags: StyledTags,
  InputWrapper: StyledInputWrapper,
  Input: StyledInput,
  TagsSuggestion: StyledTagsSuggestion,
};
