'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Styled } from './HomePageClient.styles';
import { useTheme } from '@emotion/react';
import { Button, EventureTheme } from '@eventure/eventured';
import { Header } from '@/components/Header';
import { LanguageFooter } from '@/components/LanguageFooter';

export default function HomePage({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const router = useRouter();
  const theme = useTheme() as EventureTheme;
  const colors = {
    mainColor: theme.colors.primary,
    mainColorLight: theme.colors.gray.mainColorLight,
    gray300: theme.colors.gray.gray300,
    gray900: theme.colors.gray.gray900,
  };

  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.Content>
          <Styled.IllustrationSection>
            <Styled.Illustration
              mainColorLight={colors.mainColorLight}
              mainColor={colors.mainColor}
            >
              <Styled.MainEmoji>🎯</Styled.MainEmoji>
            </Styled.Illustration>
          </Styled.IllustrationSection>

          <Styled.CTASection>
            <Styled.Title gray900={colors.gray900}>{t('title')}</Styled.Title>

            <Styled.ButtonsContainer>
              <Button
                variant="primary"
                shape="rounded"
                onClick={() => router.push(`/${locale}/quiz`)}
              >
                {t('startButton')}
              </Button>
              <Button variant="secondary" shape="rounded" onClick={() => router.push('/login')}>
                {t('alreadyHaveAccount')}
              </Button>
            </Styled.ButtonsContainer>
          </Styled.CTASection>
        </Styled.Content>
      </Styled.Container>
      <LanguageFooter />
    </>
  );
}
