'use client';

import { useEffect } from 'react';

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1.5rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#dc2626',
              }}
            >
              ⚠️ Something went wrong!
            </h1>
            <p
              style={{
                fontSize: '1.125rem',
                color: '#4a5568',
                marginBottom: '1rem',
                lineHeight: '1.6',
              }}
            >
              {error.message || 'A critical error occurred'}
            </p>
            {error.digest && (
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  marginBottom: '2rem',
                  fontFamily: 'monospace',
                }}
              >
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#fff',
                backgroundColor: '#667eea',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
