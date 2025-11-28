/**
 * Mobile OAuth Callback Endpoint
 * Exchanges OAuth code for JWT token
 * POST /api/mobile/auth/oauth
 */
import { NextRequest } from 'next/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { apiSuccess, ApiErrors } from '@/lib/api/response';
import { env } from '@/lib/env';

const oauthCallbackSchema = z.object({
  provider: z.enum(['google', 'facebook']),
  code: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, code } = oauthCallbackSchema.parse(body);

    // Exchange code for access token with OAuth provider
    let userInfo;
    if (provider === 'google') {
      userInfo = await exchangeGoogleCode(code);
    } else if (provider === 'facebook') {
      userInfo = await exchangeFacebookCode(code);
    } else {
      return ApiErrors.badRequest('Unsupported provider');
    }

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          image: userInfo.picture,
          role: 'ATTENDEE', // Mobile users are always ATTENDEE
          emailVerified: new Date(), // OAuth emails are verified
        },
      });

      // Create OAuth account link
      await prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider,
          providerAccountId: userInfo.sub,
          access_token: userInfo.access_token,
          token_type: 'Bearer',
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
    console.error('OAuth callback error:', error);
    return ApiErrors.internalError();
  }
}

async function exchangeGoogleCode(code: string) {
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID!,
      client_secret: env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: 'tavia://auth/callback',
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange Google code');
  }

  const tokens = await tokenResponse.json();

  // Get user info
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!userResponse.ok) {
    throw new Error('Failed to fetch Google user info');
  }

  const userInfo = await userResponse.json();
  return { ...userInfo, access_token: tokens.access_token };
}

async function exchangeFacebookCode(code: string) {
  const tokenResponse = await fetch(
    `https://graph.facebook.com/v12.0/oauth/access_token?` +
      new URLSearchParams({
        code,
        client_id: env.FACEBOOK_CLIENT_ID!,
        client_secret: env.FACEBOOK_CLIENT_SECRET!,
        redirect_uri: 'tavia://auth/callback',
      })
  );

  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange Facebook code');
  }

  const tokens = await tokenResponse.json();

  // Get user info
  const userResponse = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokens.access_token}`
  );

  if (!userResponse.ok) {
    throw new Error('Failed to fetch Facebook user info');
  }

  const userInfo = await userResponse.json();
  return {
    sub: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    picture: userInfo.picture?.data?.url,
    access_token: tokens.access_token,
  };
}
