import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { SelectProps } from '../types';
import { Styled } from './Select.styles';

/**
 * A reusable Select component built with Radix UI primitives.
 *
 * Features:
 * - Fully accessible dropdown menu with support for options, placeholders, and disabled states.
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 * - Supports controlled and uncontrolled modes.
 * - Includes validation state (isInvalid) for form integration.
 *
 * Props:
 * - `options`: Array of option objects with `value`, `label`, and optional `disabled` properties.
 * - `placeholder`: Placeholder text displayed when no value is selected.
 * - `isDisabled`: Boolean indicating whether the entire select is disabled.
 * - `isInvalid`: Boolean indicating whether the select is in an invalid state.
 * - `onValueChange`: Callback function triggered when the selected value changes.
 * - `value`: Current selected value (controlled mode).
 * - `defaultValue`: Default value for uncontrolled mode.
 * - `required`: Boolean indicating whether the select is required.
 * - `name`: Name attribute for form submission.
 * - `ariaLabel`: Accessible label for the select.
 */
export const Select = ({
  options = [],
  placeholder = 'Select an option',
  isDisabled = false,
  isInvalid = false,
  onValueChange,
  value,
  defaultValue,
  required = false,
  name,
  ariaLabel,
  testId,
  className: _className,
}: SelectProps) => {
  // Handle null/undefined options safely
  const safeOptions = options || [];
  // Filter out options with empty value strings (not allowed by Radix UI)
  const validOptions = safeOptions.filter((opt) => opt.value !== '');

  return (
    <Styled.Root
      onValueChange={onValueChange}
      value={value}
      defaultValue={defaultValue}
      name={name}
      required={required}
      disabled={isDisabled}
    >
      <Styled.Trigger
        $isDisabled={isDisabled}
        $isInvalid={isInvalid}
        aria-label={ariaLabel}
        data-testid={testId}
      >
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
            {validOptions.map((option) => (
              <Styled.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled || isDisabled}
              >
                <Styled.ItemText>{option.label}</Styled.ItemText>
                <Styled.Indicator>
                  <CheckIcon />
                </Styled.Indicator>
              </Styled.Item>
            ))}
          </Styled.Viewport>
          <Styled.ScrollDownButton>
            <ChevronDownIcon />
          </Styled.ScrollDownButton>
        </Styled.Content>
      </Styled.Portal>
    </Styled.Root>
  );
};

Select.displayName = 'Select';
