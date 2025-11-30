import NextAuth, { type NextAuthResult } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Apple from 'next-auth/providers/apple';
import Facebook from 'next-auth/providers/facebook';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createEnv, envHelpers } from '@eventure/env';

// Environment variables for frontoffice
const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: envHelpers.optionalString(),
    GOOGLE_CLIENT_SECRET: envHelpers.optionalString(),
    APPLE_CLIENT_ID: envHelpers.optionalString(),
    APPLE_CLIENT_SECRET: envHelpers.optionalString(),
    FACEBOOK_CLIENT_ID: envHelpers.optionalString(),
    FACEBOOK_CLIENT_SECRET: envHelpers.optionalString(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
    APPLE_CLIENT_SECRET: process.env.APPLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  },
});

const hasGoogleOAuth = !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET;
const hasAppleOAuth = !!env.APPLE_CLIENT_ID && !!env.APPLE_CLIENT_SECRET;
const hasFacebookOAuth = !!env.FACEBOOK_CLIENT_ID && !!env.FACEBOOK_CLIENT_SECRET;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const result = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    // OAuth Providers (conditionally enabled based on env)
    ...(hasGoogleOAuth
      ? [
          Google({
            clientId: env.GOOGLE_CLIENT_ID!,
            clientSecret: env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: 'consent',
                access_type: 'offline',
                response_type: 'code',
              },
            },
          }),
        ]
      : []),
    ...(hasAppleOAuth
      ? [
          Apple({
            clientId: env.APPLE_CLIENT_ID!,
            clientSecret: env.APPLE_CLIENT_SECRET!,
            authorization: {
              params: {
                response_mode: 'form_post',
              },
            },
          }),
        ]
      : []),
    ...(hasFacebookOAuth
      ? [
          Facebook({
            clientId: env.FACEBOOK_CLIENT_ID!,
            clientSecret: env.FACEBOOK_CLIENT_SECRET!,
          }),
        ]
      : []),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error('Invalid email or password format');
        }

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            image: true,
            role: true,
          },
        });

        if (!user || !user.password) {
          throw new Error('No user found with this email');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error('Invalid email or password format');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // For OAuth users, fetch role from database
      if (account?.provider && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user }) {
      // For OAuth sign-ins, assign default ATTENDEE role if no role exists
      if (user.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        // If user exists but has no role, assign ATTENDEE
        if (dbUser && !dbUser.role) {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'ATTENDEE' },
          });
          user.role = 'ATTENDEE';
        }
      }

      return true;
    },
  },
});

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;
