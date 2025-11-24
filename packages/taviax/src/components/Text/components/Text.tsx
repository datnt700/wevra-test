import React from 'react';
import { Text as RNText } from 'react-native';
import type { TaviaTextProps } from '../types';
import {
  styles,
  getVariantStyles,
  getColorStyles,
  getWeightStyles,
  getAlignStyles,
} from './Text.styles';

export const Text: React.FC<TaviaTextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  style,
  children,
  ...rest
}) => {
  return (
    <RNText
      style={[
        styles.text,
        getVariantStyles(variant),
        getColorStyles(color),
        getWeightStyles(weight),
        getAlignStyles(align),
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

Text.displayName = 'Text';
