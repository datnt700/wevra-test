'use client';

import { useTranslations } from 'next-intl';
import { Styled } from './TopBar.styles';

export function TopBar() {
  const t = useTranslations('navigation');

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Link url="/register-restaurant">{t('registerRestaurant')}</Styled.Link>
        <Styled.Link url="/help">{t('help')}</Styled.Link>
      </Styled.Content>
    </Styled.Wrapper>
  );
}
