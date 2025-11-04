/**
 * IAM (Identity and Access Management) Page
 * Admin page to manage system users and their roles
 */
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { ROUTES } from '@/lib/constants';
import { IAMContent } from './_components/IAMContent';

export default async function IAMPage() {
  const session = await auth();

  // Only admins can access IAM
  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    redirect(ROUTES.DASHBOARD.HOME);
  }

  // Fetch all users with backoffice access
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE],
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <IAMContent users={users} />;
}
