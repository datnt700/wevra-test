'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

export const Styled = {
  Wrapper: styled.div<{ checked?: boolean }>`
    ${({ theme, checked }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border: 1px solid ${checked ? eventureTheme.colors.primary : eventureTheme.colors.border.default};
        border-radius: ${eventureTheme.radii.lg};
        cursor: pointer;
        transition:
          background 0.2s,
          border-color 0.2s;
        background: ${eventureTheme.colors.surface};
        width: 13.75rem;

        &:hover {
          background: ${eventureTheme.colors.surfaceHover};
        }
      `;
    }}
  `,
  CheckboxIndicator: styled.div`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        width: 1.25rem;
        height: 1.25rem;
        display: none;
        align-items: center;
        justify-content: center;
        border: 2px solid ${eventureTheme.colors.primary};
        border-radius: ${eventureTheme.radii.sm};
        background: ${eventureTheme.colors.surface};
      `;
    }}
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Label: styled.span`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        font-weight: 600;
        color: ${eventureTheme.colors.text.primary};
      `;
    }}
  `,
  Description: styled.span`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        font-size: 0.875rem;
        color: ${eventureTheme.colors.text.disabled};
      `;
    }}
  `,
};
