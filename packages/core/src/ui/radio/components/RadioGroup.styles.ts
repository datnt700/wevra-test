import { css } from '@emotion/react';

export const RadioGroupStyles = {
  root: css`
    display: flex;
    flex-direction: column;
    gap: 10px;

    &[data-orientation='horizontal'] {
      flex-direction: row;
    }
  `,
};
