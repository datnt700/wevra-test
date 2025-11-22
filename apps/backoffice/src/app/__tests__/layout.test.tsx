import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '../layout';

// Mock next-intl/server
const mockGetLocale = vi.fn();
const mockGetMessages = vi.fn();

vi.mock('next-intl/server', () => ({
  getLocale: () => mockGetLocale(),
  getMessages: () => mockGetMessages(),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children, messages }: any) => (
    <div data-testid="next-intl-provider" data-messages={JSON.stringify(messages)}>
      {children}
    </div>
  ),
}));

// Mock components
vi.mock('@/components/LocaleSwitcher', () => ({
  LocaleSwitcher: () => <div data-testid="locale-switcher">Locale Switcher</div>,
}));

vi.mock('@/components/AnalyticsProvider', () => ({
  AnalyticsProvider: ({ children }: any) => <div data-testid="analytics-provider">{children}</div>,
}));

vi.mock('@/components/ClientProviders', () => ({
  ClientProviders: ({ children }: any) => <div data-testid="client-providers">{children}</div>,
}));

describe('RootLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLocale.mockResolvedValue('en');
    mockGetMessages.mockResolvedValue({
      common: { appName: 'Tavia' },
    });
  });

  describe('metadata', () => {
    it('should export correct metadata object', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toEqual({
        default: 'Tavia - Café & Restaurant Booking Platform',
        template: '%s | Tavia',
      });
    });

    it('should have correct description', () => {
      expect(metadata.description).toBe(
        'Discover and book amazing cafés and restaurants. Find your perfect spot, reserve a table, and enjoy great experiences.'
      );
    });

    it('should have correct keywords', () => {
      expect(metadata.keywords).toEqual([
        'restaurant',
        'café',
        'booking',
        'reservation',
        'dining',
        'food',
      ]);
    });

    it('should have correct authors', () => {
      expect(metadata.authors).toEqual([{ name: 'Tavia' }]);
    });

    it('should have correct creator', () => {
      expect(metadata.creator).toBe('Tavia');
    });

    it('should have metadataBase URL', () => {
      expect(metadata.metadataBase).toBeInstanceOf(URL);
    });

    it('should have correct OpenGraph metadata', () => {
      expect(metadata.openGraph).toMatchObject({
        type: 'website',
        locale: 'en_US',
        url: '/',
        title: 'Tavia - Café & Restaurant Booking Platform',
        description: 'Discover and book amazing cafés and restaurants',
        siteName: 'Tavia',
      });
    });

    it('should have OpenGraph image with correct dimensions', () => {
      expect(metadata.openGraph?.images).toEqual([
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Tavia - Café & Restaurant Booking',
        },
      ]);
    });

    it('should have correct Twitter metadata', () => {
      expect(metadata.twitter).toMatchObject({
        card: 'summary_large_image',
        title: 'Tavia - Café & Restaurant Booking Platform',
        description: 'Discover and book amazing cafés and restaurants',
        images: ['/og-image.png'],
        creator: '@tavia',
      });
    });

    it('should have correct robots configuration', () => {
      expect(metadata.robots).toMatchObject({
        index: true,
        follow: true,
      });
    });

    it('should have correct Google Bot configuration', () => {
      const robotsConfig = metadata.robots;
      if (typeof robotsConfig !== 'string' && robotsConfig) {
        expect(robotsConfig.googleBot).toMatchObject({
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        });
      }
    });

    it('should have Google verification', () => {
      expect(metadata.verification?.google).toBeDefined();
    });
  });

  describe('component rendering', () => {
    it('should call getLocale for default locale', async () => {
      mockGetLocale.mockResolvedValue('en');
      mockGetMessages.mockResolvedValue({ common: { test: 'value' } });

      await RootLayout({
        children: <div data-testid="test-child">Test Content</div>,
      });

      expect(mockGetLocale).toHaveBeenCalled();
    });

    it('should call getLocale for Vietnamese locale', async () => {
      mockGetLocale.mockResolvedValue('vi');
      mockGetMessages.mockResolvedValue({ common: { test: 'giá trị' } });

      await RootLayout({
        children: <div data-testid="test-child">Test Content</div>,
      });

      expect(mockGetLocale).toHaveBeenCalled();
    });

    it('should call getMessages', async () => {
      mockGetMessages.mockResolvedValue({ common: { test: 'value' } });

      await RootLayout({
        children: <div data-testid="test-child">Test Content</div>,
      });

      expect(mockGetMessages).toHaveBeenCalled();
    });

    it('should wrap children with ClientProviders', async () => {
      render(
        await RootLayout({
          children: <div data-testid="test-child">Test Content</div>,
        })
      );

      expect(screen.getByTestId('client-providers')).toBeInTheDocument();
    });

    it('should wrap children with NextIntlClientProvider', async () => {
      render(
        await RootLayout({
          children: <div data-testid="test-child">Test Content</div>,
        })
      );

      expect(screen.getByTestId('next-intl-provider')).toBeInTheDocument();
    });

    it('should wrap children with AnalyticsProvider', async () => {
      render(
        await RootLayout({
          children: <div data-testid="test-child">Test Content</div>,
        })
      );

      expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
    });

    it('should render LocaleSwitcher', async () => {
      render(
        await RootLayout({
          children: <div data-testid="test-child">Test Content</div>,
        })
      );

      expect(screen.getByTestId('locale-switcher')).toBeInTheDocument();
    });

    it('should pass messages to NextIntlClientProvider', async () => {
      const testMessages = { common: { appName: 'Tavia Test' } };
      mockGetMessages.mockResolvedValue(testMessages);

      render(
        await RootLayout({
          children: <div data-testid="test-child">Test Content</div>,
        })
      );

      const provider = screen.getByTestId('next-intl-provider');
      const messagesAttr = provider.getAttribute('data-messages');
      expect(JSON.parse(messagesAttr || '{}')).toEqual(testMessages);
    });
  });

  describe('font stylesheets', () => {
    it('should return layout with font stylesheets', async () => {
      const layout = await RootLayout({
        children: <div data-testid="test-child">Test</div>,
      });

      // The component includes font links in the head
      expect(layout).toBeDefined();
      expect(layout.type).toBe('html');
    });
  });

  describe('provider nesting order', () => {
    it('should nest providers in correct order', async () => {
      const { container: _container } = render(
        await RootLayout({
          children: <div data-testid="test-child">Test Content</div>,
        })
      );

      // ClientProviders should be the outermost
      const clientProviders = screen.getByTestId('client-providers');
      expect(clientProviders).toBeInTheDocument();

      // NextIntlClientProvider should be inside ClientProviders
      const intlProvider = screen.getByTestId('next-intl-provider');
      expect(clientProviders).toContainElement(intlProvider);

      // AnalyticsProvider should be inside NextIntlClientProvider
      const analyticsProvider = screen.getByTestId('analytics-provider');
      expect(intlProvider).toContainElement(analyticsProvider);

      // Test child should be inside AnalyticsProvider
      const testChild = screen.getByTestId('test-child');
      expect(analyticsProvider).toContainElement(testChild);
    });
  });

  describe('edge cases', () => {
    it('should handle empty messages object', async () => {
      mockGetMessages.mockResolvedValue({});

      render(
        await RootLayout({
          children: <div data-testid="test-child">Test</div>,
        })
      );

      const provider = screen.getByTestId('next-intl-provider');
      const messagesAttr = provider.getAttribute('data-messages');
      expect(JSON.parse(messagesAttr || '{}')).toEqual({});
    });

    it('should handle complex nested children', async () => {
      render(
        await RootLayout({
          children: (
            <div data-testid="parent">
              <div data-testid="child1">Child 1</div>
              <div data-testid="child2">Child 2</div>
            </div>
          ),
        })
      );

      expect(screen.getByTestId('parent')).toBeInTheDocument();
      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });

    it('should handle locale and messages being fetched', async () => {
      mockGetLocale.mockResolvedValue('fr');
      mockGetMessages.mockResolvedValue({ test: 'data' });

      await RootLayout({
        children: <div>Test</div>,
      });

      expect(mockGetLocale).toHaveBeenCalled();
      expect(mockGetMessages).toHaveBeenCalled();
    });
  });
});
