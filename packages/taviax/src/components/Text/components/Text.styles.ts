import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import type { TextVariant, TextColor } from '../types';

export const getVariantStyles = (variant: TextVariant = 'body') => {
  const variants = {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 20,
    },
  };

  return variants[variant];
};

export const getColorStyles = (color: TextColor = 'primary') => {
  const colorMap = {
    primary: colors.gray900,
    secondary: colors.gray600,
    danger: colors.colorDanger,
    success: colors.colorSuccess,
    warning: colors.colorWarning,
    white: colors.gray0,
    black: colors.gray1000,
  };

  return { color: colorMap[color] };
};

export const getWeightStyles = (weight?: 'normal' | 'medium' | 'semibold' | 'bold') => {
  if (!weight) return {};

  const weightMap = {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  };

  return { fontWeight: weightMap[weight] as const };
};

export const getAlignStyles = (align?: 'left' | 'center' | 'right') => {
  if (!align) return {};
  return { textAlign: align };
};

export const styles = StyleSheet.create({
  text: {
    color: colors.gray900,
  },
});
