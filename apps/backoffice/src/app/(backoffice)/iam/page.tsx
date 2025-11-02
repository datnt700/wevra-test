/**
 * IAM (Identity and Access Management) Page
 * Admin page to manage system users and their roles
 */
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ROUTES, USER_ROLES } from '@/lib/constants';
import { IAMContent } from './_components/IAMContent';

export default async function IAMPage() {
  const session = await auth();

  // Only admins can access IAM
  if (!session?.user || session.user.role !== USER_ROLES.ADMIN) {
    redirect(ROUTES.DASHBOARD.HOME);
  }

  // Fetch all users with backoffice access
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.EMPLOYEE],
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
