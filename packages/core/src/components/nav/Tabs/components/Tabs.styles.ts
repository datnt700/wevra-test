import styled from '@emotion/styled';
import { Tabs as RadixTabs } from 'radix-ui';

export const Styled = {
  Root: styled(RadixTabs.Root)`
    display: flex;
    flex-direction: column;

    &[data-orientation='vertical'] {
      flex-direction: row;
    }
  `,

  List: styled(RadixTabs.List)`
    flex-shrink: 0;
    display: flex;
    gap: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    &[data-orientation='vertical'] {
      flex-direction: column;
    }
  `,

  Trigger: styled(RadixTabs.Trigger)`
    font-family: inherit;
    background-color: var(--light);
    background-color: transparent;
    padding: 0 1.25rem;
    height: 3rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    line-height: 1;
    color: var(--dark);
    user-select: none;
    border: 0;
    //border-radius: var(--border-radius-medium);
    transition:
      background-color 0.3s,
      color 0.3s;

    &[data-orientation='vertical'] {
      //border-radius: var(--border-radius-medium);
    }

    &:hover {
      cursor: pointer;
      color: var(--main-color);
      background-color: var(--light-3);
      background-color: var(--light);
    }

    &[data-state='active'] {
      color: var(--main-color);
      // background-color: var(--light-4);
      // background-color: var(--light);
      border-bottom: 1px solid var(--main-color);
    }

    &:focus {
      position: relative;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,

  Content: styled(RadixTabs.Content)`
    flex-grow: 1;
    padding: 1.25rem;
    background-color: var(--light);
    background-color: transparent;
    outline: none;
  `
};
