import styled from '@emotion/styled';
import { motion } from 'framer-motion';

/**
 * Styled components for BackofficeSidebar
 * Responsive behavior:
 * - Desktop (1024px+): Fixed sidebar that pushes content
 * - Mobile/Tablet (<1024px): Overlay sidebar with higher z-index
 */
export const Styled = {
  Wrapper: styled(motion.aside)<{ $isOpen: boolean; $isMobile: boolean }>`
    position: fixed;
    left: 0;
    top: 46px; /* Reduced header height (20% reduction from 57px) */
    bottom: 0;
    background: white;
    border-right: 1px solid #e5e7eb;
    overflow-x: hidden;
    overflow-y: auto;
    /* Remove CSS transition - let Framer Motion handle width animation */
    transition: box-shadow 0.3s ease; /* Smooth shadow transition */

    /* Desktop: lower z-index, part of layout */
    z-index: 90;

    /* Mobile/Tablet: overlay with shadow, hide when closed */
    @media (max-width: 1023px) {
      z-index: 90;
      box-shadow: ${({ $isOpen }) => ($isOpen ? '2px 0 8px rgba(0, 0, 0, 0.15)' : 'none')};
    }
  `,

  Content: styled.div<{ $isOpen: boolean }>`
    width: 100%; /* Use full width of parent */
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
  `,

  Nav: styled.nav`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 0.5rem;
  `,

  NavItemWrapper: styled.div<{ $isActive?: boolean; $isOpen?: boolean }>`
    border-radius: 0.5rem;
    background-color: ${({ $isActive }) => ($isActive ? '#fff5f5' : 'transparent')};
    transition: all 0.2s;
    white-space: nowrap;
    position: relative;

    &:hover {
      background-color: ${({ $isActive }) => ($isActive ? '#fff5f5' : '#f9fafb')};
    }

    a {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      text-decoration: none;
      color: ${({ $isActive }) => ($isActive ? '#ff695c' : '#6b7280')};
      font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
      font-size: 0.875rem;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${({ $isActive }) => ($isActive ? '#ff695c' : '#374151')};
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

  NavItem: styled.a<{ $isActive?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: ${({ $isActive }) => ($isActive ? '#ff695c' : '#6b7280')};
    background-color: ${({ $isActive }) => ($isActive ? '#fff5f5' : 'transparent')};
    font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
    font-size: 0.875rem;
    transition: all 0.2s;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: ${({ $isActive }) => ($isActive ? '#fff5f5' : '#f9fafb')};
      color: ${({ $isActive }) => ($isActive ? '#ff695c' : '#374151')};
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

  SectionTitle: styled.h3`
    font-size: 0.75rem;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem 0;
    padding: 0 1rem;
  `,
};
