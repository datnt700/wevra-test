'use client';

import { StyledRadioGroupRoot } from './RadioGroup.styles';
import { RadioGroupProps } from '../types';

export const RadioGroup = ({ defaultValue, children, ...other }: RadioGroupProps) => {
  return (
    <StyledRadioGroupRoot defaultValue={defaultValue} aria-label="View density" {...other}>
      {children}
    </StyledRadioGroupRoot>
  );
};

RadioGroup.displayName = 'RadioGroup';
