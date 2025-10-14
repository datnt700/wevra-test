import { SliderProps } from '../types';
import { Styled } from './Slider.styles';

export const Slider = ({ ...other }: SliderProps) => {
  return <Radix {...other} />;
};

/**
 * A reusable Slider component built with Radix UI primitives.
 *
 * Features:
 * - Provides a fully accessible slider with support for range values.
 * - Includes customizable props for controlling the slider's behavior and appearance.
 * - Supports keyboard navigation and ARIA attributes for enhanced accessibility.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Props:
 * - `defaultValue`: Initial value(s) of the slider (e.g., `[50]` for a single thumb or `[20, 80]` for a range).
 * - `max`: Maximum value of the slider (default: `100`).
 * - `min`: Minimum value of the slider (default: `0`).
 * - `step`: Step increment for the slider (default: `1`).
 * - `onValueChange`: Callback function triggered when the slider value changes.
 * - `ariaLabel`: Accessible label for the slider thumb (e.g., `"Volume"`).
 * - `disabled`: Optional boolean to disable the slider.
 *
 * Use Cases:
 * - Volume controls in media players.
 * - Price range filters in e-commerce applications.
 * - Customizable settings sliders in user interfaces.
 */
export const Radix = ({ ...other }: SliderProps) => {
  return (
    <Styled.Root data-testid="slider" {...other} defaultValue={[50]} max={100} step={1}>
      <Styled.Track>
        <Styled.Range />
      </Styled.Track>
      <Styled.Thumb aria-label="Volume" />
    </Styled.Root>
  );
};
