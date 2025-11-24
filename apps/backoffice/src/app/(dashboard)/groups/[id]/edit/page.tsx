import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { EditGroupForm } from './_components/EditGroupForm';

interface EditGroupPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditGroupPageProps): Promise<Metadata> {
  const { id } = await params;
  const t = await getTranslations('groups');
  const group = await prisma.group.findUnique({
    where: { id },
    select: { name: true },
  });

  if (!group) {
    return { title: t('edit.title') };
  }

  return {
    title: `${t('edit.title')} - ${group.name}`,
    description: t('edit.subtitle'),
  };
}

export default async function EditGroupPage({ params }: EditGroupPageProps) {
  const session = await auth();
  const { id } = await params;
  const t = await getTranslations('groups');

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const group = await prisma.group.findUnique({
    where: { id },
  });

  if (!group) {
    notFound();
  }

  // Check if user is the owner
  if (group.ownerId !== session.user.id) {
    redirect(ROUTES.GROUP.DETAIL(id));
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{t('edit.title')}</h1>
        <p className="text-gray-600">{t('edit.subtitle')}</p>
      </div>

      <EditGroupForm group={group} />
    </div>
  );
}
