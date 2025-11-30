'use client';

/**
 * @file Sidebar Item component styles
 * @description Emotion-based styles for sidebar navigation items with popover support
 */

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../../theme/theme';

/**
 * Individual sidebar item container
 */
const Item = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      appearance: none;
      border: none;
      box-shadow: none;
      background: none;
      overflow: visible;
      cursor: pointer;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2.575rem;
      width: 2.575rem;
      border-radius: ${eventureTheme.radii.sm};

      svg {
        color: ${eventureTheme.colors.text.primary};
      }

      &:hover {
        opacity: 1;
        transform: scale(1.1) translateZ(0);
        background-color: #ebebeb;
      }
    `;
  }}
`;

/**
 * Trigger button for popover
 */
const Trigger = styled.button`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      border: 0;
      outline: 0;
      cursor: pointer;
      background-color: ${eventureTheme.colors.surface};
    `;
  }}
`;

/**
 * Popover content container
 */
const PopoverContent = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      min-width: 132.925px;
      max-height: 649.4px;
      z-index: 21;
      background-color: ${eventureTheme.colors.surface};
      transform: translateX(0.75rem) translateY(0.5rem);
      border: 0;
      box-shadow:
        0 3px 5px -1px rgba(0, 0, 0, 0.2),
        0 5px 8px 0 rgba(0, 0, 0, 0.14),
        0 1px 14px 0 rgba(0, 0, 0, 0.12);
    `;
  }}
`;

/**
 * Main content area within popover
 */
const PopoverContentMain = styled.div`
  display: block;
  padding: 0.5rem 0;
  width: 100%;
  border: 0;
`;

/**
 * Header section of popover content
 */
const PopoverContentHeader = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      align-items: center;
      color: ${eventureTheme.colors.primary};
      display: flex;
      font-weight: 600;
      padding: 8px 16px;
      text-transform: uppercase;
      white-space: nowrap;
    `;
  }}
`;

/**
 * Individual item within popover
 */
const PopoverItem = styled.li`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      align-items: center;
      color: ${eventureTheme.colors.text.primary};
      display: flex;
      height: 42px;
      justify-content: flex-start;
      overflow: hidden;
      padding-left: 16px;
      padding-right: 16px;
      position: relative;
      user-select: none;
      width: 100%;
      cursor: pointer;

      &:hover {
        background-color: ${eventureTheme.colors.gray.gray100};
      }
    `;
  }}
`;

/**
 * Link element within popover item
 */
const PopoverItemLink = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      color: ${eventureTheme.colors.text.primary};
      cursor: pointer;
    `;
  }}
`;

export const Styled = {
  Item,
  Trigger,
  PopoverContent,
  PopoverContentMain,
  PopoverContentHeader,
  PopoverItem,
  PopoverItemLink,
};
