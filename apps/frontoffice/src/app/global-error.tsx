'use client';

/**
 * Global Error Page
 * Handles errors in the root layout
 */
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@tavia/taviad';
import { Styled } from './global-error.styles';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors.globalError');

  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <Styled.Container>
      <Styled.Body>
        <Styled.Content>
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
                {useTranslations('errors.error')('tryAgain')}
              </Button>
              <Button variant="secondary" onClick={() => (window.location.href = '/')}>
                {useTranslations('errors.error')('goHome')}
              </Button>
            </Styled.ButtonGroup>
          </Styled.Card>
        </Styled.Content>
      </Styled.Body>
    </Styled.Container>
  );
}
