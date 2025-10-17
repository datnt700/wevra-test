/**
 * Emotion styles for Slider component with direct theme token access.
 * Follows best practices: helper functions, transient props, TypeScript types.
 */
import styled from '@emotion/styled';
import { Slider } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';

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
  ${({ $orientation = 'horizontal' }) => {
    const styles = getOrientationStyles($orientation);
    return `
      background-color: ${cssVars.light5};
      position: relative;
      flex-grow: 1;
      border-radius: 9999px;
      height: ${styles.trackHeight};
      width: ${styles.trackWidth};
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${cssVars.light6};
      }
    `;
  }}
`;

const StyledRange = styled(Slider.Range)`
  position: absolute;
  background-color: ${cssVars.mainColor};
  border-radius: 9999px;
  height: 100%;
  transition: background-color 0.2s ease;
`;

const StyledThumb = styled(Slider.Thumb)<{ $disabled?: boolean }>`
  ${({ $disabled }) => `
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${cssVars.light};
    border: 2px solid ${cssVars.mainColor};
    border-radius: 50%;
    box-shadow: 0 2px 4px ${cssVars.dark6}40;
    transition: all 0.2s ease;
    cursor: ${$disabled ? 'not-allowed' : 'grab'};

    &:hover:not(:disabled) {
      border-color: ${cssVars.mainColorDark};
      box-shadow: 0 4px 8px ${cssVars.dark6}60;
      transform: scale(1.1);
    }

    &:active:not(:disabled) {
      cursor: grabbing;
      transform: scale(1.2);
      box-shadow: 0 6px 12px ${cssVars.dark6}80;
    }

    &:focus-visible {
      outline: 2px solid ${cssVars.mainColor};
      outline-offset: 2px;
    }

    &:disabled {
      background-color: ${cssVars.light4};
      border-color: ${cssVars.light6};
      box-shadow: none;
      pointer-events: none;
    }
  `}
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
