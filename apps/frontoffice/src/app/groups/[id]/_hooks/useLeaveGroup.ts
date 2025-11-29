/**
 * useLeaveGroup Hook
 * React Query mutation for leaving a group
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { leaveGroup } from '../_services/groupService';

export function useLeaveGroup(groupId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('groups');

  return useMutation({
    mutationFn: () => leaveGroup(groupId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || t('leave.success'));
        // Invalidate and refetch group data
        queryClient.invalidateQueries({ queryKey: ['group', groupId] });
        router.refresh();
      } else {
        toast.error(data.error || t('leave.error'));
      }
    },
    onError: () => {
      toast.error(t('leave.error'));
    },
  });
}
