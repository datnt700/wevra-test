import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { RestaurantSearch } from '@/components/RestaurantSearch';

export default async function HomePage() {
  return (
    <DefaultLayout>
      <RestaurantSearch />
    </DefaultLayout>
  );
}
