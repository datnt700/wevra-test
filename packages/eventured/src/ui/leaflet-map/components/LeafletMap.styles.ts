'use client';

/**
 * LeafletMap component styles using Emotion
 * @module LeafletMap.styles
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

export const Styled = {
  Wrapper: styled.div<{ $height?: string | number; $width?: string | number }>`
    ${({ theme, $height, $width }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        width: ${typeof $width === 'number' ? `${$width}px` : $width || '100%'};
        height: ${typeof $height === 'number' ? `${$height}px` : $height || '600px'};
        border-radius: ${eventureTheme.radii.lg};
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        position: relative;

        /* Leaflet container styles */
        .leaflet-container {
          width: 100%;
          height: 100%;
          border-radius: ${eventureTheme.radii.lg};
        }

        /* Ensure tiles load properly */
        .leaflet-tile-container {
          pointer-events: none;
        }

        .leaflet-tile {
          pointer-events: auto;
        }
      `;
    }}
  `,
};
