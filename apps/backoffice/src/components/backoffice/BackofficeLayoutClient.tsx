'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type EventureTheme } from '@eventure/eventured';
import { BackofficeHeader } from './BackofficeHeader';
import { BackofficeSidebar } from './BackofficeSidebar';

const LayoutWrapper = styled.div<{ theme?: EventureTheme }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  margin-top: 0; /* No top margin since sidebar is full height */
`;

const ContentArea = styled.main<{ $sidebarOpen: boolean; theme?: EventureTheme }>`
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};

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
  const [isMobile, setIsMobile] = useState(false);
  const [mounted] = useState(true);
  const pathname = usePathname();

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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <LayoutWrapper>
      <BackofficeHeader onToggleSidebar={toggleSidebar} isMobile={isMobile} />
      <MainContainer>
        <BackofficeSidebar isOpen={sidebarOpen} isMobile={isMobile} />
        <Backdrop $isVisible={sidebarOpen && isMobile} onClick={closeSidebar} />
        <ContentArea $sidebarOpen={sidebarOpen}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
              style={{ height: '100%' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ContentArea>
      </MainContainer>
    </LayoutWrapper>
  );
}
