import React, { useEffect, useState } from 'react';
import { Styled } from './Combobox.styles';
import { Icon } from '../../icon';
import { X } from 'lucide-react';
import { ComboboxProps } from '../types';
import { Popover } from '../../popover';

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
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
      variant,
      isDisabled,
      isReadOnly,
      options = [],
      ...other
    },
    ref
  ) => {
    const [filteredOptions, setFilteredOptions] = useState([...options]);

    useEffect(() => {
      if (options) {
        setFilteredOptions([...options]);
      }
    }, [options]);

    useEffect(() => {
      if (value) {
        /* empty */
      }
    }, [value]);

    const comboboxVariant: 'default' | 'danger' | 'success' | 'disabled' = isDisabled
      ? 'disabled'
      : errorMessage
        ? 'danger'
        : variant === 'success'
          ? 'success'
          : 'default';

    return (
      <Popover
        hasClose={false}
        trigger={
          <Styled.Wrapper $variant={comboboxVariant} className={className}>
            <Styled.InputWrapper $variant={comboboxVariant}>
              <Styled.Input
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={ref}
                disabled={isDisabled}
                readOnly={isReadOnly}
                {...other}
              />
              {hasClearButton && value && !isDisabled && !isReadOnly && (
                <Styled.ClearBtn type="button">
                  <Icon source={<X width={16} height={16} stroke="black" />} />
                </Styled.ClearBtn>
              )}
            </Styled.InputWrapper>
            {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
          </Styled.Wrapper>
        }
        side="bottom"
      >
        <Styled.Dropdown>
          <ul tabIndex={-1} role="listbox">
            {filteredOptions.map((option) => (
              <Styled.Option key={option.value}>
                <button tabIndex={-1} role="option">
                  {option.label}
                </button>
              </Styled.Option>
            ))}
          </ul>
        </Styled.Dropdown>
      </Popover>
    );
  }
);

Combobox.displayName = 'Combobox';
