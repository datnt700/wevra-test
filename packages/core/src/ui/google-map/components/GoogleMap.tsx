'use client';

import { forwardRef } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { GoogleMapProps } from '../types';
import { Styled } from './GoogleMap.styles';

/**
 * GoogleMap component for displaying venues on Google Maps
 * Uses @vis.gl/react-google-maps for React 19 compatibility
 *
 * @example
 * ```tsx
 * <GoogleMap
 *   apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
 *   venues={[{ id: '1', name: 'Café', latitude: 37.7749, longitude: -122.4194 }]}
 *   onMarkerClick={(venue) => console.log(venue)}
 * />
 * ```
 */
export const GoogleMap = forwardRef<HTMLDivElement, GoogleMapProps>(
  (
    {
      apiKey,
      mapId,
      venues = [],
      center = { lat: 37.7749, lng: -122.4194 },
      zoom = 12,
      height = 600,
      width = '100%',
      onMarkerClick,
      className,
      ...other
    },
    ref
  ) => {
    if (!apiKey) {
      console.error('GoogleMap: apiKey is required');
      return (
        <Styled.ErrorMessage>
          ⚠️ Google Maps API key is required. Please provide an API key.
        </Styled.ErrorMessage>
      );
    }

    return (
      <Styled.Wrapper ref={ref} $height={height} $width={width} className={className} {...other}>
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={center}
            defaultZoom={zoom}
            mapId={mapId}
            disableDefaultUI={false}
            gestureHandling="greedy"
          >
            {venues.map((venue) => (
              <AdvancedMarker
                key={venue.id}
                position={{ lat: venue.latitude, lng: venue.longitude }}
                onClick={() => onMarkerClick?.(venue)}
              >
                <Styled.Marker $isAvailable={venue.isAvailable ?? true}>{venue.name}</Styled.Marker>
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </Styled.Wrapper>
    );
  }
);

GoogleMap.displayName = 'GoogleMap';
