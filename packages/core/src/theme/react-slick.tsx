/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const SlickGlobalStyles = () => (
  <Global
    styles={css`
      .slick-dots li button:before {
        width: 8px !important;
        height: 8px !important;
        line-height: 8px !important;
        color: #707070 !important;
        opacity: 1 !important;
        font-size: 8px !important;
      }

      .slick-dots li button {
        width: 8px !important;
        height: 8px !important;
        padding: 0 !important;
      }

      .slick-dots li {
        width: 8px !important;
        height: 8px !important;
        margin: 0 4px !important;
      }

      .slick-dots {
        bottom: -16px !important;
      }

      .slick-dots li.slick-active button:before {
        color: var(--light) !important;
        opacity: 1 !important;
      }
    `}
  />
);

export default SlickGlobalStyles;
