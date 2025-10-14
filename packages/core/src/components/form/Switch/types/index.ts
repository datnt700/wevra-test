import { ReactNode } from 'react';

/**
 * Props for the Switch component.
 *
 * - `variant`: Optional variant of the switch ('default' or 'primary').
 * - `labelLeft`: Optional label displayed to the left of the switch.
 * - `labelRight`: Optional label displayed to the right of the switch.
 * - `iconLeft`: Optional icon displayed in the thumb when unchecked.
 * - `iconRight`: Optional icon displayed in the thumb when checked.
 * - `defaultChecked`: Initial checked state for uncontrolled usage.
 * - `checked`: Controlled checked state (overrides `defaultChecked`).
 * - `onCheckedChange`: Callback function triggered when the checked state changes.
 * - `isDisabled`: Optional boolean to disable the switch.
 * - `isRequired`: Optional boolean to mark the switch as required.
 * - `name`: Optional name attribute for form submission.
 * - `value`: Optional value attribute for form submission.
 * - `hasShadow`: Optional boolean to enable a shadow effect on the switch.
 */
export interface SwitchProps {
  variant?: 'default' | 'primary'; // Switch visual variant
  labelLeft?: ReactNode; // Label displayed to the left of the switch
  labelRight?: ReactNode; // Label displayed to the right of the switch
  iconLeft?: ReactNode; // Icon displayed in the thumb when unchecked
  iconRight?: ReactNode; // Icon displayed in the thumb when checked
  defaultChecked?: boolean; // Initial checked state (uncontrolled)
  checked?: boolean; // Controlled checked state
  onCheckedChange?: (checked: boolean) => void; // Callback for checked state changes
  isDisabled?: boolean; // Disable the switch
  isRequired?: boolean; // Mark the switch as required
  name?: string; // Name attribute for form submission
  value?: string; // Value attribute for form submission
  hasShadow?: boolean; // Enable shadow effect on the switch
}
