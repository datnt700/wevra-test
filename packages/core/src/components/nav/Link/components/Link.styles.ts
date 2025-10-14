import styled from '@emotion/styled';

interface LinkStyledProps {
  type: 'default' | 'monochrome';
  undelined?: boolean;
}

export const LinkStyled = styled.a<LinkStyledProps>`
  text-decoration: none;

  ${({ type }) =>
    type === 'monochrome' &&
    `
    color: inherit;
  `}

  ${({ undelined }) =>
    undelined &&
    `
    text-decoration: underline;
  `}
`;
