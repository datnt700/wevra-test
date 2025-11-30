'use client';

import { AnalyticsProvider as EventureAnalyticsProvider } from '@eventure/analytics';
import type { ReactNode } from 'react';

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  return (
    <EventureAnalyticsProvider
      config={{
        endpoint: '/api/analytics',
        debug: process.env.NODE_ENV === 'development',
        batchSize: 10,
        flushInterval: 5000,
      }}
    >
      {children}
    </EventureAnalyticsProvider>
  );
}
