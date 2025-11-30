import type { MapVenue } from './MapVenue';

/**
 * Props for MapboxMap component
 */
export interface MapboxMapProps {
  /** Mapbox access token (required) */
  mapboxAccessToken: string;
  /** Array of venues to display */
  venues?: MapVenue[];
  /** Initial center of the map */
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  /** Map style URL */
  mapStyle?: string;
  /** Map height */
  height?: string | number;
  /** Map width */
  width?: string | number;
  /** Callback when marker is clicked */
  onMarkerClick?: (venue: MapVenue) => void;
  /** Additional CSS class */
  className?: string;
}
