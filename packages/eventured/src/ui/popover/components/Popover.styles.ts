'use client';

/**
 * Popover styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Popover.styles
 */
import { Popover as RadixPopover } from 'radix-ui';
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

interface ContentProps {
  $side?: string;
  $showArrow?: boolean;
}

/**
 * Popover content container with Radix UI
 */
const Content = styled(RadixPopover.Content)<ContentProps>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      background-color: ${eventureTheme.colors.surface};
      color: ${eventureTheme.colors.text.primary};
      max-width: 20rem;
      border-radius: ${eventureTheme.radii.md};
      box-shadow: 0 4px 12px ${eventureTheme.colors.text.primary}1a;
      padding: 1rem;
      z-index: 1050;

      &:focus-visible {
        border: 0;
        outline: 2px solid ${eventureTheme.colors.primary};
        outline-offset: 2px;
      }
    `;
  }}
`;

/**
 * Close button for popover
 */
const Close = styled(RadixPopover.Close)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      all: unset;
      font-family: inherit;
      height: 1.5rem;
      width: 1.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${eventureTheme.colors.text.primary};
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      border-radius: ${eventureTheme.radii.full};
      background-color: transparent;
      opacity: 0.6;
      transition:
        opacity 0.2s ease,
        background-color 0.2s ease;

      &:hover {
        cursor: pointer;
        opacity: 1;
        background-color: ${eventureTheme.colors.gray.gray200};
      }

      &:focus-visible {
        outline: 2px solid ${eventureTheme.colors.primary};
        outline-offset: 2px;
      }
    `;
  }}
`;

/**
 * Arrow pointing to trigger element
 */
const Arrow = styled(RadixPopover.Arrow)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      fill: ${eventureTheme.colors.surface};
    `;
  }}
`;

export const Styled = {
  Content,
  Close,
  Arrow,
};
