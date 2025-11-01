import type {
  Restaurant,
  SearchRestaurantsParams,
  SearchRestaurantsResponse,
} from '@/types/restaurant';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Restaurant Service
 * Handles all HTTP requests related to restaurants
 */
class RestaurantService {
  /**
   * Search restaurants with filters
   */
  async searchRestaurants(params: SearchRestaurantsParams): Promise<SearchRestaurantsResponse> {
    const queryParams = new URLSearchParams();

    if (params.location) queryParams.append('location', params.location);
    if (params.date) queryParams.append('date', params.date);
    if (params.guests) queryParams.append('guests', params.guests.toString());
    if (params.cuisine) queryParams.append('cuisine', params.cuisine);
    if (params.priceRange) queryParams.append('priceRange', params.priceRange);
    if (params.isOpen !== undefined) queryParams.append('isOpen', params.isOpen.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/restaurants/search?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to search restaurants');
    }

    return response.json();
  }

  /**
   * Get restaurant by ID
   */
  async getRestaurantById(id: number): Promise<Restaurant> {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurant with ID: ${id}`);
    }

    return response.json();
  }

  /**
   * Get featured restaurants
   */
  async getFeaturedRestaurants(limit = 6): Promise<Restaurant[]> {
    const response = await fetch(`${API_BASE_URL}/restaurants/featured?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch featured restaurants');
    }

    return response.json();
  }

  /**
   * Get nearby restaurants
   */
  async getNearbyRestaurants(
    latitude: number,
    longitude: number,
    radius = 5000
  ): Promise<Restaurant[]> {
    const response = await fetch(
      `${API_BASE_URL}/restaurants/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch nearby restaurants');
    }

    return response.json();
  }
}

export const restaurantService = new RestaurantService();
