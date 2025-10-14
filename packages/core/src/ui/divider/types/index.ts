import { Separator as RadixSeparator } from 'radix-ui';

export interface DividerProps extends RadixSeparator.SeparatorProps {
  className?: string;
  size?: 'default' | 'sm' | 'md' | 'lg' | number;
  orientation?: 'horizontal' | 'vertical';
}
