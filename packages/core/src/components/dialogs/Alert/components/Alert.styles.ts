import styled from '@emotion/styled';

/**
 * Styled components for the Alert.
 */
export const Styled = {
  Wrapper: styled.div<{ $variant?: string; $isFilled?: boolean }>`
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-medium);
    min-height: 3rem;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    color: ${(props) =>
      props.$variant ? `var(--color-${props.$variant}-text)` : 'var(--color-default-text)'};
    border: ${(props) =>
      props.$isFilled
        ? `1px solid var(--color-${props.$variant || 'default'}-border)`
        : `1px solid var(--color-${props.$variant || 'default'}-outline)`};
    background-color: ${(props) =>
      props.$isFilled ? `var(--color-${props.$variant || 'default'}-light)` : 'transparent'};
    box-shadow: ${(props) =>
      props.$isFilled ? `0 0 5px var(--color-${props.$variant || 'default'}-shadow)` : 'none'};
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease;

    &:hover {
      border-color: ${(props) =>
        props.$variant ? `var(--color-${props.$variant}-hover)` : 'var(--color-default-hover)'};
    }
  `,

  Title: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
  `,

  Description: styled.p`
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-neutral-dark);
  `
};
