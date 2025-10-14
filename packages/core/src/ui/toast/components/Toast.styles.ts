import { Toast as RadixToast } from 'radix-ui';
import styled from '@emotion/styled';

export const Styled = {
  ToastRoot: styled(RadixToast.Root)<{ position: string }>`
    width: 20rem;
    position: fixed;
    border-radius: var(--border-radius-large);
    padding: 16px;
    z-index: 5000;
    background-color: var(--dark);
    color: var(--light);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.35s cubic-bezier(0.25, 0.75, 0.6, 0.98);

    ${(props) => {
      switch (props.position) {
        case 'bottom-right':
          return 'bottom: 1.5rem; right: 1.5rem;';
        case 'top-right':
          return 'top: 1.5rem; right: 1.5rem;';
        case 'bottom-left':
          return 'bottom: 1.5rem; left: 1.5rem;';
        case 'top-left':
          return 'top: 1.5rem; left: 1.5rem;';
        case 'bottom-center':
          return 'bottom: 1.5rem; right: 0; left: 0; margin: auto;';
        case 'top-center':
          return 'top: 1.5rem; right: 0; left: 0; margin: auto;';
        default:
          return 'bottom: 1.5rem; right: 1.5rem;';
      }
    }}
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Viewport: styled(RadixToast.Viewport)`
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 25px;
    gap: 10px;
    width: 390px;
    max-width: 100vw;
    z-index: 2147483647;
  `,

  Title: styled(RadixToast.Title)`
    font-weight: 500;
    color: var(--light);
    font-size: 15px;
    margin-bottom: 5px;
  `,

  Description: styled(RadixToast.Description)`
    color: var(--light);
    font-size: 13px;
    line-height: 1.3;
  `,

  Action: styled(RadixToast.Action)`
    margin-left: 10px;
  `,

  CloseBtn: styled(RadixToast.Close)`
    background: transparent;
    border: none;
    cursor: pointer;
  `
};
