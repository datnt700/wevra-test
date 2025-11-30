import type { MapVenue } from './MapVenue';

/**
 * Props for LeafletMap component
 */
export interface LeafletMapProps {
  /** Array of venues to display */
  venues?: MapVenue[];
  /** Center of the map [latitude, longitude] */
  center?: [number, number];
  /** Zoom level (1-18) */
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
