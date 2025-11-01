import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Restaurant,
  SearchRestaurantsParams,
  SearchRestaurantsResponse,
} from '@/types/restaurant';
import {
  searchRestaurantsAction,
  getRestaurantByIdAction,
  getFeaturedRestaurantsAction,
} from '@/actions/restaurant.actions';

/**
 * Query keys for restaurant-related queries
 */
export const restaurantKeys = {
  all: ['restaurants'] as const,
  lists: () => [...restaurantKeys.all, 'list'] as const,
  list: (params: SearchRestaurantsParams) => [...restaurantKeys.lists(), params] as const,
  details: () => [...restaurantKeys.all, 'detail'] as const,
  detail: (id: number) => [...restaurantKeys.details(), id] as const,
  featured: () => [...restaurantKeys.all, 'featured'] as const,
};

/**
 * Hook to search restaurants with filters
 */
export function useSearchRestaurants(params: SearchRestaurantsParams) {
  return useQuery<SearchRestaurantsResponse>({
    queryKey: restaurantKeys.list(params),
    queryFn: () => searchRestaurantsAction(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get a single restaurant by ID
 */
export function useRestaurant(id: number) {
  return useQuery<Restaurant | null>({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => getRestaurantByIdAction(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to get featured restaurants
 */
export function useFeaturedRestaurants(limit = 6) {
  return useQuery<Restaurant[]>({
    queryKey: [...restaurantKeys.featured(), limit],
    queryFn: () => getFeaturedRestaurantsAction(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

/**
 * Hook for optimistic updates (example)
 * Can be used when implementing favorite/bookmark functionality
 */
export function useOptimisticRestaurantUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurant: Restaurant) => {
      // TODO: Implement actual mutation API call
      return restaurant;
    },
    onMutate: async (newRestaurant) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: restaurantKeys.detail(newRestaurant.id),
      });

      // Snapshot previous value
      const previousRestaurant = queryClient.getQueryData(restaurantKeys.detail(newRestaurant.id));

      // Optimistically update
      queryClient.setQueryData(restaurantKeys.detail(newRestaurant.id), newRestaurant);

      return { previousRestaurant };
    },
    onError: (_err, _newRestaurant, context) => {
      // Rollback on error
      if (context?.previousRestaurant) {
        queryClient.setQueryData(
          restaurantKeys.detail(_newRestaurant.id),
          context.previousRestaurant
        );
      }
    },
    onSettled: (restaurant) => {
      // Refetch after mutation
      if (restaurant) {
        queryClient.invalidateQueries({
          queryKey: restaurantKeys.detail(restaurant.id),
        });
      }
    },
  });
}
