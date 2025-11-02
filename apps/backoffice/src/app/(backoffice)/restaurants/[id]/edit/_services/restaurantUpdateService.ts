import type { RestaurantFormData } from '../../../new/_types';

/**
 * Update an existing restaurant
 */
export async function updateRestaurant(id: string, data: RestaurantFormData) {
  const response = await fetch(`/api/restaurants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update restaurant');
  }

  return response.json();
}

/**
 * Fetch restaurant by ID for editing
 */
export async function getRestaurantForEdit(id: string) {
  const response = await fetch(`/api/restaurants/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch restaurant');
  }

  return response.json();
}
