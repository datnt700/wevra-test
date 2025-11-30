import createCache, { type EmotionCache } from '@emotion/cache';

/**
 * Checks if code is running in a browser environment
 */
const isBrowser = typeof document !== 'undefined';

/**
 * Creates an Emotion cache for styling
 *
 * @remarks
 * - Uses 'css' as the key for class name generation
 * - `prepend: true` injects styles at the top of <head>, allowing user styles to override
 * - Works in both SSR and client environments
 *
 * @example
 * ```tsx
 * import { CacheProvider } from '@emotion/react';
 * import { createEmotionCache } from '@eventure/eventured';
 *
 * const cache = createEmotionCache();
 *
 * function App() {
 *   return (
 *     <CacheProvider value={cache}>
 *       <YourComponents />
 *     </CacheProvider>
 *   );
 * }
 * ```
 *
 * @returns An Emotion cache instance
 */
export const createEmotionCache = (): EmotionCache => {
  return createCache({
    key: 'css',
    prepend: true,
    // Only set container in browser environment for SSR compatibility
    ...(isBrowser && { container: document.head }),
  });
};

/**
 * Creates a client-side Emotion cache
 * Use this in browser-only contexts
 *
 * @returns An Emotion cache instance configured for client-side rendering
 */
export const createClientCache = (): EmotionCache => {
  if (!isBrowser) {
    throw new Error('createClientCache can only be called in a browser environment');
  }

  return createCache({
    key: 'css',
    prepend: true,
    container: document.head,
  });
};

/**
 * Creates a server-side Emotion cache
 * Use this for SSR contexts (Next.js, etc.)
 *
 * @returns An Emotion cache instance configured for server-side rendering
 */
export const createServerCache = (): EmotionCache => {
  return createCache({
    key: 'css',
    prepend: true,
  });
};
