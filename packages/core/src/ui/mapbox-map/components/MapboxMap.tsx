'use client';

import { forwardRef, useState } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { MapboxMapProps } from '../types';
import { Styled } from './MapboxMap.styles';

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * MapboxMap component for displaying venues using Mapbox GL JS
 * Uses react-map-gl for React integration with powerful features
 *
 * @example
 * ```tsx
 * <MapboxMap
 *   mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
 *   venues={[{ id: '1', name: 'Café', latitude: 10.7718, longitude: 106.7012 }]}
 *   onMarkerClick={(venue) => console.log(venue)}
 * />
 * ```
 */
export const MapboxMap = forwardRef<HTMLDivElement, MapboxMapProps>(
  (
    {
      mapboxAccessToken,
      venues = [],
      initialViewState = {
        longitude: 106.7012,
        latitude: 10.7718,
        zoom: 13,
      },
      mapStyle = 'mapbox://styles/mapbox/streets-v12',
      height = 600,
      width = '100%',
      onMarkerClick,
      className,
      ...other
    },
    ref
  ) => {
    const [popupInfo, setPopupInfo] = useState<(typeof venues)[0] | null>(null);

    if (!mapboxAccessToken) {
      console.error('MapboxMap: mapboxAccessToken is required');
      return (
        <Styled.ErrorMessage>
          ⚠️ Mapbox access token is required. Please provide a Mapbox token.
        </Styled.ErrorMessage>
      );
    }

    return (
      <Styled.Wrapper ref={ref} $height={height} $width={width} className={className} {...other}>
        <Map
          mapboxAccessToken={mapboxAccessToken}
          initialViewState={initialViewState}
          mapStyle={mapStyle}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Navigation Controls */}
          <NavigationControl position="top-right" />
          <GeolocateControl position="top-right" />

          {/* Markers */}
          {venues.map((venue) => (
            <Marker
              key={venue.id}
              longitude={venue.longitude}
              latitude={venue.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent?.stopPropagation();
                setPopupInfo(venue);
                onMarkerClick?.(venue);
              }}
            >
              <Styled.MarkerContainer $isAvailable={venue.isAvailable}>
                <Styled.Marker $isAvailable={venue.isAvailable ?? true}>{venue.name}</Styled.Marker>
              </Styled.MarkerContainer>
            </Marker>
          ))}

          {/* Popup */}
          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              anchor="top"
              onClose={() => setPopupInfo(null)}
              closeButton={true}
              closeOnClick={false}
            >
              <Styled.Popup>
                <h3>{popupInfo.name}</h3>
                {popupInfo.address && <p>{popupInfo.address}</p>}
                {popupInfo.description && <p>{popupInfo.description}</p>}
                {popupInfo.rating && <p>⭐ {popupInfo.rating}/5</p>}
                <div className={`status ${popupInfo.isAvailable ? 'available' : 'unavailable'}`}>
                  {popupInfo.isAvailable ? '✓ Available' : '✗ Unavailable'}
                </div>
              </Styled.Popup>
            </Popup>
          )}
        </Map>
      </Styled.Wrapper>
    );
  }
);

MapboxMap.displayName = 'MapboxMap';
