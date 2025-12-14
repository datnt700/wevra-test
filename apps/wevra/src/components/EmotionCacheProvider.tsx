'use client';

import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useMemo } from 'react';
import { createEmotionCache } from '@tavia/taviad';

/**
 * Emotion Cache Provider for Next.js App Router
 * Fixes hydration mismatches by ensuring consistent cache between server and client
 * Based on: https://github.com/emotion-js/emotion/issues/3308
 */

// Create cache outside of component to ensure it's stable
let clientCache: EmotionCache | undefined;

function getCache() {
  if (clientCache) {
    return clientCache;
  }

  const cache = createEmotionCache();
  cache.compat = true;

  if (typeof window !== 'undefined') {
    clientCache = cache;
  }

  return cache;
}

export function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  const cache = useMemo(() => {
    const cache = getCache();
    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  }, []);

  useServerInsertedHTML(() => {
    const names = cache.flush();
    if (names.length === 0) {
      return null;
    }

    let styles = '';
    for (const name of names) {
      styles += cache.cache.inserted[name];
    }

    return (
      <style
        key={cache.cache.key}
        data-emotion={`${cache.cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache.cache}>{children}</CacheProvider>;
}
