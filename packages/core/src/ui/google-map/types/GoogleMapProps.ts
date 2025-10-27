import type { MapVenue } from './MapVenue';

/**
 * Props for GoogleMap component
 */
export interface GoogleMapProps {
  /** Google Maps API key */
  apiKey: string;
  /** Google Maps ID (for styling) */
  mapId?: string;
  /** Array of venues to display */
  venues?: MapVenue[];
  /** Center of the map */
  center?: { lat: number; lng: number };
  /** Zoom level (1-20) */
  zoom?: number;
  /** Map height */
  height?: string | number;
  /** Map width */
  width?: string | number;
  /** Callback when marker is clicked */
  onMarkerClick?: (venue: MapVenue) => void;
  /** Additional CSS class */
  className?: string;
}
