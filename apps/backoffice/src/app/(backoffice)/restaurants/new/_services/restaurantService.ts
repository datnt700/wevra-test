import { RestaurantFormData } from '../_types';

/**
 * Restaurant API service
 * Handles all restaurant-related API calls
 */

export interface CreateRestaurantResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  phone: string;
  email: string;
  cuisine: string[];
  priceRange: string;
  image: string | null;
  rating: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string;
  errors?: unknown[];
}

/**
 * Create a new restaurant
 * @param data - Restaurant form data
 * @returns Created restaurant data
 * @throws ApiError if the request fails
 */
export const createRestaurant = async (
  data: RestaurantFormData
): Promise<CreateRestaurantResponse> => {
  const response = await fetch('/api/restaurants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || 'Failed to create restaurant');
  }

  return response.json();
};

/**
 * Get all restaurants
 * @param page - Page number
 * @param limit - Items per page
 */
export const getRestaurants = async (page = 1, limit = 10) => {
  const response = await fetch(`/api/restaurants?page=${page}&limit=${limit}`);

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || 'Failed to fetch restaurants');
  }

  return response.json();
};

/**
 * Get a single restaurant by ID
 * @param id - Restaurant ID
 */
export const getRestaurantById = async (id: string) => {
  const response = await fetch(`/api/restaurants/${id}`);

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || 'Failed to fetch restaurant');
  }

  return response.json();
};
