'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

/**
 * Styled components for the EmptyState.
 */
export const Styled = {
  Wrapper: styled.div`
    background-color: transparent;
    width: 100%;
    display: flex;
  `,

  Body: styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  Content: styled.div`
    ${({ theme }) => {
      const eventureTheme = theme as EventureTheme;
      return `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;

        .icon {
          margin-bottom: 2rem;
          color: ${eventureTheme.colors.gray.gray500};

          svg {
            width: 4rem;
            height: 4rem;
          }
        }

        .title {
          margin-bottom: 1rem;
          color: ${eventureTheme.colors.gray.gray900};
          font-weight: 600;
          text-align: center;
        }

        .subTitle {
          margin-bottom: 1rem;
          color: ${eventureTheme.colors.gray.gray600};
          font-weight: 400;
          text-align: center;
        }

        .action {
          color: ${eventureTheme.colors.gray.gray700};
        }
      `;
    }}
  `,
};
