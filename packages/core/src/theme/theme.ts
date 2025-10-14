// theme.ts
import { breakpoints } from './breakpoints';
import { typography } from './tokens/typography';

interface Theme {
  general: {
    maxWidth: string;
    articleMaxWidth: string;
  };
  breakpoints: {
    mobile: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  typography: {
    heading2: string;
    heading3: string;
    heading4: string;
    body1: string;
    body2: string;
    subTitle: string;
    label: string;
    mobileHeading: string;
    mobileBody1: string;
    mobileBody2: string;
    mobileSubtitle: string;
    mobileLabel: string;
    mobileCaption3: string;
  };
  colors?: {
    mainColor: string;
    titleColor: string;
    mainGradientStart: string;
    mainGradientEnd: string;
    // Add more color properties here
    light: string;
    dark: string;
  };
  shadows?: {
    small: string;
    medium: string;
    large: string;
  };
  overlay: {
    light: string;
    dark: string;
  };
  common: {
    size: {
      input: {
        height: {
          small: string;
          medium: string;
          large: string;
        };
      };
    };
  };
}

export const theme: Theme = {
  general: {
    maxWidth: '120rem',
    articleMaxWidth: '65rem',
  },
  breakpoints: {
    ...breakpoints,
  },
  typography: {
    ...typography,
  },
  shadows: {
    small: '0 0 10px rgba(0, 0, 0, 0.075)',
    medium: '0 0 24px rgba(0, 0, 0, 0.1)',
    large: '0 0 64px rgba(0, 0, 0, 0.15)',
  },
  overlay: {
    light: 'rgba(0, 0, 0, 0.35)',
    dark: 'rgba(5, 5, 5, 0.9)',
  },
  common: {
    size: {
      input: {
        height: {
          small: '2rem',
          medium: '3rem',
          large: '4rem',
        },
      },
    },
  },
};
