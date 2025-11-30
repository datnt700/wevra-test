/**
 * Color tokens for Eventure Mobile UI
 * Shared design tokens with @eventure/eventured
 *
 * Note: These colors are identical to @eventure/eventured for consistency
 * across web and mobile platforms.
 */

export const colors = {
  // Brand colors
  mainColor: '#ff695c',
  titleColor: '#ebebeb',
  mainGradientStart: '#438ccb',
  mainGradientEnd: '#0bc2ed',

  // Main Color Variants (Light)
  mainColorLight: '#f14c4b',
  mainColorLight2: '#f36a69',
  mainColorLight3: '#f58887',
  mainColorLight4: '#f7a5a4',
  mainColorLight5: '#fae0e0',
  mainColorLight6: '#fdf2f2',
  mainColorLight7: '#fef5f5',
  mainColorLight8: '#fef7f7',
  mainColorLight9: '#fefafa',

  // Main Color Variants (Dark)
  mainColorDark: '#d62726',
  mainColorDark2: '#c22423',
  mainColorDark3: '#ab1f1e',
  mainColorDark4: '#871716',
  mainColorDark5: '#621110',
  mainColorDark6: '#3d0a09',

  mainColorGray: '#676767',
  badgeColor: '#e12e2d',

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

  colorGreen: '#00a99d',
  colorGreenDark: '#009289',
  colorGreenLight: '#26b9af',
  colorSuccess: '#00a99d',
  colorSuccessLight: '#26b9af',

  colorCyan: '#27c7bd',
  colorCyanDark: '#23bcb2',
  colorCyanLight: '#4cd2c9',

  // Grays
  gray0: '#ffffff',
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#e5e5e5',
  gray300: '#d4d4d4',
  gray400: '#a3a3a3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  gray1000: '#000000',

  // Light variants
  light: '#ffffff',
  light2: '#fefefe',
  light3: '#f9f9f9',
  light4: '#f5f5f5',
  light5: '#efefef',
  light6: '#e5e5e5',

  // Dark variants
  dark: '#262626',
  dark2: '#171717',
  dark3: '#0a0a0a',
} as const;

export type ColorName = keyof typeof colors;
