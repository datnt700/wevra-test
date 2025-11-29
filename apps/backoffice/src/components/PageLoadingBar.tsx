'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Page Loading Bar Component
 * Shows an animated gradient bar at the top of the page during route transitions
 * Uses Framer Motion for smooth animations and inline styles to avoid hydration issues
 */
export function PageLoadingBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading to true after a microtask to avoid setState in effect warning
    Promise.resolve().then(() => setIsLoading(true));

    // Stop loading after animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1040);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [pathname]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ opacity: 0 }}
            transition={{
              width: { duration: 1.04, ease: 'easeInOut' },
              opacity: { duration: 0.2 },
            }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ff7872 0%, #ff5f4e 100%)',
              boxShadow: '0 0 10px rgba(255, 104, 92, 0.5)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
