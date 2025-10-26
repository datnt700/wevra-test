/**
 * Unit tests for Dashboard Content Component
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { NextIntlClientProvider } from 'next-intl';
import { DashboardContent } from '../DashboardContent';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

// Mock SignOutButton
vi.mock('../SignOutButton', () => ({
  SignOutButton: () => <button>Sign Out</button>,
}));

const messages = {
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back, {name}',
    stats: {
      totalRestaurants: 'Total Restaurants',
      activeBookings: 'Active Bookings',
      totalTables: 'Total Tables',
    },
    quickActions: {
      title: 'Quick Actions',
      addRestaurant: 'Add Restaurant',
      viewBookings: 'View Bookings',
      manageTables: 'Manage Tables',
      settings: 'Settings',
    },
    restaurants: {
      title: 'Your Restaurants',
      manage: 'Manage',
      active: 'Active',
      inactive: 'Inactive',
    },
    empty: {
      title: 'No restaurants yet',
      description: 'Get started by adding your first restaurant or café',
      cta: 'Add Your First Restaurant',
    },
  },
};

describe('DashboardContent', () => {
  describe('Component Rendering', () => {
    it('should render welcome message with user name', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'ADMIN',
      };

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={[]} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText(/welcome back, john doe/i)).toBeInTheDocument();
    });

    it('should render user email when name is not available', () => {
      const user = {
        name: null,
        email: 'john@example.com',
        role: 'ADMIN',
      };

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={[]} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText(/welcome back, john@example.com/i)).toBeInTheDocument();
    });

    it('should display correct restaurant count', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'ADMIN',
      };

      const restaurants = [
        {
          id: '1',
          name: 'Test Restaurant',
          address: '123 Main St',
          cuisine: ['Italian', 'Pizza'],
          priceRange: '$$',
          isActive: true,
          image: null,
        },
        {
          id: '2',
          name: 'Test Restaurant 2',
          address: '456 Oak Ave',
          cuisine: ['Japanese'],
          priceRange: '$$$',
          isActive: true,
          image: null,
        },
      ];

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={restaurants} />
        </NextIntlClientProvider>
      );

      // Should show restaurant count in stats
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should show empty state when no restaurants', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'RESTAURANT_OWNER',
      };

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={[]} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText(/no restaurants yet/i)).toBeInTheDocument();
      expect(
        screen.getByText(/get started by adding your first restaurant or café/i)
      ).toBeInTheDocument();
    });

    it('should display restaurants list when available', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'RESTAURANT_OWNER',
      };

      const restaurants = [
        {
          id: '1',
          name: 'Test Restaurant',
          address: '123 Main St',
          cuisine: ['Italian', 'Pizza'],
          priceRange: '$$',
          isActive: true,
          image: null,
        },
      ];

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={restaurants} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('Italian, Pizza')).toBeInTheDocument();
      expect(screen.getByText('$$')).toBeInTheDocument();
    });

    it('should show active status for active restaurant', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'RESTAURANT_OWNER',
      };

      const restaurants = [
        {
          id: '1',
          name: 'Active Restaurant',
          address: '123 Main St',
          cuisine: ['Italian'],
          priceRange: '$$',
          isActive: true,
          image: null,
        },
      ];

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={restaurants} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should render quick actions section', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'ADMIN',
      };

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={[]} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
      expect(screen.getByText('Add Restaurant')).toBeInTheDocument();
      expect(screen.getByText('View Bookings')).toBeInTheDocument();
      expect(screen.getByText('Manage Tables')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should display role badge correctly for admin', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'ADMIN',
      };

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={[]} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('should display role badge correctly for restaurant owner', () => {
      const user = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'RESTAURANT_OWNER',
      };

      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <DashboardContent user={user} restaurants={[]} />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Restaurant Owner')).toBeInTheDocument();
    });
  });
});
