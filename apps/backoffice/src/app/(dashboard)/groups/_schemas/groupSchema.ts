import { z } from 'zod';

/**
 * Group form validation schema
 */
export const groupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name is too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description is too long'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().optional(),
  image: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  isPublic: z.boolean().default(true),
});

export type GroupFormData = z.infer<typeof groupSchema>;
