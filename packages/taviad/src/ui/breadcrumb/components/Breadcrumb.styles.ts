'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

const Styled = {
  Breadcrumb: styled.nav`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        display: flex;
        align-items: center;
        font-size: 14px;
        color: ${taviaTheme.colors.text.secondary};
      `;
    }}
  `,
  BreadcrumbItem: styled('div', {
    shouldForwardProp: (prop) => prop !== 'isLast',
  })<{ isLast: boolean }>`
    ${({ theme, isLast }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        display: flex;
        align-items: center;
        color: ${isLast ? taviaTheme.colors.text.primary : 'inherit'};
        font-weight: ${isLast ? 'bold' : 'normal'};
      `;
    }}
  `,
  BreadcrumbLink: styled.a`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        text-decoration: none;
        color: ${taviaTheme.colors.primary};

        &:hover {
          text-decoration: underline;
        }
      `;
    }}
  `,
  BreadcrumbSeparator: styled.span`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        margin: 0 8px;
        color: ${taviaTheme.colors.text.tertiary};
      `;
    }}
  `,
};

export default Styled;
