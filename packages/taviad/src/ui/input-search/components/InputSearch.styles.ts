'use client';

/**
 * InputSearch component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module InputSearch.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

type SearchStatus = 'default' | 'error';

interface StatusStyles {
  bg: string;
  border: string;
  boxShadow: string;
  focusBorder: string;
}

/**
 * Get status styles from theme tokens
 */
const getStatusStyles = (
  taviaTheme: TaviaTheme,
  status: SearchStatus = 'default'
): StatusStyles => {
  const statusMap: Record<SearchStatus, StatusStyles> = {
    default: {
      bg: taviaTheme.colors.surface,
      border: taviaTheme.colors.text.tertiary,
      boxShadow: 'none',
      focusBorder: taviaTheme.colors.primary,
    },
    error: {
      bg: taviaTheme.colors.border.default,
      border: taviaTheme.colors.danger,
      boxShadow: `0 0 3px ${taviaTheme.colors.danger}`,
      focusBorder: taviaTheme.colors.danger,
    },
  };

  return statusMap[status];
};

const StyledWrapper = styled.div<{ $status?: SearchStatus }>`
  ${({ theme, $status = 'default' }) => {
    const taviaTheme = theme as TaviaTheme;
    const styles = getStatusStyles(taviaTheme, $status);

    return `
      display: flex;
      align-items: center;
      background-color: ${styles.bg};
      border: 1px solid ${styles.border};
      border-radius: ${taviaTheme.radii.md};
      outline: none;
      padding-left: 0.75rem;
      transition: all 0.2s ease-in-out;
      ${styles.boxShadow !== 'none' ? `box-shadow: ${styles.boxShadow};` : ''}

      &:focus-within {
        border-color: ${styles.focusBorder};
        box-shadow: 0 0 3px ${styles.focusBorder};
      }
    `;
  }}
`;

const StyledIcon = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.75rem;
      color: ${taviaTheme.colors.text.secondary};
    `;
  }}
`;

const StyledInput = styled.input`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      height: 2.5rem;
      background-color: transparent;
      outline: none;
      color: ${taviaTheme.colors.text.primary};
      padding: 0.5rem 1rem;
      width: 100%;
      font-size: 1rem;
      border: 0;
      border-radius: ${taviaTheme.radii.md};

      &::placeholder {
        font-weight: 300;
        line-height: 1.875rem;
        color: ${taviaTheme.colors.text.disabled};
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
  Icon: StyledIcon,
  Input: StyledInput,
  ErrorMessage: StyledErrorMessage,
};
