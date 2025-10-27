import type { Meta, StoryObj } from '@storybook/react';
import { GoogleMap } from '@tavia/core';

const meta = {
  title: 'Core/Display/GoogleMap',
  component: GoogleMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'GoogleMap component for displaying venue locations using Google Maps. Requires a Google Maps API key. Features custom markers with availability status and click handlers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    apiKey: { control: 'text', description: 'Google Maps API key (required)' },
    mapId: { control: 'text', description: 'Google Maps ID for custom styling' },
    venues: { control: 'object', description: 'Array of venue locations to display' },
    center: { control: 'object', description: 'Center coordinates { lat, lng }' },
    zoom: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Zoom level (1-20)',
    },
    height: { control: 'text', description: 'Map height (px or string)' },
    width: { control: 'text', description: 'Map width (px or string)' },
    onMarkerClick: { action: 'marker clicked', description: 'Callback when marker is clicked' },
  },
} satisfies Meta<typeof GoogleMap>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample venues data - Ho Chi Minh City, Vietnam
const sampleVenues = [
  {
    id: '1',
    name: 'The Workshop Coffee',
    latitude: 10.7718,
    longitude: 106.7012,
    isAvailable: true,
    address: '27 Ngô Đức Kế, District 1, HCMC',
    description: 'Specialty coffee roaster and café',
  },
  {
    id: '2',
    name: "L'Usine Le Loi",
    latitude: 10.7752,
    longitude: 106.7008,
    isAvailable: true,
    address: '151/5 Dong Khoi, District 1, HCMC',
    description: 'Café, restaurant & concept store',
  },
  {
    id: '3',
    name: 'Saigon Oi Cafe',
    latitude: 10.7698,
    longitude: 106.698,
    isAvailable: false,
    address: '78 Ton That Dam, District 1, HCMC',
    description: 'Traditional Vietnamese café',
  },
  {
    id: '4',
    name: 'Bosgaurus Coffee Roasters',
    latitude: 10.7835,
    longitude: 106.699,
    isAvailable: true,
    address: '254/4 Lê Thánh Tôn, District 1, HCMC',
    description: 'Artisan coffee roastery',
  },
  {
    id: '5',
    name: 'Highlands Coffee',
    latitude: 10.7763,
    longitude: 106.701,
    isAvailable: true,
    address: 'Vincom Center, 70-72 Le Thanh Ton, District 1',
    description: 'Popular Vietnamese coffee chain',
  },
];

// Note: Replace with your actual Google Maps API key
const DEMO_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'YOUR_API_KEY_HERE';

export const Default: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    venues: sampleVenues,
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 14,
    height: 600,
    width: '100%',
  },
};

export const SingleVenue: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    venues: [sampleVenues[0]],
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 16,
    height: 600,
  },
};

export const CustomSize: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    venues: sampleVenues,
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 14,
    height: 400,
    width: '80%',
  },
};

export const HighZoom: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    venues: sampleVenues.slice(0, 2),
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 17,
    height: 600,
  },
};

export const LowZoom: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    venues: sampleVenues,
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 12,
    height: 600,
  },
};

export const NoAPIKey: Story = {
  args: {
    apiKey: '',
    venues: sampleVenues,
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 14,
  },
};

export const EmptyVenues: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    venues: [],
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 14,
    height: 600,
  },
};

export const InteractiveDemo: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    venues: sampleVenues,
    center: { lat: 10.7718, lng: 106.7012 },
    zoom: 14,
    height: 500,
  },
  render: (args) => (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Interactive Google Map - Ho Chi Minh City</h2>
      <p style={{ marginBottom: '1rem' }}>
        Click on markers to see café details. Green markers are available, red markers are
        unavailable.
      </p>
      <GoogleMap {...args} />
    </div>
  ),
};
