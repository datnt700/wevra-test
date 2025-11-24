/**
 * Mobile Token Verification API Route
 * Validates JWT tokens from mobile app and returns user data
 */
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { UnauthorizedError, NotFoundError } from '@/lib/api/errors';
import { env } from '@/lib/env';

const JWT_SECRET = (env as { JWT_SECRET?: string }).JWT_SECRET || env.NEXTAUTH_SECRET;

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  subscriptionStatus: string;
  iat: number;
  exp: number;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify JWT token
    let decoded: TokenPayload;
    try {
      decoded = verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      throw new UnauthorizedError('Invalid or expired token');
    }

    // Fetch fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
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

    if (!user) {
      throw new NotFoundError('User');
    }

    // Return user data with standard API response format
    return apiSuccess({
      message: 'Token valid',
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
    console.error('Mobile token verification error:', error);

    // Handle custom API errors
    if (error instanceof UnauthorizedError) {
      return ApiErrors.unauthorized(error.message);
    }
    if (error instanceof NotFoundError) {
      return ApiErrors.notFound('User');
    }

    // Generic error
    return ApiErrors.internalError('An error occurred during token verification');
  }
}

export async function GET(request: NextRequest) {
  // Support both POST and GET for verification
  return POST(request);
}
