// src/styles/theme.ts
export const cssVars = {
  // Theme
  mainColor: '#ff695c',
  titleColor: '#ebebeb',
  mainGradientStart: '#438ccb',
  mainGradientEnd: '#0bc2ed',

  primaryButtonColor: 'linear-gradient(#ff7872 0%, #ff5f4e 100%)',

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
  //backgroundColor: '#f9fbfd',
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

  inputColor: '',
  inputBorderColor: '#000000',
};

// Dark theme variants
export const darkThemeCssVars = {
  ...cssVars,
  backgroundColor: cssVars.backgroundColorDark,

  // Inverted dark/light variants
  dark: cssVars.gray0,
  dark2: cssVars.gray50,
  dark3: cssVars.gray150,
  dark4: cssVars.gray200,
  dark5: cssVars.gray250,
  dark6: cssVars.gray350,
  dark7: cssVars.gray400,

  light: cssVars.gray950,
  light2: cssVars.gray900,
  light3: cssVars.gray850,
  light4: cssVars.gray800,
  light5: cssVars.gray750,
  light6: cssVars.gray700,
  light7: cssVars.gray650,
  light8: cssVars.gray600,
  light9: cssVars.gray550,

  // Dark theme shadows and overlay
  shadowSmall: '0 0 12px rgba(80, 80, 80, 0.075)',
  shadowMedium: '0 0 24px rgba(80, 80, 80, 0.1)',
  shadowLarge: '0 0 64px rgba(80, 80, 80, 0.15)',
  overlay: 'rgba(5, 5, 5, 0.9)',
  inputColor: 'rgba(29, 29, 29, 1)',
  inputBorderColor: 'rgba(69, 69, 69, 1)',
};
