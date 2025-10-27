/**
 * Shared types for map components
 */

/**
 * Venue location data for map markers
 */
export interface MapVenue {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  isAvailable?: boolean;
  address?: string;
  description?: string;
  image?: string;
  rating?: number;
}
