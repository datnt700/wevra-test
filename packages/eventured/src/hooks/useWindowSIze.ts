/**
 * React hook for tracking window dimensions with SSR support
 * Prevents hydration mismatch by initializing with undefined values
 * @module useWindowSize
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Window dimensions interface
 */
export interface WindowSize {
  /** Window width in pixels (undefined during SSR) */
  width: number | undefined;
  /** Window height in pixels (undefined during SSR) */
  height: number | undefined;
}

/**
 * Hook to track window dimensions with SSR-safe initialization
 *
 * Initializes with undefined width/height to prevent hydration mismatches
 * between server and client renders. Updates on window resize events.
 *
 * @returns Window dimensions object with width and height
 *
 * @example
 * ```tsx
 * import { useWindowSize } from '@eventure/eventured/hooks';
 *
 * const Component = () => {
 *   const { width, height } = useWindowSize();
 *
 *   if (!width) return <div>Loading...</div>;
 *
 *   return <div>Window is {width}x{height}</div>;
 * };
 * ```
 *
 * @see https://joshwcomeau.com/react/the-perils-of-rehydration/
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to update window dimensions
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Set initial window size
    handleResize();

    // Cleanup: remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
