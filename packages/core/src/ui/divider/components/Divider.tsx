import { Styled } from './Divider.styles';
import { DividerProps } from '../types';

/**
 * Divider component - Visually separates content with a horizontal or vertical line
 *
 * @example
 * // Basic horizontal divider
 * <Divider />
 *
 * @example
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * @example
 * // Custom size
 * <Divider size="lg" />
 * <Divider size={3} /> // 3px
 */
export const Divider = ({
  orientation = 'horizontal',
  size = 'default',
  ...other
}: DividerProps) => {
  return (
    <Styled.Root
      data-orientation={orientation}
      orientation={orientation}
      $orientation={orientation}
      $size={size}
      // Filter transient props from spreading to DOM
      {...other}
    />
  );
};
