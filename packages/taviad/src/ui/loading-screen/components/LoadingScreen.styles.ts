'use client';

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Styled components for the LoadingScreen.
 */
export const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: ${cssVars.gray0};
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  `,
  ProgressBar: styled.div`
    width: 20rem;
    height: 0.5rem;
    border-radius: ${radii.md};
    background: ${cssVars.gray300};
  `,
  Progress: styled.div`
    height: 0.5rem;
    border-radius: ${radii.md};
    background: ${cssVars.mainColor};
    max-width: 20rem;
  `,
};
