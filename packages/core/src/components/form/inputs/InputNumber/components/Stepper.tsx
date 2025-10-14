import React, { useEffect, useState } from 'react';
import { Styled } from './Stepper.styles';
import { Button } from '../../../Button';
import { Minus, Plus } from 'lucide-react';
import { StepperProps } from '../types';

export const Stepper = React.forwardRef<HTMLInputElement, StepperProps>(
  (
    {
      id,
      name,
      className,
      value,
      onChange,
      errorMessage,
      variant,
      isDisabled = false,
      isReadOnly = false,
      min = 0,
      max,
      step = 1,
      ...other
    },
    ref
  ): JSX.Element => {
    const [internalValue, setInternalValue] = useState<number>(value || 0);

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const increment = () => {
      if (max === undefined || internalValue + step <= max) {
        const newValue = internalValue + step;
        setInternalValue(newValue);
        onChange?.({ target: { value: newValue.toString() } } as any);
      }
    };

    const decrement = () => {
      if (internalValue - step >= min) {
        const newValue = internalValue - step;
        setInternalValue(newValue);
        onChange?.({ target: { value: newValue.toString() } } as any);
      }
    };

    return (
      <Styled.Wrapper className={className}>
        <Styled.InputWrapper
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          hasError={!!errorMessage}
        >
          <Button
            variant="tertiary"
            icon={<Minus size={24} />}
            onClick={decrement}
            disabled={isDisabled || isReadOnly}
          />
          <Styled.Input
            type="number"
            id={id}
            name={name}
            value={internalValue}
            onChange={(e) => onChange?.({ target: { value: e.currentTarget.value } } as any)}
            ref={ref}
            hasError={!!errorMessage}
            disabled={isDisabled}
            readOnly={isReadOnly}
            min={min}
            max={max}
            step={step}
            placeholder="Enter number"
            {...other}
          />
          <Button
            variant="tertiary"
            icon={<Plus size={24} />}
            onClick={increment}
            disabled={isDisabled || isReadOnly}
          />
        </Styled.InputWrapper>
        {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
      </Styled.Wrapper>
    );
  }
);

Stepper.displayName = 'Stepper';
