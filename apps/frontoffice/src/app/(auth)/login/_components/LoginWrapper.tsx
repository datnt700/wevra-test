/**
 * Login Wrapper Component
 * Reusable layout wrapper for login page
 */
'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@tavia/taviad';
import { Styled } from '../LoginPage.styles';

interface LoginWrapperProps {
  children: ReactNode;
  footerLink: ReactNode;
}

export function LoginWrapper({ children, footerLink }: LoginWrapperProps) {
  const t = useTranslations();

  return (
    <Styled.Container>
      <Styled.Wrapper>
        {/* Logo and Header */}
        <Styled.Header>
          <Styled.Logo>{t('common.appName')}</Styled.Logo>
        </Styled.Header>

        {/* Login Card */}
        <Card variant="elevated">
          <Styled.CardHeader>
            <Styled.Title>{t('auth.login.title')}</Styled.Title>
          </Styled.CardHeader>

          {children}

          {/* Footer */}
          <Styled.CardFooter>
            {t('auth.login.noAccount')} {footerLink}
          </Styled.CardFooter>
        </Card>

        {/* Copyright */}
        <Styled.Copyright>
          {t('auth.login.copyright', { year: new Date().getFullYear() })}
        </Styled.Copyright>
      </Styled.Wrapper>
    </Styled.Container>
  );
}
