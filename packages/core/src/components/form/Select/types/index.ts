/**
 * Props for the Select component.
 */
export interface SelectProps {
  options: Option[]; // Array of options with `value` and `label`.
  placeholder: string; // Placeholder text displayed when no value is selected.
  isDisabled: boolean; // Boolean indicating whether the select is disabled.
  onValueChange: (value: string) => void; // Callback triggered when the selected value changes.
  value: string; // Current selected value.
  required?: boolean; // Boolean indicating whether the select is required.
}

interface Option {
  value: string; // Unique value for the option.
  label: string; // Display label for the option.
}
