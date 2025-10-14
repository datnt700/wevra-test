import styled from '@emotion/styled';

export const Styled = {
  Label: styled.label<{ $required?: boolean }>`
    font-size: 1rem;
    color: var(--dark);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    ${({ $required }) =>
      $required &&
      `
        &::after {
          content: ' *';
          color: var(--main-color);
        }
      `}
  `,
  Title: styled.p`
    margin: 0; /* Remove default paragraph margins */
    color: var(--dark);
    font-size: 1rem;
    font-weight: 500;
    line-height: normal;
  `,
};
