'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

/**
 * Styled components for the LoadingScreen.
 */
export const Styled = {
  Container: styled.div`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background-color: ${eventureTheme.colors.gray.gray0};
      `;
    }}
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  `,
  ProgressBar: styled.div`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        width: 20rem;
        height: 0.5rem;
        border-radius: ${eventureTheme.radii.md};
        background: ${eventureTheme.colors.gray.gray300};
      `;
    }}
  `,
  Progress: styled.div`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        height: 0.5rem;
        border-radius: ${eventureTheme.radii.md};
        background: ${eventureTheme.colors.primary};
        max-width: 20rem;
      `;
    }}
  `,
};
