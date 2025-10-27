'use client';

/**
 * Popover styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Popover.styles
 */
import { Popover as RadixPopover } from 'radix-ui';
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

interface ContentProps {
  $side?: string;
  $showArrow?: boolean;
}

/**
 * Popover content container with Radix UI
 */
const Content = styled(RadixPopover.Content)<ContentProps>`
  background-color: ${cssVars.light};
  color: ${cssVars.dark};
  max-width: 20rem;
  border-radius: ${radii.md};
  box-shadow: 0 4px 12px ${cssVars.dark}1a; /* 1a = 10% opacity */
  padding: 1rem;
  z-index: 1050;

  &:focus-visible {
    border: 0;
    outline: 2px solid ${cssVars.mainColor};
    outline-offset: 2px;
  }
`;

/**
 * Close button for popover
 */
const Close = styled(RadixPopover.Close)`
  all: unset;
  font-family: inherit;
  height: 1.5rem;
  width: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${cssVars.dark};
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  border-radius: ${radii.full};
  background-color: transparent;
  opacity: 0.6;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    cursor: pointer;
    opacity: 1;
    background-color: ${cssVars.light4};
  }

  &:focus-visible {
    outline: 2px solid ${cssVars.mainColor};
    outline-offset: 2px;
  }
`;

/**
 * Arrow pointing to trigger element
 */
const Arrow = styled(RadixPopover.Arrow)`
  fill: ${cssVars.light};
`;

export const Styled = {
  Content,
  Close,
  Arrow,
};
