// theme.d.ts
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
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
  }
}
