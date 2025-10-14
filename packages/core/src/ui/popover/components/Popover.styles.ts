import { Popover as RadixPopover } from 'radix-ui';
import styled from '@emotion/styled';

export const Styled = {
  Content: styled(RadixPopover.Content)<{ $side?: string; $showArrow?: boolean }>`
    background-color: var(--light);
    color: var(--dark);
    max-width: 20rem;
    border-radius: 0.5rem;

    &:focus-visible {
      border: 0;
      outline: none;
    }
  `,
  Close: styled(RadixPopover.Close)`
    background-color: transparent;
    border: 0;
    outline: 0;
    all: unset;
    font-family: inherit;
    height: 1.5rem;
    width: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--dark);
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    border-radius: 100%;

    &:hover {
      cursor: pointer;
    }
  `,
  Arrow: styled(RadixPopover.Arrow)`
    fill: var(--light);
  `,
};
