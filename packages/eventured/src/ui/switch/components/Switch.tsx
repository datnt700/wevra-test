import { Styled } from './Switch.styles';
import { SwitchProps } from '..';

/**
 * A reusable Switch component built with Radix UI primitives.
 *
 * Features:
 * - Supports controlled and uncontrolled states.
 * - Includes optional labels and icons for enhanced usability.
 * - Provides accessibility support with proper ARIA attributes.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 */
export const Switch = ({
  variant = 'default',
  labelLeft,
  labelRight,
  iconLeft,
  iconRight,
  defaultChecked = false,
  checked,
  onCheckedChange,
  isDisabled = false,
  isRequired = false,
  id,
  name,
  value,
  hasShadow = false,
}: SwitchProps) => {
  return (
    <Styled.Wrapper>
      {labelLeft && <Styled.Label htmlFor={id || name}>{labelLeft}</Styled.Label>}
      <Styled.SwitchRoot
        id={id || name}
        $hasShadow={hasShadow}
        $variant={variant}
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={isDisabled}
        required={isRequired}
        name={name}
        value={value}
      >
        <Styled.SwitchThumb>{checked ? iconRight : iconLeft}</Styled.SwitchThumb>
      </Styled.SwitchRoot>
      {labelRight && <Styled.Label htmlFor={id || name}>{labelRight}</Styled.Label>}
    </Styled.Wrapper>
  );
};

Switch.displayName = 'Switch';
