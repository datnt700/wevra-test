'use client';

import { GlobalStyles } from '@tavia/taviad';

/**
 * Client-side providers wrapper
 * Wraps GlobalStyles (Emotion) to avoid hydration issues
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}
