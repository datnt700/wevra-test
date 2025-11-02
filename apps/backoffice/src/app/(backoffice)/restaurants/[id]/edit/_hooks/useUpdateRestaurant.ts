'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { updateRestaurant } from '../_services';
import type { RestaurantFormData } from '../../../new/_types';

/**
 * Hook to update a restaurant with React Query
 */
export const useUpdateRestaurant = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RestaurantFormData) => updateRestaurant(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurant', id] });

      // Navigate back to detail page
      router.push(`/restaurants/${id}`);
      router.refresh();
    },
  });
};
