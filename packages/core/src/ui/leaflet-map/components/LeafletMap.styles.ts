'use client';

/**
 * LeafletMap component styles using Emotion
 * @module LeafletMap.styles
 */
import styled from '@emotion/styled';
import { radii } from '../../../theme/tokens/radii';

export const Styled = {
  Wrapper: styled.div<{ $height?: string | number; $width?: string | number }>`
    width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
    height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height || '600px')};
    border-radius: ${radii.lg};
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;

    /* Leaflet container styles */
    .leaflet-container {
      width: 100%;
      height: 100%;
      border-radius: ${radii.lg};
    }

    /* Ensure tiles load properly */
    .leaflet-tile-container {
      pointer-events: none;
    }

    .leaflet-tile {
      pointer-events: auto;
    }
  `,
};
