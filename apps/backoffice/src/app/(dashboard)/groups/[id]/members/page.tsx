import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { MembersList } from './_components/MembersList';
import { getMaxMembers } from '@/lib/features/planLimits';

interface MembersPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MembersPageProps): Promise<Metadata> {
  const { id } = await params;
  const t = await getTranslations('groups');
  const group = await prisma.group.findUnique({
    where: { id },
    select: { name: true },
  });

  if (!group) {
    return { title: t('members.title') };
  }

  return {
    title: `${t('members.title')} - ${group.name}`,
    description: `Manage members and join requests for ${group.name}`,
  };
}

export default async function MembersPage({ params }: MembersPageProps) {
  const session = await auth();
  const { id } = await params;
  const t = await getTranslations('groups');

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!group) {
    notFound();
  }

  // Check if user is the owner
  if (group.ownerId !== session.user.id) {
    redirect(ROUTES.GROUP.DETAIL(id));
  }

  const maxMembers = getMaxMembers(group);
  const activeMembers = group.members.filter((m) => m.status === 'ACTIVE');
  const pendingMembers = group.members.filter((m) => m.status === 'PENDING');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{t('members.title')}</h1>
        <p className="text-gray-600">{group.name}</p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="font-medium">
            {maxMembers === Infinity
              ? t('members.memberCountUnlimited', { count: activeMembers.length })
              : t('members.memberCount', { count: activeMembers.length, max: maxMembers })}
          </span>
          {pendingMembers.length > 0 && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800">
              {t('members.memberCount', { count: pendingMembers.length, max: 0 }).split(' / ')[0]}{' '}
              {t('members.pendingRequests').toLowerCase()}
            </span>
          )}
        </div>
      </div>

      <MembersList
        groupId={group.id}
        activeMembers={activeMembers}
        pendingMembers={pendingMembers}
        maxMembers={maxMembers}
      />
    </div>
  );
}
