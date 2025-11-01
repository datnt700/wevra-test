import { getTranslations } from 'next-intl/server';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { CreateRestaurantForm } from './_components';

/**
 * Create Restaurant Page
 * Allows restaurant owners to create new cafe/restaurant listings
 */
export default async function CreateRestaurantPage() {
  const t = await getTranslations('restaurants');

  return (
    <DefaultLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {t('title')}
          </h1>
          <p style={{ color: '#666' }}>{t('subtitle')}</p>
        </div>

        <CreateRestaurantForm />
      </div>
    </DefaultLayout>
  );
}
