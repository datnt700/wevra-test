import { Tooltip } from 'radix-ui';
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

export const Styled = {
  Provider: styled(Tooltip.Provider)``,
  Root: styled(Tooltip.Root)``,
  Content: styled(Tooltip.Content)`
    background-color: ${cssVars.light};
    padding: 0.5rem 1rem;
    border-radius: ${radii.md};
    font-size: 0.8rem;
  `,
  Trigger: styled(Tooltip.Trigger)`
    outline: 0;
    border: 0;
    width: max-content;
    background-color: ${cssVars.light};
    padding: 0.5rem;
    border-radius: ${radii.full};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Arrow: styled(Tooltip.Arrow)`
    fill: ${cssVars.light};
  `,
};
