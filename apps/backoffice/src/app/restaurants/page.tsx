import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@tavia/taviad';
import { prisma } from '@/lib/prisma';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';

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
    <DefaultLayout>
      <div style={{ padding: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {t('listTitle')}
            </h1>
            <p style={{ color: '#666' }}>{t('listSubtitle')}</p>
          </div>
          <Link href="/restaurants/new">
            <Button variant="primary">{t('createNewButton')}</Button>
          </Link>
        </div>

        {restaurants.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '0.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('noRestaurants')}</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>{t('noRestaurantsDesc')}</p>
            <Link href="/restaurants/new">
              <Button variant="primary">{t('createButton')}</Button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {restaurant.name}
                    </h3>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>{restaurant.description}</p>

                    <div
                      style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#666' }}
                    >
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
                    </div>

                    <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
                      <div>
                        <strong>{t('detail.address')}:</strong> {restaurant.address}
                      </div>
                      <div>
                        <strong>{t('detail.phone')}:</strong> {restaurant.phone}
                      </div>
                      <div>
                        <strong>{t('detail.email')}:</strong> {restaurant.email}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href={`/restaurants/${restaurant.id}`}>
                      <Button variant="secondary">{t('viewButton')}</Button>
                    </Link>
                    <Link href={`/restaurants/${restaurant.id}/edit`}>
                      <Button variant="secondary">{t('editButton')}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
