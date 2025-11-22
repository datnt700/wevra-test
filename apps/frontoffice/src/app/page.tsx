import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { EventSearch } from '@/components/EventSearch';

export default async function HomePage() {
  return (
    <DefaultLayout>
      <EventSearch />
    </DefaultLayout>
  );
}
