import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

export const Styled = {
  Wrapper: styled.div<{ checked?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid ${({ checked }) => (checked ? cssVars.mainColor : cssVars.light4)};
    border-radius: ${radii.lg};
    cursor: pointer;
    transition:
      background 0.2s,
      border-color 0.2s;
    background: ${cssVars.light};
    width: 13.75rem;

    &:hover {
      background: ${cssVars.light2};
    }
  `,
  CheckboxIndicator: styled.div`
    width: 1.25rem;
    height: 1.25rem;
    display: none;
    align-items: center;
    justify-content: center;
    border: 2px solid ${cssVars.mainColor};
    border-radius: ${radii.sm};
    background: ${cssVars.light};
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Label: styled.span`
    font-weight: 600;
    color: ${cssVars.dark};
  `,
  Description: styled.span`
    font-size: 0.875rem;
    color: ${cssVars.dark5};
  `,
};
