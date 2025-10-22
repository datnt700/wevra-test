import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import HomePage from '@/app/page';

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock messages
const mockMessages = {
  home: {
    hero: {
      title: 'Discover & Book Amazing Cafés and Restaurants',
      subtitle: 'Find your perfect spot, reserve a table, and enjoy great experiences',
      cta: 'Get Started',
    },
    features: {
      title: 'Why Choose Tavia?',
      search: {
        title: 'Easy Search',
        description: 'Browse cafés and restaurants by location, cuisine, and availability',
      },
      booking: {
        title: 'Instant Booking',
        description: 'Reserve your table in seconds with real-time confirmation',
      },
      notifications: {
        title: 'Stay Updated',
        description: 'Get email and push notifications for your bookings',
      },
    },
  },
  navigation: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
  },
};

describe('HomePage', () => {
  const renderWithIntl = (component: React.ReactElement) => {
    return render(
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        {component}
      </NextIntlClientProvider>
    );
  };

  it('should render the hero title', () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText('Discover & Book Amazing Cafés and Restaurants')).toBeInTheDocument();
  });

  it('should render the hero subtitle', () => {
    renderWithIntl(<HomePage />);
    expect(
      screen.getByText('Find your perfect spot, reserve a table, and enjoy great experiences')
    ).toBeInTheDocument();
  });

  it('should render CTA button', () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
  });

  it('should render features section title', () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText('Why Choose Tavia?')).toBeInTheDocument();
  });

  it('should render all three feature cards', () => {
    renderWithIntl(<HomePage />);

    expect(screen.getByText('Easy Search')).toBeInTheDocument();
    expect(screen.getByText('Instant Booking')).toBeInTheDocument();
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
  });

  it('should render feature descriptions', () => {
    renderWithIntl(<HomePage />);

    expect(
      screen.getByText('Browse cafés and restaurants by location, cuisine, and availability')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Reserve your table in seconds with real-time confirmation')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Get email and push notifications for your bookings')
    ).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithIntl(<HomePage />);

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('should render footer', () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText('© 2025 Tavia. All rights reserved.')).toBeInTheDocument();
  });
});
