import { Separator as RadixSeparator } from 'radix-ui';

export type DividerSize = 'default' | 'sm' | 'md' | 'lg';

export interface DividerProps extends RadixSeparator.SeparatorProps {
  className?: string;
  size?: DividerSize | number;
  orientation?: 'horizontal' | 'vertical';
}
