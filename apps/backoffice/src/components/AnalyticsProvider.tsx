'use client';

import { AnalyticsProvider as TaviaAnalyticsProvider } from '@tavia/analytics';
import type { ReactNode } from 'react';

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  return (
    <TaviaAnalyticsProvider
      config={{
        endpoint: '/api/analytics',
        debug: process.env.NODE_ENV === 'development',
        batchSize: 10,
        flushInterval: 5000,
      }}
    >
      {children}
    </TaviaAnalyticsProvider>
  );
}
