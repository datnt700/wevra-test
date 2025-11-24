/**
 * Mobile Profile API Routes
 * GET: Get current user profile
 * PUT: Update user profile
 */
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { verify } from 'jsonwebtoken';
import { apiSuccess, apiError, ApiErrors } from '@/lib/api/response';
import { UnauthorizedError, BadRequestError } from '@/lib/api/errors';
import { env } from '@/lib/env';

const JWT_SECRET = (env as { JWT_SECRET?: string }).JWT_SECRET || env.NEXTAUTH_SECRET;

const updateProfileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Password must include uppercase, lowercase, and a number',
    })
    .optional(),
});

/**
 * Extract user ID from JWT token
 */
async function getUserFromToken(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or invalid authorization header');
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
}

/**
 * GET /api/mobile/profile
 * Get current user profile
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        subscriptionStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return ApiErrors.notFound('User');
    }

    return apiSuccess(user);
  } catch (error) {
    console.error('Get profile error:', error);

    if (error instanceof UnauthorizedError) {
      return apiError(error.message, error.statusCode, error.code);
    }

    return ApiErrors.internalError('Failed to fetch profile');
  }
}

/**
 * PUT /api/mobile/profile
 * Update user profile (name, email, password)
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    const { name, email, currentPassword, newPassword } = validatedData;

    // Validate: At least one field to update
    if (!name && !email && !newPassword) {
      throw new BadRequestError('At least one field must be provided to update');
    }

    // Get current user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      return ApiErrors.notFound('User');
    }

    // If changing email, check if new email is already taken
    if (email && email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return ApiErrors.conflict('Email is already in use');
      }
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        throw new BadRequestError('Current password is required to set a new password');
      }

      if (!user.password) {
        throw new BadRequestError('Cannot change password for OAuth users');
      }

      const { compare } = await import('bcryptjs');
      const passwordsMatch = await compare(currentPassword, user.password);

      if (!passwordsMatch) {
        throw new BadRequestError('Current password is incorrect');
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
        role: true,
        subscriptionStatus: true,
        updatedAt: true,
      },
    });

    return apiSuccess({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);

    if (error instanceof UnauthorizedError || error instanceof BadRequestError) {
      return apiError(error.message, error.statusCode, error.code);
    }

    if (error instanceof z.ZodError) {
      const details = error.errors.map((e) => ({ field: e.path.join('.'), message: e.message }));
      return ApiErrors.badRequest('Validation error', details);
    }

    return ApiErrors.internalError('Failed to update profile');
  }
}
