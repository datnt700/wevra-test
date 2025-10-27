# MapboxMap Component

A powerful map component using Mapbox GL JS via react-map-gl for displaying
venue locations with interactive markers, popups, and advanced features.

## Features

- 🗺️ **Mapbox GL JS**: Leverages Mapbox's powerful vector tile technology
- 🎨 **Multiple Styles**: Streets, satellite, dark mode, and more
- 🎯 **Interactive Markers**: Click markers to view venue details
- 📍 **Navigation Controls**: Zoom, rotate, and geolocate functionality
- 🌍 **3D Buildings**: Supports 3D terrain and building visualization
- ⚡ **High Performance**: Hardware-accelerated rendering
- 🎨 **Custom Styling**: Emotion-based styling with theme tokens

## Installation

The MapboxMap component is part of `@tavia/core`. Dependencies are already
included:

```bash
pnpm add @tavia/core
```

## Usage

### Basic Example

```tsx
import { MapboxMap } from '@tavia/core';

const venues = [
  {
    id: '1',
    name: 'The Workshop Coffee',
    latitude: 10.7718,
    longitude: 106.7012,
    isAvailable: true,
    address: '27 Ngô Đức Kế, Bến Nghé, District 1',
    description: 'Specialty coffee shop',
    rating: 4.5,
  },
];

function App() {
  return (
    <MapboxMap
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
      venues={venues}
      onMarkerClick={(venue) => console.log('Clicked:', venue)}
    />
  );
}
```

### With Custom Styling

```tsx
<MapboxMap
  mapboxAccessToken={token}
  venues={venues}
  mapStyle="mapbox://styles/mapbox/dark-v11"
  height={700}
  width="100%"
  initialViewState={{
    longitude: 106.7012,
    latitude: 10.7718,
    zoom: 15,
  }}
/>
```

### Available Map Styles

- `mapbox://styles/mapbox/streets-v12` (default)
- `mapbox://styles/mapbox/light-v11`
- `mapbox://styles/mapbox/dark-v11`
- `mapbox://styles/mapbox/satellite-v9`
- `mapbox://styles/mapbox/satellite-streets-v12`
- `mapbox://styles/mapbox/navigation-day-v1`
- `mapbox://styles/mapbox/navigation-night-v1`

## API Reference

### Props

| Prop                | Type                        | Default                                              | Description              |
| ------------------- | --------------------------- | ---------------------------------------------------- | ------------------------ |
| `mapboxAccessToken` | `string`                    | **required**                                         | Mapbox API access token  |
| `venues`            | `MapVenue[]`                | `[]`                                                 | Array of venue locations |
| `initialViewState`  | `object`                    | `{longitude: 106.7012, latitude: 10.7718, zoom: 13}` | Initial map view         |
| `mapStyle`          | `string`                    | `'mapbox://styles/mapbox/streets-v12'`               | Mapbox style URL         |
| `height`            | `number`                    | `600`                                                | Map height in pixels     |
| `width`             | `string \| number`          | `'100%'`                                             | Map width (CSS value)    |
| `onMarkerClick`     | `(venue: MapVenue) => void` | -                                                    | Marker click callback    |
| `className`         | `string`                    | -                                                    | Additional CSS class     |

### MapVenue Type

```typescript
interface MapVenue {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  isAvailable?: boolean;
  address?: string;
  description?: string;
  rating?: number;
}
```

## Getting Mapbox Access Token

1. Create account at [mapbox.com](https://account.mapbox.com/)
2. Get free access token (50,000 loads/month free)
3. Add to environment variables:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ5b3VyLXRva2VuIn0...
```

## Features

### Navigation Controls

- **Zoom**: `+`/`-` buttons or scroll wheel
- **Rotate**: Right-click + drag or two-finger rotate
- **Geolocate**: Click compass to center on user location

### Marker Interaction

- Click markers to view venue details in popup
- Color-coded markers:
  - 🟢 Green: Available venues
  - 🔴 Red: Unavailable venues

### Performance

- Hardware-accelerated rendering via WebGL
- Vector tiles for smooth panning/zooming
- Efficient marker clustering for many venues

## Comparison with Other Map Components

| Feature       | MapboxMap        | GoogleMap               | LeafletMap  |
| ------------- | ---------------- | ----------------------- | ----------- |
| Cost          | Free tier 50k/mo | Paid (billing required) | 100% Free   |
| 3D Support    | ✅ Yes           | ✅ Yes                  | ❌ No       |
| Custom Styles | ✅ Excellent     | ✅ Good                 | ⚠️ Limited  |
| Performance   | ⚡ Excellent     | ⚡ Excellent            | ✅ Good     |
| API Key       | Required         | Required                | None        |
| Offline       | ✅ Possible      | ❌ No                   | ✅ Possible |

## Examples

Check the Storybook documentation for interactive examples:

```bash
pnpm dev:storybook
# Open http://localhost:6006
# Navigate to Core > Display > MapboxMap
```

## Troubleshooting

### Map doesn't render

- Verify `mapboxAccessToken` is provided
- Check token is valid at [mapbox.com](https://account.mapbox.com/)
- Ensure token starts with `pk.`

### CSS not loading

- Mapbox CSS is imported automatically
- If issues persist, add to your app:
  ```tsx
  import 'mapbox-gl/dist/mapbox-gl.css';
  ```

### TypeScript errors

- Ensure `@types/mapbox-gl` is installed
- Component uses react-map-gl types automatically

## License

Part of the Tavia component library.
