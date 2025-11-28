import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { MembersPageClient } from './_components/MembersPageClient';
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
    <MembersPageClient
      groupId={group.id}
      groupName={group.name}
      activeMembers={activeMembers}
      pendingMembers={pendingMembers}
      maxMembers={maxMembers}
    />
  );
}
