'use client';

import { Tooltip } from 'radix-ui';
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

export const Styled = {
  Provider: styled(Tooltip.Provider)``,
  Root: styled(Tooltip.Root)``,
  Content: styled(Tooltip.Content)`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        background-color: ${eventureTheme.colors.surface};
        padding: 0.5rem 1rem;
        border-radius: ${eventureTheme.radii.md};
        font-size: 0.8rem;
      `;
    }}
  `,
  Trigger: styled(Tooltip.Trigger)`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        outline: 0;
        border: 0;
        width: max-content;
        background-color: ${eventureTheme.colors.surface};
        padding: 0.5rem;
        border-radius: ${eventureTheme.radii.full};
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    }}
  `,
  Arrow: styled(Tooltip.Arrow)`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `fill: ${eventureTheme.colors.surface};`;
    }}
  `,
};
