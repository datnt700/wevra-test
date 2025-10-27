/**
 * Props for the Slider component.
 *
 * - `name`: Optional name attribute for form submission.
 * - `orientation`: Orientation of the slider ('horizontal' or 'vertical').
 * - `defaultValue`: Initial value(s) of the slider (uncontrolled).
 * - `value`: Controlled value(s) of the slider.
 * - `onValueChange`: Callback triggered when the slider value changes.
 * - `onValueCommit`: Callback triggered when the slider value is committed (e.g., on drag end).
 * - `min`: Minimum value of the slider.
 * - `max`: Maximum value of the slider.
 * - `step`: Step increment for the slider.
 * - `disabled`: Optional boolean to disable the slider.
 * - `ariaLabel`: Accessible label for the slider thumb.
 */
export interface SliderProps {
  name?: string; // Optional name attribute for form submission
  orientation?: 'horizontal' | 'vertical'; // Slider orientation
  defaultValue?: number[]; // Initial value(s) for uncontrolled usage
  value?: number[]; // Controlled value(s)
  onValueChange?: (value: number[]) => void; // Callback for value changes
  onValueCommit?: (value: number[]) => void; // Callback for value commit (e.g., on drag end)
  min?: number; // Minimum value of the slider
  max?: number; // Maximum value of the slider
  step?: number; // Step increment for the slider
  disabled?: boolean; // Disable the slider
  ariaLabel?: string; // Accessible label for the slider thumb
}
