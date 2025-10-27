import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { MapboxMap } from '../components/MapboxMap';
import type { MapVenue } from '../types';

// Mock react-map-gl
vi.mock('react-map-gl', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mapbox-map">{children}</div>
  ),
  Marker: ({ children, onClick }: { children: React.ReactNode; onClick?: (e: any) => void }) => (
    <div
      data-testid="marker"
      onClick={() =>
        onClick?.({
          originalEvent: {
            stopPropagation: vi.fn(),
          },
        })
      }
    >
      {children}
    </div>
  ),
  Popup: ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => (
    <div data-testid="popup">
      <button data-testid="close-popup" onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  ),
  NavigationControl: () => <div data-testid="navigation-control" />,
  GeolocateControl: () => <div data-testid="geolocate-control" />,
}));

describe('MapboxMap', () => {
  const mockVenues: MapVenue[] = [
    {
      id: '1',
      name: 'The Coffee Bean',
      latitude: 10.7718,
      longitude: 106.7012,
      address: '123 Main St',
      description: 'Great coffee shop',
      rating: 4.5,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'The Tea House',
      latitude: 10.7818,
      longitude: 106.7112,
      address: '456 Second St',
      rating: 4.0,
      isAvailable: false,
    },
  ];

  const mockToken = 'pk.test-mapbox-token';

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<MapboxMap mapboxAccessToken={mockToken} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('renders with default props', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} />);
      expect(screen.getByTestId('mapbox-map')).toBeInTheDocument();
    });

    it('renders error message when token is not provided', () => {
      render(<MapboxMap mapboxAccessToken="" />);
      expect(screen.getByText(/Mapbox access token is required/i)).toBeInTheDocument();
    });

    it('renders error message when token is undefined', () => {
      // @ts-expect-error - Testing invalid prop
      render(<MapboxMap mapboxAccessToken={undefined} />);
      expect(screen.getByText(/Mapbox access token is required/i)).toBeInTheDocument();
    });

    it('renders NavigationControl', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} />);
      expect(screen.getByTestId('navigation-control')).toBeInTheDocument();
    });

    it('renders GeolocateControl', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} />);
      expect(screen.getByTestId('geolocate-control')).toBeInTheDocument();
    });
  });

  describe('Venues', () => {
    it('renders with empty venues array', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} venues={[]} />);
      expect(screen.getByTestId('mapbox-map')).toBeInTheDocument();
      expect(screen.queryAllByTestId('marker')).toHaveLength(0);
    });

    it('renders with venues', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);
      expect(screen.getAllByTestId('marker')).toHaveLength(2);
    });

    it('renders venue names', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);
      expect(screen.getByText('The Coffee Bean')).toBeInTheDocument();
      expect(screen.getByText('The Tea House')).toBeInTheDocument();
    });

    it('renders with single venue', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} venues={[mockVenues[0]!]} />);
      expect(screen.getAllByTestId('marker')).toHaveLength(1);
      expect(screen.getByText('The Coffee Bean')).toBeInTheDocument();
    });

    it('handles venues without addresses', () => {
      const venuesWithoutAddress: MapVenue[] = [
        {
          id: '1',
          name: 'Test Venue',
          latitude: 10.7718,
          longitude: 106.7012,
        },
      ];

      render(<MapboxMap mapboxAccessToken={mockToken} venues={venuesWithoutAddress} />);
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
    });
  });

  describe('Marker Click and Popup', () => {
    it('calls onMarkerClick when marker is clicked', async () => {
      const handleMarkerClick = vi.fn();
      const user = userEvent.setup();

      render(
        <MapboxMap
          mapboxAccessToken={mockToken}
          venues={mockVenues}
          onMarkerClick={handleMarkerClick}
        />
      );

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[0]!);

      expect(handleMarkerClick).toHaveBeenCalledTimes(1);
      expect(handleMarkerClick).toHaveBeenCalledWith(mockVenues[0]);
    });

    it('does not throw when onMarkerClick is not provided', async () => {
      const user = userEvent.setup();

      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);

      const markers = screen.getAllByTestId('marker');
      await expect(user.click(markers[0]!)).resolves.not.toThrow();
    });

    it('shows popup when marker is clicked', async () => {
      const user = userEvent.setup();

      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);

      // Initially no popup
      expect(screen.queryByTestId('popup')).not.toBeInTheDocument();

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[0]!);

      // Popup appears
      expect(screen.getByTestId('popup')).toBeInTheDocument();
    });

    it('displays venue information in popup', async () => {
      const user = userEvent.setup();

      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[0]!);

      const popup = screen.getByTestId('popup');
      expect(popup).toHaveTextContent('The Coffee Bean');
      expect(popup).toHaveTextContent('123 Main St');
      expect(popup).toHaveTextContent('Great coffee shop');
      expect(popup).toHaveTextContent('⭐ 4.5/5');
      expect(popup).toHaveTextContent('✓ Available');
    });

    it('closes popup when close button is clicked', async () => {
      const user = userEvent.setup();

      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[0]!);

      expect(screen.getByTestId('popup')).toBeInTheDocument();

      const closeButton = screen.getByTestId('close-popup');
      await user.click(closeButton);

      expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    });

    it('switches popup when clicking different marker', async () => {
      const user = userEvent.setup();

      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);

      const markers = screen.getAllByTestId('marker');

      // Click first marker
      await user.click(markers[0]!);
      expect(screen.getByTestId('popup')).toHaveTextContent('The Coffee Bean');

      // Click second marker
      await user.click(markers[1]!);
      expect(screen.getByTestId('popup')).toHaveTextContent('The Tea House');
    });

    it('displays unavailable status in popup', async () => {
      const user = userEvent.setup();

      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} />);

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[1]!); // Second venue is unavailable

      const popup = screen.getByTestId('popup');
      expect(popup).toHaveTextContent('✗ Unavailable');
    });

    it('handles popup for venue without rating', async () => {
      const venueWithoutRating: MapVenue[] = [
        {
          id: '1',
          name: 'Test Venue',
          latitude: 10.7718,
          longitude: 106.7012,
        },
      ];

      const user = userEvent.setup();
      render(<MapboxMap mapboxAccessToken={mockToken} venues={venueWithoutRating} />);

      const marker = screen.getByTestId('marker');
      await user.click(marker);

      const popup = screen.getByTestId('popup');
      expect(popup).toHaveTextContent('Test Venue');
      expect(popup).not.toHaveTextContent('⭐');
    });
  });

  describe('Props', () => {
    it('accepts custom initialViewState', () => {
      render(
        <MapboxMap
          mapboxAccessToken={mockToken}
          initialViewState={{ longitude: 106.7012, latitude: 10.7718, zoom: 15 }}
        />
      );
      expect(screen.getByTestId('mapbox-map')).toBeInTheDocument();
    });

    it('accepts custom mapStyle', () => {
      render(
        <MapboxMap mapboxAccessToken={mockToken} mapStyle="mapbox://styles/mapbox/dark-v11" />
      );
      expect(screen.getByTestId('mapbox-map')).toBeInTheDocument();
    });

    it('accepts custom height prop as number', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} height={400} />);
      expect(screen.getByTestId('mapbox-map')).toBeInTheDocument();
    });

    it('accepts custom height prop as string', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} height="400px" />);
      expect(screen.getByTestId('mapbox-map')).toBeInTheDocument();
    });

    it('accepts custom width prop', () => {
      render(<MapboxMap mapboxAccessToken={mockToken} width="50%" />);
      expect(screen.getByTestId('mapbox-map')).toBeInTheDocument();
    });

    it('accepts className prop', () => {
      const { container } = render(
        <MapboxMap mapboxAccessToken={mockToken} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to wrapper element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<MapboxMap mapboxAccessToken={mockToken} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref correctly with venues', () => {
      const ref = createRef<HTMLDivElement>();
      render(<MapboxMap mapboxAccessToken={mockToken} venues={mockVenues} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(MapboxMap.displayName).toBe('MapboxMap');
    });
  });

  describe('Edge Cases', () => {
    it('handles venues with missing isAvailable property', () => {
      const venuesWithoutAvailability: MapVenue[] = [
        {
          id: '1',
          name: 'Test Venue',
          latitude: 10.7718,
          longitude: 106.7012,
        },
      ];

      render(<MapboxMap mapboxAccessToken={mockToken} venues={venuesWithoutAvailability} />);
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
    });

    it('handles very long venue names', () => {
      const longNameVenue: MapVenue[] = [
        {
          id: '1',
          name: 'This is a very long venue name that should still render correctly without breaking the layout',
          latitude: 10.7718,
          longitude: 106.7012,
        },
      ];

      render(<MapboxMap mapboxAccessToken={mockToken} venues={longNameVenue} />);
      expect(screen.getByText(longNameVenue[0]!.name)).toBeInTheDocument();
    });

    it('handles special characters in venue names', () => {
      const specialCharVenue: MapVenue[] = [
        {
          id: '1',
          name: "Café René's & Co. @ 123!",
          latitude: 10.7718,
          longitude: 106.7012,
        },
      ];

      render(<MapboxMap mapboxAccessToken={mockToken} venues={specialCharVenue} />);
      expect(screen.getByText(specialCharVenue[0]!.name)).toBeInTheDocument();
    });

    it('handles zero coordinates', () => {
      const zeroCoordinates: MapVenue[] = [
        {
          id: '1',
          name: 'Null Island',
          latitude: 0,
          longitude: 0,
        },
      ];

      render(<MapboxMap mapboxAccessToken={mockToken} venues={zeroCoordinates} />);
      expect(screen.getByText('Null Island')).toBeInTheDocument();
    });

    it('handles negative coordinates', () => {
      const negativeCoordinates: MapVenue[] = [
        {
          id: '1',
          name: 'Southern Location',
          latitude: -33.8688,
          longitude: -151.2093,
        },
      ];

      render(<MapboxMap mapboxAccessToken={mockToken} venues={negativeCoordinates} />);
      expect(screen.getByText('Southern Location')).toBeInTheDocument();
    });

    it('logs error when token is missing', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<MapboxMap mapboxAccessToken="" />);

      expect(consoleErrorSpy).toHaveBeenCalledWith('MapboxMap: mapboxAccessToken is required');

      consoleErrorSpy.mockRestore();
    });

    it('handles multiple marker clicks and popup switches', async () => {
      const handleMarkerClick = vi.fn();
      const user = userEvent.setup();

      render(
        <MapboxMap
          mapboxAccessToken={mockToken}
          venues={mockVenues}
          onMarkerClick={handleMarkerClick}
        />
      );

      const markers = screen.getAllByTestId('marker');

      await user.click(markers[0]!);
      expect(handleMarkerClick).toHaveBeenCalledWith(mockVenues[0]);

      await user.click(markers[1]!);
      expect(handleMarkerClick).toHaveBeenCalledWith(mockVenues[1]);

      expect(handleMarkerClick).toHaveBeenCalledTimes(2);
    });
  });
});
