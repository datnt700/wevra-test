import styled from '@emotion/styled';
import { Checkbox as RadixCheckbox } from 'radix-ui';

export const Styled = {
  CheckboxWrapper: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,

  CheckboxRoot: styled(RadixCheckbox.Root)<{ $isDisabled?: boolean; $size?: string }>`
    background-color: var(--light);
    width: ${({ $size }) => ($size === 'sm' ? '1rem' : $size === 'lg' ? '1.75rem' : '1.5rem')};
    height: ${({ $size }) => ($size === 'sm' ? '1rem' : $size === 'lg' ? '1.75rem' : '1.5rem')};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
    border: 1px solid var(--dark);

    &:hover {
      background-color: ${({ $isDisabled }) =>
        $isDisabled ? 'transparent' : 'var(--main-color-light-6)'};
    }

    &:focus {
      box-shadow: 0 0 0 2px var(--dark);
    }
  `,

  CheckboxIndicator: styled(RadixCheckbox.Indicator)<{ $size?: string }>`
    color: var(--main-color);
  `,

  CheckboxLabel: styled.label<{ $size?: string }>`
    color: var(--dark);
    font-size: ${({ $size }) => ($size === 'sm' ? '0.75rem' : $size === 'lg' ? '1.25rem' : '1rem')};
    line-height: 1;
    cursor: pointer;
  `
};
