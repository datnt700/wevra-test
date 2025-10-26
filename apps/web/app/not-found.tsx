'use client';

import { useTranslations } from 'next-intl';
import { Link, Button } from '@tavia/core';
import { Styled } from './NotFound.styles';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Title>404</Styled.Title>
        <Styled.Subtitle>{t('notFound')}</Styled.Subtitle>
        <Styled.Message>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Styled.Message>
        <Link url="/">
          <Button variant="primary">Go back home</Button>
        </Link>
      </Styled.Content>
    </Styled.Container>
  );
}
