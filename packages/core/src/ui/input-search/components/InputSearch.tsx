import React from 'react';
import { Styled } from './InputSearch.styles';
import { Icon } from '../../icon';
import { Search } from 'lucide-react';
import { SearchInputProps } from '../types';

type SearchStatus = 'default' | 'error';

export const InputSearch = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ id, name, className, placeholder, status, value, onChange, errorMessage }, ref) => {
    const finalStatus: SearchStatus = errorMessage || status === 'error' ? 'error' : 'default';

    return (
      <>
        <Styled.Wrapper className={className} $status={finalStatus}>
          <Styled.Icon>
            <Icon source={<Search size={24} />} />
          </Styled.Icon>
          <Styled.Input
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            data-testid="input"
            value={value}
            onChange={onChange}
            ref={ref}
          />
        </Styled.Wrapper>
        {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
      </>
    );
  }
);

InputSearch.displayName = 'InputSearch';
