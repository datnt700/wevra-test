/**
 * Dashboard Home Page
 * Main dashboard for restaurant owners and admins
 */
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { USER_ROLES, ROUTES } from '@/lib/constants';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { DashboardContent } from './_components/DashboardContent';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  // Get user's restaurants (if owner) or all restaurants (if admin)
  const restaurants =
    session.user.role === USER_ROLES.ADMIN
      ? await prisma.restaurant.findMany({
          orderBy: { createdAt: 'desc' },
          take: 10,
        })
      : []; // TODO: Add owner filter when we add owner relationship

  return (
    <DefaultLayout>
      <DashboardContent
        user={{
          name: session.user.name ?? null,
          email: session.user.email ?? null,
          role: session.user.role,
        }}
        restaurants={restaurants}
      />
    </DefaultLayout>
  );
}
