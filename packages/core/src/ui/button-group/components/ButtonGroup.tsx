import { ButtonGroupProps } from '../';
import { Styled } from './ButtonGroup.styles';

/**
 * A reusable ButtonGroup component for grouping buttons together.
 */
export const ButtonGroup = ({ children, className }: ButtonGroupProps) => {
  return <Styled.ButtonGroup className={className}>{children}</Styled.ButtonGroup>;
};
