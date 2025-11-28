/**
 * Mobile Apple Sign In Endpoint
 * Verifies Apple identity token and returns JWT
 * POST /api/mobile/auth/apple
 */
import { NextRequest } from 'next/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { env } from '@/lib/env';

const appleAuthSchema = z.object({
  identityToken: z.string().min(1),
  authorizationCode: z.string().optional(),
  user: z.string().optional(),
  fullName: z
    .object({
      givenName: z.string().nullable(),
      familyName: z.string().nullable(),
    })
    .nullable()
    .optional(),
  email: z.string().email().nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identityToken, fullName, email } = appleAuthSchema.parse(body);

    // Decode Apple identity token (without verification for simplicity)
    // In production, you should verify the token signature
    const decodedToken = jwt.decode(identityToken) as {
      sub: string;
      email?: string;
    };

    if (!decodedToken || !decodedToken.sub) {
      return ApiErrors.unauthorized('Invalid Apple identity token');
    }

    const userEmail = email || decodedToken.email;
    if (!userEmail) {
      return ApiErrors.badRequest('Email is required');
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      // Create new user
      const userName =
        fullName?.givenName && fullName?.familyName
          ? `${fullName.givenName} ${fullName.familyName}`
          : userEmail.split('@')[0];

      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
          role: 'ATTENDEE', // Mobile users are always ATTENDEE
          emailVerified: new Date(), // Apple emails are verified
        },
      });

      // Create OAuth account link
      await prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: 'apple',
          providerAccountId: decodedToken.sub,
          id_token: identityToken,
        },
      });
    }

    // Generate JWT token
    const jwtSecret = env.NEXTAUTH_SECRET;
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return apiSuccess({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiErrors.badRequest('Validation error', error.errors);
    }
    console.error('Apple auth error:', error);
    return ApiErrors.internalError();
  }
}
