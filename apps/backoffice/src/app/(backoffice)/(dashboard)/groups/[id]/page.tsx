import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { GroupDetailClient } from './_components/GroupDetailClient';

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

  return <GroupDetailClient group={group} isOwner={isOwner} />;
}
