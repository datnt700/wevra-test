'use client';

import { useEffect } from 'react';
import { Button } from '@tavia/core';
import { Styled } from './Error.styles';

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
        <Styled.Container>
          <Styled.Content>
            <Styled.Title>⚠️ Something went wrong!</Styled.Title>
            <Styled.Message>{error.message || 'A critical error occurred'}</Styled.Message>
            {error.digest && <Styled.Digest>Error ID: {error.digest}</Styled.Digest>}
            <Button onClick={reset} variant="primary">
              Try again
            </Button>
          </Styled.Content>
        </Styled.Container>
      </body>
    </html>
  );
}
