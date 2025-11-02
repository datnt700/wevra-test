'use client';

/**
 * Default layout wrapper for backoffice pages
 *
 * Pattern: Applied at page level (not root layout) to prevent SSR hydration issues
 */
export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
