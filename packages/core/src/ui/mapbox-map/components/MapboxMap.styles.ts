'use client';

/**
 * MapboxMap component styles using Emotion
 * @module MapboxMap.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

export const Styled = {
  Wrapper: styled.div<{ $height?: string | number; $width?: string | number }>`
    width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
    height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height || '600px')};
    border-radius: ${radii.lg};
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;

    /* Mapbox container styles */
    .mapboxgl-map {
      border-radius: ${radii.lg};
    }

    /* Hide Mapbox logo (optional - check Mapbox TOS) */
    .mapboxgl-ctrl-logo {
      display: none !important;
    }
  `,

  MarkerContainer: styled.div<{ $isAvailable?: boolean }>`
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  `,

  Marker: styled.div<{ $isAvailable?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: ${({ $isAvailable }) =>
      $isAvailable ? cssVars.colorSuccess : cssVars.colorDanger};
    color: ${cssVars.light};
    border-radius: ${radii.md};
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
      border-top: 6px solid
        ${({ $isAvailable }) => ($isAvailable ? cssVars.colorSuccess : cssVars.colorDanger)};
    }
  `,

  Popup: styled.div`
    padding: 0.75rem;
    min-width: 200px;

    h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: ${cssVars.dark};
    }

    p {
      margin: 0.25rem 0;
      font-size: 0.875rem;
      color: ${cssVars.dark3};
    }

    .status {
      margin-top: 0.5rem;
      padding: 0.25rem 0.5rem;
      border-radius: ${radii.sm};
      font-size: 0.75rem;
      font-weight: 500;
      display: inline-block;
    }

    .status.available {
      background-color: ${cssVars.colorSuccessLight};
      color: ${cssVars.colorSuccess};
    }

    .status.unavailable {
      background-color: ${cssVars.colorDangerLight};
      color: ${cssVars.colorDanger};
    }
  `,

  ErrorMessage: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${cssVars.light3};
    color: ${cssVars.colorDanger};
    font-size: 0.875rem;
    border-radius: ${radii.lg};
    padding: 1rem;
  `,
};
