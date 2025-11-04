'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';

const Container = styled.div`
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => (props.theme as TaviaTheme).colors.text.primary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
  margin-bottom: 2rem;
`;

const ComingSoon = styled.div`
  background-color: ${(props) => (props.theme as TaviaTheme).colors.gray.mainColorLight}20;
  border: 2px dashed ${(props) => (props.theme as TaviaTheme).colors.primary};
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  margin-top: 2rem;
`;

const ComingSoonText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => (props.theme as TaviaTheme).colors.primary};
  margin-bottom: 0.5rem;
`;

const ComingSoonDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
`;

export default function CommunityPage() {
  return (
    <Container>
      <Title>Community</Title>
      <Description>
        Connect with others on their financial journey. Share experiences, get support, and grow
        together.
      </Description>

      <ComingSoon>
        <ComingSoonText>🚧 Coming Soon</ComingSoonText>
        <ComingSoonDescription>
          We're building an amazing community space for you to connect with fellow learners, share
          your wins, and support each other.
        </ComingSoonDescription>
      </ComingSoon>
    </Container>
  );
}
