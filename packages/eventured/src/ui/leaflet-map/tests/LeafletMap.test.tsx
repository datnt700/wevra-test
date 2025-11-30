import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { LeafletMap } from '../components/LeafletMap';
import type { MapVenue } from '../types';

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="leaflet-map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({
    children,
    eventHandlers,
  }: {
    children: React.ReactNode;
    eventHandlers?: { click: () => void };
  }) => (
    <div data-testid="marker" onClick={eventHandlers?.click}>
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

// Mock leaflet
vi.mock('leaflet', () => ({
  default: {
    divIcon: vi.fn(() => ({})),
  },
}));

describe('LeafletMap', () => {
  const mockVenues: MapVenue[] = [
    {
      id: '1',
      name: 'The Coffee Bean',
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Main St',
      description: 'Great coffee shop',
      isAvailable: true,
    },
    {
      id: '2',
      name: 'The Tea House',
      latitude: 37.7849,
      longitude: -122.4094,
      address: '456 Second St',
      isAvailable: false,
    },
  ];

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<LeafletMap />);
      expect(container.firstChild).toBeTruthy();
    });

    it('renders with default props', () => {
      render(<LeafletMap />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
      expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    });

    it('renders MapContainer component', () => {
      render(<LeafletMap />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('renders TileLayer component', () => {
      render(<LeafletMap />);
      expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    });
  });

  describe('Venues', () => {
    it('renders with empty venues array', () => {
      render(<LeafletMap venues={[]} />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
      expect(screen.queryAllByTestId('marker')).toHaveLength(0);
    });

    it('renders with venues', () => {
      render(<LeafletMap venues={mockVenues} />);
      expect(screen.getAllByTestId('marker')).toHaveLength(2);
    });

    it('renders venue names in popups', () => {
      render(<LeafletMap venues={mockVenues} />);
      expect(screen.getByText('The Coffee Bean')).toBeInTheDocument();
      expect(screen.getByText('The Tea House')).toBeInTheDocument();
    });

    it('renders venue addresses when provided', () => {
      render(<LeafletMap venues={mockVenues} />);
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('456 Second St')).toBeInTheDocument();
    });

    it('renders venue descriptions when provided', () => {
      render(<LeafletMap venues={mockVenues} />);
      expect(screen.getByText('Great coffee shop')).toBeInTheDocument();
    });

    it('renders availability status', () => {
      render(<LeafletMap venues={mockVenues} />);
      expect(screen.getByText('✓ Available')).toBeInTheDocument();
      expect(screen.getByText('✗ Unavailable')).toBeInTheDocument();
    });

    it('renders with single venue', () => {
      render(<LeafletMap venues={[mockVenues[0]!]} />);
      expect(screen.getAllByTestId('marker')).toHaveLength(1);
      expect(screen.getByText('The Coffee Bean')).toBeInTheDocument();
    });

    it('handles venues without addresses', () => {
      const venuesWithoutAddress: MapVenue[] = [
        {
          id: '1',
          name: 'Test Venue',
          latitude: 37.7749,
          longitude: -122.4194,
        },
      ];

      render(<LeafletMap venues={venuesWithoutAddress} />);
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
    });

    it('handles venues without descriptions', () => {
      const venuesWithoutDescription: MapVenue[] = [
        {
          id: '1',
          name: 'Test Venue',
          latitude: 37.7749,
          longitude: -122.4194,
          address: '123 Main St',
        },
      ];

      render(<LeafletMap venues={venuesWithoutDescription} />);
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
    });
  });

  describe('Marker Click Handler', () => {
    it('calls onMarkerClick when marker is clicked', async () => {
      const handleMarkerClick = vi.fn();
      const user = userEvent.setup();

      render(<LeafletMap venues={mockVenues} onMarkerClick={handleMarkerClick} />);

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[0]!);

      expect(handleMarkerClick).toHaveBeenCalledTimes(1);
      expect(handleMarkerClick).toHaveBeenCalledWith(mockVenues[0]);
    });

    it('does not throw when onMarkerClick is not provided', async () => {
      const user = userEvent.setup();

      render(<LeafletMap venues={mockVenues} />);

      const markers = screen.getAllByTestId('marker');
      await expect(user.click(markers[0]!)).resolves.not.toThrow();
    });

    it('calls onMarkerClick with correct venue data', async () => {
      const handleMarkerClick = vi.fn();
      const user = userEvent.setup();

      render(<LeafletMap venues={mockVenues} onMarkerClick={handleMarkerClick} />);

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[1]!);

      expect(handleMarkerClick).toHaveBeenCalledWith(mockVenues[1]);
    });

    it('handles multiple marker clicks', async () => {
      const handleMarkerClick = vi.fn();
      const user = userEvent.setup();

      render(<LeafletMap venues={mockVenues} onMarkerClick={handleMarkerClick} />);

      const markers = screen.getAllByTestId('marker');
      await user.click(markers[0]!);
      await user.click(markers[1]!);
      await user.click(markers[0]!);

      expect(handleMarkerClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Props', () => {
    it('accepts custom center prop', () => {
      render(<LeafletMap center={[10.7718, 106.7012]} />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('accepts custom zoom prop', () => {
      render(<LeafletMap zoom={15} />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('accepts custom height prop as number', () => {
      render(<LeafletMap height={400} />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('accepts custom height prop as string', () => {
      render(<LeafletMap height="400px" />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('accepts custom width prop as string', () => {
      render(<LeafletMap width="50%" />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('accepts custom width prop as number', () => {
      render(<LeafletMap width={800} />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('accepts className prop', () => {
      const { container } = render(<LeafletMap className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to wrapper element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<LeafletMap ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref correctly with venues', () => {
      const ref = createRef<HTMLDivElement>();
      render(<LeafletMap venues={mockVenues} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(LeafletMap.displayName).toBe('LeafletMap');
    });
  });

  describe('Edge Cases', () => {
    it('handles venues with missing isAvailable property', () => {
      const venuesWithoutAvailability: MapVenue[] = [
        {
          id: '1',
          name: 'Test Venue',
          latitude: 37.7749,
          longitude: -122.4194,
        },
      ];

      render(<LeafletMap venues={venuesWithoutAvailability} />);
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
      // Component shows unavailable when isAvailable is undefined (falsy)
      expect(screen.getByText('✗ Unavailable')).toBeInTheDocument();
    });

    it('handles very long venue names', () => {
      const longNameVenue: MapVenue[] = [
        {
          id: '1',
          name: 'This is a very long venue name that should still render correctly without breaking the layout',
          latitude: 37.7749,
          longitude: -122.4194,
        },
      ];

      render(<LeafletMap venues={longNameVenue} />);
      expect(screen.getByText(longNameVenue[0]!.name)).toBeInTheDocument();
    });

    it('handles special characters in venue names', () => {
      const specialCharVenue: MapVenue[] = [
        {
          id: '1',
          name: "Café René's & Co. @ 123!",
          latitude: 37.7749,
          longitude: -122.4194,
        },
      ];

      render(<LeafletMap venues={specialCharVenue} />);
      expect(screen.getByText(specialCharVenue[0]!.name)).toBeInTheDocument();
    });

    it('handles zero latitude and longitude', () => {
      const zeroCoordinates: MapVenue[] = [
        {
          id: '1',
          name: 'Null Island',
          latitude: 0,
          longitude: 0,
        },
      ];

      render(<LeafletMap venues={zeroCoordinates} />);
      expect(screen.getByText('Null Island')).toBeInTheDocument();
    });

    it('handles negative coordinates', () => {
      const negativeCoordinates: MapVenue[] = [
        {
          id: '1',
          name: 'Southern Hemisphere',
          latitude: -33.8688,
          longitude: 151.2093,
        },
      ];

      render(<LeafletMap venues={negativeCoordinates} />);
      expect(screen.getByText('Southern Hemisphere')).toBeInTheDocument();
    });

    it('handles minimum zoom level', () => {
      render(<LeafletMap zoom={1} />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('handles maximum zoom level', () => {
      render(<LeafletMap zoom={18} />);
      expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
    });

    it('renders popups for all venues', () => {
      render(<LeafletMap venues={mockVenues} />);
      expect(screen.getAllByTestId('popup')).toHaveLength(2);
    });
  });
});
