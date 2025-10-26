'use client';

/**
 * DropdownMenu styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module DropdownMenu.styles
 */
import styled from '@emotion/styled';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Root container (unstyled, just Radix Root)
 */
const Root = styled(RadixDropdownMenu.Root)``;

/**
 * Trigger button for dropdown
 */
const Trigger = styled(RadixDropdownMenu.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.md};
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  height: 3rem;
  background-color: ${cssVars.light};
  color: ${cssVars.dark};
  border: 1px solid ${cssVars.light4};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${cssVars.light2};
    border-color: ${cssVars.light5};
  }

  &:focus-visible {
    outline: 2px solid ${cssVars.mainColor};
    outline-offset: 2px;
  }

  &[data-state='open'] {
    background-color: ${cssVars.light3};
  }
`;

/**
 * Dropdown content container
 */
const Content = styled(RadixDropdownMenu.Content)`
  min-width: 220px;
  background-color: ${cssVars.light};
  border-radius: ${radii.md};
  padding: 0.5rem;
  box-shadow:
    0 10px 38px -10px ${cssVars.dark}59,
    0 10px 20px -15px ${cssVars.dark}33;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 1050;
`;

/**
 * Dropdown menu item
 */
const Item = styled(RadixDropdownMenu.Item)`
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: ${radii.sm};
  display: flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  position: relative;
  user-select: none;
  cursor: pointer;
  color: ${cssVars.dark};
  transition: background-color 0.15s ease;

  &[data-disabled] {
    color: ${cssVars.light6};
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-highlighted] {
    background-color: ${cssVars.mainColorLight};
    color: ${cssVars.dark};
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

/**
 * Separator between menu items
 */
const Separator = styled(RadixDropdownMenu.Separator)`
  height: 1px;
  background-color: ${cssVars.light4};
  margin: 0.5rem 0;
`;

/**
 * Arrow pointing to trigger
 */
const Arrow = styled(RadixDropdownMenu.Arrow)`
  fill: ${cssVars.light};
`;

export const Styled = {
  Root,
  Trigger,
  Content,
  Item,
  Separator,
  Arrow,
};
