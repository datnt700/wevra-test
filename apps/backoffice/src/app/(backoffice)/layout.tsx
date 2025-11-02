import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { BackofficeLayoutClient } from '@/components/backoffice';

/**
 * Backoffice Layout (Server Component)
 * Handles authentication and renders client layout
 *
 * Responsive behavior:
 * - Desktop (1024px+): Sidebar pushes content, open by default
 * - Mobile/Tablet (<1024px): Sidebar overlays content with backdrop, closed by default
 */
export default async function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return <BackofficeLayoutClient>{children}</BackofficeLayoutClient>;
}
