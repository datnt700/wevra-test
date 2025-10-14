import { Accordion as RadixAccordion } from 'radix-ui';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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
    border-radius: var(--border-radius-medium);
    width: 100%;
    background-color: var(--light);
  `,

  Item: styled(RadixAccordion.Item)`
    margin-top: 1px;

    &:first-child {
      margin-top: 0;
      border-top-left-radius: var(--border-radius-medium);
      border-top-right-radius: var(--border-radius-medium);
    }

    &:last-child {
      border-bottom-left-radius: var(--border-radius-medium);
      border-bottom-right-radius: var(--border-radius-medium);
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
    color: var(--dark);
    background-color: var(--light);
    border: 0;
    border-bottom: 1px solid var(--dark-4);

    &:hover {
      background-color: var(--light-4);
    }
  `,

  Content: styled(RadixAccordion.Content)`
    overflow: hidden;
    font-size: 1rem;
    color: var(--dark);
    background-color: var(--light);

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
    color: var(--violet-10);
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);

    &[data-state='open'] {
      transform: rotate(180deg);
    }

    &[data-state='closed'] {
      transform: rotate(0deg);
    }
  `
};
