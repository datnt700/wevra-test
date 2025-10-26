'use client';

/**
 * Global Error Page
 * Handles errors in the root layout
 */
import { useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.html`
  height: 100%;
`;

const Body = styled.body`
  height: 100%;
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

const Content = styled.div`
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
  margin: 0 0 0.75rem 0;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
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

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <Container>
      <Body>
        <Content>
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

            <Title>Critical Error</Title>
            <Message>
              A critical error occurred in the application. Please try reloading the page or contact
              support if the problem persists.
            </Message>

            <ButtonGroup>
              <Button $variant="primary" onClick={reset}>
                Try Again
              </Button>
              <Button $variant="secondary" onClick={() => (window.location.href = '/')}>
                Go Home
              </Button>
            </ButtonGroup>
          </Card>
        </Content>
      </Body>
    </Container>
  );
}
