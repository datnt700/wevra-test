import { RadioGroup } from '@radix-ui/react-radio-group';
import { Styled } from './RadioCard.styles';
import { RadioCardProps } from '../types';

/**
 * A reusable RadioCard component designed to provide a customizable radio button experience.
 *
 * Features:
 * - Uses `@radix-ui/react-radio-group` for accessibility and keyboard navigation.
 * - Supports an optional `header` section for additional content.
 * - Allows styling customization via `className`.
 * - Automatically updates selection state when clicked.
 *
 * Props:
 * - `id`: Unique identifier for the radio input (required).
 * - `value`: The value of the radio card (required).
 * - `label`: The text label displayed next to the radio button (required).
 * - `checked`: Boolean indicating whether the radio card is selected.
 * - `onChange`: Callback function triggered when the radio card is selected.
 * - `header`: Optional content displayed at the top of the card.
 * - `className`: Custom CSS class for additional styling.
 * - `isDisabled`: Boolean to disable interaction with the radio card.
 * - `isRequired`: Boolean indicating whether the selection is required.
 */

export const RadioCard = ({ ...other }: RadioCardProps) => {
  return <RadixRadioCard {...other} />;
};

RadioCard.displayName = 'RadioCard';

export const RadixRadioCard = ({
  id,
  value,
  label,
  checked,
  onChange,
  header,
  className,
  ...other
}: RadioCardProps) => {
  const handleCardClick = () => {
    if (!checked) onChange(value);
  };

  return (
    <Styled.Wrapper checked={checked} onClick={handleCardClick} className={className}>
      {header && <div>{header}</div>}
      <RadioGroup value={value} onValueChange={onChange} {...other}>
        <Styled.GroupItem value={value} id={id}>
          <label htmlFor={id}>{label}</label>
        </Styled.GroupItem>
      </RadioGroup>
    </Styled.Wrapper>
  );
};
