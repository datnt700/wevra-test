import { ButtonGroupProps } from '..';
import { Styled } from './ButtonGroup.styles';

/**
 * ButtonGroup component for grouping related buttons together.
 *
 * @component
 * @example
 * // Default spaced buttons
 * <ButtonGroup>
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </ButtonGroup>
 *
 * @example
 * // Attached buttons (no gap)
 * <ButtonGroup variant="attached">
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 *
 * @example
 * // Vertical orientation
 * <ButtonGroup orientation="vertical">
 *   <Button>Top</Button>
 *   <Button>Middle</Button>
 *   <Button>Bottom</Button>
 * </ButtonGroup>
 */
export const ButtonGroup = ({
  children,
  className,
  variant = 'default',
  orientation = 'horizontal',
}: ButtonGroupProps) => {
  return (
    <Styled.ButtonGroup className={className} $variant={variant} $orientation={orientation}>
      {children}
    </Styled.ButtonGroup>
  );
};
