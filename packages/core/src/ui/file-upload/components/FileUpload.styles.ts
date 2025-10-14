import styled from '@emotion/styled';

export const Styled = {
  InputUpload: styled.input`
    display: none;
  `,

  Wrapper: styled.div<{ $isActive?: boolean }>`
    background: transparent;
    border-radius: 0.5rem;
    border: 1px dashed var(--dark-3);
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    padding: 1rem 2rem;
    width: 100%;
    ${({ $isActive }) =>
      $isActive &&
      `
      border-color: var(--main-color) !important;
    `}
  `,

  Label: styled.label`
    font-size: 1rem;
    color: var(--dark);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .errorMessage {
      color: var(--main-color);
      font-size: 1rem;
      font-weight: 600;
    }

    .title {
      color: var(--dark);
      font-size: 1rem;
    }
  `,

  Content: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    z-index: 2;
  `,

  TitleWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,

  Title: styled.h2`
    color: var(--dark-4);
    font-size: 1rem;
    line-height: 1.625rem;
  `,

  Highlight: styled.span`
    font-weight: 700;
    color: var(--main-color);
  `,

  Description: styled.p`
    font-size: 1rem;
    opacity: 0.5;
    color: var(--dark);
  `
};
