import { z } from 'zod';

/**
 * Restaurant form validation schema
 */
export const restaurantFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().min(8, 'Phone number must be at least 8 characters'),
  email: z.string().email('Invalid email address'),
  cuisine: z.array(z.string()).min(1, 'Select at least one cuisine type'),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$'], {
    errorMap: () => ({ message: 'Select a price range' }),
  }),
  image: z.string().url('Invalid image URL').optional(),
});

/**
 * Restaurant form data type
 */
export type RestaurantFormData = z.infer<typeof restaurantFormSchema>;

/**
 * Cuisine options
 */
export const cuisineOptions = [
  'Italian',
  'Japanese',
  'Chinese',
  'Thai',
  'Vietnamese',
  'French',
  'Mexican',
  'Indian',
  'Korean',
  'American',
  'Mediterranean',
  'Spanish',
  'Greek',
  'Turkish',
  'Middle Eastern',
  'Fusion',
  'Vegetarian',
  'Vegan',
  'Seafood',
  'Steakhouse',
  'Cafe',
  'Bakery',
  'Other',
] as const;

/**
 * Price range options
 */
export const priceRangeOptions = [
  { value: '$', label: '$ - Budget' },
  { value: '$$', label: '$$ - Moderate' },
  { value: '$$$', label: '$$$ - Upscale' },
  { value: '$$$$', label: '$$$$ - Fine Dining' },
] as const;
