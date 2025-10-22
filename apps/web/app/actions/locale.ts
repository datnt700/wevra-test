'use server';

import { cookies } from 'next/headers';
import { locales, type Locale } from '@/i18n/config';

export async function setLocale(locale: Locale) {
  // Validate locale
  if (!locales.includes(locale)) {
    throw new Error('Invalid locale');
  }

  // Set cookie that expires in 1 year
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', locale, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    path: '/',
    sameSite: 'lax',
  });
}
