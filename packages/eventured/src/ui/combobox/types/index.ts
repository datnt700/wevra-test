type InputVariant = 'default' | 'success' | 'warning' | 'danger';

interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  hasClearButton?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  options?: ComboboxOption[];
}
