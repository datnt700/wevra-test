import styled from '@emotion/styled';

interface ProgressProps {
  isIndeterminate: boolean;
  variant: 'default' | 'success' | 'warning' | 'error';
}

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  `,
  Bar: styled.div`
    width: 20rem;
    height: 0.5rem;
    border-radius: 6.405px;
    background: var(--light-4);
    position: relative;
    overflow: hidden;
  `,
  Progress: styled.div<ProgressProps>`
    position: absolute;
    height: 100%;
    border-radius: 6.405px;
    width: 100%;
    left: -100%;
    transition: transform 0.3s ease;

    ${({ variant }) => {
      switch (variant) {
        case 'success':
          return `background-color: var(--color-green);`;
        case 'warning':
          return `background-color: var(--color-yellow);`;
        case 'error':
          return `background-color: var(--color-red);`;
        default:
          return `background-color: var(--dark);`;
      }
    }}

    ${({ isIndeterminate }) =>
      isIndeterminate &&
      `
        animation: indeterminateAnimation 2s ease 0s infinite;
      `} @keyframes indeterminateAnimation {
      0% {
        left: -80%;
        width: 80%;
      }

      100% {
        left: 110%;
        width: 10%;
      }
    }
  `
};
