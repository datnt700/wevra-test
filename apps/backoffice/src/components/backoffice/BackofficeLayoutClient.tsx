'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@tavia/taviad';
import { BackofficeHeader } from './BackofficeHeader';
import { BackofficeSidebar } from './BackofficeSidebar';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  margin-top: 0; /* No top margin since sidebar is full height */
`;

const ContentArea = styled.main<{ $sidebarOpen: boolean }>`
  flex: 1;
  overflow-y: auto;
  background-color: ${theme.colors.surface};

  /* Mobile/Tablet: no margin, sidebar overlays */
  @media (max-width: 1023px) {
    margin-left: 0;
  }
`;

const Backdrop = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 46px; /* Reduced header height (20% reduction from 57px) */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  z-index: 85;
  display: none;

  /* Only show backdrop on mobile/tablet */
  @media (max-width: 1023px) {
    display: block;
  }
`;

/**
 * Backoffice Layout Client Component
 * Handles client-side state for sidebar and responsive behavior
 */
export function BackofficeLayoutClient({ children }: { children: React.ReactNode }) {
  // Initialize as false to match server-rendered state and avoid hydration mismatch
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Detect screen size and adjust sidebar default state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Keep sidebar closed by default on all screen sizes
      // User can manually open it if needed
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <LayoutWrapper>
      <BackofficeHeader onToggleSidebar={toggleSidebar} isMobile={isMobile} />
      <MainContainer>
        <BackofficeSidebar isOpen={sidebarOpen} isMobile={isMobile} />
        <Backdrop $isVisible={sidebarOpen && isMobile} onClick={closeSidebar} />
        <ContentArea $sidebarOpen={sidebarOpen}>{children}</ContentArea>
      </MainContainer>
    </LayoutWrapper>
  );
}
