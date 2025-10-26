'use client';

import { Accordion as RadixAccordion } from 'radix-ui';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

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
    border-radius: ${radii.md};
    width: 100%;
    background-color: ${cssVars.light};
  `,

  Item: styled(RadixAccordion.Item)`
    margin-top: 1px;

    &:first-of-type {
      margin-top: 0;
      border-top-left-radius: ${radii.md};
      border-top-right-radius: ${radii.md};
    }

    &:last-of-type {
      border-bottom-left-radius: ${radii.md};
      border-bottom-right-radius: ${radii.md};
    }

    &:focus-within {
      position: relative;
      z-index: 1;
    }
  `,

  Header: styled(RadixAccordion.Header)`
    display: flex;
  `,

  Trigger: styled(RadixAccordion.Trigger)`
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
    color: ${cssVars.dark};
    background-color: ${cssVars.light};
    border: 0;
    border-bottom: 1px solid ${cssVars.light4};

    &:hover {
      background-color: ${cssVars.light3};
    }
  `,

  Content: styled(RadixAccordion.Content)`
    overflow: hidden;
    font-size: 1rem;
    color: ${cssVars.dark};
    background-color: ${cssVars.light};

    &[data-state='open'] {
      animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }

    &[data-state='closed'] {
      animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
  `,

  ContentText: styled.div`
    padding: 0.5rem 1rem;
  `,

  ChevronIcon: styled.div`
    color: ${cssVars.mainColor};
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);

    &[data-state='open'] {
      transform: rotate(180deg);
    }

    &[data-state='closed'] {
      transform: rotate(0deg);
    }
  `,
};
