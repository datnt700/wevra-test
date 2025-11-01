'use client';

import { LocaleSwitcher } from '../LocaleSwitcher';

/**
 * Default layout wrapper for backoffice pages
 * Includes LocaleSwitcher component
 *
 * Pattern: Applied at page level (not root layout) to prevent SSR hydration issues
 */
export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocaleSwitcher />
      {children}
    </>
  );
}
