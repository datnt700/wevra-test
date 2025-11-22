import NextAuth, { type NextAuthResult } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Apple from 'next-auth/providers/apple';
import Facebook from 'next-auth/providers/facebook';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { USER_ROLES, ROUTES } from '@/lib/constants';

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
    signIn: ROUTES.AUTH.LOGIN,
    error: ROUTES.AUTH.LOGIN,
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
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
            subscriptionStatus: true,
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
          subscriptionStatus: user.subscriptionStatus,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.subscriptionStatus = user.subscriptionStatus;
      }

      // For OAuth users, fetch role and subscription from database
      if (account?.provider !== 'credentials' && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, subscriptionStatus: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.subscriptionStatus = dbUser.subscriptionStatus;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.subscriptionStatus = token.subscriptionStatus as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      // For OAuth sign-ins, assign default ORGANIZER role if no role exists
      if (account?.provider !== 'credentials' && user.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        // If user exists but has no role, assign ORGANIZER
        if (dbUser && !dbUser.role) {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: USER_ROLES.ORGANIZER },
          });
          user.role = USER_ROLES.ORGANIZER;
        }
      }

      // Only allow ADMIN, ORGANIZER, and MODERATOR to access the backoffice
      const allowedRoles: string[] = [USER_ROLES.ADMIN, USER_ROLES.ORGANIZER, USER_ROLES.MODERATOR];
      if (user.role && !allowedRoles.includes(user.role)) {
        throw new Error(
          'Access denied. Only organizers, moderators, and admins can access the backoffice.'
        );
      }
      return true;
    },
  },
});

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;
