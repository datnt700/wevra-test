import styled from '@emotion/styled';
import { theme } from '@tavia/core'; // Đảm bảo import theme đúng

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    background-color: var(--light);
    border: 1px solid var(--dark-4);
    border-radius: var(--border-radius-medium);
    outline: none;
    padding-left: 0.75rem;

    &.error {
      border: 1px solid #f00;
      background: #d9d9d9;
    }

    &:focus-within {
      border-color: var(--light);
      box-shadow: 0 0 3px var(--light);
    }
  `,

  Icon: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    color: var(--dark7);
  `,

  ErrorMessage: styled.span`
    color: var(--color-red);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,

  Input: styled.input`
    height: ${theme.common.size.input.height.medium};
    background-color: transparent;
    outline: none;
    color: var(--dark);
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 1rem;
    border: 1px solid var(--light-4);
    outline: 0;
    border: 0 !important;
    border-radius: var(--border-radius-medium);

    &:active {
      outline: 0;
      border: 0;
    }

    &:focus {
      outline: 0;
    }

    &::placeholder {
      font-weight: 300;
      line-height: 30px;
      color: #6b6b6b;
    }
  `
};
