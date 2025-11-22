'use client';

/**
 * @file Sidebar component styles
 * @description Emotion-based styles for the Sidebar component with collapsible behavior
 */

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';
import { layout } from '../../../theme/tokens/variables';

/**
 * Props for styled Sidebar component
 */
interface SidebarProps {
  /** Whether the sidebar is open (expanded) */
  isOpen: boolean;
}

/**
 * Main sidebar container with collapsible behavior
 */
const Sidebar = styled.div<SidebarProps>`
  ${({ theme, isOpen }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      position: fixed;
      left: 0;
      top: 0;
      width: ${layout.sidebar.collapsed};
      height: 100vh;
      background: ${taviaTheme.colors.surface};
      padding: 1.25rem 0.7rem;
      border-right: 1px solid ${taviaTheme.colors.gray.gray200};
      flex-direction: column;
      align-items: center;
      overflow: auto;
      box-shadow:
        0 3px 5px -1px rgba(0, 0, 0, 0.2),
        0 5px 8px 0 rgba(0, 0, 0, 0.14),
        0 1px 14px 0 rgba(0, 0, 0, 0.12);
      display: ${isOpen ? 'flex' : 'none'};
      z-index: 10;
    `;
  }}
`;

/**
 * Closed (collapsed) sidebar variant
 */
const ClosedSideBar = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      width: ${layout.sidebar.collapsed};
      height: 100vh;
      background: ${taviaTheme.colors.surface};
      padding: 1.25rem 0.7rem;
      display: none;

      @media screen and (min-width: bp.$bp-md) {
        display: flex;
      }

      svg {
        color: #f9f9f9;
      }
    `;
  }}
`;

/**
 * Open (expanded) sidebar variant
 */
const OpenedSideBar = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      width: ${layout.sidebar.expanded};
      height: 100vh;
      background: ${taviaTheme.colors.surface};
      padding: 1.25rem 0.7rem;
      display: none;

      @media screen and (min-width: bp.$bp-md) {
        display: flex;
      }

      svg {
        color: #f9f9f9;
      }
    `;
  }}
`;

/**
 * Navigation container for sidebar items
 */
const SidebarNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

/**
 * Logo container
 */
const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
`;

/**
 * Top section of the sidebar
 */
const TopSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

/**
 * Tooltip content styling
 */
const TooltipContent = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      background-color: ${taviaTheme.colors.surface};
      transform: translateX(1rem);
      padding: 0.5rem 1rem;
    `;
  }}
`;

export const Styled = {
  Sidebar,
  ClosedSideBar,
  OpenedSideBar,
  SidebarNav,
  Logo,
  TopSidebar,
  TooltipContent,
};
