import styled from '@emotion/styled';
import { theme } from '@tavia/core';

export const PaginationStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.3333rem;
`;

export const PaginationItemStyled = styled.a<{ isActive: boolean }>`
  ${theme.typography.mobileBody1};
  color: var(--dark);
  float: left;
  width: 2.6667rem;
  height: 2.6667rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.3s;
  background-color: transparent;
  border: 1px transparent solid;
  border-radius: 50%;
  cursor: pointer;

  @media screen and (min-width: ${theme.breakpoints.mobile}) {
    ${theme.typography.body1};
  }

  ${({ isActive }) =>
    isActive &&
    `
      border-radius: 50%;
      border: 1px var(--main-color) solid;
      color: white;
      background-color: var(--main-color);
    `}

  :hover {
    ${({ isActive }) =>
      !isActive &&
      `
        border: 1px var(--main-color) solid;
        color: var(--dark);
      `}
  }
`;
