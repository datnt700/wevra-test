import styled from '@emotion/styled';
import { Separator as RadixSeparator } from 'radix-ui';

const sizeMap = {
  default: '1px',
  sm: '2px',
  md: '4px',
  lg: '6px'
};

export const Styled = {
  Root: styled(RadixSeparator.Root)<{
    orientation?: 'horizontal' | 'vertical';
    size?: 'default' | 'sm' | 'md' | 'lg' | number;
  }>`
    background-color: var(--dark);

    ${({ orientation, size }) => {
      const thickness = typeof size === 'number' ? `${size}px` : sizeMap[size || 'default'];

      return orientation === 'vertical'
        ? `width: ${thickness}; height: 100%;`
        : `height: ${thickness}; width: 100%;`;
    }}
  `
};
