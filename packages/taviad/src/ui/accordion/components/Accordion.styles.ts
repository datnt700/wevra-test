'use client';

import { Accordion as RadixAccordion } from 'radix-ui';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { TaviaTheme } from '../../../theme/theme';

const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

export const Styled: any = {
  Root: styled(RadixAccordion.Root)`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        border-radius: ${taviaTheme.radii.md};
        width: 100%;
        background-color: ${taviaTheme.colors.surface};
      `;
    }}
  `,

  Item: styled(RadixAccordion.Item)`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        margin-top: 1px;

        &:first-of-type {
          margin-top: 0;
          border-top-left-radius: ${taviaTheme.radii.md};
          border-top-right-radius: ${taviaTheme.radii.md};
        }

        &:last-of-type {
          border-bottom-left-radius: ${taviaTheme.radii.md};
          border-bottom-right-radius: ${taviaTheme.radii.md};
        }

        &:focus-within {
          position: relative;
          z-index: 1;
        }
      `;
    }}
  `,

  Header: styled(RadixAccordion.Header)`
    display: flex;
  `,

  Trigger: styled(RadixAccordion.Trigger)`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        font-family: inherit;
        background-color: transparent;
        padding: 0 1rem;
        height: 3rem;
        flex: 1;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1rem;
        line-height: 1;
        color: ${taviaTheme.colors.text.primary};
        background-color: ${taviaTheme.colors.surface};
        border: 0;
        border-bottom: 1px solid ${taviaTheme.colors.border.default};

        &:hover {
          background-color: ${taviaTheme.colors.surfaceHover};
        }
      `;
    }}
  `,

  Content: styled(RadixAccordion.Content)`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        overflow: hidden;
        font-size: 1rem;
        color: ${taviaTheme.colors.text.primary};
        background-color: ${taviaTheme.colors.surface};

        &[data-state='open'] {
          animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }

        &[data-state='closed'] {
          animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
      `;
    }}
  `,

  ContentText: styled.div`
    padding: 0.5rem 1rem;
  `,

  ChevronIcon: styled.div`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        color: ${taviaTheme.colors.primary};
        transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);

        &[data-state='open'] {
          transform: rotate(180deg);
        }

        &[data-state='closed'] {
          transform: rotate(0deg);
        }
      `;
    }}
  `,
};
