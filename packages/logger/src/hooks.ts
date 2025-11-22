'use client';

import { useEffect, useRef, useMemo } from 'react';
import { createLogger } from './logger';
import type { Logger } from './types';

/**
 * React hook to get a namespaced logger for a component
 */
export function useLogger(componentName: string): Logger {
  const logger = useMemo(() => createLogger(componentName), [componentName]);
  return logger;
}

/**
 * React hook to track component render performance
 */
export function usePerformanceLogger(componentName: string): void {
  const logger = useLogger(componentName);
  const renderCount = useRef(0);
  const mountTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;

    if (renderCount.current === 1) {
      // Component mounted
      const mountDuration = performance.now() - mountTime.current;
      logger.debug(`Mounted in ${mountDuration.toFixed(2)}ms`);
    } else {
      // Component re-rendered
      logger.debug(`Re-rendered (count: ${renderCount.current})`);
    }
  });

  useEffect(() => {
    // Component will unmount
    return () => {
      const lifetimeDuration = performance.now() - mountTime.current;
      logger.debug(
        `Unmounted after ${lifetimeDuration.toFixed(2)}ms (renders: ${renderCount.current})`
      );
    };
  }, [logger]);
}

/**
 * React hook to log component lifecycle events
 */
export function useLifecycleLogger(componentName: string): void {
  const logger = useLogger(componentName);

  useEffect(() => {
    logger.debug('Component mounted');

    return () => {
      logger.debug('Component unmounted');
    };
  }, [logger]);
}
