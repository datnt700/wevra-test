/**
 * Not Found Page (404)
 * Displayed when a route doesn't exist
 */
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@tavia/taviad';
import { Styled } from './not-found.styles';

export default function NotFound() {
  const t = useTranslations('errors.notFoundPage');

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.IconContainer>
          <Styled.Icon404>404</Styled.Icon404>
        </Styled.IconContainer>
        <Styled.Title>{t('title')}</Styled.Title>
        <Styled.Message>{t('message')}</Styled.Message>
        <Styled.ButtonGroup>
          <Link href="/">
            <Button variant="primary">{t('goHomepage')}</Button>
          </Link>
        </Styled.ButtonGroup>
      </Styled.Card>
    </Styled.Container>
  );
}
