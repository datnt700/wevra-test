'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { InputSearch } from '@tavia/taviad';
import { User, UtensilsCrossed } from 'lucide-react';
import { Styled } from './Header.styles';

export function Header() {
  const t = useTranslations('navigation');
  const tHome = useTranslations('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show search bar after scrolling 250px (after intro section)
      setIsScrolled(window.scrollY > 250);
    };

    // Check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to search results or trigger search
      window.location.href = `/restaurants?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Styled.Wrapper
      $isScrolled={isScrolled}
      animate={{
        backgroundColor: isScrolled ? '#ffffff' : '#ffffff',
        boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Styled.Content $isScrolled={isScrolled}>
        <Styled.Logo
          $isScrolled={isScrolled}
          onClick={() => (window.location.href = '/')}
          animate={{
            scale: isScrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Styled.LogoIcon>
            <UtensilsCrossed size={24} />
          </Styled.LogoIcon>
          <Styled.LogoText>Tavia</Styled.LogoText>
        </Styled.Logo>

        <Styled.Nav
          $isScrolled={isScrolled}
          animate={{
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Styled.NavLink url="/">{t('home')}</Styled.NavLink>
          <Styled.NavLink url="/restaurants">{t('restaurants')}</Styled.NavLink>
          <Styled.NavLink url="/about">{t('about')}</Styled.NavLink>
          <Styled.NavLink url="/contact">{t('contact')}</Styled.NavLink>
        </Styled.Nav>

        <Styled.SearchBarContainer
          $isScrolled={isScrolled}
          animate={{
            maxWidth: isScrolled ? '600px' : '0px',
            opacity: isScrolled ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <InputSearch
            placeholder={tHome('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Styled.SearchBarContainer>

        <Styled.Actions>
          <Styled.Button
            variant="primary"
            shape="default"
            onClick={() => (window.location.href = '/login')}
            icon={<User size={16} />}
          >
            {t('login')}
          </Styled.Button>
        </Styled.Actions>
      </Styled.Content>
    </Styled.Wrapper>
  );
}
