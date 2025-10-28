/**
 * Restaurant types
 * Shared types for restaurant entities across the application
 *
 * ⚠️ IMPORTANT: Keep these types in sync with the Prisma schema
 * @see apps/backoffice/prisma/schema.prisma - Restaurant model
 */

/**
 * Restaurant entity type
 * Matches the Prisma Restaurant model with selected fields
 *
 * Prisma model fields:
 * - id: String (cuid)
 * - name: String
 * - slug: String (unique, auto-generated from name)
 * - description: String? (optional, Text)
 * - address: String
 * - phone: String
 * - email: String
 * - image: String? (optional, URL)
 * - cuisine: String[] (array of cuisine types)
 * - priceRange: String ($, $$, $$$, $$$$)
 * - rating: Float (default 0) - NOT included in this type
 * - isActive: Boolean (default true)
 * - createdAt: DateTime
 * - updatedAt: DateTime
 * - bookings: Booking[] (relation) - NOT included in this type
 * - tables: Table[] (relation) - NOT included in this type
 */
export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  phone: string;
  email: string;
  cuisine: string[];
  priceRange: string;
  isActive: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Restaurant list item type
 * Simplified version for list views
 */
export type RestaurantListItem = Pick<
  Restaurant,
  'id' | 'name' | 'address' | 'cuisine' | 'priceRange' | 'isActive' | 'image'
>;

/**
 * Restaurant form data type
 * Used for creating/updating restaurants
 */
export type RestaurantFormData = Omit<
  Restaurant,
  'id' | 'slug' | 'createdAt' | 'updatedAt' | 'isActive'
>;

/**
 * Restaurant create input type
 * Data required to create a new restaurant
 */
export type RestaurantCreateInput = {
  name: string;
  description?: string | null;
  address: string;
  phone: string;
  email: string;
  cuisine: string[];
  priceRange: string;
  image?: string | null;
};

/**
 * Restaurant update input type
 * Data that can be updated for an existing restaurant
 */
export type RestaurantUpdateInput = Partial<RestaurantCreateInput> & {
  isActive?: boolean;
};
