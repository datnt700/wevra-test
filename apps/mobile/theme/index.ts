/**
 * Theme configuration for Eventure Mobile
 * Extends @eventure/eventurex with semantic color mappings
 *
 * @deprecated Most apps should import directly from '@eventure/eventurex'
 * This file provides backward compatibility and semantic aliases
 */
import { colors as eventurexColors, spacing, radii, typography } from '@eventure/eventurex';

/**
 * Semantic color mappings for easier usage in mobile app
 * Maps descriptive names to eventurex color tokens
 */
export const colors = {
  // Inherit all eventurex colors for direct access
  ...eventurexColors,

  // Semantic mappings for common use cases
  primary: eventurexColors.mainColor,
  primaryLight: eventurexColors.mainColorLight5,
  secondary: eventurexColors.mainColorGray,

  success: eventurexColors.colorSuccess,
  warning: eventurexColors.colorWarning,
  danger: eventurexColors.colorDanger,
  dangerLight: eventurexColors.colorDangerLight,
  info: eventurexColors.colorCyan,

  // Background colors
  background: eventurexColors.gray50,
  surface: eventurexColors.gray0,

  // Text colors
  text: eventurexColors.gray900,
  textSecondary: eventurexColors.gray600,
  textTertiary: eventurexColors.gray400,

  // Border colors
  border: eventurexColors.gray200,
  borderFocus: eventurexColors.mainColor,

  // Shadow color
  shadow: eventurexColors.gray1000,

  // State colors
  disabled: eventurexColors.gray300,
  placeholder: eventurexColors.gray400,

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.35)' as const,
};

// Re-export other theme tokens unchanged
export { spacing, radii, typography };

/**
 * Combined theme object
 * @deprecated Import tokens individually or from '@eventure/eventurex'
 */
export const theme = {
  colors,
  spacing,
  radii,
  typography,
} as const;
