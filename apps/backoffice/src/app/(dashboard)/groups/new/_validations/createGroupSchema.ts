import { z } from 'zod';

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, 'Group name must be at least 3 characters')
    .max(100, 'Group name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().optional(),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  isPublic: z.boolean().default(true),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;
