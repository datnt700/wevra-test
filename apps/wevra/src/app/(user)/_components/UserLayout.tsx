'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Map, Users, Coins, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UserHeader } from './UserHeader';
import { AIAssistant } from './AIAssistant';
import { Styled } from './UserLayout.styles';

interface Props {
  children: React.ReactNode;
}

export function UserLayout({ children }: Props) {
  const tNav = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    {
      label: tNav('journey'),
      icon: Map,
      href: '/journey',
    },
    {
      label: tNav('treasury'),
      icon: Coins,
      href: '/treasury',
    },
    {
      label: tNav('community'),
      icon: Users,
      href: '/community',
    },
  ];

  const handleLogout = async () => {
    await signOut({ redirectTo: '/login' });
  };

  return (
    <Styled.Container>
      <Styled.Sidebar>
        <div>
          <Styled.Logo>{tCommon('appName')}</Styled.Logo>
        </div>

        <Styled.Nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Styled.NavItem
                key={item.href}
                $isActive={isActive}
                onClick={() => router.push(item.href)}
              >
                <Icon />
                {item.label}
              </Styled.NavItem>
            );
          })}
        </Styled.Nav>

        <Styled.SidebarFooter>
          <Styled.LogoutButton onClick={handleLogout}>
            <LogOut />
            {tNav('logout')}
          </Styled.LogoutButton>
        </Styled.SidebarFooter>
      </Styled.Sidebar>

      <Styled.MainContent>
        <UserHeader userId={session?.user?.id ?? ''} />
        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
      </Styled.MainContent>

      <AIAssistant />
    </Styled.Container>
  );
}
