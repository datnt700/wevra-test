/**
 * Radio component built with Radix UI primitives and Emotion styling.
 *
 * Features:
 * - Multiple size variants (sm, default, md, lg)
 * - Accessible radio input with proper ARIA attributes
 * - Support for disabled and required states
 * - Label click triggers radio selection
 * - Enhanced with Emotion best practices (direct token access)
 */
import { Styled } from './Radio.styles';
import { RadioProps } from '../types';

export const Radio = ({ ...other }: RadioProps) => {
  return <RadixRadio {...other} />;
};

const RadixRadio = ({
  id,
  size = 'default',
  value,
  label,
  isDisabled = false,
  isRequired = false,
  ...other
}: RadioProps) => {
  return (
    <Styled.RadioWrapper $size={size}>
      <Styled.RadioItem
        value={value}
        id={id}
        $size={size}
        $isDisabled={isDisabled}
        disabled={isDisabled}
        required={isRequired}
        {...other}
      >
        <Styled.Indicator $size={size} />
      </Styled.RadioItem>
      {label ? (
        <Styled.Label htmlFor={id} $size={size} $isDisabled={isDisabled}>
          {label}
        </Styled.Label>
      ) : null}
    </Styled.RadioWrapper>
  );
};
