import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { EditRestaurantForm } from './_components';
import type { RestaurantFormData } from '../../new/_types';

/**
 * Restaurant Edit Page
 * Allows editing of restaurant information
 */
export default async function EditRestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('restaurants');
  const { id } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
  });

  if (!restaurant) {
    notFound();
  }

  // Transform database data to form data
  const initialData: RestaurantFormData = {
    name: restaurant.name,
    description: restaurant.description || '',
    address: restaurant.address,
    phone: restaurant.phone,
    email: restaurant.email,
    cuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange as '$' | '$$' | '$$$' | '$$$$',
    image: restaurant.image || '',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {t('editTitle')}
        </h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          {t('editSubtitle')} {restaurant.name}
        </p>
      </div>

      <EditRestaurantForm restaurantId={id} initialData={initialData} />
    </div>
  );
}
