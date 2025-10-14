import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div<{ $hasError?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius-medium);

    &:focus-within {
      border-color: var(--light4);
      box-shadow: 0 0 3px var(--dark);
    }

    ${({ $hasError }) =>
      $hasError &&
      `
      border-color: var(--color-red);
      box-shadow: none;
    `}
  `,

  TextArea: styled.textarea<{ $hasError?: boolean }>`
    min-height: 8rem;
    background: var(--light);
    outline: none;
    color: var(--dark);
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 1rem;
    border-radius: var(--border-radius-medium);
    border: 1px solid
      ${({ $hasError }) => ($hasError ? 'var(--color-red)' : 'var(--input-border-color)')};
    font-family: inherit;

    &:focus {
      box-shadow: 0 0 3px var(--dark);
    }

    &::placeholder {
      font-style: italic;
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
  `
};
