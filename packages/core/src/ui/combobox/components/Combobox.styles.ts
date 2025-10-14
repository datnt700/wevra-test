import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  `,

  Default: '',

  Danger: 'border border-red-500 rounded-lg shadow-sm',

  Success: 'border border-green-500 rounded-lg shadow-sm',

  Disabled: 'cursor-not-allowed bg-gray-200 border border-gray-400',

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

  ClearBtn: styled.button`
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

  Dropdown: 'max-h-32 overflow-x-hidden overflow-y-auto relative',

  Option: styled.li`
    padding: 0.75rem 0.75rem;
    background-color: var(--light);

    &:hover {
      background-color: var(--light-4);
      cursor: pointer;
    }
  `
};
