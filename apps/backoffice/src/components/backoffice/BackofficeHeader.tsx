'use client';

import { Menu, UtensilsCrossed, User, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Styled } from './BackofficeHeader.styles';
import { ROUTES } from '@/lib/constants';

interface BackofficeHeaderProps {
  onToggleSidebar: () => void;
  isMobile?: boolean;
}

export function BackofficeHeader({ onToggleSidebar, isMobile = false }: BackofficeHeaderProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: ROUTES.AUTH.LOGIN });
  };

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.LeftSection>
          <Styled.MenuButton onClick={onToggleSidebar} aria-label="Toggle sidebar">
            <Menu />
          </Styled.MenuButton>

          <Styled.Logo>
            <Styled.LogoIcon>
              <UtensilsCrossed size={20} />
            </Styled.LogoIcon>
            <Styled.LogoText $isMobile={isMobile}>TaviaO</Styled.LogoText>
          </Styled.Logo>
        </Styled.LeftSection>

        <Styled.RightSection>
          <Styled.UserInfo>
            <Styled.Avatar>
              <User size={16} />
            </Styled.Avatar>
            <Styled.UserName $isMobile={isMobile}>Admin</Styled.UserName>
          </Styled.UserInfo>

          <Styled.SignOutButton onClick={handleSignOut} aria-label="Sign out">
            <LogOut size={18} />
          </Styled.SignOutButton>
        </Styled.RightSection>
      </Styled.Content>
    </Styled.Wrapper>
  );
}
