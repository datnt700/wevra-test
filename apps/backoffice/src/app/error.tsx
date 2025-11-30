'use client';

/**
 * Error Page
 * Handles runtime errors in the application
 */
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@eventure/eventured';
import { Styled } from './error.styles';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors.error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Icon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </Styled.Icon>

        <Styled.Title>{t('title')}</Styled.Title>
        <Styled.Message>{t('message')}</Styled.Message>

        <Styled.ButtonGroup>
          <Button variant="primary" onClick={reset}>
            {t('tryAgain')}
          </Button>
          <Button variant="secondary" onClick={() => (window.location.href = '/')}>
            {t('goHome')}
          </Button>
        </Styled.ButtonGroup>

        {process.env.NODE_ENV === 'development' && (
          <Styled.ErrorDetails>
            <summary>{t('detailsTitle')}</summary>
            <Styled.ErrorCode>
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
              {error.stack && `\n\nStack:\n${error.stack}`}
            </Styled.ErrorCode>
          </Styled.ErrorDetails>
        )}
      </Styled.Card>
    </Styled.Container>
  );
}
