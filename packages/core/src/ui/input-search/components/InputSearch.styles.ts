'use client';

/**
 * InputSearch component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module InputSearch.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

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
const getStatusStyles = (status: SearchStatus = 'default'): StatusStyles => {
  const statusMap: Record<SearchStatus, StatusStyles> = {
    default: {
      bg: cssVars.light,
      border: cssVars.light5,
      boxShadow: 'none',
      focusBorder: cssVars.mainColor,
    },
    error: {
      bg: cssVars.light4,
      border: cssVars.colorDanger,
      boxShadow: `0 0 3px ${cssVars.colorDanger}`,
      focusBorder: cssVars.colorDanger,
    },
  };

  return statusMap[status];
};

const StyledWrapper = styled.div<{ $status?: SearchStatus }>`
  ${({ $status = 'default' }) => {
    const styles = getStatusStyles($status);

    return `
      display: flex;
      align-items: center;
      background-color: ${styles.bg};
      border: 1px solid ${styles.border};
      border-radius: ${radii.md};
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  color: ${cssVars.dark3};
`;

const StyledInput = styled.input`
  height: 2.5rem;
  background-color: transparent;
  outline: none;
  color: ${cssVars.dark};
  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 1rem;
  border: 0;
  border-radius: ${radii.md};

  &::placeholder {
    font-weight: 300;
    line-height: 1.875rem;
    color: ${cssVars.dark6};
  }
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
  Icon: StyledIcon,
  Input: StyledInput,
  ErrorMessage: StyledErrorMessage,
};
