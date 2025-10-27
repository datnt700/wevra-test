import type { Meta, StoryObj } from '@storybook/react';
import { MapboxMap } from '@tavia/taviad/ui/mapbox-map';
import type { MapVenue } from '@tavia/taviad/types/MapVenue';

// Sample venues in Ho Chi Minh City, Vietnam
const hcmcVenues: MapVenue[] = [
  {
    id: '1',
    name: 'The Workshop Coffee',
    latitude: 10.7718,
    longitude: 106.7012,
    isAvailable: true,
    address: '27 Ngô Đức Kế, Bến Nghé, District 1',
    description: 'Specialty coffee shop with modern industrial design',
    rating: 4.5,
  },
  {
    id: '2',
    name: "L'Usine",
    latitude: 10.7738,
    longitude: 106.7023,
    isAvailable: true,
    address: '151/6 Đồng Khởi, Bến Nghé, District 1',
    description: 'Trendy café and boutique in a French colonial villa',
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Saigon Oi Cafe',
    latitude: 10.7695,
    longitude: 106.6983,
    isAvailable: false,
    address: '62 Hồ Tùng Mậu, Bến Nghé, District 1',
    description: 'Cozy Vietnamese café with local atmosphere',
    rating: 4.3,
  },
  {
    id: '4',
    name: 'The Coffee House',
    latitude: 10.7769,
    longitude: 106.7009,
    isAvailable: true,
    address: 'Bitexco Financial Tower, 2 Hải Triều, District 1',
    description: 'Popular Vietnamese coffee chain with city views',
    rating: 4.4,
  },
  {
    id: '5',
    name: 'Highlands Coffee',
    latitude: 10.7752,
    longitude: 106.7042,
    isAvailable: true,
    address: 'Vincom Center, 72 Lê Thánh Tôn, District 1',
    description: 'Vietnamese coffee chain known for consistency',
    rating: 4.2,
  },
];

const meta: Meta<typeof MapboxMap> = {
  title: 'Core/Display/MapboxMap',
  component: MapboxMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'MapboxMap component using react-map-gl for displaying venue locations with interactive markers and popups. Offers powerful features like 3D buildings, custom styling, and smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mapboxAccessToken: {
      control: 'text',
      description: 'Mapbox access token (required)',
    },
    venues: {
      control: 'object',
      description: 'Array of venue locations to display',
    },
    initialViewState: {
      control: 'object',
      description: 'Initial map view configuration (longitude, latitude, zoom)',
    },
    mapStyle: {
      control: 'select',
      options: [
        'mapbox://styles/mapbox/streets-v12',
        'mapbox://styles/mapbox/light-v11',
        'mapbox://styles/mapbox/dark-v11',
        'mapbox://styles/mapbox/satellite-v9',
        'mapbox://styles/mapbox/satellite-streets-v12',
        'mapbox://styles/mapbox/navigation-day-v1',
        'mapbox://styles/mapbox/navigation-night-v1',
      ],
      description: 'Mapbox map style URL',
    },
    height: {
      control: 'number',
      description: 'Map height in pixels',
    },
    width: {
      control: 'text',
      description: 'Map width (CSS value)',
    },
    onMarkerClick: {
      action: 'markerClicked',
      description: 'Callback when a marker is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MapboxMap>;

// Default story
export const Default: Story = {
  args: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE',
    venues: hcmcVenues,
    height: 600,
  },
};

// Single venue
export const SingleVenue: Story = {
  args: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE',
    venues: [hcmcVenues[0]],
    height: 500,
  },
};

// Dark mode
export const DarkMode: Story = {
  args: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE',
    venues: hcmcVenues,
    mapStyle: 'mapbox://styles/mapbox/dark-v11',
    height: 600,
  },
};

// Satellite view
export const SatelliteView: Story = {
  args: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE',
    venues: hcmcVenues,
    mapStyle: 'mapbox://styles/mapbox/satellite-streets-v12',
    height: 600,
  },
};

// Custom zoom and center
export const CustomView: Story = {
  args: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE',
    venues: hcmcVenues,
    initialViewState: {
      longitude: 106.7012,
      latitude: 10.7718,
      zoom: 15,
    },
    height: 700,
  },
};

// Only available venues
export const AvailableOnly: Story = {
  args: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE',
    venues: hcmcVenues.filter((v) => v.isAvailable),
    height: 600,
  },
};

// Empty state
export const NoVenues: Story = {
  args: {
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE',
    venues: [],
    height: 500,
  },
};

// No token (error state)
export const NoToken: Story = {
  args: {
    mapboxAccessToken: '',
    venues: hcmcVenues,
    height: 500,
  },
};
