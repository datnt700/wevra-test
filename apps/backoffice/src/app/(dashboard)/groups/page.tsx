import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { Button } from '@tavia/taviad';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('groups');
  return {
    title: t('listTitle'),
    description: t('listSubtitle'),
  };
}

export default async function GroupsPage() {
  const session = await auth();
  const t = await getTranslations('groups');

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{t('listTitle')}</h1>
          <p className="text-gray-600">{t('listSubtitle')}</p>
        </div>
        <Link href={ROUTES.GROUP.NEW}>
          <Button variant="primary">{t('createButton')}</Button>
        </Link>
      </div>

      {groups.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="mb-2 text-xl font-semibold">{t('noGroups')}</h3>
          <p className="mb-6 text-gray-600">{t('noGroupsDesc')}</p>
          <Link href={ROUTES.GROUP.NEW}>
            <Button variant="primary">{t('createNewButton')}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link key={group.id} href={ROUTES.GROUP.DETAIL(group.id)} className="block">
              <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
                {group.image && (
                  <img src={group.image} alt={group.name} className="h-48 w-full object-cover" />
                )}
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{group.name}</h3>
                    {group.isPremium && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        {t('detail.premium')}
                      </span>
                    )}
                  </div>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {group._count.members} {t('detail.members').toLowerCase()}
                    </span>
                    <span>
                      {group._count.events} {t('detail.totalEvents').toLowerCase()}
                    </span>
                  </div>
                  {group.location && (
                    <p className="mt-2 text-sm text-gray-500">📍 {group.location}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
