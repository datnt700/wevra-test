'use client';

import { forwardRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { LeafletMapProps } from '../types';
import { Styled } from './LeafletMap.styles';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

/**
 * LeafletMap component for displaying venues on OpenStreetMap
 * Uses react-leaflet for React integration
 *
 * @example
 * ```tsx
 * <LeafletMap
 *   venues={[{ id: '1', name: 'Café', latitude: 37.7749, longitude: -122.4194 }]}
 *   onMarkerClick={(venue) => console.log(venue)}
 * />
 * ```
 */
export const LeafletMap = forwardRef<HTMLDivElement, LeafletMapProps>(
  (
    {
      venues = [],
      center = [37.7749, -122.4194],
      zoom = 12,
      height = 600,
      width = '100%',
      onMarkerClick,
      className,
      ...other
    },
    ref
  ) => {
    // Custom icon for markers (fixes default icon issue in Next.js)
    const createCustomIcon = (isAvailable: boolean = true) => {
      const color = isAvailable ? '#10b981' : '#ef4444'; // green or red
      const svgIcon = `
        <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24C32 7.163 24.837 0 16 0z"
            fill="${color}"
            stroke="#fff"
            stroke-width="2"
          />
          <circle cx="16" cy="16" r="6" fill="#fff"/>
        </svg>
      `;
      return L.divIcon({
        html: svgIcon,
        className: 'custom-marker',
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      });
    };

    // Memoize map center to prevent re-renders
    const mapCenter = useMemo(() => center, [center[0], center[1]]);

    return (
      <Styled.Wrapper ref={ref} $height={height} $width={width} className={className} {...other}>
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {venues.map((venue) => (
            <Marker
              key={venue.id}
              position={[venue.latitude, venue.longitude]}
              icon={createCustomIcon(venue.isAvailable ?? true)}
              eventHandlers={{
                click: () => onMarkerClick?.(venue),
              }}
            >
              <Popup>
                <div style={{ minWidth: '150px' }}>
                  <strong>{venue.name}</strong>
                  {venue.address && (
                    <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>{venue.address}</p>
                  )}
                  {venue.description && (
                    <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
                      {venue.description}
                    </p>
                  )}
                  <div
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.75rem',
                      color: venue.isAvailable ? '#10b981' : '#ef4444',
                    }}
                  >
                    {venue.isAvailable ? '✓ Available' : '✗ Unavailable'}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Styled.Wrapper>
    );
  }
);

LeafletMap.displayName = 'LeafletMap';
