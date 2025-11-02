import type { User } from '@prisma/client';

/**
 * User type from Prisma
 * Re-exported for use in IAM components
 */
export type { User };

/**
 * User with selected fields for list display
 */
export type UserListItem = Pick<User, 'id' | 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt'>;
