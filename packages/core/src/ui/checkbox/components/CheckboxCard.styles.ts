import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div<{ checked?: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border: 1px solid ${({ checked }) => (checked ? 'var(--main-color)' : '#ccc')};
    border-radius: 8px;
    cursor: pointer;
    transition:
      background 0.2s,
      border-color 0.2s;
    background: var(--light);
    width: 220px;

    &:hover {
      background: #f5f5f5;
    }
  `,
  CheckboxIndicator: styled.div`
    width: 20px;
    height: 20px;
    display: none;
    align-items: center;
    justify-content: center;
    border: 2px solid #3b82f6;
    border-radius: 4px;
    background: white;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Label: styled.span`
    font-weight: bold;
  `,
  Description: styled.span`
    font-size: 14px;
    color: #666;
  `
};
