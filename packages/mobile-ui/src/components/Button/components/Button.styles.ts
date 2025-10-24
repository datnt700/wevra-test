/**
 * Button component styles using React Native StyleSheet
 * Follows clean architecture with theme token access
 * @module Button.styles
 */
import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radii } from '../../../theme/radii';
import { typography } from '../../../theme/typography';
import type { ButtonVariant, ButtonShape, ButtonSize } from '../types';

interface VariantColors {
  bg: string;
  color: string;
  borderColor: string;
}

/**
 * Get variant colors from theme tokens
 */
export const getVariantColors = (variant: ButtonVariant = 'primary'): VariantColors => {
  const variantMap: Record<ButtonVariant, VariantColors> = {
    primary: {
      bg: colors.mainColor,
      color: colors.light,
      borderColor: colors.mainColor,
    },
    secondary: {
      bg: colors.light4,
      color: colors.dark,
      borderColor: colors.light4,
    },
    tertiary: {
      bg: colors.light3,
      color: colors.dark3,
      borderColor: colors.light4,
    },
    dark: {
      bg: colors.dark,
      color: colors.light,
      borderColor: colors.dark,
    },
    link: {
      bg: 'transparent',
      color: colors.mainColor,
      borderColor: 'transparent',
    },
    danger: {
      bg: colors.colorDanger,
      color: colors.light,
      borderColor: colors.colorDanger,
    },
    info: {
      bg: colors.colorCyan,
      color: colors.dark,
      borderColor: colors.colorCyan,
    },
  };

  return variantMap[variant] || variantMap.primary;
};

/**
 * Get shape-specific styles
 */
export const getShapeStyles = (shape: ButtonShape = 'default') => {
  const shapeMap: Record<ButtonShape, { borderRadius: number; aspectRatio?: number }> = {
    default: {
      borderRadius: radii.md,
    },
    pill: {
      borderRadius: radii.full,
    },
    round: {
      borderRadius: radii.xl,
    },
    square: {
      borderRadius: radii.md,
    },
    circle: {
      borderRadius: radii.full,
      aspectRatio: 1,
    },
  };

  return shapeMap[shape] || shapeMap.default;
};

/**
 * Get size-specific styles
 */
export const getSizeStyles = (size: ButtonSize = 'md') => {
  const sizeMap: Record<
    ButtonSize,
    { paddingVertical: number; paddingHorizontal: number; fontSize: number }
  > = {
    sm: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: typography.fontSizes.sm,
    },
    md: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.base,
      fontSize: typography.fontSizes.base,
    },
    lg: {
      paddingVertical: spacing.base,
      paddingHorizontal: spacing.lg,
      fontSize: typography.fontSizes.lg,
    },
  };

  return sizeMap[size] || sizeMap.md;
};

/**
 * Base styles for Button component
 */
export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonLoading: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  text: {
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
