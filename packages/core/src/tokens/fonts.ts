import { css } from '@emotion/react';

// Importing the font files as static assets
import SVNGilroyBlackItalicOtf from '../assets/fonts/SVN-Gilroy-Black-Italic.otf';
import SVNGilroyBlackOtf from '../assets/fonts/SVN-Gilroy-Black.otf';
import SVNGilroyBoldItalicOtf from '../assets/fonts/SVN-Gilroy-Bold-Italic.otf';
import SVNGilroyBoldOtf from '../assets/fonts/SVN-Gilroy-Bold.otf';
import SVNGilroyHeavyItalicOtf from '../assets/fonts/SVN-Gilroy-Heavy-Italic.otf';
import SVNGilroyHeavyOtf from '../assets/fonts/SVN-Gilroy-Heavy.otf';
import SVNGilroyItalicOtf from '../assets/fonts/SVN-Gilroy-Italic.otf';
import SVNGilroyLightItalicOtf from '../assets/fonts/SVN-Gilroy-Light-Italic.otf';
import SVNGilroyLightOtf from '../assets/fonts/SVN-Gilroy-Light.otf';
import SVNGilroyMediumItalicOtf from '../assets/fonts/SVN-Gilroy-Medium-Italic.otf';
import SVNGilroyMediumOtf from '../assets/fonts/SVN-Gilroy-Medium.otf';
import SVNGilroyRegularOtf from '../assets/fonts/SVN-Gilroy-Regular.otf';
import SVNGilroySemiBoldItalicOtf from '../assets/fonts/SVN-Gilroy-SemiBold-Italic.otf';
import SVNGilroySemiBoldOtf from '../assets/fonts/SVN-Gilroy-SemiBold.otf';
import SVNGilroyThinItalicOtf from '../assets/fonts/SVN-Gilroy-Thin-Italic.otf';
import SVNGilroyThinOtf from '../assets/fonts/SVN-Gilroy-Thin.otf';
import SVNGilroyXBoldItalicOtf from '../assets/fonts/SVN-Gilroy-XBold-Italic.otf';
import SVNGilroyXBoldOtf from '../assets/fonts/SVN-Gilroy-XBold.otf';
import SVNGilroyXLightItalicOtf from '../assets/fonts/SVN-Gilroy-XLight-Italic.otf';
import SVNGilroyXLightOtf from '../assets/fonts/SVN-Gilroy-XLight.otf';

// CSS with static imports
export const fontFaces = css`
  @font-face {
    font-family: 'Gilroy';
    font-weight: 900;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyBlackItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 900;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyBlackOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 700;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyBoldItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyBoldOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 800;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyHeavyItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 800;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyHeavyOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 400;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 300;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyLightItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyLightOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 500;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyMediumItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyMediumOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyRegularOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 600;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroySemiBoldItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroySemiBoldOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 100;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyThinItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 100;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyThinOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 900;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyXBoldItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 900;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyXBoldOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 200;
    font-style: italic;
    font-display: swap;
    src: url(${SVNGilroyXLightItalicOtf}) format('opentype');
  }

  @font-face {
    font-family: 'Gilroy';
    font-weight: 200;
    font-style: normal;
    font-display: swap;
    src: url(${SVNGilroyXLightOtf}) format('opentype');
  }
`;
