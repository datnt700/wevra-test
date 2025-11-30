type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'link'
  | 'tertiary'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';
type ButtonShape = 'default' | 'round' | 'rounded' | 'square' | 'pill' | 'circle';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | undefined;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  accessibilityLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  shape?: ButtonShape;
}
