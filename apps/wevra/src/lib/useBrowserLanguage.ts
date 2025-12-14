'use client';

import { useEffect, useState } from 'react';

const SUPPORTED = ['en', 'fr', 'vi'] as const;
export type AppLang = (typeof SUPPORTED)[number];

export function useBrowserLanguage(): AppLang | null {
  const [lang, setLang] = useState<AppLang | null>(null);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const raw = navigator.language || (navigator as any).userLanguage || 'en';
    const short = raw.split('-')[0].toLowerCase();

    const finalLang = (SUPPORTED.includes(short as AppLang) ? short : 'en') as AppLang;

    setLang(finalLang);
  }, []);

  return lang;
}
