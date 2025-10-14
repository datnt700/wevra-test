type InputVariant = 'default' | 'success' | 'warning' | 'danger';

export interface StepperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  className?: string;
  value?: number;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: number;
  errorMessage?: string;
  hasClearButton?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}
