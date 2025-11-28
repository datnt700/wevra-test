import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { Button } from '@tavia/taviad';
import Link from 'next/link';

interface GroupDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: GroupDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const group = await prisma.group.findUnique({
    where: { id },
    select: { name: true, description: true },
  });

  if (!group) {
    return { title: 'Group Not Found' };
  }

  return {
    title: group.name,
    description: group.description || `Join ${group.name} community`,
  };
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const session = await auth();
  const { id } = await params;
  const t = await getTranslations('groups');

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          members: true,
          events: true,
        },
      },
    },
  });

  if (!group) {
    notFound();
  }

  // Check if user is the owner
  const isOwner = group.ownerId === session.user.id;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Cover Image */}
      {group.image && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <img src={group.image} alt={group.name} className="h-64 w-full object-cover" />
        </div>
      )}

      {/* Group Header */}
      <div className="mb-6 rounded-lg bg-white p-8 shadow-md">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-3xl font-bold">{group.name}</h1>
              {group.isPremium && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                  {t('detail.premium')}
                </span>
              )}
              {!group.isPublic && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
                  {t('detail.private')}
                </span>
              )}
            </div>
            <p className="text-gray-600">{group.category}</p>
            {group.location && <p className="mt-1 text-sm text-gray-500">📍 {group.location}</p>}
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <Link href={ROUTES.GROUP.EDIT(group.id)}>
                <Button variant="primary">{t('detail.editGroup')}</Button>
              </Link>
              <Link href={ROUTES.GROUP.MEMBERS(group.id)}>
                <Button variant="secondary">{t('detail.manageMembers')}</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center gap-6 text-sm text-gray-600">
          <span>
            {group._count.members} {t('detail.members').toLowerCase()}
          </span>
          <span>
            {group._count.events} {t('detail.totalEvents').toLowerCase()}
          </span>
        </div>

        {group.description && (
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{group.description}</p>
          </div>
        )}
      </div>

      {/* Organizer Info */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">{t('detail.organizedBy')}</h2>
        <div className="flex items-center gap-3">
          {group.owner.image && (
            <img
              src={group.owner.image}
              alt={group.owner.name || 'Organizer'}
              className="h-12 w-12 rounded-full"
            />
          )}
          <div>
            <p className="font-medium">{group.owner.name}</p>
            <p className="text-sm text-gray-500">{t('detail.owner')}</p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t('detail.upcomingEvents')}</h2>
          {isOwner && (
            <Link href={`${ROUTES.EVENT.NEW}?groupId=${group.id}`}>
              <Button variant="primary" className="px-4 py-2 text-sm">
                {t('detail.createEvent')}
              </Button>
            </Link>
          )}
        </div>
        <p className="text-gray-600">
          {t('detail.noEvents')} {isOwner && t('detail.noEvents')}
        </p>
      </div>
    </div>
  );
}
