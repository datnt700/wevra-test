'use server';

/**
 * Profile Server Actions for Frontoffice
 * Handles profile updates for attendees
 */
import { prisma } from '@/lib/prisma';
import { hash, compare } from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export interface UpdateProfileParams {
  userId: string;
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

/**
 * Update user profile
 */
export async function updateProfileAction(
  params: UpdateProfileParams
): Promise<UpdateProfileResponse> {
  try {
    const { userId, name, email, currentPassword, newPassword } = params;

    // Validate: At least one field to update
    if (!name && !email && !newPassword) {
      return {
        success: false,
        error: 'At least one field must be provided to update',
      };
    }

    // Get current user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        password: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // If changing email, check if new email is already taken
    if (email && email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return {
          success: false,
          error: 'Email is already in use',
        };
      }
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return {
          success: false,
          error: 'Current password is required to set a new password',
        };
      }

      if (!user.password) {
        return {
          success: false,
          error: 'Cannot change password for OAuth users',
        };
      }

      const passwordsMatch = await compare(currentPassword, user.password);

      if (!passwordsMatch) {
        return {
          success: false,
          error: 'Current password is incorrect',
        };
      }

      // Validate new password strength
      if (newPassword.length < 8) {
        return {
          success: false,
          error: 'New password must be at least 8 characters',
        };
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      if (!passwordRegex.test(newPassword)) {
        return {
          success: false,
          error: 'Password must include uppercase, lowercase, and a number',
        };
      }
    }

    // Build update data
    const updateData: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (newPassword) updateData.password = await hash(newPassword, 12);

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    });

    // Revalidate profile page
    revalidatePath('/profile');

    return {
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: 'Failed to update profile. Please try again.',
    };
  }
}

/**
 * Get user profile
 */
export async function getProfileAction(userId: string): Promise<UpdateProfileResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      error: 'Failed to fetch profile',
    };
  }
}
