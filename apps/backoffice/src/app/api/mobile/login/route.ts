/**
 * Mobile Login API Route
 * Handles authentication for mobile app (ATTENDEE role only)
 * Returns JWT token for expo-secure-store
 */
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { sign } from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { apiSuccess, apiError, ApiErrors } from '@/lib/api/response';
import { UnauthorizedError, ForbiddenError } from '@/lib/api/errors';
import { env } from '@/lib/env';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const JWT_SECRET = (env as { JWT_SECRET?: string }).JWT_SECRET || env.NEXTAUTH_SECRET;
const JWT_EXPIRES_IN = '30d'; // 30 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const { email, password } = validatedData;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        image: true,
        role: true,
        subscriptionStatus: true,
        createdAt: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Mobile app is for ATTENDEES only (frontoffice)
    if (user.role !== UserRole.ATTENDEE) {
      throw new ForbiddenError(
        'Access denied. This app is for attendees only. Use the web app to manage events.'
      );
    }

    // Generate JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return user data and token with standard API response format
    return apiSuccess({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  } catch (error) {
    console.error('Mobile login error:', error);

    // Handle custom API errors
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return apiError(error.message, error.statusCode, error.code);
    }

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const details = error.errors.map((e) => ({ field: e.path.join('.'), message: e.message }));
      return ApiErrors.badRequest('Validation error', details);
    }

    // Generic error
    return ApiErrors.internalError('An error occurred during login');
  }
}
