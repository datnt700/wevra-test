/**
 * Button Component for Tavia Mobile UI
 *
 * A reusable Button component with support for:
 * - Multiple variants (primary, secondary, dark, link, tertiary, danger, info)
 * - Loading state with ActivityIndicator
 * - Icon support (left and right)
 * - Accessibility labels
 * - Customizable shapes and sizes
 *
 * Maintains API compatibility with @tavia/taviad Button where possible.
 */
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { ButtonProps } from '../types';
import { styles, getVariantColors, getShapeStyles, getSizeStyles } from './Button.styles';

export const Button = ({
  children,
  variant = 'primary',
  shape = 'default',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  iconRight,
  accessibilityLabel,
  onPress,
  style,
  testID,
}: ButtonProps) => {
  const variantColors = getVariantColors(variant);
  const shapeStyles = getShapeStyles(shape);
  const sizeStyles = getSizeStyles(size);

  const isDisabled = disabled || isLoading;

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: variantColors.bg,
      borderColor: variantColors.borderColor,
      borderRadius: shapeStyles.borderRadius,
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
    },
    shapeStyles.aspectRatio ? { aspectRatio: shapeStyles.aspectRatio } : undefined,
    isDisabled && styles.buttonDisabled,
    isLoading && styles.buttonLoading,
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: variantColors.color,
      fontSize: sizeStyles.fontSize,
    },
  ];

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={
        accessibilityLabel || (typeof children === 'string' ? children : 'Button')
      }
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      activeOpacity={0.7}
      disabled={isDisabled}
      onPress={onPress}
      style={buttonStyles}
      testID={testID}
    >
      <View style={styles.content}>
        {icon && !isLoading && <View style={styles.iconContainer}>{icon}</View>}

        {isLoading && <ActivityIndicator color={variantColors.color} size="small" />}

        {typeof children === 'string' ? <Text style={textStyles}>{children}</Text> : children}

        {iconRight && !isLoading && <View style={styles.iconContainer}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  );
};

Button.displayName = 'Button';
