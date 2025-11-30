'use client';

/**
 * InputSearch component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module InputSearch.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

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
  eventureTheme: EventureTheme,
  status: SearchStatus = 'default'
): StatusStyles => {
  const statusMap: Record<SearchStatus, StatusStyles> = {
    default: {
      bg: eventureTheme.colors.surface,
      border: eventureTheme.colors.text.tertiary,
      boxShadow: 'none',
      focusBorder: eventureTheme.colors.primary,
    },
    error: {
      bg: eventureTheme.colors.border.default,
      border: eventureTheme.colors.danger,
      boxShadow: `0 0 3px ${eventureTheme.colors.danger}`,
      focusBorder: eventureTheme.colors.danger,
    },
  };

  return statusMap[status];
};

const StyledWrapper = styled.div<{ $status?: SearchStatus }>`
  ${({ theme, $status = 'default' }) => {
    const eventureTheme = theme as EventureTheme;
    const styles = getStatusStyles(eventureTheme, $status);

    return `
      display: flex;
      align-items: center;
      background-color: ${styles.bg};
      border: 1px solid ${styles.border};
      border-radius: ${eventureTheme.radii.md};
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
    const eventureTheme = theme as EventureTheme;
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.75rem;
      color: ${eventureTheme.colors.text.secondary};
    `;
  }}
`;

const StyledInput = styled.input`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      height: 2.5rem;
      background-color: transparent;
      outline: none;
      color: ${eventureTheme.colors.text.primary};
      padding: 0.5rem 1rem;
      width: 100%;
      font-size: 1rem;
      border: 0;
      border-radius: ${eventureTheme.radii.md};

      &::placeholder {
        font-weight: 300;
        line-height: 1.875rem;
        color: ${eventureTheme.colors.text.disabled};
      }
    `;
  }}
`;

const StyledErrorMessage = styled.span`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      color: ${eventureTheme.colors.danger};
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
