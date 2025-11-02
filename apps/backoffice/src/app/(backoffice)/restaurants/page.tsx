import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@tavia/taviad';
import { prisma } from '@/lib/prisma';
import { Styled } from './_components/RestaurantsList.styles';

/**
 * Restaurants List Page
 * Shows all restaurants with option to create new ones
 */
export default async function RestaurantsPage() {
  const t = await getTranslations('restaurants');

  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          bookings: true,
          tables: true,
        },
      },
    },
  });

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderLeft>
          <Styled.Title>{t('listTitle')}</Styled.Title>
          <Styled.Subtitle>{t('listSubtitle')}</Styled.Subtitle>
        </Styled.HeaderLeft>
        <Link href="/restaurants/new">
          <Button variant="primary">{t('createNewButton')}</Button>
        </Link>
      </Styled.Header>

      {restaurants.length === 0 ? (
        <Styled.EmptyState>
          <Styled.EmptyStateTitle>{t('noRestaurants')}</Styled.EmptyStateTitle>
          <Styled.EmptyStateDescription>{t('noRestaurantsDesc')}</Styled.EmptyStateDescription>
          <Link href="/restaurants/new">
            <Button variant="primary">{t('createButton')}</Button>
          </Link>
        </Styled.EmptyState>
      ) : (
        <Styled.RestaurantsGrid>
          {restaurants.map((restaurant) => (
            <Styled.RestaurantCard key={restaurant.id}>
              <Styled.RestaurantRow>
                <Styled.RestaurantLeft>
                  <Styled.RestaurantName>{restaurant.name}</Styled.RestaurantName>
                  <Styled.RestaurantDescription>
                    {restaurant.description}
                  </Styled.RestaurantDescription>

                  <Styled.RestaurantMeta>
                    <div>
                      <strong>{t('fields.cuisine')}:</strong> {restaurant.cuisine.join(', ')}
                    </div>
                    <div>
                      <strong>{t('fields.priceRange')}:</strong> {restaurant.priceRange}
                    </div>
                    <div>
                      <strong>{t('detail.totalTables')}:</strong> {restaurant._count.tables}
                    </div>
                    <div>
                      <strong>{t('detail.totalBookings')}:</strong> {restaurant._count.bookings}
                    </div>
                  </Styled.RestaurantMeta>

                  <Styled.RestaurantDetails>
                    <div>
                      <strong>{t('detail.address')}:</strong> {restaurant.address}
                    </div>
                    <div>
                      <strong>{t('detail.phone')}:</strong> {restaurant.phone}
                    </div>
                    <div>
                      <strong>{t('detail.email')}:</strong> {restaurant.email}
                    </div>
                  </Styled.RestaurantDetails>
                </Styled.RestaurantLeft>

                <Styled.RestaurantActions>
                  <Link href={`/restaurants/${restaurant.id}`}>
                    <Button variant="secondary">{t('viewButton')}</Button>
                  </Link>
                  <Link href={`/restaurants/${restaurant.id}/edit`}>
                    <Button variant="secondary">{t('editButton')}</Button>
                  </Link>
                </Styled.RestaurantActions>
              </Styled.RestaurantRow>
            </Styled.RestaurantCard>
          ))}
        </Styled.RestaurantsGrid>
      )}
    </Styled.Container>
  );
}
