import React, { useEffect, useState } from 'react';
import { Styled } from './Combobox.styles';
import { Icon } from '../../icon';
import { X } from 'lucide-react';
import { Button } from '@tavia/core';
import clsx from 'clsx';
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

    return (
      <Popover
        hasClose={false}
        trigger={
          <Styled.Wrapper
            className={clsx(
              variant && Styled[variant as keyof typeof Styled],
              isDisabled && Styled.Disabled,
              className
            )}
          >
            <Styled.InputWrapper>
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
              {hasClearButton && (
                <Button
                  variant="tertiary"
                  shape="square"
                  icon={<Icon source={<X width={16} height={16} stroke="black" />} />}
                  className={Styled.Dropdown}
                />
              )}
            </Styled.InputWrapper>
            {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
          </Styled.Wrapper>
        }
        side="bottom"
        className={clsx(Styled.Dropdown)}
      >
        <ul tabIndex={-1} role="listbox">
          {filteredOptions.map((option) => (
            <Styled.Option key={option.value}>
              <button tabIndex={-1} role="option">
                {option.label}
              </button>
            </Styled.Option>
          ))}
        </ul>
      </Popover>
    );
  }
);
