import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div`
    width: 100%;
    position: relative;
  `,

  Tags: styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  `,

  InputWrapper: styled.div<{ status: 'default' | 'error' }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    height: 3rem;
    width: 100%;
    background-color: var(--light);
    border: 1px solid
      ${(props) => (props.status === 'error' ? 'var(--color-red)' : 'var(--light-4)')};
    border-radius: var(--border-radius-medium);

    &:focus-within {
      border-color: var(--dark);
      box-shadow: 0 0 3px var(--dark);
    }
  `,

  Input: styled.input`
    flex-grow: 1;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    font-size: 1rem;
    color: var(--dark);

    &::placeholder {
      font-style: italic;
      font-weight: 300;
      color: var(--dark-6);
    }
  `,

  TagsSuggestion: styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--light);
    border: 1px solid var(--light-4);
    border-radius: var(--border-radius-medium);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;

    div {
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: var(--light-4);
      }
    }
  `,
};
