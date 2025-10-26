/**
 * Not Found Page (404)
 * Displayed when a route doesn't exist
 */
'use client';

import styled from '@emotion/styled';
import Link from 'next/link';

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
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const IconContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Icon404 = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: #667eea;
  line-height: 1;
  margin-bottom: 0.5rem;
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
  margin: 0 0 2rem 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const BaseButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
`;

const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const SecondaryButton = styled(BaseButton)`
  background: white;
  color: #667eea;
  border: 1px solid #667eea;

  &:hover {
    background: #f3f4f6;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <Card>
        <IconContainer>
          <Icon404>404</Icon404>
        </IconContainer>
        <Title>Page Not Found</Title>
        <Message>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          <br />
          The page may have been moved or no longer exists.
        </Message>
        <ButtonGroup>
          <PrimaryButton href="/">Go to Homepage</PrimaryButton>
          <SecondaryButton href="/dashboard">Go to Dashboard</SecondaryButton>
        </ButtonGroup>
      </Card>
    </Container>
  );
}
