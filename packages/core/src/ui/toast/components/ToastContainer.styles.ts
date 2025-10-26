'use client';

import styled from '@emotion/styled';

/**
 * Toast container z-index should be high to appear above most content
 * but below modals (1040+) and other overlays
 */
const TOAST_Z_INDEX = 9999;

export const Styled = {
  Wrapper: styled.div`
    position: fixed;
    z-index: ${TOAST_Z_INDEX};
  `,
};
