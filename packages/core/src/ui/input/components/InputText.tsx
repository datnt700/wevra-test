import React from 'react';
import { Styled } from './InputStyles.styles';
import { Icon } from '../../icon';
import { X } from 'lucide-react';
import { InputProps } from '../types';

export const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      className,
      placeholder,
      value,
      onChange,
      errorMessage,
      hasClearButton,
      variant = 'default',
      isDisabled,
      isReadOnly,
      ...other
    },
    ref
  ) => {
    const finalVariant = errorMessage ? 'danger' : isDisabled ? 'disabled' : variant;

    return (
      <Styled.Wrapper className={className}>
        <Styled.InputWrapper $variant={finalVariant}>
          <Styled.Input
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            data-testid="input"
            value={value}
            onChange={onChange}
            ref={ref}
            disabled={isDisabled}
            readOnly={isReadOnly}
            {...other}
          />
          {hasClearButton && (
            <Styled.ClearBtn
              variant="tertiary"
              shape="square"
              icon={<Icon source={<X width={16} height={16} stroke={undefined} />} />}
            />
          )}
        </Styled.InputWrapper>
        {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
      </Styled.Wrapper>
    );
  }
);

InputText.displayName = 'InputText';
