'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

export const Styled = {
  Label: styled('label', {
    shouldForwardProp: (prop) => !prop.startsWith('$'),
  })<{ $required?: boolean }>`
    ${({ theme, $required }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        font-size: 1rem;
        color: ${eventureTheme.colors.text.primary};
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
            color: ${eventureTheme.colors.primary};
          }
        `
            : ''
        }
      `;
    }}
  `,
  Title: styled.p`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        margin: 0; /* Remove default paragraph margins */
        color: ${eventureTheme.colors.text.primary};
        font-size: 1rem;
        font-weight: 500;
        line-height: normal;
      `;
    }}
  `,
};
