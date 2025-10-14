import styled from '@emotion/styled';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';

export const Styled = {
  Root: styled(RadixDropdownMenu.Root)``,
  Trigger: styled(RadixDropdownMenu.Trigger)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    height: 3rem;
    background-color: var(--light);
    cursor: pointer;
  `,
  Content: styled(RadixDropdownMenu.Content)`
    min-width: 220px;
    background-color: var(--light);
    border-radius: 6px;
    padding: 5px;
    box-shadow:
      0px 10px 38px -10px rgba(22, 23, 24, 0.35),
      0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  `,
  Item: styled(RadixDropdownMenu.Item)`
    font-size: 0.8rem;
    line-height: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0.5rem 1rem;
    position: relative;
    user-select: none;
    cursor: pointer;
    color: var(--dark);

    &[data-disabled] {
      color: var(--dark-4);
      pointer-events: none;
    }
    &[data-highlighted] {
      background-color: var(--violet-9);
      color: var(--dark);
    }
  `,
  Separator: styled(RadixDropdownMenu.Separator)`
    height: 1px;
    background-color: var(--light-4);
    margin: 5px;
  `,
  Arrow: styled(RadixDropdownMenu.Arrow)`
    fill: var(--light);
  `
};
