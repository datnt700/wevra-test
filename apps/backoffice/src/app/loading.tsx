/**
 * Loading Page
 * Displayed while page content is being fetched
 */
'use client';

import { useTranslations } from 'next-intl';
import { Spinner } from '@tavia/taviad';
import { Styled } from './loading.styles';

export default function Loading() {
  const t = useTranslations('errors.loading');

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.SpinnerContainer>
          <Spinner size="lg" />
        </Styled.SpinnerContainer>
        <Styled.Title>{t('title')}</Styled.Title>
        <Styled.Message>{t('message')}</Styled.Message>
      </Styled.Card>
    </Styled.Container>
  );
}
