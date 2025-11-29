'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { TopBar } from '../TopBar';
import { Header } from '../Header';

/**
 * Default layout wrapper for frontoffice pages
 * Includes TopBar and Header components
 *
 * Pattern: Applied at page level (not root layout) to prevent SSR hydration issues
 */
export function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <TopBar />
      <Header />
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
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
