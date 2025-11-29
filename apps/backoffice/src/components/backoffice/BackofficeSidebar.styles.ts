import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { type TaviaTheme } from '@tavia/taviad';

/**
 * Styled components for BackofficeSidebar
 * Responsive behavior:
 * - Desktop (1024px+): Fixed sidebar that pushes content
 * - Mobile/Tablet (<1024px): Overlay sidebar with higher z-index
 */
export const Styled = {
  Wrapper: styled(motion.aside)<{ $isOpen: boolean; $isMobile: boolean; theme?: TaviaTheme }>`
    position: relative;
    background: ${({ theme }) => theme.colors.surface};
    border-right: 1px solid ${({ theme }) => theme.colors.border.default};
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    /* Remove CSS transition - let Framer Motion handle width animation */
    transition: box-shadow 0.3s ease; /* Smooth shadow transition */

    /* Mobile/Tablet: overlay with shadow */
    @media (max-width: 1023px) {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 90;
      box-shadow: ${({ $isOpen }) => ($isOpen ? '2px 0 8px rgba(0, 0, 0, 0.15)' : 'none')};
    }
  `,

  Content: styled.div<{ $isOpen: boolean }>`
    width: 100%; /* Use full width of parent */
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem 0 0 0; /* Add top padding */
  `,

  Nav: styled.nav`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 0.5rem;
  `,

  NavItemWrapper: styled.div<{ $isActive?: boolean; $isOpen?: boolean; theme?: TaviaTheme }>`
    border-radius: 0.5rem;
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primaryActive + '15' : 'transparent'}; /* 15 = ~8% opacity */
    transition: all 0.2s;
    white-space: nowrap;
    position: relative;

    &:hover {
      background-color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primaryActive + '15' : theme.colors.surfaceHover};
    }

    a {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      text-decoration: none;
      color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primary : theme.colors.text.secondary};
      font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
      font-size: 0.875rem;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${({ $isActive, theme }) =>
          $isActive ? theme.colors.primary : theme.colors.text.primary};
      }

      svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        margin: 0;
      }

      span {
        margin-left: 0.75rem;
        opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
        visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
        max-width: ${({ $isOpen }) => ($isOpen ? '200px' : '0')};
        overflow: hidden;
        white-space: nowrap;
        transition:
          opacity 0.3s ease,
          visibility 0.3s ease,
          max-width 0.3s ease;
      }
    }
  `,

  NavItem: styled.a<{ $isActive?: boolean; theme?: TaviaTheme }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary : theme.colors.text.secondary};
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primaryActive + '15' : 'transparent'}; /* 15 = ~8% opacity */
    font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
    font-size: 0.875rem;
    transition: all 0.2s;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primaryActive + '15' : theme.colors.surfaceHover};
      color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primary : theme.colors.text.primary};
    }

    svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,

  Section: styled.div`
    padding: 0 1rem;
    margin-top: 1.5rem;
  `,

  SectionTitle: styled.h3<{ theme?: TaviaTheme }>`
    font-size: 0.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.tertiary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem 0;
    padding: 0 1rem;
  `,
};
