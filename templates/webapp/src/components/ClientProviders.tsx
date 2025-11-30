'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { GlobalStyles } from '@eventure/eventured';

/**
 * Client-side providers wrapper
 * Includes:
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

  return (
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
  );
}
