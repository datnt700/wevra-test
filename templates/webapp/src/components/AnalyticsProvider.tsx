'use client';

import { AnalyticsProvider as EventureAnalyticsProvider } from '@eventure/analytics';
import { envUtils } from '@/lib/env';
import type { ReactNode } from 'react';

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  return (
    <EventureAnalyticsProvider
      config={{
        endpoint: '/api/analytics',
        debug: envUtils.isDevelopment(),
        batchSize: 10,
        flushInterval: 5000,
      }}
    >
      {children}
    </EventureAnalyticsProvider>
  );
}
