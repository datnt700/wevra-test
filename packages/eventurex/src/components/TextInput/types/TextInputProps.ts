/**
 * TextInput Props
 */

import type { TextInputProps as RNTextInputProps, TextStyle } from 'react-native';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /**
   * Error message to display
   */
  error?: string;

  /**
   * Label text
   */
  label?: string;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Show password visibility toggle for secureTextEntry fields
   */
  hasPasswordToggle?: boolean;

  /**
   * Custom style for the input
   */
  style?: TextStyle;

  /**
   * Custom style for the container
   */
  containerStyle?: TextStyle;

  /**
   * Custom style for the label
   */
  labelStyle?: TextStyle;

  /**
   * Custom style for the error text
   */
  errorStyle?: TextStyle;
}
