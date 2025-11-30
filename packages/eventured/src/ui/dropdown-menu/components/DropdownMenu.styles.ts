'use client';

/**
 * DropdownMenu styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module DropdownMenu.styles
 */
import styled from '@emotion/styled';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import type { EventureTheme } from '../../../theme/theme';

/**
 * Root container (unstyled, just Radix Root)
 */
const Root = styled(RadixDropdownMenu.Root)``;

/**
 * Trigger button for dropdown
 */
const Trigger = styled(RadixDropdownMenu.Trigger)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: ${eventureTheme.radii.md};
      padding: 0;
      font-size: 0.875rem;
      height: auto;
      background-color: transparent;
      color: ${eventureTheme.colors.text.primary};
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: transparent;
      }

      &:focus-visible {
        outline: none;
      }

      &[data-state='open'] {
        background-color: transparent;
      }
    `;
  }}
`;

/**
 * Dropdown content container
 */
const Content = styled(RadixDropdownMenu.Content)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      min-width: 220px;
      background-color: ${eventureTheme.colors.surface};
      border-radius: ${eventureTheme.radii.md};
      padding: 0.5rem;
      box-shadow:
        0 10px 38px -10px ${eventureTheme.colors.text.primary}59,
        0 10px 20px -15px ${eventureTheme.colors.text.primary}33;
      animation-duration: 400ms;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;
      z-index: 1050;
    `;
  }}
`;

/**
 * Dropdown menu item
 */
const Item = styled(RadixDropdownMenu.Item)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: ${eventureTheme.radii.sm};
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 2.5rem;
      padding: 0.5rem 1rem;
      position: relative;
      user-select: none;
      cursor: pointer;
      color: ${eventureTheme.colors.text.primary};
      transition: background-color 0.15s ease;

      &[data-disabled] {
        color: ${eventureTheme.colors.text.secondary};
        pointer-events: none;
        opacity: 0.5;
      }

      &[data-highlighted] {
        background-color: ${eventureTheme.colors.gray.light3};
        color: ${eventureTheme.colors.text.primary};
        outline: none;
      }

      &:focus {
        outline: none;
      }
    `;
  }}
`;

/**
 * Icon wrapper for menu items
 */
const ItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/**
 * Separator between menu items
 */
const Separator = styled(RadixDropdownMenu.Separator)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      height: 1px;
      background-color: ${eventureTheme.colors.border.default};
      margin: 0.5rem 0;
    `;
  }}
`;

/**
 * Arrow pointing to trigger
 */
const Arrow = styled(RadixDropdownMenu.Arrow)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      fill: ${eventureTheme.colors.surface};
    `;
  }}
`;

export const Styled = {
  Root,
  Trigger,
  Content,
  Item,
  ItemIcon,
  Separator,
  Arrow,
};
