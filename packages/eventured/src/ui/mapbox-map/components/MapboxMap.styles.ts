'use client';

/**
 * MapboxMap component styles using Emotion
 * @module MapboxMap.styles
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

        /* Mapbox container styles */
        .mapboxgl-map {
          border-radius: ${eventureTheme.radii.lg};
        }

        /* Hide Mapbox logo (optional - check Mapbox TOS) */
        .mapboxgl-ctrl-logo {
          display: none !important;
        }
      `;
    }}
  `,

  MarkerContainer: styled.div<{ $isAvailable?: boolean }>`
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  `,

  Marker: styled.div<{ $isAvailable?: boolean }>`
    ${({ theme, $isAvailable }) => {
      const eventureTheme = theme as EventureTheme;
      const markerColor = $isAvailable ? eventureTheme.colors.success : eventureTheme.colors.danger;
      return `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        background-color: ${markerColor};
        color: ${eventureTheme.colors.surface};
        border-radius: ${eventureTheme.radii.md};
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        white-space: nowrap;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;

        /* Pointer arrow */
        &::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid ${markerColor};
        }
      `;
    }}
  `,

  Popup: styled.div`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        padding: 0.75rem;
        min-width: 200px;

        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: ${eventureTheme.colors.text.primary};
        }

        p {
          margin: 0.25rem 0;
          font-size: 0.875rem;
          color: ${eventureTheme.colors.text.secondary};
        }

        .status {
          margin-top: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: ${eventureTheme.radii.sm};
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
        }

        .status.available {
          background-color: ${eventureTheme.colors.gray.colorSuccessLight};
          color: ${eventureTheme.colors.success};
        }

        .status.unavailable {
          background-color: ${eventureTheme.colors.gray.colorDangerLight};
          color: ${eventureTheme.colors.danger};
        }
      `;
    }}
  `,

  ErrorMessage: styled.div`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: ${eventureTheme.colors.surfaceHover};
        color: ${eventureTheme.colors.danger};
        font-size: 0.875rem;
        border-radius: ${eventureTheme.radii.lg};
        padding: 1rem;
      `;
    }}
  `,
};
