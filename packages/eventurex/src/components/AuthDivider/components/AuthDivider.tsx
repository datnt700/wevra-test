/**
 * Auth Divider Component
 * Horizontal divider with text for auth screens
 */
import { View, Text } from 'react-native';
import { Styled } from './AuthDivider.styles';

export interface AuthDividerProps {
  /**
   * Text to display in the center of the divider
   * @default "OR"
   */
  text?: string;
}

export const AuthDivider = ({ text = 'OR' }: AuthDividerProps) => {
  return (
    <View style={Styled.container}>
      <View style={Styled.line} />
      <Text style={Styled.text}>{text}</Text>
      <View style={Styled.line} />
    </View>
  );
};

AuthDivider.displayName = 'AuthDivider';
