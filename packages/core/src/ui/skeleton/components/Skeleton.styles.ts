import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

export const Styled = {
  SkeletonBodyTextStyled: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  `,

  SkeletonCardContentStyled: styled.div`
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  SkeletonCardStyled: styled.div`
    height: 22.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: ${cssVars.gray0};
    border-radius: 8px;
  `,

  SkeletonImageStyled: styled.div<{ hasAnimation: boolean }>`
    background-color: ${cssVars.gray200};
    width: 100%;
    height: 10rem;
    max-height: 20rem;
    border-radius: 6px;
  `,

  Tabs: styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
  `,

  Tab: styled.div<{ hasAnimation: boolean }>`
    font-family: inherit;
    padding: 0 1.25rem;
    height: 3rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    line-height: 1;
    user-select: none;
    border: 0;
    border-radius: 6px;
    max-width: 12rem;

    background-color: ${cssVars.gray200};

    &[data-orientation='vertical'] {
      border-radius: 6px;
    }
  `,

  Title: styled.div<{ hasAnimation: boolean }>`
    background-color: ${cssVars.gray200};
    width: 100%;
    height: 100%;
    min-height: 2rem;
    border-radius: 6px;
  `,

  Row: styled.div<{ hasAnimation: boolean }>`
    background-color: ${cssVars.gray200};
    width: 100%;
    height: 0.75rem;
    border-radius: 6px;
  `,
};
