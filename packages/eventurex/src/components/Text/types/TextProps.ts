/**
 * Text Props
 */

import type { TextProps as RNTextProps, TextStyle } from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'white'
  | 'black';

export interface EventureTextProps extends Omit<RNTextProps, 'style'> {
  /**
   * Typography variant
   * @default 'body'
   */
  variant?: TextVariant;

  /**
   * Text color
   * @default 'primary'
   */
  color?: TextColor;

  /**
   * Font weight
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Custom style
   */
  style?: TextStyle;
}
