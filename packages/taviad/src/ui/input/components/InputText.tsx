'use client';

import React, { useState } from 'react';
import { Styled } from './InputStyles.styles';
import { Icon } from '../../icon';
import { X, Eye, EyeOff } from 'lucide-react';
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
      hasPasswordToggle,
      variant = 'default',
      isDisabled,
      isReadOnly,
      type = 'text',
      ...other
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const finalVariant = errorMessage ? 'danger' : isDisabled ? 'disabled' : variant;
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    return (
      <Styled.Wrapper className={className}>
        <Styled.InputWrapper $variant={finalVariant}>
          <Styled.Input
            type={inputType}
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
          {hasPasswordToggle && isPasswordField && (
            <Styled.ClearBtn
              variant="tertiary"
              shape="square"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              icon={
                <Icon
                  source={
                    showPassword ? (
                      <EyeOff width={16} height={16} stroke={undefined} />
                    ) : (
                      <Eye width={16} height={16} stroke={undefined} />
                    )
                  }
                />
              }
            />
          )}
        </Styled.InputWrapper>
        {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
      </Styled.Wrapper>
    );
  }
);

InputText.displayName = 'InputText';
