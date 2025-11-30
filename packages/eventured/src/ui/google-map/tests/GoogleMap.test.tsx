import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { GoogleMap } from '../components/GoogleMap';
import type { MapVenue } from '../types';

// Mock @vis.gl/react-google-maps
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="api-provider">{children}</div>
  ),
  Map: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
  AdvancedMarker: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <div data-testid="marker" onClick={onClick}>
      {children}
    </div>
  ),
}));

describe('GoogleMap', () => {
  const mockVenues: MapVenue[] = [
    {
      id: '1',
      name: 'The Coffee Bean',
      latitude: 10.762622,
      longitude: 106.660172,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'The Tea House',
      latitude: 10.771372,
      longitude: 106.661922,
      isAvailable: false,
    },
  ];

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<GoogleMap apiKey="test-api-key" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('renders with default props', () => {
      render(<GoogleMap apiKey="test-api-key" />);
      expect(screen.getByTestId('api-provider')).toBeInTheDocument();
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('renders error message when apiKey is not provided', () => {
      render(<GoogleMap apiKey="" />);
      expect(screen.getByText(/Google Maps API key is required/i)).toBeInTheDocument();
    });

    it('renders error message when apiKey is undefined', () => {
      // @ts-expect-error - Testing invalid prop
      render(<GoogleMap apiKey={undefined} />);
      expect(screen.getByText(/Google Maps API key is required/i)).toBeInTheDocument();
    });
  });

  describe('Venues', () => {
    it('renders with empty venues array', () => {
      render(<GoogleMap apiKey="test-api-key" venues={[]} />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
      expect(screen.queryAllByTestId('marker')).toHaveLength(0);
    });

    it('renders with venues', () => {
      render(<GoogleMap apiKey="test-api-key" venues={mockVenues} />);
      expect(screen.getAllByTestId('marker')).toHaveLength(2);
    });

    it('renders venue names', () => {
      render(<GoogleMap apiKey="test-api-key" venues={mockVenues} />);
      expect(screen.getByText('The Coffee Bean')).toBeInTheDocument();
      expect(screen.getByText('The Tea House')).toBeInTheDocument();
    });

    it('renders with single venue', () => {
      render(<GoogleMap apiKey="test-api-key" venues={[mockVenues[0]!]} />);
      expect(screen.getAllByTestId('marker')).toHaveLength(1);
      expect(screen.getByText('The Coffee Bean')).toBeInTheDocument();
    });
  });

  describe('Marker Click Handler', () => {
    it('calls onMarkerClick when marker is clicked', async () => {
      const handleMarkerClick = vi.fn();
      const user = userEvent.setup();

      render(
        <GoogleMap apiKey="test-api-key" venues={mockVenues} onMarkerClick={handleMarkerClick} />
      );

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[0]!);

      expect(handleMarkerClick).toHaveBeenCalledTimes(1);
      expect(handleMarkerClick).toHaveBeenCalledWith(mockVenues[0]);
    });

    it('does not throw when onMarkerClick is not provided', async () => {
      const user = userEvent.setup();

      render(<GoogleMap apiKey="test-api-key" venues={mockVenues} />);

      const markers = screen.getAllByTestId('marker');
      await expect(user.click(markers[0]!)).resolves.not.toThrow();
    });

    it('calls onMarkerClick with correct venue data', async () => {
      const handleMarkerClick = vi.fn();
      const user = userEvent.setup();

      render(
        <GoogleMap apiKey="test-api-key" venues={mockVenues} onMarkerClick={handleMarkerClick} />
      );

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[1]!);

      expect(handleMarkerClick).toHaveBeenCalledWith(mockVenues[1]);
    });
  });

  describe('Props', () => {
    it('accepts custom center prop', () => {
      const center = { lat: 10.762622, lng: 106.660172 };
      render(<GoogleMap apiKey="test-api-key" center={center} />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('accepts custom zoom prop', () => {
      render(<GoogleMap apiKey="test-api-key" zoom={15} />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('accepts custom height prop', () => {
      render(<GoogleMap apiKey="test-api-key" height={400} />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('accepts custom width prop', () => {
      render(<GoogleMap apiKey="test-api-key" width="50%" />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('accepts mapId prop', () => {
      render(<GoogleMap apiKey="test-api-key" mapId="custom-map-id" />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('accepts className prop', () => {
      const { container } = render(<GoogleMap apiKey="test-api-key" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to wrapper element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<GoogleMap apiKey="test-api-key" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref correctly with venues', () => {
      const ref = createRef<HTMLDivElement>();
      render(<GoogleMap apiKey="test-api-key" venues={mockVenues} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(GoogleMap.displayName).toBe('GoogleMap');
    });
  });

  describe('Edge Cases', () => {
    it('handles venues with missing isAvailable property', () => {
      const venuesWithoutAvailability: MapVenue[] = [
        {
          id: '1',
          name: 'Test Venue',
          latitude: 10.762622,
          longitude: 106.660172,
        },
      ];

      render(<GoogleMap apiKey="test-api-key" venues={venuesWithoutAvailability} />);
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
    });

    it('handles very long venue names', () => {
      const longNameVenue: MapVenue[] = [
        {
          id: '1',
          name: 'This is a very long venue name that should still render correctly without breaking the layout',
          latitude: 10.762622,
          longitude: 106.660172,
        },
      ];

      render(<GoogleMap apiKey="test-api-key" venues={longNameVenue} />);
      expect(screen.getByText(longNameVenue[0]!.name)).toBeInTheDocument();
    });

    it('handles special characters in venue names', () => {
      const specialCharVenue: MapVenue[] = [
        {
          id: '1',
          name: "Café René's & Co. @ 123!",
          latitude: 10.762622,
          longitude: 106.660172,
        },
      ];

      render(<GoogleMap apiKey="test-api-key" venues={specialCharVenue} />);
      expect(screen.getByText(specialCharVenue[0]!.name)).toBeInTheDocument();
    });

    it('handles zero zoom level', () => {
      render(<GoogleMap apiKey="test-api-key" zoom={0} />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('handles maximum zoom level', () => {
      render(<GoogleMap apiKey="test-api-key" zoom={20} />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });
  });
});
