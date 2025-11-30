'use client';

/**
 * Toast Styles
 * Emotion-based styles for Toast notification component
 */
import { Toast as RadixToast } from 'radix-ui';
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

/**
 * Toast position types
 */
type ToastPosition =
  | 'bottom-right'
  | 'top-right'
  | 'bottom-left'
  | 'top-left'
  | 'bottom-center'
  | 'top-center';

interface ToastRootProps {
  $position: ToastPosition;
}

/**
 * Get position styles based on toast position
 */
const getPositionStyles = (position: ToastPosition): string => {
  const positionMap: Record<ToastPosition, string> = {
    'bottom-right': 'bottom: 1.5rem; right: 1.5rem;',
    'top-right': 'top: 1.5rem; right: 1.5rem;',
    'bottom-left': 'bottom: 1.5rem; left: 1.5rem;',
    'top-left': 'top: 1.5rem; left: 1.5rem;',
    'bottom-center': 'bottom: 1.5rem; right: 0; left: 0; margin: auto;',
    'top-center': 'top: 1.5rem; right: 0; left: 0; margin: auto;',
  };
  return positionMap[position];
};

/**
 * Toast root container
 */
const ToastRoot = styled(RadixToast.Root, {
  shouldForwardProp: (prop) => prop !== '$position',
})<ToastRootProps>`
  ${({ theme, $position }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      width: 20rem;
      position: fixed;
      border-radius: ${eventureTheme.radii.lg};
      padding: 1rem;
      z-index: 5000;
      background-color: ${eventureTheme.colors.text.primary};
      color: ${eventureTheme.colors.surface};
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.35s cubic-bezier(0.25, 0.75, 0.6, 0.98);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      ${getPositionStyles($position)}
    `;
  }}
`;

/**
 * Info container for title and description
 */
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

/**
 * Toast viewport container
 */
const Viewport = styled(RadixToast.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.625rem;
  width: 24.375rem;
  max-width: 100vw;
  z-index: 2147483647;
`;

/**
 * Toast title
 */
const Title = styled(RadixToast.Title)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      font-weight: 500;
      color: ${eventureTheme.colors.surface};
      font-size: 0.9375rem;
      line-height: 1.4;
    `;
  }}
`;

/**
 * Toast description
 */
const Description = styled(RadixToast.Description)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      color: ${eventureTheme.colors.surface};
      font-size: 0.8125rem;
      line-height: 1.4;
      opacity: 0.9;
    `;
  }}
`;

/**
 * Toast action container
 */
const Action = styled(RadixToast.Action)`
  margin-left: 0.625rem;
`;

/**
 * Toast close button
 */
const CloseBtn = styled(RadixToast.Close)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.7;
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
 * Exported styled components
 */
export const Styled = {
  ToastRoot,
  Info,
  Viewport,
  Title,
  Description,
  Action,
  CloseBtn,
};
