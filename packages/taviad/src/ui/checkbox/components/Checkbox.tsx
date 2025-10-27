import { Check } from 'lucide-react';
import { Icon } from '@tavia/taviad';
import { CheckboxProps } from '../types';
import { Styled } from './Checkbox.styles';

/**
 * A reusable Checkbox component with support for:
 * - Dynamic sizing (small, default, large)
 * - Disabled state
 * - Custom labels
 * - Accessibility features (ARIA attributes, keyboard navigation)
 * - Styled using Emotion's `styled` API for modularity and reusability
 * - Grouped styles under a `Styled` object for better organization and maintainability
 */
export const Checkbox = ({
  id,
  size = 'default',
  label,
  isDisabled,
  isRequired,
  ...other
}: CheckboxProps) => {
  return (
    <Styled.CheckboxWrapper>
      <Styled.CheckboxRoot
        $isDisabled={isDisabled}
        $size={size}
        disabled={isDisabled}
        required={isRequired}
        id={id}
        {...other}
      >
        <Styled.CheckboxIndicator
          $size={size === 'sm' ? '1rem' : size === 'lg' ? '1.75rem' : '1.5rem'}
        >
          <Icon source={<Check />} />
        </Styled.CheckboxIndicator>
      </Styled.CheckboxRoot>
      {label && (
        <Styled.CheckboxLabel htmlFor={id} $size={size}>
          <span>{label}</span>
        </Styled.CheckboxLabel>
      )}
    </Styled.CheckboxWrapper>
  );
};
