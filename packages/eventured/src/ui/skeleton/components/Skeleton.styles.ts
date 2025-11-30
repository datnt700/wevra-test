'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

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
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        height: 22.5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: ${eventureTheme.colors.surface};
        border-radius: ${eventureTheme.radii.lg};
      `;
    }}
  `,

  SkeletonImageStyled: styled.div<{ hasAnimation: boolean }>`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        background-color: ${eventureTheme.colors.gray.gray200};
        width: 100%;
        height: 10rem;
        max-height: 20rem;
        border-radius: ${eventureTheme.radii.md};
      `;
    }}
  `,

  Tabs: styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
  `,

  Tab: styled.div<{ hasAnimation: boolean }>`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
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
        border-radius: ${eventureTheme.radii.md};
        max-width: 12rem;

        background-color: ${eventureTheme.colors.gray.gray200};

        &[data-orientation='vertical'] {
          border-radius: ${eventureTheme.radii.md};
        }
      `;
    }}
  `,

  Title: styled.div<{ hasAnimation: boolean }>`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        background-color: ${eventureTheme.colors.gray.gray200};
        width: 100%;
        height: 100%;
        min-height: 2rem;
        border-radius: ${eventureTheme.radii.md};
      `;
    }}
  `,

  Row: styled.div<{ hasAnimation: boolean }>`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        background-color: ${eventureTheme.colors.gray.gray200};
        width: 100%;
        height: 0.75rem;
        border-radius: ${eventureTheme.radii.md};
      `;
    }}
  `,
};
