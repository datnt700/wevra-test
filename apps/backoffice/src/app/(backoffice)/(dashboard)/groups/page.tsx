import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { GroupsPageClient } from './_components/GroupsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('groups');
  return {
    title: t('listTitle'),
    description: t('listSubtitle'),
  };
}

export default async function GroupsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  // Fetch user's groups
  const groups = await prisma.group.findMany({
    where: {
      ownerId: session.user.id,
    },
    include: {
      _count: {
        select: {
          members: true,
          events: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <GroupsPageClient groups={groups} />;
}
