/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Styled } from './InputTags.styles';
import { Tag } from '../../tag';
import { InputTagsProps } from '../types';

export const InputTags = ({
  id,
  type = 'text',
  placeholder,
  status = 'default',
  className,
  onChange,
  tags = [],
  tagsSuggestion = [],
  removeTag,
}: InputTagsProps) => {
  const [value, setValue] = useState('');
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() && onChange) {
        onChange({ name: value.trim() });
      }
      setValue('');
    }
  };

  return (
    <>
      <Styled.Wrapper className={className}>
        <Styled.InputWrapper status={status}>
          <Styled.Tags>
            {tags.map((tag) => (
              <Tag key={tag.id} hasClose onCloseClick={() => removeTag?.(tag.id)}>
                <span>{tag.name}</span>
              </Tag>
            ))}
          </Styled.Tags>
          <Styled.Input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={onInputKeyDown}
            onFocus={() => setIsShowSuggestions(true)}
          />
        </Styled.InputWrapper>
      </Styled.Wrapper>

      {isShowSuggestions && tagsSuggestion.length > 0 && (
        <Styled.TagsSuggestion>
          {tagsSuggestion.map((tag) => (
            <div
              key={`tagSuggestion-${tag.id}`}
              onClick={() => {
                onChange?.({ name: tag.name });
                setIsShowSuggestions(false);
              }}
            >
              {tag.name}
            </div>
          ))}
        </Styled.TagsSuggestion>
      )}
    </>
  );
};
