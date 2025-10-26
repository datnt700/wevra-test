'use client';

/**
 * Error Page
 * Handles runtime errors in the application
 */
import { useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #fee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
    color: #dc2626;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${({ $variant = 'primary' }) =>
    $variant === 'primary'
      ? `
    background: #667eea;
    color: white;
    &:hover {
      background: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  `
      : `
    background: #f3f4f6;
    color: #374151;
    &:hover {
      background: #e5e7eb;
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

const ErrorDetails = styled.details`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  text-align: left;

  summary {
    cursor: pointer;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.5rem;

    &:hover {
      color: #374151;
    }
  }
`;

const ErrorCode = styled.pre`
  font-size: 0.75rem;
  color: #991b1b;
  background: #fef2f2;
  padding: 0.75rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <Container>
      <Card>
        <Icon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </Icon>

        <Title>Something went wrong!</Title>
        <Message>
          We encountered an unexpected error. Don't worry, our team has been notified and is working
          on a fix.
        </Message>

        <ButtonGroup>
          <Button $variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Button $variant="secondary" onClick={() => (window.location.href = '/')}>
            Go Home
          </Button>
        </ButtonGroup>

        {process.env.NODE_ENV === 'development' && (
          <ErrorDetails>
            <summary>Error Details (Development Only)</summary>
            <ErrorCode>
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
              {error.stack && `\n\nStack:\n${error.stack}`}
            </ErrorCode>
          </ErrorDetails>
        )}
      </Card>
    </Container>
  );
}
