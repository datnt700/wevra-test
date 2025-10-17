import styled from '@emotion/styled';
import { RadioGroupItem } from '@radix-ui/react-radio-group';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

export const Styled = {
  Wrapper: styled.div<{ checked?: boolean }>`
    cursor: pointer;
    padding: 1rem;
    border: 1px solid ${(props) => (props.checked ? cssVars.mainColor : cssVars.light4)};
    border-radius: ${radii.lg};
    background-color: ${cssVars.light};
    box-shadow: ${(props) => (props.checked ? `0 4px 8px ${cssVars.mainColor}33` : 'none')};
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:hover {
      border-color: ${cssVars.mainColor};
    }
  `,
  GroupItem: styled(RadioGroupItem)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    background: transparent;
  `,
};
