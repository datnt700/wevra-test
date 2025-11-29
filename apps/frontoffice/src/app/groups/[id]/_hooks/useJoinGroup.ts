/**
 * useJoinGroup Hook
 * React Query mutation for joining a group
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { joinGroup } from '../_services/groupService';

export function useJoinGroup(groupId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('groups');

  return useMutation({
    mutationFn: () => joinGroup(groupId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || t('join.success'));
        // Invalidate and refetch group data
        queryClient.invalidateQueries({ queryKey: ['group', groupId] });
        router.refresh();
      } else {
        toast.error(data.error || t('join.error'));
      }
    },
    onError: () => {
      toast.error(t('join.error'));
    },
  });
}
