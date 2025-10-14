import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div<{ $type?: 'column' | 'row' }>`
    display: flex;
    flex-direction: ${({ $type }) => ($type === 'row' ? 'row' : 'column')};
    color: var(--light);
    gap: 0.3rem;
    align-items: ${({ $type }) => ($type === 'row' ? 'center' : 'flex-start')};
    width: 100%;
  `,

  Label: styled.div`
    width: 100%;
    font-size: 0.875rem; /* Example label styling */
    line-height: 1.25;
    color: var(--dark);
  `,

  Input: styled.div`
    width: 100%;
    border-radius: var(--border-radius-small);
    padding: 0.5rem;
    color: var(--dark);
    font-size: 1rem;
    line-height: 1.5;
  `,
};
