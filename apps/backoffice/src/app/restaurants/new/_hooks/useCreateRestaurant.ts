import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createRestaurant } from '../_services';
import { RestaurantFormData } from '../_types';

/**
 * Hook for creating a new restaurant
 * Uses React Query for state management and Sonner for notifications
 */
export const useCreateRestaurant = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RestaurantFormData) => createRestaurant(data),
    onSuccess: (data) => {
      toast.success('Restaurant created successfully!', {
        description: `${data.name} has been added to your restaurants.`,
      });
      router.push(`/restaurants/${data.id}`);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error('Failed to create restaurant', {
        description: error.message,
      });
    },
  });
};
