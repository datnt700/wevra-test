'use client';

import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import type { EventureTheme } from '@eventure/eventured';
import { useRouter } from 'next/navigation';

const HeaderContainer = styled.header<{ gray200: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  border-bottom: 2px solid ${(p) => p.gray200};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled.div<{ mainColor: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: ${(p) => p.mainColor};
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoIcon = styled.span`
  font-size: 2rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LanguageSelector = styled.div<{
  mainColor: string;
  mainColorLight: string;
  gray300: string;
  gray700: string;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${(p) => p.gray300};
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(p) => p.gray700};
  text-transform: uppercase;

  &:hover {
    border-color: ${(p) => p.mainColor};
    background-color: ${(p) => p.mainColorLight}05;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const LanguageLabel = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

export function Header() {
  const router = useRouter();
  const theme = useTheme() as EventureTheme;

  const colors = {
    mainColor: theme.colors.primary,
    mainColorLight: theme.colors.gray.mainColorLight,
    gray200: theme.colors.gray.gray200,
    gray300: theme.colors.gray.gray300,
    gray700: theme.colors.gray.gray700,
  };

  return (
    <HeaderContainer gray200={colors.gray200}>
      <Logo mainColor={colors.mainColor} onClick={() => router.push('/')}>
        <LogoIcon>🎯</LogoIcon>
        <span>Wevra</span>
      </Logo>

      <Actions>
        <LanguageSelector
          mainColor={colors.mainColor}
          mainColorLight={colors.mainColorLight}
          gray300={colors.gray300}
          gray700={colors.gray700}
        >
          <span>🇺🇸</span>
          <LanguageLabel>English</LanguageLabel>
        </LanguageSelector>
      </Actions>
    </HeaderContainer>
  );
}
