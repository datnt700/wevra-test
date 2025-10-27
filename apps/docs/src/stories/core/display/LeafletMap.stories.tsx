import type { Meta, StoryObj } from '@storybook/react';
import { LeafletMap } from '@tavia/taviad';

const meta = {
  title: 'Core/Display/LeafletMap',
  component: LeafletMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'LeafletMap component for displaying venue locations using OpenStreetMap. Free and open-source, no API key required. Features custom markers with availability status, popups, and click handlers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    venues: { control: 'object', description: 'Array of venue locations to display' },
    center: { control: 'object', description: 'Center coordinates [latitude, longitude]' },
    zoom: {
      control: { type: 'range', min: 1, max: 18, step: 1 },
      description: 'Zoom level (1-18)',
    },
    height: { control: 'text', description: 'Map height (px or string)' },
    width: { control: 'text', description: 'Map width (px or string)' },
    onMarkerClick: { action: 'marker clicked', description: 'Callback when marker is clicked' },
  },
} satisfies Meta<typeof LeafletMap>;

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

export const Default: Story = {
  args: {
    venues: sampleVenues,
    center: [10.7718, 106.7012],
    zoom: 14,
    height: 600,
    width: '100%',
  },
};

export const SingleVenue: Story = {
  args: {
    venues: [sampleVenues[0]],
    center: [10.7718, 106.7012],
    zoom: 16,
    height: 600,
  },
};

export const CustomSize: Story = {
  args: {
    venues: sampleVenues,
    center: [10.7718, 106.7012],
    zoom: 14,
    height: 400,
    width: '80%',
  },
};

export const HighZoom: Story = {
  args: {
    venues: sampleVenues.slice(0, 2),
    center: [10.7718, 106.7012],
    zoom: 17,
    height: 600,
  },
};

export const LowZoom: Story = {
  args: {
    venues: sampleVenues,
    center: [10.7718, 106.7012],
    zoom: 12,
    height: 600,
  },
};

export const EmptyVenues: Story = {
  args: {
    venues: [],
    center: [10.7718, 106.7012],
    zoom: 14,
    height: 600,
  },
};

export const WithPopups: Story = {
  render: (args) => (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Interactive Leaflet Map - Ho Chi Minh City</h2>
      <p style={{ marginBottom: '1rem' }}>
        Click on markers to see café details in popups. Green markers are available, red markers are
        unavailable. This map uses OpenStreetMap - completely free and open-source!
      </p>
      <LeafletMap {...args} />
    </div>
  ),
  args: {
    venues: sampleVenues,
    center: [10.7718, 106.7012],
    zoom: 14,
    height: 500,
  },
};

export const DifferentLocation: Story = {
  args: {
    venues: [
      {
        id: '1',
        name: 'Cộng Cà Phê',
        latitude: 10.7886,
        longitude: 106.6994,
        isAvailable: true,
        address: '26 Lý Tự Trọng, District 1, HCMC',
        description: 'Iconic Vietnamese coffee chain',
      },
      {
        id: '2',
        name: 'Trung Nguyên Legend',
        latitude: 10.7825,
        longitude: 106.6996,
        isAvailable: true,
        address: '172-174 Nguyễn Văn Thủ, District 1, HCMC',
        description: 'Famous Vietnamese coffee brand',
      },
      {
        id: '3',
        name: 'Starbucks Reserve',
        latitude: 10.777,
        longitude: 106.7014,
        isAvailable: true,
        address: 'Bitexco Financial Tower, District 1, HCMC',
        description: 'Premium Starbucks experience',
      },
    ],
    center: [10.7825, 106.6996],
    zoom: 15,
    height: 600,
  },
};
