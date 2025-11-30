'use client';

/**
 * Modal styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Modal.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

type ModalPosition = 'center' | 'top' | 'bottom';

interface PositionProps {
  $position?: ModalPosition;
}

/**
 * Get position styles based on modal position
 */
const getPositionStyles = (position: ModalPosition = 'center'): string => {
  const positionMap: Record<ModalPosition, string> = {
    center: `
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    top: `
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 1rem;
    `,
    bottom: `
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1rem;
    `,
  };

  return positionMap[position];
};

/**
 * Wrapper container for the modal with backdrop
 */
const Wrapper = styled.div<PositionProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  backdrop-filter: blur(4px);

  ${({ $position = 'center' }) => getPositionStyles($position)}
`;

/**
 * Overlay background with blur effect
 */
const Overlay = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1040;
      width: 100vw;
      height: 100vh;
      background-color: ${eventureTheme.colors.text.primary};
      opacity: 0.5;
      cursor: pointer;
      backdrop-filter: blur(4px);
    `;
  }}
`;

/**
 * Main modal container
 */
const Main = styled.div`
  z-index: 1041;
  outline: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
`;

/**
 * Container for modal content with background and shadow
 */
const Container = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      z-index: 1041;
      background-color: ${eventureTheme.colors.surface};
      position: relative;
      border-radius: ${eventureTheme.radii.md};
      min-width: 30rem;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 25px ${eventureTheme.colors.text.primary}33; /* 33 = 20% opacity */
    `;
  }}
`;

/**
 * Modal header with title and close button
 */
const Header = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      display: flex;
      justify-content: space-between;
      padding: 2rem;
      padding-bottom: 1rem;
      align-items: center;
      border-bottom: 1px solid ${eventureTheme.colors.border.default};

      .header {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 1.25rem;
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
 * Modal content area
 */
const Content = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      padding: 1rem 2rem;
      flex: 1;
      overflow-y: auto;
      color: ${eventureTheme.colors.text.primary};
    `;
  }}
`;

/**
 * Modal footer with action buttons
 */
const Footer = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      padding: 1rem 2rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 0.75rem;
      border-top: 1px solid ${eventureTheme.colors.border.default};
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
