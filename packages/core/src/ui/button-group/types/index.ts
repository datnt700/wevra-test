export type ButtonGroupVariant = 'default' | 'attached';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonGroupVariant;
  orientation?: ButtonGroupOrientation;
}
