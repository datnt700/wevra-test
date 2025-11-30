type InputVariant = 'default' | 'success' | 'warning' | 'danger';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  hasClearButton?: boolean;
  hasPasswordToggle?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}
