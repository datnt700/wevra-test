'use client';

import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'sonner';
import { GlobalStyles, getTheme } from '@tavia/taviad';

/**
 * Client-side providers wrapper
 * Includes:
 * - Gaming theme (fixed for Wevra)
 * - Emotion GlobalStyles
 * - React Query with devtools
 * - Sonner toast notifications
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // Always use gaming theme for Wevra
  const theme = getTheme('gaming', 'light');

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={false}
            toastOptions={{
              duration: 4000,
            }}
          />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
