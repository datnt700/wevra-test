import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/constants';
import { GroupDetailClient } from './_components/GroupDetailClient';
import { groupDetailSelect, type MembershipStatus } from '@tavia/database';

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
    redirect(ROUTES.LOGIN);
  }

  const group = await prisma.group.findUnique({
    where: { id },
    select: groupDetailSelect,
  });

  if (!group) {
    notFound();
  }

  // Check if user is the owner
  const isOwner = group.ownerId === session.user.id;

  // Check user's membership status
  let membershipStatus: MembershipStatus | null = null;
  if (!isOwner) {
    const membership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: id,
          userId: session.user.id,
        },
      },
      select: {
        status: true,
      },
    });
    membershipStatus = membership?.status || null;
  }

  return <GroupDetailClient group={group} membershipStatus={membershipStatus} isOwner={isOwner} />;
}
