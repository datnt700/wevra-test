import React from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { SelectProps } from '..';
import { Styled } from './Select.styles';
import { Select as RadixSelect } from 'radix-ui';

/**
 * A reusable Select component built with Radix UI primitives.
 *
 * Features:
 * - Fully accessible dropdown menu with support for options, placeholders, and disabled states.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Props:
 * - `options`: Array of option objects with `value` and `label` properties.
 * - `placeholder`: Placeholder text displayed when no value is selected.
 * - `isDisabled`: Boolean indicating whether the select is disabled.
 * - `onValueChange`: Callback function triggered when the selected value changes.
 * - `value`: Current selected value.
 * - `required`: Boolean indicating whether the select is required.
 */
export const Select = ({
  options,
  placeholder,
  isDisabled,
  onValueChange = () => {},
  value,
  required
}: SelectProps) => {
  return (
    <Styled.Root onValueChange={onValueChange} value={value}>
      <Styled.Trigger $isDisabled={isDisabled} $isInvalid={required && !value}>
        <Styled.Value placeholder={placeholder} />
        <Styled.Icon>
          <ChevronDownIcon />
        </Styled.Icon>
      </Styled.Trigger>
      <Styled.Portal>
        <Styled.Content>
          <Styled.ScrollUpButton>
            <ChevronUpIcon />
          </Styled.ScrollUpButton>
          <Styled.Viewport>
            {options?.map((option) => (
              <Styled.Item key={option.value} value={option.value} $isDisabled={isDisabled}>
                <Styled.ItemText>{option.label}</Styled.ItemText>
                <Styled.Indicator>
                  <CheckIcon />
                </Styled.Indicator>
              </Styled.Item>
            ))}
            <Styled.Separator />
          </Styled.Viewport>
          <Styled.ScrollDownButton>
            <ChevronDownIcon />
          </Styled.ScrollDownButton>
        </Styled.Content>
      </Styled.Portal>
    </Styled.Root>
  );
};

/**
 * A reusable SelectItem component for rendering individual options in the dropdown.
 */
const SelectItem = React.forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Styled.Item {...props} ref={forwardedRef}>
        <Styled.ItemText>{children}</Styled.ItemText>
        <Styled.Indicator>
          <CheckIcon />
        </Styled.Indicator>
      </Styled.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';
