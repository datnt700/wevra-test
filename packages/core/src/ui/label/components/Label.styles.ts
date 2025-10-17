import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

export const Styled = {
  Label: styled('label', {
    shouldForwardProp: (prop) => !prop.startsWith('$'),
  })<{ $required?: boolean }>`
    font-size: 1rem;
    color: ${cssVars.dark};
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
          color: ${cssVars.mainColor};
        }
      `}
  `,
  Title: styled.p`
    margin: 0; /* Remove default paragraph margins */
    color: ${cssVars.dark};
    font-size: 1rem;
    font-weight: 500;
    line-height: normal;
  `,
};
