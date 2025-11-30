'use client';

/**
 * Emotion styles for Slider component with direct theme token access.
 * Follows best practices: helper functions, transient props, TypeScript types.
 */
import styled from '@emotion/styled';
import { Slider } from 'radix-ui';
import type { EventureTheme } from '../../../theme/theme';

type SliderOrientation = 'horizontal' | 'vertical';

interface OrientationStyles {
  rootWidth: string;
  rootHeight: string;
  trackHeight: string;
  trackWidth: string;
}

/**
 * Helper function to get orientation-specific styles for Slider component.
 */
const getOrientationStyles = (orientation: SliderOrientation = 'horizontal'): OrientationStyles => {
  const orientationMap: Record<SliderOrientation, OrientationStyles> = {
    horizontal: {
      rootWidth: '200px',
      rootHeight: '20px',
      trackHeight: '3px',
      trackWidth: '100%',
    },
    vertical: {
      rootWidth: '20px',
      rootHeight: '200px',
      trackHeight: '100%',
      trackWidth: '3px',
    },
  };
  return orientationMap[orientation];
};

const StyledRoot = styled(Slider.Root)<{
  $orientation?: SliderOrientation;
  $disabled?: boolean;
}>`
  ${({ $orientation = 'horizontal', $disabled }) => {
    const styles = getOrientationStyles($orientation);
    return `
      position: relative;
      display: flex;
      align-items: center;
      user-select: none;
      touch-action: none;
      width: ${styles.rootWidth};
      height: ${styles.rootHeight};
      cursor: ${$disabled ? 'not-allowed' : 'pointer'};
      opacity: ${$disabled ? '0.5' : '1'};
      transition: opacity 0.2s ease;
    `;
  }}
`;

const StyledTrack = styled(Slider.Track)<{ $orientation?: SliderOrientation }>`
  ${({ theme, $orientation = 'horizontal' }) => {
    const eventureTheme = theme as EventureTheme;
    const styles = getOrientationStyles($orientation);
    return `
      background-color: ${eventureTheme.colors.border.default};
      position: relative;
      flex-grow: 1;
      border-radius: 9999px;
      height: ${styles.trackHeight};
      width: ${styles.trackWidth};
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${eventureTheme.colors.border.hover};
      }
    `;
  }}
`;

const StyledRange = styled(Slider.Range)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      position: absolute;
      background-color: ${eventureTheme.colors.primary};
      border-radius: 9999px;
      height: 100%;
      transition: background-color 0.2s ease;
    `;
  }}
`;

const StyledThumb = styled(Slider.Thumb)<{ $disabled?: boolean }>`
  ${({ theme, $disabled }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      display: block;
      width: 20px;
      height: 20px;
      background-color: ${eventureTheme.colors.surface};
      border: 2px solid ${eventureTheme.colors.primary};
      border-radius: 50%;
      box-shadow: 0 2px 4px ${eventureTheme.colors.border.default}40;
      transition: all 0.2s ease;
      cursor: ${$disabled ? 'not-allowed' : 'grab'};

      &:hover:not(:disabled) {
        border-color: ${eventureTheme.colors.primary};
        box-shadow: 0 4px 8px ${eventureTheme.colors.border.default}60;
        transform: scale(1.1);
      }

      &:active:not(:disabled) {
        cursor: grabbing;
        transform: scale(1.2);
        box-shadow: 0 6px 12px ${eventureTheme.colors.border.default}80;
      }

      &:focus-visible {
        outline: 2px solid ${eventureTheme.colors.primary};
        outline-offset: 2px;
      }

      &:disabled {
        background-color: ${eventureTheme.colors.gray.gray200};
        border-color: ${eventureTheme.colors.border.default};
        box-shadow: none;
        pointer-events: none;
      }
    `;
  }}
`;

/**
 * Styled components for the Slider.
 *
 * - `Root`: The container for the slider.
 * - `Track`: The background track of the slider.
 * - `Range`: The filled portion of the slider.
 * - `Thumb`: The draggable thumb of the slider.
 */
export const Styled = {
  Root: StyledRoot,
  Track: StyledTrack,
  Range: StyledRange,
  Thumb: StyledThumb,
};
