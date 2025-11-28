import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { BackofficeLayoutClient } from '@/components/backoffice';

/**
 * Backoffice Layout (Server Component)
 * Handles authentication and renders client layout
 */
export default async function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return <BackofficeLayoutClient>{children}</BackofficeLayoutClient>;
}
