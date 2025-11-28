import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { canCreateGroup } from '@/lib/features/planLimits';
import { CreateGroupForm } from './_components/CreateGroupForm';
import { ROUTES } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('groups');
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function CreateGroupPage() {
  const session = await auth();
  const _t = await getTranslations('groups');

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  // Check if user can create groups (Premium only)
  const canCreate = canCreateGroup({
    id: session.user.id,
    subscriptionStatus: session.user.subscriptionStatus,
    groupCount: 0, // Will be fetched in form if needed
  });

  if (!canCreate) {
    redirect(ROUTES.DASHBOARD.UPGRADE);
  }

  return <CreateGroupForm userId={session.user.id} />;
}
