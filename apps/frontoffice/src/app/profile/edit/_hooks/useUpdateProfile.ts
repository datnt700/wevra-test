/**
 * React Query hooks for profile operations
 */

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { updateProfile, type UpdateProfileData } from '../_services/profileService';

interface UseUpdateProfileOptions {
  onSuccessCallback?: () => void;
}

/**
 * Hook for updating user profile
 * Handles success/error states with toast notifications
 */
export function useUpdateProfile(options?: UseUpdateProfileOptions) {
  const router = useRouter();
  const t = useTranslations('profile');

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error || t('errors.updateFailed'));
        return;
      }

      toast.success(t('success.profileUpdated'));

      // Call custom callback if provided
      if (options?.onSuccessCallback) {
        options.onSuccessCallback();
      }

      // Navigate back and refresh data
      router.back();
      router.refresh();
    },
    onError: (error: Error) => {
      console.error('Update profile error:', error);
      toast.error(t('errors.unexpectedError'));
    },
  });
}
