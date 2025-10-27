'use client';

/**
 * @fileoverview MenuBar component styles using Emotion
 * Provides styled components for Radix UI Menubar with custom theming
 */

import styled from '@emotion/styled';
import { Menubar as RadixMenubar } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Root container for the menu bar
 * Horizontal flex layout with light background and shadow
 */
const Root = styled(RadixMenubar.Root as any)`
  display: inline-flex;
  background-color: ${cssVars.light};
  padding: 0.5rem;
  border-radius: ${radii.md};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

/**
 * Individual menu container
 */
const Menu = styled(RadixMenubar.Menu as any)`
  position: relative;
`;

interface TriggerProps {
  $state?: string;
}

/**
 * Menu trigger button
 * Shows menu items when clicked or hovered
 */
const Trigger = styled(RadixMenubar.Trigger as any)<TriggerProps>`
  background-color: transparent;
  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border: none;
  color: ${cssVars.dark};
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;

  &[data-state='open'],
  &:hover {
    background-color: ${cssVars.light5};
    border-radius: ${radii.md};
  }
`;

/**
 * Portal for menu content (renders outside DOM hierarchy)
 */
const Portal = styled(RadixMenubar.Portal as any)``;

interface ContentProps {
  $side?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * Menu content container with dropdown items
 * Supports positioning on different sides
 */
const Content = styled(RadixMenubar.Content as any)<ContentProps>`
  min-width: 220px;
  background-color: ${cssVars.light};
  border-radius: 6px;
  padding: 5px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  ${({ $side }) => {
    if ($side === 'top') {
      return `
        margin-top: 5px;
      `;
    }
    if ($side === 'right') {
      return `
        margin-left: 5px;
      `;
    }
    if ($side === 'bottom') {
      return `
        margin-top: 5px;
      `;
    }
    if ($side === 'left') {
      return `
        margin-right: 5px;
      `;
    }
  }}
`;

interface ItemProps {
  $highlighted?: boolean;
  $disabled?: boolean;
}

/**
 * Individual menu item
 * Supports highlighted and disabled states
 */
const Item = styled(RadixMenubar.Item as any)<ItemProps>`
  all: unset;
  font-size: 13px;
  line-height: 1;
  color: ${cssVars.dark};
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 10px;
  position: relative;
  user-select: none;

  &[data-highlighted] {
    background-color: ${cssVars.light7};
    color: ${cssVars.mainColor};
  }

  &[data-disabled] {
    color: ${cssVars.gray500};
    pointer-events: none;
  }
`;

export const Styled = {
  Root,
  Menu,
  Trigger,
  Portal,
  Content,
  Item,
};
