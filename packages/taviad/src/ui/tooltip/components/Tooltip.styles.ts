'use client';

import { Tooltip } from 'radix-ui';
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

export const Styled = {
  Provider: styled(Tooltip.Provider)``,
  Root: styled(Tooltip.Root)``,
  Content: styled(Tooltip.Content)`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        background-color: ${taviaTheme.colors.surface};
        padding: 0.5rem 1rem;
        border-radius: ${taviaTheme.radii.md};
        font-size: 0.8rem;
      `;
    }}
  `,
  Trigger: styled(Tooltip.Trigger)`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        outline: 0;
        border: 0;
        width: max-content;
        background-color: ${taviaTheme.colors.surface};
        padding: 0.5rem;
        border-radius: ${taviaTheme.radii.full};
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    }}
  `,
  Arrow: styled(Tooltip.Arrow)`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `fill: ${taviaTheme.colors.surface};`;
    }}
  `,
};
