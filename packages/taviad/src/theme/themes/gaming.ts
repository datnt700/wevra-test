import { breakpoints } from '../breakpoints';
import { typography } from '../tokens/typography';
import type { TaviaTheme } from '../theme';

/**
 * Gaming theme - Energetic colors for gaming and entertainment apps
 * Primary color: Electric Blue (#3B82F6)
 */
export const gamingCssVars = {
  // Brand colors - Gaming Blue
  mainColor: '#3B82F6', // Electric Blue
  titleColor: '#ebebeb',
  mainGradientStart: '#3B82F6',
  mainGradientEnd: '#60A5FA',
  primaryButtonColor: 'linear-gradient(#60A5FA 0%, #3B82F6 100%)',

  // Main Color Variants (Light)
  mainColorLight: '#60A5FA',
  mainColorLight2: '#93C5FD',
  mainColorLight3: '#BFDBFE',
  mainColorLight4: '#DBEAFE',
  mainColorLight5: '#EFF6FF',
  mainColorLight6: '#F5F9FF',
  mainColorLight7: '#F8FBFF',
  mainColorLight8: '#FBFDFF',
  mainColorLight9: '#FDFEFF',

  // Main Color Variants (Dark)
  mainColorDark: '#2563EB',
  mainColorDark2: '#1D4ED8',
  mainColorDark3: '#1E40AF',
  mainColorDark4: '#1E3A8A',
  mainColorDark5: '#172554',
  mainColorDark6: '#0F172A',

  mainColorGray: '#676767',
  badgeColor: '#3B82F6',

  // Signals
  colorDarkred: '#a5081e',
  colorDarkredDark: '#9c0819',
  colorDarkredLight: '#b9293e',

  colorRed: '#e21822',
  colorRedDark: '#d6161e',
  colorRedLight: '#e73a46',
  colorDanger: '#e21822',
  colorDangerLight: '#e73a46',

  colorYellow: '#da9e45',
  colorYellowDark: '#cf9340',
  colorYellowLight: '#e1b069',
  colorWarning: '#da9e45',
  colorWarningLight: '#e1b069',

  colorGreen: '#4eb769',
  colorGreenDark: '#48a862',
  colorGreenLight: '#6ac484',
  colorSuccess: '#4eb769',
  colorSuccessLight: '#6ac484',

  colorViolet: '#7827c9',
  colorVioletDark: '#6f24c1',
  colorVioletLight: '#8f4bd7',

  colorPurple: '#f11fe0',
  colorPurpleDark: '#e61ad5',
  colorPurpleLight: '#f347e6',

  colorPink: '#ff0080',
  colorPinkDark: '#f50077',
  colorPinkLight: '#ff3399',

  colorCyan: '#4cdbbc',
  colorCyanDark: '#46cfb2',
  colorCyanLight: '#6ce4c9',

  // Background
  backgroundColor: 'rgba(241,245,249 ,1)',
  backgroundColorDark: '#0d0d0d',

  // Accents (Grays)
  gray0: '#ffffff',
  gray50: '#fafafa',
  gray100: '#f4f4f4',
  gray150: '#eaeaea',
  gray200: '#e1e1e1',
  gray250: '#cecece',
  gray300: '#bababa',
  gray350: '#aaaaaa',
  gray400: '#9a9a9a',
  gray450: '#8d8d8d',
  gray500: '#808080',
  gray550: '#727272',
  gray600: '#656565',
  gray650: '#575757',
  gray700: '#4a4a4a',
  gray750: '#3c3c3c',
  gray800: '#222222',
  gray850: '#171717',
  gray900: '#0d0d0d',
  gray950: '#070707',
  gray1000: '#000000',

  // Dark and Light Variants
  dark: '#000000',
  dark2: '#0d0d0d',
  dark3: '#3c3c3c',
  dark4: '#4a4a4a',
  dark5: '#656565',
  dark6: '#808080',
  dark7: '#9a9a9a',

  light: '#ffffff',
  light2: '#fafafa',
  light3: '#f4f4f4',
  light4: '#eaeaea',
  light5: '#e1e1e1',
  light6: '#cecece',
  light7: '#bababa',
  light8: '#aaaaaa',
  light9: '#9a9a9a',

  // Shadows
  shadowSmall: '0 0 10px rgba(0, 0, 0, 0.075)',
  shadowMedium: '0 0 24px rgba(0, 0, 0, 0.1)',
  shadowLarge: '0 0 64px rgba(0, 0, 0, 0.15)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.35)',

  // Input colors
  inputColor: '',
  inputBorderColor: '#000000',
} as const;

const baseTheme = {
  typography,
  breakpoints,
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  sizing: {
    maxWidth: '120rem',
    articleMaxWidth: '65rem',
    input: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
    },
  },
  common: {
    size: {
      input: {
        height: {
          small: '2rem',
          medium: '2.5rem',
          large: '3rem',
        },
      },
    },
  },
  radii: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
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

export const gamingLightTheme: TaviaTheme = {
  mode: 'light',
  colors: {
    // Brand
    primary: gamingCssVars.mainColor,
    primaryHover: gamingCssVars.mainColorDark,
    primaryActive: gamingCssVars.mainColorDark2,

    // Semantic
    success: gamingCssVars.colorSuccess,
    successLight: gamingCssVars.colorSuccessLight,
    warning: gamingCssVars.colorWarning,
    warningLight: gamingCssVars.colorWarningLight,
    danger: gamingCssVars.colorDanger,
    dangerLight: gamingCssVars.colorDangerLight,
    info: gamingCssVars.colorCyan,
    infoLight: gamingCssVars.colorCyanLight,

    // Surfaces
    background: gamingCssVars.backgroundColor,
    surface: gamingCssVars.gray0,
    surfaceHover: gamingCssVars.gray50,
    overlay: 'rgba(0, 0, 0, 0.5)',

    // Text
    text: {
      primary: gamingCssVars.gray900,
      secondary: gamingCssVars.gray700,
      tertiary: gamingCssVars.gray500,
      disabled: gamingCssVars.gray400,
      inverse: gamingCssVars.gray0,
    },

    // Borders
    border: {
      default: gamingCssVars.gray200,
      hover: gamingCssVars.gray300,
      focus: gamingCssVars.mainColor,
    },

    // Grayscale access
    gray: gamingCssVars as any,
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

export const gamingDarkTheme: TaviaTheme = {
  mode: 'dark',
  colors: {
    // Brand
    primary: gamingCssVars.mainColorLight,
    primaryHover: gamingCssVars.mainColorLight2,
    primaryActive: gamingCssVars.mainColorLight3,

    // Semantic
    success: gamingCssVars.colorGreenLight,
    successLight: gamingCssVars.colorGreen,
    warning: gamingCssVars.colorYellowLight,
    warningLight: gamingCssVars.colorYellow,
    danger: gamingCssVars.colorRedLight,
    dangerLight: gamingCssVars.colorRed,
    info: gamingCssVars.colorCyanLight,
    infoLight: gamingCssVars.colorCyan,

    // Surfaces
    background: gamingCssVars.backgroundColorDark,
    surface: gamingCssVars.gray850,
    surfaceHover: gamingCssVars.gray800,
    overlay: 'rgba(0, 0, 0, 0.75)',

    // Text
    text: {
      primary: gamingCssVars.gray50,
      secondary: gamingCssVars.gray300,
      tertiary: gamingCssVars.gray500,
      disabled: gamingCssVars.gray600,
      inverse: gamingCssVars.gray900,
    },

    // Borders
    border: {
      default: gamingCssVars.gray700,
      hover: gamingCssVars.gray600,
      focus: gamingCssVars.mainColorLight,
    },

    // Grayscale access
    gray: gamingCssVars as any,
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
