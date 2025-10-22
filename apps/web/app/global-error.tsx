'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>⚠️ Something went wrong!</h1>
            <p className={styles.message}>{error.message || 'A critical error occurred'}</p>
            {error.digest && <p className={styles.digest}>Error ID: {error.digest}</p>}
            <button onClick={reset} className={styles.button}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
