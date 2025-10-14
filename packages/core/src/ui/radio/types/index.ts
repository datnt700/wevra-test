export interface RadioProps {
  id?: string;
  size?: 'default' | 'sm' | 'md' | 'lg';
  label?: string;
  value: string;
  isDisabled?: string;
  isRequired?: string;
}

/**
 * Defines the properties for the RadioCard component.
 */
export interface RadioCardProps {
  /** Unique identifier for the radio input */
  id: string;

  /** The value of the radio card */
  value: string;

  /** The text label displayed next to the radio button */
  label: string;

  /** Boolean indicating whether the radio card is selected */
  checked: boolean;

  /** Callback function triggered when the radio card is selected */
  onChange: (value: string) => void;

  /** Optional content displayed at the top of the card */
  header?: React.ReactNode;

  /** Custom CSS class for additional styling */
  className?: string;

  /** Boolean to disable interaction with the radio card */
  isDisabled?: boolean;

  /** Boolean indicating whether the selection is required */
  isRequired?: boolean;
}

export interface RadioGroupProps {
  id?: string;
  checked?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
  value?: string;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
  children?: React.ReactNode;
}
