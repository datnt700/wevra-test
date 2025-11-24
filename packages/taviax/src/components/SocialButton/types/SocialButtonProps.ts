import type { ReactNode } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import type { ButtonVariant, ButtonSize } from '../../Button/types';

/**
 * Props for the SocialButton component
 * Specialized button for social auth with left-aligned icons
 */
export interface SocialButtonProps {
  /**
   * Button content (text)
   */
  children?: ReactNode;

  /**
   * Visual variant of the button
   * @default 'tertiary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon to display on the left (always left-aligned)
   */
  icon: ReactNode;

  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Callback when button is pressed
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Additional custom styles
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test ID for testing
   */
  testID?: string;
}
