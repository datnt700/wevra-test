'use client';

import { TopBar } from '../TopBar';
import { Header } from '../Header';

/**
 * Default layout wrapper for frontoffice pages
 * Includes TopBar and Header components
 *
 * Pattern: Applied at page level (not root layout) to prevent SSR hydration issues
 */
export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Header />
      {children}
    </>
  );
}
