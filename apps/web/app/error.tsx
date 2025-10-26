'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@tavia/core';
import { Styled } from './Error.styles';

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
    <Styled.Container>
      <Styled.Content>
        <Styled.Title>⚠️ {t('generic')}</Styled.Title>
        <Styled.Message>{error.message || 'An unexpected error occurred'}</Styled.Message>
        {error.digest && <Styled.Digest>Error ID: {error.digest}</Styled.Digest>}
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
      </Styled.Content>
    </Styled.Container>
  );
}
