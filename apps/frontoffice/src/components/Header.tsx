'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { User, Calendar, MapPin, Search, LogOut } from 'lucide-react';
import { Avatar, DropdownMenu } from '@tavia/taviad';
import { Styled } from './Header.styles';
import { getInitials } from '@/lib/helpers';
import { ROUTES, buildEventSearchUrl } from '@/lib/constants';

export function Header() {
  const { data: session } = useSession();
  const t = useTranslations('navigation');
  const tHome = useTranslations('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('Orly');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = buildEventSearchUrl(searchQuery);
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Logo onClick={() => (window.location.href = ROUTES.HOME)}>
          <Styled.LogoIcon>
            <Calendar size={20} />
          </Styled.LogoIcon>
          <Styled.LogoText>Tavia</Styled.LogoText>
        </Styled.Logo>

        <Styled.SearchContainer>
          <Styled.SearchWrapper>
            <Styled.SearchInputWrapper>
              <Search size={18} />
              <input
                type="text"
                placeholder={tHome('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </Styled.SearchInputWrapper>

            <Styled.Divider />

            <Styled.LocationInputWrapper>
              <MapPin size={16} />
              <input
                type="text"
                placeholder="Location"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </Styled.LocationInputWrapper>

            <Styled.SearchButton onClick={handleSearch}>
              <Search size={20} />
            </Styled.SearchButton>
          </Styled.SearchWrapper>
        </Styled.SearchContainer>

        <Styled.Actions>
          <Styled.NavLink url={ROUTES.CREATE_GROUP}>{t('createGroup')}</Styled.NavLink>

          {session?.user ? (
            <DropdownMenu
              trigger={
                <div style={{ cursor: 'pointer', display: 'flex' }}>
                  <Avatar
                    size="sm"
                    src={session.user.image || undefined}
                    alt={session.user.name || 'User'}
                    fallback={getInitials(session.user.name)}
                  />
                </div>
              }
              items={[
                {
                  label: t('logout'),
                  icon: <LogOut size={16} />,
                  onSelect: () => signOut({ callbackUrl: ROUTES.HOME }),
                },
              ]}
            />
          ) : (
            <Styled.Button
              variant="tertiary"
              shape="default"
              onClick={() => (window.location.href = ROUTES.LOGIN)}
              icon={<User size={16} />}
            >
              {t('login')}
            </Styled.Button>
          )}
        </Styled.Actions>
      </Styled.Content>
    </Styled.Wrapper>
  );
}
