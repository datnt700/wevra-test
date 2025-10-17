/**
 * Option interface for Select component.
 */
export interface SelectOption {
  /**
   * Unique value for the option.
   */
  value: string;

  /**
   * Display label for the option.
   */
  label: string;

  /**
   * Whether this option is disabled.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Props for the Select component.
 */
export interface SelectProps {
  /**
   * Array of options with `value` and `label`.
   */
  options: SelectOption[];

  /**
   * Placeholder text displayed when no value is selected.
   */
  placeholder?: string;

  /**
   * Boolean indicating whether the select is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Boolean indicating whether the select is in an invalid state.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Callback triggered when the selected value changes.
   */
  onValueChange?: (value: string) => void;

  /**
   * Current selected value.
   */
  value?: string;

  /**
   * Default value when component is uncontrolled.
   */
  defaultValue?: string;

  /**
   * Boolean indicating whether the select is required.
   * @default false
   */
  required?: boolean;

  /**
   * Name attribute for form submission.
   */
  name?: string;

  /**
   * Accessible label for the select.
   */
  ariaLabel?: string;

  /**
   * Additional CSS class for styling (transient prop, not applied to DOM).
   */
  className?: string;

  /**
   * Test ID for testing purposes.
   */
  testId?: string;
}
