import { breakpoints } from './breakpoints';
import { typography } from './tokens/typography';
import { cssVars } from './tokens/colors';

export type ColorMode = 'light' | 'dark';

export interface EventureTheme {
  mode: ColorMode;
  colors: {
    // Brand colors
    primary: string;
    primaryHover: string;
    primaryActive: string;

    // Semantic colors
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    danger: string;
    dangerLight: string;
    info: string;
    infoLight: string;

    // Surface colors
    background: string;
    surface: string;
    surfaceHover: string;
    overlay: string;

    // Text colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
    };

    // Border colors
    border: {
      default: string;
      hover: string;
      focus: string;
    };

    // Grayscale
    gray: typeof cssVars;
  };
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  sizing: {
    maxWidth: string;
    articleMaxWidth: string;
    input: {
      height: {
        sm: string;
        md: string;
        lg: string;
      };
    };
  };
  // Legacy property for backward compatibility
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
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    inner: string;
    none: string;
  };
  radii: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  transitions: {
    fast: string;
    base: string;
    slow: string;
  };
  zIndices: {
    hide: number;
    base: number;
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
}

const baseTheme = {
  typography,
  breakpoints,
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },
  sizing: {
    maxWidth: '120rem', // 1920px
    articleMaxWidth: '65rem', // 1040px
    input: {
      height: {
        sm: '2rem', // 32px
        md: '2.5rem', // 40px
        lg: '3rem', // 48px
      },
    },
  },
  // Legacy property for backward compatibility
  common: {
    size: {
      input: {
        height: {
          small: '2rem', // 32px
          medium: '2.5rem', // 40px
          large: '3rem', // 48px
        },
      },
    },
  },
  radii: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    full: '9999px',
  },
  transitions: {
    fast: 'all 150ms ease-in-out',
    base: 'all 250ms ease-in-out',
    slow: 'all 350ms ease-in-out',
  },
  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
};

export const lightTheme: EventureTheme = {
  mode: 'light',
  colors: {
    // Brand
    primary: cssVars.mainColor,
    primaryHover: cssVars.mainColorDark,
    primaryActive: cssVars.mainColorDark2,

    // Semantic
    success: cssVars.colorSuccess,
    successLight: cssVars.colorSuccessLight,
    warning: cssVars.colorWarning,
    warningLight: cssVars.colorWarningLight,
    danger: cssVars.colorDanger,
    dangerLight: cssVars.colorDangerLight,
    info: cssVars.colorCyan,
    infoLight: cssVars.colorCyanLight,

    // Surfaces
    background: cssVars.backgroundColor,
    surface: cssVars.gray0,
    surfaceHover: cssVars.gray50,
    overlay: 'rgba(0, 0, 0, 0.5)',

    // Text
    text: {
      primary: cssVars.gray900,
      secondary: cssVars.gray700,
      tertiary: cssVars.gray500,
      disabled: cssVars.gray400,
      inverse: cssVars.gray0,
    },

    // Borders
    border: {
      default: cssVars.gray200,
      hover: cssVars.gray300,
      focus: cssVars.mainColor,
    },

    // Grayscale access
    gray: cssVars,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  ...baseTheme,
};

export const darkTheme: EventureTheme = {
  mode: 'dark',
  colors: {
    // Brand
    primary: cssVars.mainColorLight,
    primaryHover: cssVars.mainColorLight2,
    primaryActive: cssVars.mainColorLight3,

    // Semantic
    success: cssVars.colorGreenLight,
    successLight: cssVars.colorGreen,
    warning: cssVars.colorYellowLight,
    warningLight: cssVars.colorYellow,
    danger: cssVars.colorRedLight,
    dangerLight: cssVars.colorRed,
    info: cssVars.colorCyanLight,
    infoLight: cssVars.colorCyan,

    // Surfaces
    background: cssVars.backgroundColorDark,
    surface: cssVars.gray850,
    surfaceHover: cssVars.gray800,
    overlay: 'rgba(0, 0, 0, 0.75)',

    // Text
    text: {
      primary: cssVars.gray50,
      secondary: cssVars.gray300,
      tertiary: cssVars.gray500,
      disabled: cssVars.gray600,
      inverse: cssVars.gray900,
    },

    // Borders
    border: {
      default: cssVars.gray700,
      hover: cssVars.gray600,
      focus: cssVars.mainColorLight,
    },

    // Grayscale access
    gray: cssVars,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
    none: 'none',
  },
  ...baseTheme,
};

// Default export for backward compatibility
export const theme = lightTheme;
