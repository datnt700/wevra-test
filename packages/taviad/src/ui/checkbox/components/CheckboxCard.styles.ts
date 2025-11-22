'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

export const Styled = {
  Wrapper: styled.div<{ checked?: boolean }>`
    ${({ theme, checked }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border: 1px solid ${checked ? taviaTheme.colors.primary : taviaTheme.colors.border.default};
        border-radius: ${taviaTheme.radii.lg};
        cursor: pointer;
        transition:
          background 0.2s,
          border-color 0.2s;
        background: ${taviaTheme.colors.surface};
        width: 13.75rem;

        &:hover {
          background: ${taviaTheme.colors.surfaceHover};
        }
      `;
    }}
  `,
  CheckboxIndicator: styled.div`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        width: 1.25rem;
        height: 1.25rem;
        display: none;
        align-items: center;
        justify-content: center;
        border: 2px solid ${taviaTheme.colors.primary};
        border-radius: ${taviaTheme.radii.sm};
        background: ${taviaTheme.colors.surface};
      `;
    }}
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Label: styled.span`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        font-weight: 600;
        color: ${taviaTheme.colors.text.primary};
      `;
    }}
  `,
  Description: styled.span`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        font-size: 0.875rem;
        color: ${taviaTheme.colors.text.disabled};
      `;
    }}
  `,
};
