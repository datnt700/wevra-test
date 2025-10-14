import styled from '@emotion/styled';
import { Switch as RadixSwitch } from 'radix-ui';

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,

  Label: styled.label`
    font-size: 1rem;
    color: var(--dark);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  SwitchRoot: styled(RadixSwitch.Root)<{
    $hasShadow?: boolean;
    $variant?: 'default' | 'primary';
  }>`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    width: 3rem;
    height: 1.5rem;
    background-color: var(--dark);
    border-radius: 2rem;
    position: relative;
    cursor: pointer;

    &[data-state='checked'] {
      background-color: var(--main-color);
    }

    &[data-disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    ${({ $variant }) =>
      $variant === 'primary' &&
      `
      background-color: var(--dark-4);
      &[data-state='checked'] {
        background-color: var(--main-color);
      }
    `}

    ${({ $hasShadow }) =>
      $hasShadow &&
      `
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    `}
  `,

  SwitchThumb: styled(RadixSwitch.Thumb)`
    width: 1.25rem;
    height: 1.25rem;
    background-color: var(--light);
    border-radius: 2rem;
    transition: transform 100ms;
    transform: translateX(-5px);
    will-change: transform;
    display: flex;
    align-items: center;
    justify-content: center;

    &[data-state='checked'] {
      transform: translateX(1rem);

      svg {
        color: var(--main-color);
      }
    }
  `,
};
