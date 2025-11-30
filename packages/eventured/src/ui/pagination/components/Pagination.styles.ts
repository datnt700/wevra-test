'use client';

/**
 * Pagination styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Pagination.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

/**
 * Main pagination container
 */
const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

/**
 * Individual pagination item (page number or navigation button)
 * Uses transient props ($) to avoid DOM warnings
 */
const PaginationItem = styled.button<{
  $isActive?: boolean;
  $isDisabled?: boolean;
}>`
  ${({ theme, $isActive = false, $isDisabled = false }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      /* Base styles */
      min-width: 2.5rem;
      height: 2.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;

      /* Typography */
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1;

      /* Appearance */
      background-color: ${$isActive ? eventureTheme.colors.primary : 'transparent'};
      color: ${$isActive ? eventureTheme.colors.surface : eventureTheme.colors.text.primary};
      border: 1px solid ${$isActive ? eventureTheme.colors.primary : 'transparent'};
      border-radius: ${eventureTheme.radii.full};

      /* Transitions */
      transition: all 0.2s ease-in-out;

      /* Cursor */
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      opacity: ${$isDisabled ? 0.5 : 1};

      /* Interactive states (only when not active/disabled) */
      ${
        !$isActive && !$isDisabled
          ? `
        &:hover {
          background-color: ${eventureTheme.colors.surfaceHover};
          border-color: ${eventureTheme.colors.primary};
        }

        &:active {
          transform: scale(0.95);
        }

        &:focus-visible {
          outline: 2px solid ${eventureTheme.colors.primary};
          outline-offset: 2px;
        }
      `
          : ''
      }

      /* Remove default button styles */
      text-decoration: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    `;
  }}
`;

/**
 * Ellipsis item for page breaks
 */
const EllipsisItem = styled.span`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      min-width: 2.5rem;
      height: 2.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${eventureTheme.colors.text.tertiary};
      font-size: 0.875rem;
      user-select: none;
    `;
  }}
`;

export const Styled = {
  Container: PaginationContainer,
  Item: PaginationItem,
  Ellipsis: EllipsisItem,
};
