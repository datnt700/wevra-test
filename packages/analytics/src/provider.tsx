import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnalyticsClient } from './client.js';
import type { AnalyticsConfig } from './types.js';

/**
 * Analytics context
 */
const AnalyticsContext = createContext<AnalyticsClient | null>(null);

/**
 * Analytics provider props
 */
export interface AnalyticsProviderProps {
  config: AnalyticsConfig;
  children: ReactNode;
}

/**
 * Analytics provider component
 */
export function AnalyticsProvider({ config, children }: AnalyticsProviderProps) {
  // Lazy initialization - only create client on the client side
  const [client] = useState<AnalyticsClient | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    return new AnalyticsClient(config);
  });

  useEffect(() => {
    return () => {
      client?.destroy();
    };
  }, [client]);

  return <AnalyticsContext.Provider value={client}>{children}</AnalyticsContext.Provider>;
}

/**
 * Hook to access analytics client
 */
export function useAnalytics() {
  const client = useContext(AnalyticsContext);

  if (!client && typeof window !== 'undefined') {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }

  return client;
}

/**
 * Hook to track clicks
 */
export function useTrackClick() {
  const client = useAnalytics();

  return (
    eventName: string,
    metadata?: Record<string, unknown>
  ): ((event: React.MouseEvent) => void) => {
    return (event: React.MouseEvent) => {
      if (!client) return;

      const target = event.currentTarget as HTMLElement;

      client.trackClick({
        elementType: target.tagName.toLowerCase(),
        elementText: target.textContent || undefined,
        elementId: target.id || undefined,
        elementClasses: Array.from(target.classList),
        clickX: event.clientX,
        clickY: event.clientY,
        eventName,
        metadata,
      });
    };
  };
}

/**
 * Hook to track page views (automatically on mount)
 */
export function usePageView(metadata?: Record<string, unknown>) {
  const client = useAnalytics();

  useEffect(() => {
    if (client) {
      client.trackPageView({ metadata });
    }
  }, [client, metadata]);
}

/**
 * Hook to track custom events
 */
export function useTrack() {
  const client = useAnalytics();

  return (name: string, properties?: Record<string, unknown>) => {
    if (client) {
      client.track(name, properties);
    }
  };
}
