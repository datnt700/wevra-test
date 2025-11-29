/**
 * Theme configuration for Tavia Mobile
 * Extends @tavia/taviax with semantic color mappings
 *
 * @deprecated Most apps should import directly from '@tavia/taviax'
 * This file provides backward compatibility and semantic aliases
 */
import { colors as taviaxColors, spacing, radii, typography } from '@tavia/taviax';

/**
 * Semantic color mappings for easier usage in mobile app
 * Maps descriptive names to taviax color tokens
 */
export const colors = {
  // Inherit all taviax colors for direct access
  ...taviaxColors,

  // Semantic mappings for common use cases
  primary: taviaxColors.mainColor,
  primaryLight: taviaxColors.mainColorLight5,
  secondary: taviaxColors.mainColorGray,

  success: taviaxColors.colorSuccess,
  warning: taviaxColors.colorWarning,
  danger: taviaxColors.colorDanger,
  dangerLight: taviaxColors.colorDangerLight,
  info: taviaxColors.colorCyan,

  // Background colors
  background: taviaxColors.gray50,
  surface: taviaxColors.gray0,

  // Text colors
  text: taviaxColors.gray900,
  textSecondary: taviaxColors.gray600,
  textTertiary: taviaxColors.gray400,

  // Border colors
  border: taviaxColors.gray200,
  borderFocus: taviaxColors.mainColor,

  // Shadow color
  shadow: taviaxColors.gray1000,

  // State colors
  disabled: taviaxColors.gray300,
  placeholder: taviaxColors.gray400,

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.35)' as const,
};

// Re-export other theme tokens unchanged
export { spacing, radii, typography };

/**
 * Combined theme object
 * @deprecated Import tokens individually or from '@tavia/taviax'
 */
export const theme = {
  colors,
  spacing,
  radii,
  typography,
} as const;
