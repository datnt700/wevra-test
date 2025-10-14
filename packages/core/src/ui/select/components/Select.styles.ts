import styled from '@emotion/styled';
import { Select } from 'radix-ui';

/**
 * Styled components for the Select component.
 */
export const Styled: any = {
  Root: styled(Select.Root)`
    /* Root container for the select */
  `,

  Trigger: styled(Select.Trigger)<{ $isDisabled?: boolean; $isInvalid?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.5rem;
    padding: 0 1rem;
    font-size: 0.8rem;
    line-height: 1;
    height: 3rem;
    gap: 0.1rem;
    background-color: ${({ $isDisabled }) => ($isDisabled ? 'var(--light-5)' : 'var(--light)')};
    min-width: 10rem;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
    outline: none;

    &[data-state='open'] {
      border-color: var(--main-color);
    }

    ${({ $isInvalid }) =>
      $isInvalid &&
      `
      border-color: var(--color-red);
      box-shadow: 0 0 0 2px var(--color-red-light);
    `}
  `,

  Value: styled(Select.Value)`
    flex-grow: 1;
    color: var(--dark);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  Icon: styled(Select.Icon)`
    color: var(--dark);
    transition: transform 0.2s ease;
    &[data-state='open'] {
      transform: rotate(180deg);
    }
  `,

  Portal: styled(Select.Portal)`
    /* Portal container for the dropdown content */
  `,

  Content: styled(Select.Content)`
    overflow: hidden;
    background-color: var(--light);
    border-radius: 0.5rem;
    box-shadow:
      0px 10px 38px -10px rgba(22, 23, 24, 0.35),
      0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  `,

  Viewport: styled(Select.Viewport)`
    padding: 5px;
  `,

  Separator: styled(Select.Separator)`
    height: 1px;
    background-color: #e0e0e0;
    margin: 5px 0;
  `,

  ScrollUpButton: styled(Select.ScrollUpButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8rem;
    background-color: white;
    cursor: default;
  `,

  ScrollDownButton: styled(Select.ScrollDownButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8rem;
    background-color: white;
    cursor: default;
  `,

  Item: styled(Select.Item)<{ $isDisabled?: boolean }>`
    font-size: 0.8rem;
    line-height: 1;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 2.2rem 0 1.8rem;
    position: relative;
    user-select: none;

    &[data-disabled] {
      pointer-events: none;
      color: gray;
    }

    &[data-highlighted]:not([data-disabled]) {
      outline: none;
      background-color: #f0f0f0;
    }

    &:hover:not([data-disabled]) {
      background-color: var(--light-3);
    }
  `,

  ItemText: styled(Select.ItemText)`
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  Indicator: styled.div`
    position: absolute;
    left: 0;
    width: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  `,
};
