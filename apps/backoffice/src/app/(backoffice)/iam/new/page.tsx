/**
 * IAM - Register New User Page
 * Admin page to register new system users
 */
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES, USER_ROLES } from '@/lib/constants';
import { RegisterUserForm } from '../_components/RegisterUserForm';

export default async function RegisterUserPage() {
  const session = await auth();

  // Only admins can register users
  if (!session?.user || session.user.role !== USER_ROLES.ADMIN) {
    redirect(ROUTES.DASHBOARD.HOME);
  }

  return <RegisterUserForm />;
}
