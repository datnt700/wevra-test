'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>⚠️ {t('generic')}</h1>
        <p className={styles.message}>{error.message || 'An unexpected error occurred'}</p>
        {error.digest && <p className={styles.digest}>Error ID: {error.digest}</p>}
        <button onClick={reset} className={styles.button}>
          Try again
        </button>
      </div>
    </div>
  );
}
