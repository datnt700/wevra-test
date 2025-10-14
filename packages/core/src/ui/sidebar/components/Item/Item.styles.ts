import styled from '@emotion/styled';

export const Styled = {
  Item: styled.div`
    appearance: none;
    border: none;
    box-shadow: none;
    background: none;
    overflow: visible;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.575rem;
    width: 2.575rem;
    border-radius: var(--border-radius-small);

    svg {
      color: var(--dark);
    }

    &:hover {
      opacity: 1;
      transform: scale(1.1) translateZ(0);
      background-color: #ebebeb;
    }
  `,
  Trigger: styled.button`
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: var(--light);
  `,
  PopoverContent: styled.div`
    min-width: 132.925px;
    max-height: 649.4px;
    z-index: 21;
    background-color: var(--light);
    transform: translateX(0.75rem) translateY(0.5rem);
    border: 0;
    box-shadow:
      0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 5px 8px 0 rgba(0, 0, 0, 0.14),
      0 1px 14px 0 rgba(0, 0, 0, 0.12);
  `,
  PopoverContentMain: styled.div`
    display: block;
    padding: 0.5rem 0;
    width: 100%;
    border: 0;
  `,
  PopoverContentHeader: styled.div`
    align-items: center;
    color: var(--denim-600);
    display: flex;
    font-weight: 600;
    padding: 8px 16px;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--dark);
  `,
  PopoverItem: styled.li`
    align-items: center;
    color: var(--on-surface);
    display: flex;
    height: 42px;
    justify-content: flex-start;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    user-select: none;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: var(--background-color);
    }
  `,
  PopoverItemLink: styled.div`
    color: var(--dark);
    cursor: pointer;
  `,
};
