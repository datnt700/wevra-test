/**
 * React Query hooks for group operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createGroup,
  updateGroup,
  deleteGroup,
  approveMember,
  removeMember,
  type CreateGroupData,
  type UpdateGroupData,
} from '../_services/groupService';

/**
 * Hook for creating a group
 */
export function useCreateGroup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGroupData) => createGroup(data),
    onSuccess: (response) => {
      // Invalidate groups list cache
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      return response;
    },
  });
}

/**
 * Hook for updating a group
 */
export function useUpdateGroup(groupId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateGroupData) => updateGroup(groupId, data),
    onSuccess: () => {
      // Invalidate specific group and groups list cache
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}

/**
 * Hook for deleting a group
 */
export function useDeleteGroup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => deleteGroup(groupId),
    onSuccess: () => {
      // Invalidate groups list cache
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}

/**
 * Hook for approving a member
 */
export function useApproveMember(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => approveMember(groupId, memberId),
    onSuccess: () => {
      // Invalidate group members cache
      queryClient.invalidateQueries({ queryKey: ['group', groupId, 'members'] });
    },
  });
}

/**
 * Hook for removing/rejecting a member
 */
export function useRemoveMember(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => removeMember(groupId, memberId),
    onSuccess: () => {
      // Invalidate group members cache
      queryClient.invalidateQueries({ queryKey: ['group', groupId, 'members'] });
    },
  });
}
