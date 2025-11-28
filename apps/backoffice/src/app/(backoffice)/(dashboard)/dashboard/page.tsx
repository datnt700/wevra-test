import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { getDashboardData } from './_actions/dashboard.actions';
import { DashboardClient } from './_components/DashboardClient';

/**
 * Dashboard Page - Overview of backoffice stats and quick actions
 * Shows: Groups, Events, Members stats and recent activity
 */
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  // Fetch dashboard data via server action
  const dashboardData = await getDashboardData();

  return <DashboardClient data={dashboardData} />;
}
