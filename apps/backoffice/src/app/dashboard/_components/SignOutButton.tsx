'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@tavia/taviad';
import { ROUTES } from '@/lib/constants';

export function SignOutButton() {
  return (
    <Button variant="secondary" onClick={() => signOut({ callbackUrl: ROUTES.AUTH.LOGIN })}>
      Sign Out
    </Button>
  );
}
