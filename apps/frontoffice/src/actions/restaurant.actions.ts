'use server';

import prisma from '@/lib/prisma';
import type {
  Restaurant,
  SearchRestaurantsParams,
  SearchRestaurantsResponse,
} from '@/types/restaurant';

/**
 * Restaurant Actions
 * Server-side actions for restaurant operations using Prisma
 */

/**
 * Convert Prisma Restaurant to our Restaurant type
 */
function mapPrismaRestaurant(restaurant: any): Restaurant {
  // Calculate distance (mock for now - would use geolocation in production)
  const distance =
    restaurant.latitude && restaurant.longitude
      ? `${(Math.random() * 3 + 0.5).toFixed(1)} km`
      : '1.5 km';

  return {
    id:
      parseInt(restaurant.id.replace(/\D/g, '').slice(0, 8)) || Math.floor(Math.random() * 1000000), // Convert cuid to number for compatibility
    name: restaurant.name,
    cuisine: restaurant.cuisine.join(', '), // Join array to string
    rating: restaurant.rating,
    reviewCount: restaurant.reviewCount,
    priceRange: restaurant.priceRange,
    image:
      restaurant.image ||
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    distance,
    isOpen: restaurant.isOpen,
    address: restaurant.address,
    description: restaurant.description || '',
  };
}

/**
 * Search restaurants with filters
 */
export async function searchRestaurantsAction(
  params: SearchRestaurantsParams
): Promise<SearchRestaurantsResponse> {
  try {
    const where: any = {
      isActive: true, // Only show active restaurants
    };

    // Location filter (search in name and address)
    if (params.location) {
      where.OR = [
        { name: { contains: params.location, mode: 'insensitive' } },
        { address: { contains: params.location, mode: 'insensitive' } },
      ];
    }

    // Cuisine filter
    if (params.cuisine) {
      where.cuisine = {
        has: params.cuisine,
      };
    }

    // Price range filter
    if (params.priceRange) {
      where.priceRange = params.priceRange;
    }

    // Open/closed filter
    if (params.isOpen !== undefined) {
      where.isOpen = params.isOpen;
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;

    // Execute query
    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ rating: 'desc' }, { reviewCount: 'desc' }],
      }),
      prisma.restaurant.count({ where }),
    ]);

    return {
      restaurants: restaurants.map(mapPrismaRestaurant),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw new Error('Failed to search restaurants');
  }
}

/**
 * Get restaurant by ID
 */
export async function getRestaurantByIdAction(id: number): Promise<Restaurant | null> {
  try {
    // Since we're using cuid in database but number in frontend,
    // we need to find by matching criteria
    const restaurants = await prisma.restaurant.findMany({
      where: { isActive: true },
      take: 100, // Get a reasonable batch to search
    });

    const restaurant = restaurants.find((r) => {
      const numericId = parseInt(r.id.replace(/\D/g, '').slice(0, 8));
      return numericId === id;
    });

    return restaurant ? mapPrismaRestaurant(restaurant) : null;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
}

/**
 * Get featured restaurants
 */
export async function getFeaturedRestaurantsAction(limit = 6): Promise<Restaurant[]> {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        isActive: true,
        isOpen: true,
      },
      orderBy: [{ rating: 'desc' }, { reviewCount: 'desc' }],
      take: limit,
    });

    return restaurants.map(mapPrismaRestaurant);
  } catch (error) {
    console.error('Error fetching featured restaurants:', error);
    return [];
  }
}
