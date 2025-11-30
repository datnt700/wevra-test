import { StackProps } from '../types';
import { Styled } from './Stack.styles';

/**
 * Stack component for creating flexbox layouts with consistent spacing.
 *
 * @component
 * @example
 * // Vertical stack (default)
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 *
 * @example
 * // Horizontal stack
 * <Stack direction="row" spacing="sm" align="center">
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </Stack>
 *
 * @example
 * // Centered content
 * <Stack align="center" justify="center" spacing="lg">
 *   <Icon name="check" />
 *   <Text>Success!</Text>
 * </Stack>
 */
export const Stack = ({
  children,
  className,
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  style,
}: StackProps) => {
  return (
    <Styled.Stack
      className={className}
      $direction={direction}
      $spacing={spacing}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      style={style}
    >
      {children}
    </Styled.Stack>
  );
};

Stack.displayName = 'Stack';
