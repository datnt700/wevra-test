import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Button, Card } from '@tavia/taviad';
import { prisma } from '@/lib/prisma';

/**
 * Restaurant Detail Page
 * Shows detailed information about a specific restaurant
 */
export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations('restaurants');
  const { id } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    include: {
      tables: true,
      bookings: {
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    notFound();
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/restaurants">
          <Button variant="secondary">{t('detail.backButton')}</Button>
        </Link>
      </div>

      {/* Restaurant Info */}
      <Card>
        <div style={{ padding: '2rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '2rem',
            }}
          >
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {restaurant.name}
              </h1>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.25rem' }}>{restaurant.priceRange}</span>
                <span style={{ color: '#666' }}>•</span>
                <span style={{ color: '#666' }}>{restaurant.cuisine.join(', ')}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link href={`/restaurants/${restaurant.id}/edit`}>
                <Button variant="primary">{t('detail.editRestaurant')}</Button>
              </Link>
            </div>
          </div>

          {restaurant.image && (
            <div
              style={{
                marginBottom: '2rem',
                position: 'relative',
                width: '100%',
                height: '400px',
              }}
            >
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
              />
            </div>
          )}

          {restaurant.description && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {t('detail.description')}
              </h2>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{restaurant.description}</p>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {t('detail.contactInfo')}
              </h3>
              <div style={{ color: '#666' }}>
                <p>
                  <strong>{t('detail.phone')}:</strong> {restaurant.phone}
                </p>
                <p>
                  <strong>{t('detail.email')}:</strong> {restaurant.email}
                </p>
                <p>
                  <strong>{t('detail.address')}:</strong> {restaurant.address}
                </p>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {t('detail.statistics')}
              </h3>
              <div style={{ color: '#666' }}>
                <p>
                  <strong>{t('detail.totalTables')}:</strong> {restaurant.tables.length}
                </p>
                <p>
                  <strong>{t('detail.totalBookings')}:</strong> {restaurant.bookings.length}
                </p>
                <p>
                  <strong>{t('detail.status')}:</strong>{' '}
                  {restaurant.isActive ? t('detail.active') : t('detail.inactive')}
                </p>
                <p>
                  <strong>{t('detail.rating')}:</strong> {restaurant.rating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tables Section */}
      <div style={{ marginTop: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{t('detail.tables')}</h2>
          <Link href={`/restaurants/${restaurant.id}/tables/new`}>
            <Button variant="primary">{t('detail.addTable')}</Button>
          </Link>
        </div>

        {restaurant.tables.length === 0 ? (
          <Card>
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              <p>{t('detail.noTables')}</p>
            </div>
          </Card>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {restaurant.tables.map((table) => (
              <Card key={table.id}>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {t('detail.tableNumber')} {table.number}
                  </h3>
                  <p style={{ color: '#666', fontSize: '0.875rem' }}>
                    {t('detail.capacity')}: {table.capacity} {t('detail.guests')}
                  </p>
                  <p
                    style={{
                      color: table.isAvailable ? '#0a0' : '#a00',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                    }}
                  >
                    {table.isAvailable ? t('detail.available') : t('detail.unavailable')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {t('detail.recentBookings')}
        </h2>

        {restaurant.bookings.length === 0 ? (
          <Card>
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              <p>{t('detail.noBookings')}</p>
            </div>
          </Card>
        ) : (
          <Card>
            <div style={{ padding: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>{t('detail.guest')}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>{t('detail.date')}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>{t('detail.time')}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                      {t('detail.guestsCount')}
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>{t('detail.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurant.bookings.map((booking) => (
                    <tr key={booking.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '0.75rem' }}>
                        {booking.user.name || booking.user.email}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '0.75rem' }}>{booking.time}</td>
                      <td style={{ padding: '0.75rem' }}>{booking.guests}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.875rem',
                            backgroundColor:
                              booking.status === 'CONFIRMED'
                                ? '#e0f7e0'
                                : booking.status === 'PENDING'
                                  ? '#fff4e0'
                                  : '#ffe0e0',
                            color:
                              booking.status === 'CONFIRMED'
                                ? '#0a0'
                                : booking.status === 'PENDING'
                                  ? '#f90'
                                  : '#a00',
                          }}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
