type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'link' | 'tertiary' | 'danger' | 'info';
type ButtonShape = 'default' | 'round' | 'square' | 'pill' | 'circle';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | undefined;
  variant?: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  accessibilityLabel?: string;
  icon?: React.ReactNode;
  shape?: ButtonShape;
}
