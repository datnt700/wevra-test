export interface CheckboxProps {
  id?: string;
  size?: 'default' | 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
  value?: string;
}
