import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { EditProfileClient } from './_components/EditProfileClient';

export default async function ProfileEditPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <EditProfileClient user={session.user} />;
}
