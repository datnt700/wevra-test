import { describe, it, expect, vi, beforeEach } from 'vitest';
import DashboardPage from '../page';
import { USER_ROLES, ROUTES } from '@/lib/constants';

// Mock next-auth
const mockAuth = vi.fn();
vi.mock('@/lib/auth', () => ({
  auth: () => mockAuth(),
}));

// Mock next/navigation
const mockRedirect = vi.fn();
vi.mock('next/navigation', () => ({
  redirect: (url: string) => {
    mockRedirect(url);
    throw new Error(`REDIRECT_TO_${url}`); // Simulate redirect behavior
  },
}));

// Mock Prisma
const mockPrismaFindMany = vi.fn();
vi.mock('@/lib/prisma', () => ({
  prisma: {
    restaurant: {
      findMany: (...args: unknown[]) => mockPrismaFindMany(...args),
    },
  },
}));

// Mock DashboardContent component
vi.mock('../_components/DashboardContent', () => ({
  DashboardContent: ({ user, restaurants }: { user: any; restaurants: any[] }) => (
    <div data-testid="dashboard-content">
      <div data-testid="user-name">{user.name}</div>
      <div data-testid="user-email">{user.email}</div>
      <div data-testid="user-role">{user.role}</div>
      <div data-testid="restaurant-count">{restaurants.length}</div>
    </div>
  ),
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('authentication', () => {
    it('should redirect to login when user is not authenticated', async () => {
      mockAuth.mockResolvedValue(null);

      await expect(async () => {
        await DashboardPage();
      }).rejects.toThrow('REDIRECT_TO_/login');

      expect(mockRedirect).toHaveBeenCalledWith(ROUTES.AUTH.LOGIN);
    });

    it('should redirect to login when session has no user', async () => {
      mockAuth.mockResolvedValue({ user: null });

      await expect(async () => {
        await DashboardPage();
      }).rejects.toThrow('REDIRECT_TO_/login');

      expect(mockRedirect).toHaveBeenCalledWith(ROUTES.AUTH.LOGIN);
    });

    it('should redirect to login when session is undefined', async () => {
      mockAuth.mockResolvedValue(undefined);

      await expect(async () => {
        await DashboardPage();
      }).rejects.toThrow('REDIRECT_TO_/login');

      expect(mockRedirect).toHaveBeenCalledWith(ROUTES.AUTH.LOGIN);
    });
  });

  describe('admin user', () => {
    it('should fetch all restaurants for admin user', async () => {
      const mockRestaurants = [
        { id: '1', name: 'Restaurant 1', createdAt: new Date('2024-01-01') },
        { id: '2', name: 'Restaurant 2', createdAt: new Date('2024-01-02') },
      ];

      mockAuth.mockResolvedValue({
        user: {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@test.com',
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue(mockRestaurants);

      const result = await DashboardPage();

      expect(mockPrismaFindMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      expect(result).toBeDefined();
    });

    it('should pass correct user data to DashboardContent for admin', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@test.com',
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue([]);

      const result = await DashboardPage();

      // The component should receive the user data
      expect(result.props.user).toEqual({
        name: 'Admin User',
        email: 'admin@test.com',
        role: USER_ROLES.ADMIN,
      });
    });

    it('should limit restaurants to 10 for admin', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'admin-1',
          name: 'Admin',
          email: 'admin@test.com',
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue([]);

      await DashboardPage();

      expect(mockPrismaFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
        })
      );
    });

    it('should order restaurants by createdAt desc for admin', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'admin-1',
          name: 'Admin',
          email: 'admin@test.com',
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue([]);

      await DashboardPage();

      expect(mockPrismaFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
        })
      );
    });
  });

  describe('restaurant owner user', () => {
    it('should return empty restaurants array for restaurant owner', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'owner-1',
          name: 'Owner User',
          email: 'owner@test.com',
          role: USER_ROLES.RESTAURANT_OWNER,
        },
      });

      const result = await DashboardPage();

      expect(mockPrismaFindMany).not.toHaveBeenCalled();
      expect(result.props.restaurants).toEqual([]);
    });

    it('should pass correct user data to DashboardContent for owner', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'owner-1',
          name: 'Owner User',
          email: 'owner@test.com',
          role: USER_ROLES.RESTAURANT_OWNER,
        },
      });

      const result = await DashboardPage();

      expect(result.props.user).toEqual({
        name: 'Owner User',
        email: 'owner@test.com',
        role: USER_ROLES.RESTAURANT_OWNER,
      });
    });
  });

  describe('user data handling', () => {
    it('should handle null user name', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'user-1',
          name: null,
          email: 'user@test.com',
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue([]);

      const result = await DashboardPage();

      expect(result.props.user.name).toBeNull();
    });

    it('should handle null user email', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'user-1',
          name: 'User',
          email: null,
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue([]);

      const result = await DashboardPage();

      expect(result.props.user.email).toBeNull();
    });

    it('should handle user with undefined name', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'user-1',
          name: undefined,
          email: 'user@test.com',
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue([]);

      const result = await DashboardPage();

      expect(result.props.user.name).toBeNull();
    });

    it('should handle user with undefined email', async () => {
      mockAuth.mockResolvedValue({
        user: {
          id: 'user-1',
          name: 'User',
          email: undefined,
          role: USER_ROLES.ADMIN,
        },
      });

      mockPrismaFindMany.mockResolvedValue([]);

      const result = await DashboardPage();

      expect(result.props.user.email).toBeNull();
    });
  });
});
