'use client';

/**
 * Drawer styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Drawer.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

interface PositionProps {
  $position: DrawerPosition;
  $isOpen: boolean;
}

/**
 * Get justify-content based on drawer position
 */
const getJustifyContent = (position: DrawerPosition): string => {
  const alignmentMap: Record<DrawerPosition, string> = {
    right: 'flex-end',
    left: 'flex-start',
    top: 'stretch',
    bottom: 'flex-end',
  };
  return alignmentMap[position];
};

/**
 * Get transform value based on position and open state
 */
const getTransform = (position: DrawerPosition, isOpen: boolean): string => {
  if (isOpen) return 'translate(0, 0)';

  const transformMap: Record<DrawerPosition, string> = {
    right: 'translateX(100%)',
    left: 'translateX(-100%)',
    top: 'translateY(-100%)',
    bottom: 'translateY(100%)',
  };
  return transformMap[position];
};

/**
 * Wrapper container for drawer with backdrop
 */
const Wrapper = styled.div<PositionProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: stretch;
  justify-content: ${({ $position }) => getJustifyContent($position)};
`;

/**
 * Overlay background with blur effect
 */
const Overlay = styled.div<{ $isOpen: boolean }>`
  ${({ theme, $isOpen }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1040;
      width: 100vw;
      height: 100vh;
      background-color: ${eventureTheme.colors.text.primary};
      backdrop-filter: blur(4px);
      overflow-x: hidden;
      opacity: ${$isOpen ? 0.5 : 0};
      transition: opacity 0.3s ease-out;
      cursor: pointer;
    `;
  }}
`;

/**
 * Main drawer container
 */
const Main = styled.div`
  z-index: 1041;
  outline: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

/**
 * Container for drawer content with slide animation
 */
const Container = styled.div<PositionProps>`
  ${({ theme, $position, $isOpen }) => {
    const eventureTheme = theme as EventureTheme;
    const shadowMap: Record<DrawerPosition, string> = {
      right: `-4px 0 12px ${eventureTheme.colors.text.primary}1a`,
      left: `4px 0 12px ${eventureTheme.colors.text.primary}1a`,
      top: `0 4px 12px ${eventureTheme.colors.text.primary}1a`,
      bottom: `0 -4px 12px ${eventureTheme.colors.text.primary}1a`,
    };

    return `
      z-index: 1041;
      background-color: ${eventureTheme.colors.surface};
      position: relative;
      width: ${$position === 'top' || $position === 'bottom' ? '100%' : '30rem'};
      height: ${$position === 'left' || $position === 'right' ? '100%' : '30rem'};
      transform: ${getTransform($position, $isOpen)};
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      transition: transform 0.3s ease-out;
      box-shadow: ${shadowMap[$position]};

      &:focus-within {
        outline: none;
      }
    `;
  }}
`;

/**
 * Drawer header with title and close button
 */
const Header = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      border-bottom: 1px solid ${eventureTheme.colors.border.default};

      .header {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 1.125rem;
        color: ${eventureTheme.colors.text.primary};
      }
    `;
  }}
`;

/**
 * Close button in header
 */
const CloseButton = styled.button`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      font-size: 1.5rem;
      line-height: 1;
      color: ${eventureTheme.colors.text.primary};
      opacity: 0.5;
      cursor: pointer;
      border: none;
      background: transparent;
      transition: opacity 0.3s ease;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        opacity: 1;
      }

      &:focus-visible {
        outline: 2px solid ${eventureTheme.colors.primary};
        outline-offset: 2px;
        border-radius: ${eventureTheme.radii.sm};
      }
    `;
  }}
`;

/**
 * Drawer content area with custom scrollbar
 */
const Content = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      flex: 1;
      overflow-y: auto;
      padding: 1rem 2rem;
      color: ${eventureTheme.colors.text.primary};

      /* Custom scrollbar styling */
      scrollbar-width: thin;
      scrollbar-color: ${eventureTheme.colors.text.secondary} ${eventureTheme.colors.surfaceHover};

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${eventureTheme.colors.text.secondary};
        border-radius: ${eventureTheme.radii.sm};
      }

      &::-webkit-scrollbar-track {
        background-color: ${eventureTheme.colors.surfaceHover};
      }
    `;
  }}
`;

/**
 * Drawer footer with action buttons
 */
const Footer = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      padding: 1rem 2rem;
      border-top: 1px solid ${eventureTheme.colors.border.default};
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.75rem;
    `;
  }}
`;

export const Styled = {
  Wrapper,
  Overlay,
  Main,
  Container,
  Header,
  CloseButton,
  Content,
  Footer,
};
