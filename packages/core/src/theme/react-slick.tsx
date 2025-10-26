'use client';

import { Global, css } from '@emotion/react';
import { cssVars } from './tokens/colors';

/**
 * Global styles for react-slick carousel
 * Customizes dot navigation appearance
 */
const slickStyles = css`
  /* Dot navigation */
  .slick-dots {
    bottom: -16px !important;

    li {
      width: 8px !important;
      height: 8px !important;
      margin: 0 4px !important;

      button {
        width: 8px !important;
        height: 8px !important;
        padding: 0 !important;

        &:before {
          width: 8px !important;
          height: 8px !important;
          line-height: 8px !important;
          color: #707070 !important;
          opacity: 1 !important;
          font-size: 8px !important;
        }
      }

      &.slick-active button:before {
        color: ${cssVars.light} !important;
        opacity: 1 !important;
      }
    }
  }
`;

export const SlickGlobalStyles = () => <Global styles={slickStyles} />;

export default SlickGlobalStyles;
