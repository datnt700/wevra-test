import { css } from '@emotion/react';
import { cssVars } from '../../theme/tokens/colors';

export const tagStyles = {
  wrapper: css`
    position: relative;
    display: flex;
    max-width: 100%;
    align-items: center;
    padding: 0.125rem 0.375rem;
    background-color: ${cssVars.gray100};
    border-radius: 6px;
    color: ${cssVars.gray900};
    width: max-content;
    transition: background-color 0.3s ease;

    &.canClick {
      cursor: pointer;
      &:hover {
        background-color: ${cssVars.gray200};
      }
    }

    &.withUrl {
      cursor: pointer;

      .body {
        color: inherit;
      }

      &:hover {
        background-color: ${cssVars.gray200};

        .body {
          text-decoration: underline;
        }
      }
    }
  `,

  body: css`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,

  closeIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${cssVars.gray600};
    }
  `,
};
