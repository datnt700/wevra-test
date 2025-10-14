import styled from '@emotion/styled';
import { theme } from '@tavia/core';
import { Button } from '../../button';

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  `,

  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-medium);
    border: 1px solid var(--input-border-color);

    &:focus-within {
      border-color: var(--light4);
      box-shadow: 0 0 3px var(--dark);
    }
  `,

  ClearBtn: styled(Button)`
    background-color: transparent;
    border-radius: var(--border-radius-medium);
    color: var(--light);
  `,

  Input: styled.input`
    height: ${theme.common.size.input.height.medium};
    outline: none;
    color: var(--dark);
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 1rem;
    border-radius: var(--border-radius-medium);
    border: 0;
    background-color: transparent;

    &::placeholder {
      font-weight: 300;
      line-height: 30px;
      color: #6b6b6b;
    }
  `,

  ErrorMessage: styled.span`
    color: var(--color-red);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,

  Variants: {
    default: styled.div`
      background-color: var(--light);
      border: 1px solid var(--dark4);
    `,
    danger: styled.div`
      border: 1px solid var(--color-red);
      box-shadow: 0 0 3px var(--color-red);

      &:focus-within {
        border-color: var(--color-red);
      }
    `,
    success: styled.div`
      background-color: var(--dark);
      border: 1px solid var(--color-green);
      box-shadow: 0 0 3px var(--color-green);
    `,
    warning: styled.div`
      background-color: var(--dark);
      border: 1px solid var(--color-yellow);
      box-shadow: 0 0 3px var(--color-yellow);
    `,
    disabled: styled.div`
      background-color: var(--dark4);
      cursor: not-allowed;
      opacity: 0.6;

      .input {
        pointer-events: none;
      }
    `,
  },
};
