'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

const Styled = {
  Breadcrumb: styled.nav`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        display: flex;
        align-items: center;
        font-size: 14px;
        color: ${eventureTheme.colors.text.secondary};
      `;
    }}
  `,
  BreadcrumbItem: styled('div', {
    shouldForwardProp: (prop) => prop !== 'isLast',
  })<{ isLast: boolean }>`
    ${({ theme, isLast }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        display: flex;
        align-items: center;
        color: ${isLast ? eventureTheme.colors.text.primary : 'inherit'};
        font-weight: ${isLast ? 'bold' : 'normal'};
      `;
    }}
  `,
  BreadcrumbLink: styled.a`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        text-decoration: none;
        color: ${eventureTheme.colors.primary};

        &:hover {
          text-decoration: underline;
        }
      `;
    }}
  `,
  BreadcrumbSeparator: styled.span`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        margin: 0 8px;
        color: ${eventureTheme.colors.text.tertiary};
      `;
    }}
  `,
};

export default Styled;
