import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { registerUser, type RegisterUserPayload } from '../_services/iamService';
import { ROUTES } from '@/lib/constants';

/**
 * Hook for registering a new user
 */
export function useRegisterUser() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterUserPayload) => registerUser(data),
    onSuccess: () => {
      // Redirect to user list after successful registration
      setTimeout(() => {
        router.push(ROUTES.IAM.LIST);
        router.refresh();
      }, 1500);
    },
  });
}
