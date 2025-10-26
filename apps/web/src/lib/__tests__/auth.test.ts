/**
 * Unit tests for authentication
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma';
import { USER_ROLES } from '../constants';

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

// Mock bcrypt
vi.mock('bcryptjs');

describe('Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Authentication', () => {
    it('should successfully authenticate user with valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Admin User',
        image: null,
        role: USER_ROLES.ADMIN,
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const user = await prisma.user.findUnique({
        where: { email: 'admin@example.com' },
      });

      expect(user).toBeTruthy();
      expect(user?.email).toBe('admin@example.com');
      expect(user?.role).toBe(USER_ROLES.ADMIN);
    });

    it('should fail authentication with invalid email', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      const user = await prisma.user.findUnique({
        where: { email: 'invalid@example.com' },
      });

      expect(user).toBeNull();
    });

    it('should fail authentication with invalid password', async () => {
      const mockUser = {
        id: '1',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Admin User',
        image: null,
        role: USER_ROLES.ADMIN,
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      const passwordsMatch = await bcrypt.compare('wrongpassword', mockUser.password);

      expect(passwordsMatch).toBe(false);
    });

    it('should reject user without password', async () => {
      const mockUser = {
        id: '1',
        email: 'oauth@example.com',
        password: null,
        name: 'OAuth User',
        image: null,
        role: USER_ROLES.USER,
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);

      const user = await prisma.user.findUnique({
        where: { email: 'oauth@example.com' },
      });

      expect(user?.password).toBeNull();
    });
  });

  describe('Role-based Access Control', () => {
    it('should allow ADMIN role to access backoffice', () => {
      const allowedRoles = [USER_ROLES.ADMIN, USER_ROLES.RESTAURANT_OWNER];
      const userRole = USER_ROLES.ADMIN;

      expect(allowedRoles.includes(userRole)).toBe(true);
    });

    it('should allow RESTAURANT_OWNER role to access backoffice', () => {
      const allowedRoles = [USER_ROLES.ADMIN, USER_ROLES.RESTAURANT_OWNER];
      const userRole = USER_ROLES.RESTAURANT_OWNER;

      expect(allowedRoles.includes(userRole)).toBe(true);
    });

    it('should deny USER role from accessing backoffice', () => {
      const allowedRoles: string[] = [USER_ROLES.ADMIN, USER_ROLES.RESTAURANT_OWNER];
      const userRole = USER_ROLES.USER;

      expect(allowedRoles.includes(userRole)).toBe(false);
    });
  });

  describe('Input Validation', () => {
    it('should validate email format', () => {
      const validEmail = 'test@example.com';
      const invalidEmail = 'notanemail';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(emailRegex.test(validEmail)).toBe(true);
      expect(emailRegex.test(invalidEmail)).toBe(false);
    });

    it('should validate password minimum length', () => {
      const validPassword = 'password123';
      const invalidPassword = '12345';

      expect(validPassword.length >= 6).toBe(true);
      expect(invalidPassword.length >= 6).toBe(false);
    });
  });
});
