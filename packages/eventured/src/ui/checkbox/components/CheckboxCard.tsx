'use client';

import { CheckboxCardProps } from '../types';
import { Styled } from './CheckboxCard.styles';
import * as Checkbox from '@radix-ui/react-checkbox';

/**
 * A reusable CheckboxCard component designed to provide a visually enhanced checkbox with a label and description.
 *
 * Features:
 * - Uses Radix UI's `Checkbox` component for accessibility and state management.
 * - Provides a clear visual representation of selection state using a custom icon.
 * - Supports a label and optional description for better context.
 * - Styled using a modular `Styled` object for maintainability.
 * - Handles selection toggling via `onCheckedChange` callback.
 *
 * Props:
 * - `label`: The main title or name of the checkbox (required).
 * - `description`: Optional additional information about the checkbox item.
 * - `checked`: Boolean indicating if the checkbox is selected.
 * - `onCheckedChange`: Callback function that triggers when the checkbox state changes.
 */

export const CheckboxCard = ({ ...other }: CheckboxCardProps) => {
  return <RadixCheckboxCard {...other} />;
};

export const RadixCheckboxCard = ({
  label,
  description,
  checked,
  onCheckedChange,
  ...other
}: CheckboxCardProps) => {
  return (
    <Styled.Wrapper
      checked={checked}
      {...other}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
    >
      <Checkbox.Root checked={checked} onCheckedChange={onCheckedChange} asChild>
        <Styled.CheckboxIndicator></Styled.CheckboxIndicator>
      </Checkbox.Root>
      <Styled.Content>
        <Styled.Label>{label}</Styled.Label>
        {description && <Styled.Description>{description}</Styled.Description>}
      </Styled.Content>
    </Styled.Wrapper>
  );
};
