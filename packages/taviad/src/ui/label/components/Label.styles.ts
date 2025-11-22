'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

export const Styled = {
  Label: styled('label', {
    shouldForwardProp: (prop) => !prop.startsWith('$'),
  })<{ $required?: boolean }>`
    ${({ theme, $required }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        font-size: 1rem;
        color: ${taviaTheme.colors.text.primary};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: flex;
        align-items: center;
        gap: 0.25rem;

        ${
          $required
            ? `
          &::after {
            content: ' *';
            color: ${taviaTheme.colors.primary};
          }
        `
            : ''
        }
      `;
    }}
  `,
  Title: styled.p`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        margin: 0; /* Remove default paragraph margins */
        color: ${taviaTheme.colors.text.primary};
        font-size: 1rem;
        font-weight: 500;
        line-height: normal;
      `;
    }}
  `,
};
