/**
 * Root Page - Redirects to dashboard or login
 * Eventure Backoffice for Restaurant & Café Management
 */
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
