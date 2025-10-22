'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { setLocale } from '@/app/actions/locale';
import { locales, type Locale } from '@/i18n/config';
import styles from './LocaleSwitcher.module.css';

const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: Locale) => {
    startTransition(async () => {
      await setLocale(newLocale);
      // Refresh the page to apply new locale
      window.location.reload();
    });
  };

  return (
    <div className={styles.container}>
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value as Locale)}
        disabled={isPending}
        className={styles.select}
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      {isPending && <span className={styles.spinner}>⟳</span>}
    </div>
  );
}
