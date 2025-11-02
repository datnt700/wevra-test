'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Star, UtensilsCrossed } from 'lucide-react';
import { Stack, ErrorState, InputSearch, Button } from '@tavia/taviad';
import {
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  SearchContainer,
  SearchGrid,
  MainContent,
  SectionTitle,
  RestaurantGrid,
  RestaurantCard,
  RestaurantImage,
  RestaurantContent,
  RestaurantHeader,
  RestaurantName,
  RatingContainer,
  RestaurantMeta,
  RestaurantDescription,
  RestaurantFooter,
  LocationText,
  StyledBadge,
  SmallButton,
  CenteredMessage,
} from '@/app/page.styles';
import { useSearchRestaurants } from '@/hooks/useRestaurants';

export function RestaurantSearch() {
  const t = useTranslations('home');
  const tErrors = useTranslations('errors');
  const [searchQuery, setSearchQuery] = useState('');

  // Use React Query hook
  const { data, isLoading, error } = useSearchRestaurants({
    location: searchQuery,
    page: 1,
    limit: 12,
  });

  if (error) {
    return (
      <MainContent>
        <CenteredMessage>
          <ErrorState
            title={tErrors('loadingRestaurants')}
            subTitle={tErrors('loadingRestaurantsDescription')}
            action={
              <Button variant="primary" onClick={() => window.location.reload()}>
                {tErrors('tryAgain')}
              </Button>
            }
          />
        </CenteredMessage>
      </MainContent>
    );
  }

  return (
    <>
      <HeroSection>
        <HeroTitle>{t('title')}</HeroTitle>
        <HeroSubtitle>{t('subtitle')}</HeroSubtitle>

        <SearchContainer>
          <SearchGrid>
            <InputSearch
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchGrid>
        </SearchContainer>
      </HeroSection>

      <MainContent>
        <SectionTitle>{t('popularNearYou')}</SectionTitle>

        {isLoading ? (
          <CenteredMessage>
            <p>Loading restaurants...</p>
          </CenteredMessage>
        ) : (
          <>
            <RestaurantGrid>
              {data?.restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id}>
                  <RestaurantImage src={restaurant.image} alt={restaurant.name} />
                  <RestaurantContent>
                    <RestaurantHeader>
                      <RestaurantName>{restaurant.name}</RestaurantName>
                      <RatingContainer>
                        <Star size={16} fill="currentColor" />
                        {restaurant.rating}
                      </RatingContainer>
                    </RestaurantHeader>

                    <RestaurantMeta>
                      <StyledBadge $isOpen={restaurant.isOpen}>
                        {restaurant.isOpen ? t('openNow') : t('closedNow')}
                      </StyledBadge>
                      <StyledBadge>
                        <UtensilsCrossed size={12} />
                        {restaurant.cuisine}
                      </StyledBadge>
                      <StyledBadge>{restaurant.priceRange}</StyledBadge>
                    </RestaurantMeta>

                    <RestaurantDescription>{restaurant.description}</RestaurantDescription>

                    <RestaurantFooter>
                      <LocationText>
                        <MapPin size={14} />
                        {restaurant.distance}
                      </LocationText>
                      <Stack direction="row" spacing="sm">
                        <SmallButton variant="secondary">{t('viewMenu')}</SmallButton>
                        <SmallButton variant="primary" disabled={!restaurant.isOpen}>
                          {t('book')}
                        </SmallButton>
                      </Stack>
                    </RestaurantFooter>
                  </RestaurantContent>
                </RestaurantCard>
              ))}
            </RestaurantGrid>

            {data?.restaurants.length === 0 && (
              <CenteredMessage>
                <h3>{t('noResults')}</h3>
                <p>{t('tryDifferentSearch')}</p>
              </CenteredMessage>
            )}
          </>
        )}
      </MainContent>
    </>
  );
}
