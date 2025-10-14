import styled from '@emotion/styled';
import { Menubar as RadixMenubar } from 'radix-ui';

/**
 * Styled components for the MenuBar.
 */
export const Styled = {
  Root: styled(RadixMenubar.Root)`
    display: inline-flex;
    background-color: var(--light);
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  `,

  Menu: styled(RadixMenubar.Menu)`
    position: relative;
  `,

  Trigger: styled(RadixMenubar.Trigger)<{ $state?: string }>`
    background-color: transparent;
    padding: 8px 12px;
    outline: none;
    user-select: none;
    font-weight: 500;
    line-height: 1;
    border: none;
    color: var(--dark);
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2px;

    &[data-state='open'],
    &:hover {
      background-color: var(--light-5);
      border-radius: 0.5rem;
    }
  `,

  Portal: styled(RadixMenubar.Portal)``,

  Content: styled(RadixMenubar.Content)<{ $side?: 'top' | 'right' | 'bottom' | 'left' }>`
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

    ${({ $side }) => {
      if ($side === 'top') {
        return `
          margin-top: 5px;
        `;
      }
      if ($side === 'right') {
        return `
          margin-left: 5px;
        `;
      }
      if ($side === 'bottom') {
        return `
          margin-top: 5px;
        `;
      }
      if ($side === 'left') {
        return `
          margin-right: 5px;
        `;
      }
    }}
  `,

  Item: styled(RadixMenubar.Item)<{ $highlighted?: boolean; $disabled?: boolean }>`
    all: unset;
    font-size: 13px;
    line-height: 1;
    color: var(--dark);
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 10px;
    position: relative;
    user-select: none;

    &[data-highlighted] {
      background-color: var(--light-7);
      color: var(--main-color);
    }

    &[data-disabled] {
      color: var(--neutral);
      pointer-events: none;
    }
  `
};
