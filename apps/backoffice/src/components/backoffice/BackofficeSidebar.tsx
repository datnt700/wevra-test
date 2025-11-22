'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Users as GroupIcon,
  Calendar,
  Users,
  Settings,
  Shield,
} from 'lucide-react';
import { Styled } from './BackofficeSidebar.styles';

interface BackofficeSidebarProps {
  isOpen: boolean;
  isMobile?: boolean;
}

const menuItems = [
  {
    labelKey: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    labelKey: 'groups',
    href: '/groups',
    icon: GroupIcon,
  },
  {
    labelKey: 'events',
    href: '/events',
    icon: Calendar,
  },
  {
    labelKey: 'iam',
    href: '/iam',
    icon: Shield,
  },
  {
    labelKey: 'users',
    href: '/users',
    icon: Users,
  },
  {
    labelKey: 'settings',
    href: '/settings',
    icon: Settings,
  },
];

export function BackofficeSidebar({ isOpen, isMobile = false }: BackofficeSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <Styled.Wrapper
      $isOpen={isOpen}
      $isMobile={isMobile}
      initial={false}
      animate={{
        width: isMobile ? (isOpen ? '260px' : '0px') : isOpen ? '260px' : '64px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Styled.Content $isOpen={isOpen}>
        <Styled.Nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Styled.NavItemWrapper key={item.href} $isActive={active} $isOpen={isOpen}>
                <Link href={item.href}>
                  <Icon />
                  <span>{t(item.labelKey)}</span>
                </Link>
              </Styled.NavItemWrapper>
            );
          })}
        </Styled.Nav>
      </Styled.Content>
    </Styled.Wrapper>
  );
}
