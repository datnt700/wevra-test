/**
 * Loading Page
 * Displayed while page content is being fetched
 */
'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const SpinnerContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
`;

const Message = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

export default function Loading() {
  return (
    <Container>
      <Card>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        <Title>Loading...</Title>
        <Message>Please wait while we prepare your content</Message>
      </Card>
    </Container>
  );
}
