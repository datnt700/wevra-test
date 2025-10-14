import { Styled } from './Divider.styles';
import { DividerProps } from './types';

export const Divider = ({ orientation = 'horizontal', ...other }: DividerProps) => {
  return (
    <div style={{ width: '100%', maxWidth: 300, margin: '0 15px', height: '2rem' }}>
      <RadixDivider orientation={orientation} size={'default'} {...other} />
    </div>
  );
};

const RadixDivider = ({ orientation, size, className, ...other }: DividerProps) => {
  return (
    <Styled.Root
      data-orientation={orientation}
      orientation={orientation}
      className={className}
      size={size}
      {...other}
    />
  );
};
