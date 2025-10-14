import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  `,

  InputWrapper: styled.div<{ isDisabled: boolean; isReadOnly: boolean; hasError: boolean }>`
    display: flex;
    align-items: center;
    background-color: var(--light);
    border: 1px solid ${(props) => (props.hasError ? 'var(--color-red)' : 'var(--dark)')};
    border-radius: var(--border-radius-medium);

    ${(props) =>
      (props.isDisabled || props.isReadOnly) &&
      `
      pointer-events: none;
      background-color: var(--light);
      border: 1px solid var(--light-4);
    `}
    &:focus-within {
      border-color: ${(props) => (props.hasError ? 'var(--color-red)' : 'var(--dark)')};
      box-shadow: 0 0 3px ${(props) => (props.hasError ? 'var(--color-red)' : 'var(--dark)')};
    }
  `,

  Input: styled.input<{ hasError: boolean }>`
    flex-grow: 1;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    font-size: 1rem;
    color: var(--dark);

    ${(props) =>
      props.hasError &&
      `
      border: 1px solid var(--color-red);
      background: #d9d9d9;
    `}
    &::placeholder {
      font-style: italic;
      font-weight: 300;
      color: var(--dark-6);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,

  ErrorMessage: styled.span`
    color: var(--color-red);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,

  ClearBtn: styled.button`
    background-color: transparent;
    border-radius: 0.75rem;
  `,
};
