import { Tooltip } from 'radix-ui';
import styled from '@emotion/styled';

export const Styled = {
  Provider: styled(Tooltip.Provider)``,
  Root: styled(Tooltip.Root)``,
  Content: styled(Tooltip.Content)`
    background-color: var(--light);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
  `,
  Trigger: styled(Tooltip.Trigger)`
    outline: 0;
    border: 0;
    width: max-content;
    background-color: var(--light);
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Arrow: styled(Tooltip.Arrow)`
    fill: var(--light);
  `
};
