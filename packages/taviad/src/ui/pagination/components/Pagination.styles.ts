'use client';

/**
 * Pagination styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Pagination.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

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
  ${({ $isActive = false, $isDisabled = false }) => {
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
      background-color: ${$isActive ? cssVars.mainColor : 'transparent'};
      color: ${$isActive ? cssVars.light : cssVars.dark};
      border: 1px solid ${$isActive ? cssVars.mainColor : 'transparent'};
      border-radius: ${radii.full};

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
          background-color: ${cssVars.light3};
          border-color: ${cssVars.mainColor};
        }

        &:active {
          transform: scale(0.95);
        }

        &:focus-visible {
          outline: 2px solid ${cssVars.mainColor};
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
  min-width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${cssVars.dark5};
  font-size: 0.875rem;
  user-select: none;
`;

export const Styled = {
  Container: PaginationContainer,
  Item: PaginationItem,
  Ellipsis: EllipsisItem,
};
