/**
 * SocialButton Component for Tavia Mobile UI
 *
 * Specialized button for social authentication with:
 * - Left-aligned icon at 16px from edge
 * - Centered text
 * - Grid-like alignment across multiple buttons
 */
import { ActivityIndicator } from 'react-native';
import type { SocialButtonProps } from '../types/SocialButtonProps';
import { Styled } from './SocialButton.styles';
import {
  getVariantColors,
  getShapeStyles,
  getSizeStyles,
} from '../../Button/components/Button.styles';

export const SocialButton = ({
  children,
  variant = 'tertiary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  accessibilityLabel,
  onPress,
  style,
  testID,
}: SocialButtonProps) => {
  const variantColors = getVariantColors(variant);
  const shapeStyles = getShapeStyles('default');
  const sizeStyles = getSizeStyles(size);

  const isDisabled = disabled || isLoading;

  // Compute button styles
  const buttonStyles = [
    {
      backgroundColor: variantColors.bg,
      borderColor: variantColors.borderColor,
      borderRadius: shapeStyles.borderRadius,
      paddingVertical: sizeStyles.paddingVertical,
    },
    isDisabled && { opacity: 0.5 },
    isLoading && { opacity: 0.7 },
    style,
  ];

  // Compute text styles
  const textStyles = [
    {
      color: variantColors.color,
      fontSize: sizeStyles.fontSize,
    },
  ];

  return (
    <Styled.Button
      accessible
      accessibilityLabel={
        accessibilityLabel || (typeof children === 'string' ? children : 'Social button')
      }
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      activeOpacity={0.7}
      disabled={isDisabled}
      onPress={onPress}
      style={buttonStyles}
      testID={testID}
    >
      <Styled.Content>
        {/* Icon always on the left */}
        <Styled.IconContainer>
          {isLoading ? <ActivityIndicator color={variantColors.color} size="small" /> : icon}
        </Styled.IconContainer>

        {/* Text centered (with negative margin to account for icon width) */}
        <Styled.TextContainer>
          {!isLoading &&
            (typeof children === 'string' ? (
              <Styled.Text style={textStyles}>{children}</Styled.Text>
            ) : (
              children
            ))}
        </Styled.TextContainer>
      </Styled.Content>
    </Styled.Button>
  );
};

SocialButton.displayName = 'SocialButton';
