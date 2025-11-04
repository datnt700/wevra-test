'use client';

import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import type { TaviaTheme } from '@tavia/taviad';

const FooterContainer = styled.footer<{ gray200: string }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: white;
  border-top: 2px solid ${(p) => p.gray200};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 70px;
    padding: 0 1rem;
  }
`;

const TopicsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  overflow-x: auto;
  padding: 0 1rem;

  /* Hide scrollbar but keep scrolling */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const TopicButton = styled.button<{
  $isActive?: boolean;
  $mainColor: string;
  $gray600: string;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  background: none;
  border: none;
  color: ${(props) => (props.$isActive ? props.$mainColor : props.$gray600)};
  font-size: 0.875rem;
  font-weight: ${(props) => (props.$isActive ? '700' : '500')};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    color: ${(props) => props.$mainColor};
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Icon = styled.span`
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const NavButton = styled.button<{
  $mainColor: string;
  $mainColorLight: string;
  $gray300: string;
  $gray600: string;
}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${(p) => p.$gray300};
  background: white;
  color: ${(p) => p.$gray600};
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${(p) => p.$mainColor};
    color: ${(p) => p.$mainColor};
    background-color: ${(p) => p.$mainColorLight}05;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

const learningTopics = [
  { code: 'budgeting', icon: '💰', name: 'Budgeting' },
  { code: 'saving', icon: '🏦', name: 'Saving' },
  { code: 'investing', icon: '📈', name: 'Investing' },
  { code: 'debt', icon: '💳', name: 'Debt Management' },
  { code: 'retirement', icon: '🏖️', name: 'Retirement' },
  { code: 'taxes', icon: '📊', name: 'Taxes' },
  { code: 'insurance', icon: '🛡️', name: 'Insurance' },
  { code: 'realestate', icon: '🏠', name: 'Real Estate' },
  { code: 'emergency', icon: '🆘', name: 'Emergency Fund' },
  { code: 'credit', icon: '💯', name: 'Credit Score' },
];

export function LanguageFooter() {
  const theme = useTheme() as TaviaTheme;

  const colors = {
    mainColor: theme.colors.primary,
    mainColorLight: theme.colors.gray.mainColorLight,
    gray200: theme.colors.gray.gray200,
    gray300: theme.colors.gray.gray300,
    gray600: theme.colors.gray.gray600,
  };

  return (
    <FooterContainer gray200={colors.gray200}>
      <NavButton
        disabled
        $mainColor={colors.mainColor}
        $mainColorLight={colors.mainColorLight}
        $gray300={colors.gray300}
        $gray600={colors.gray600}
      >
        ‹
      </NavButton>
      <TopicsContainer>
        {learningTopics.map((topic, index) => (
          <TopicButton
            key={topic.code}
            $isActive={index === 0}
            $mainColor={colors.mainColor}
            $gray600={colors.gray600}
          >
            <Icon>{topic.icon}</Icon>
            <span>{topic.name}</span>
          </TopicButton>
        ))}
      </TopicsContainer>
      <NavButton
        $mainColor={colors.mainColor}
        $mainColorLight={colors.mainColorLight}
        $gray300={colors.gray300}
        $gray600={colors.gray600}
      >
        ›
      </NavButton>
    </FooterContainer>
  );
}
