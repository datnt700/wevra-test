'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

/**
 * Styled components for the ErrorState.
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
      const taviaTheme = theme as TaviaTheme;
      return `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;

        .icon {
          margin-bottom: 2rem;
          color: ${taviaTheme.colors.danger};

          svg {
            width: 4rem;
            height: 4rem;
          }
        }

        .title {
          margin-bottom: 1rem;
          color: ${taviaTheme.colors.gray.gray900};
          font-weight: 600;
          text-align: center;
        }

        .subTitle {
          margin-bottom: 1rem;
          color: ${taviaTheme.colors.gray.gray600};
          font-weight: 400;
          text-align: center;
        }

        .action {
          margin-bottom: 1rem;
          color: ${taviaTheme.colors.gray.gray700};
        }
      `;
    }}
  `,
};
