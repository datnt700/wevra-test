import React, { useState } from 'react';
import { TextInput as RNTextInput, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { TextInputProps } from '../types';
import { Styled } from './TextInput.styles';

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (
    {
      error,
      label,
      required,
      hasPasswordToggle,
      secureTextEntry,
      style,
      containerStyle,
      labelStyle,
      errorStyle,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = secureTextEntry || hasPasswordToggle;
    const shouldShowToggle = isPasswordField && hasPasswordToggle;

    return (
      <Styled.Container style={containerStyle as ViewStyle}>
        {label && (
          <Styled.Label style={labelStyle}>
            {label}
            {required && <Styled.LabelRequired> *</Styled.LabelRequired>}
          </Styled.Label>
        )}
        <Styled.InputContainer>
          <Styled.Input
            ref={ref}
            $hasError={!!error}
            $isFocused={isFocused}
            $hasIcon={shouldShowToggle}
            style={style}
            onFocus={(e) => {
              setIsFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              rest.onBlur?.(e);
            }}
            placeholderTextColor="#a3a3a3"
            secureTextEntry={isPasswordField && !showPassword}
            {...rest}
          />
          {shouldShowToggle && (
            <Styled.IconButton onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#a3a3a3"
              />
            </Styled.IconButton>
          )}
        </Styled.InputContainer>
        {error && <Styled.ErrorText style={errorStyle}>{error}</Styled.ErrorText>}
      </Styled.Container>
    );
  }
);

TextInput.displayName = 'TextInput';
