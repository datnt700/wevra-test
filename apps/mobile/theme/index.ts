/**
 * Theme configuration for Tavia Mobile
 * Extends @tavia/taviax with semantic color mappings
 */
import { colors as taviaxColors, spacing, radii, typography } from '@tavia/taviax';

/**
 * Semantic color mappings for easier usage
 */
export const colors = {
  // Inherit all taviax colors
  ...taviaxColors,

  // Semantic mappings
  primary: taviaxColors.mainColor,
  primaryLight: taviaxColors.mainColorLight5,
  secondary: taviaxColors.mainColorGray,

  success: taviaxColors.colorSuccess,
  warning: taviaxColors.colorWarning,
  danger: taviaxColors.colorDanger,
  dangerLight: taviaxColors.colorDangerLight,
  colorDanger: taviaxColors.colorDanger,
  info: taviaxColors.colorCyan,

  // Background
  background: taviaxColors.gray50,
  surface: taviaxColors.gray0,

  // Text
  text: taviaxColors.gray900,
  textSecondary: taviaxColors.gray600,
  textTertiary: taviaxColors.gray400,

  // Border
  border: taviaxColors.gray200,
  borderFocus: taviaxColors.mainColor,

  // Shadow
  shadow: taviaxColors.gray1000,

  // States
  disabled: taviaxColors.gray300,
  placeholder: taviaxColors.gray400,

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.35)',
};

// Re-export other theme tokens
export { spacing, radii, typography };

export const theme = {
  colors,
  spacing,
  radii,
  typography,
};
