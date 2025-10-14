import styled from '@emotion/styled';
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
    background-color: var(--light);
    border: 1px solid var(--light-4);
    border-radius: var(--border-radius-medium);

    &:focus-within {
      border-color: var(--dark);
      box-shadow: 0 0 3px var(--dark);
    }
  `,

  ClearBtn: styled(Button)`
    background-color: transparent;
    border-radius: var(--border-radius-medium);
  `,

  Input: styled.input`
    height: 3rem;
    outline: none;
    color: var(--dark);
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 1rem;
    border-radius: var(--border-radius-medium);
    border: 0;
    background-color: transparent;

    &:active,
    &:hover,
    &:-webkit-autofill {
      /* border-color: var(--dark) !important; */
      /* box-shadow: 0 0 3px var(--dark) !important; */
    }

    &.error {
      border: 1px solid var(--color-red);
      background: #d9d9d9;
      border-radius: var(--border-radius-medium);
    }

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
