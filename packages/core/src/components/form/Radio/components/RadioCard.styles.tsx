import styled from '@emotion/styled';
import { RadioGroupItem } from '@radix-ui/react-radio-group';

export const Styled = {
  Wrapper: styled.div<{ checked?: boolean }>`
    cursor: pointer;
    padding: 16px;
    border: 1px solid ${(props) => (props.checked ? 'var(--main-color)' : '#ccc')};
    border-radius: 8px;
    background-color: var(--light);
    box-shadow: ${(props) => (props.checked ? '0 4px 8px rgba(0, 123, 255, 0.2)' : 'none')};
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  GroupItem: styled(RadioGroupItem)`
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
  `
};
