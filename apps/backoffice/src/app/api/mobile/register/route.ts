/**
 * Mobile Register API Route
 * Handles registration for mobile app (ATTENDEE role only)
 * Returns JWT token for expo-secure-store
 */
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { sign } from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { ConflictError } from '@/lib/api/errors';
import { env } from '@/lib/env';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

const JWT_SECRET = (env as { JWT_SECRET?: string }).JWT_SECRET || env.NEXTAUTH_SECRET;
const JWT_EXPIRES_IN = '30d'; // 30 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const { name, email, password } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user with ATTENDEE role (mobile app is for attendees only)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.ATTENDEE,
        subscriptionStatus: 'FREE', // Attendees always have free access
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        subscriptionStatus: true,
        createdAt: true,
      },
    });

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
      message: 'Registration successful',
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
    console.error('Mobile register error:', error);

    // Handle custom API errors
    if (error instanceof ConflictError) {
      return ApiErrors.conflict(error.message);
    }

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const details = error.errors.map((e) => ({ field: e.path.join('.'), message: e.message }));
      return ApiErrors.badRequest('Validation error', details);
    }

    // Handle Prisma unique constraint errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      if (prismaError.code === 'P2002') {
        return ApiErrors.conflict('User with this email already exists');
      }
    }

    // Generic error
    return ApiErrors.internalError('An error occurred during registration');
  }
}
