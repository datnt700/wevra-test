import React from 'react';
import { Styled } from './InputSearch.styles';
import { Icon } from '../../icon';
import { Search } from 'lucide-react';
import { InputSearchProps } from '../types';

type SearchStatus = 'default' | 'error';

/**
 * A reusable InputSearch component with search icon.
 *
 * Features:
 * - Search icon integrated on the left side
 * - Error state with error message display
 * - Focus state with border color change
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 *
 * Props:
 * - `status`: The status/variant ('default', 'error'). Default: 'default'.
 * - `errorMessage`: Error message to display below input (auto-sets error state).
 * - `placeholder`: Placeholder text for the input.
 * - `value`: Current input value (controlled mode).
 * - `onChange`: Callback when input value changes.
 */
export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  ({ id, name, className, placeholder, status, value, onChange, errorMessage, ...other }, ref) => {
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
            {...other}
          />
        </Styled.Wrapper>
        {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
      </>
    );
  }
);

InputSearch.displayName = 'InputSearch';
