import type { ReactNode } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'link'
  | 'tertiary'
  | 'danger'
  | 'info';
export type ButtonShape = 'default' | 'round' | 'square' | 'pill' | 'circle';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 *
 * Maintains API compatibility with @tavia/core Button where possible,
 * with React Native-specific adaptations.
 */
export interface ButtonProps {
  /**
   * Button content
   */
  children?: ReactNode;

  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Shape of the button
   * @default 'default'
   */
  shape?: ButtonShape;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in a loading state
   * Shows ActivityIndicator and disables interaction
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon to display before the button text
   */
  icon?: ReactNode;

  /**
   * Icon to display after the button text
   */
  iconRight?: ReactNode;

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
