import styled from '@emotion/styled';
import { Separator as RadixSeparator } from 'radix-ui';
import { cssVars } from '../../theme/tokens/colors';
import { DividerSize } from './types';

interface RootProps {
  $orientation?: 'horizontal' | 'vertical';
  $size?: DividerSize | number;
}

/**
 * Get thickness value from size prop
 */
const getThickness = (size?: DividerSize | number): string => {
  if (typeof size === 'number') {
    return `${size}px`;
  }

  const sizeMap: Record<DividerSize, string> = {
    default: '1px',
    sm: '2px',
    md: '4px',
    lg: '6px',
  };

  return sizeMap[size || 'default'];
};

export const Styled = {
  Root: styled(RadixSeparator.Root, {
    shouldForwardProp: (prop) => !prop.startsWith('$'),
  })<RootProps>`
    background-color: ${cssVars.gray300};

    ${({ $orientation = 'horizontal', $size }) => {
      const thickness = getThickness($size);

      return $orientation === 'vertical'
        ? `width: ${thickness}; height: 100%;`
        : `height: ${thickness}; width: 100%;`;
    }}
  `,
};
