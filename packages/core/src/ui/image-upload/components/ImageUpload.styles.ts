import styled from '@emotion/styled';

export const Styled = {
  InputUpload: styled.input`
    display: none;
  `,

  Wrapper: styled.label<{ $isActive?: boolean }>`
    background: transparent;
    border-radius: 0.5rem;
    border: 1px dashed var(--dark);
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 16rem;
    cursor: pointer;

    ${({ $isActive }) =>
      $isActive &&
      `
        border-color: var(--main-color);
      `}

    &:focus-within {
      border-color: var(--main-color);
      box-shadow: 0 0 3px var(--main-color);
    }
  `,

  Preview: styled.img`
    width: 100%;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    object-fit: cover; /* Ensures the preview image fits the container */
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    z-index: 2;

    p {
      color: var(--dark);
      opacity: 0.8;
    }
  `,
};
