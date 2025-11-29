/**
 * Auth Container Component
 * Reusable wrapper for authentication screens
 */
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Styled } from './AuthContainer.styles';

export interface AuthContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthContainer = ({ children, title, subtitle }: AuthContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={Styled.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={Styled.scrollContent}>
        {/* Header */}
        <View style={Styled.header}>
          {title && <Text style={Styled.title}>{title}</Text>}
          {subtitle && <Text style={Styled.subtitle}>{subtitle}</Text>}
        </View>

        {/* Card */}
        <View style={Styled.card}>{children}</View>

        {/* Copyright */}
        <Text style={Styled.copyright}>
          © {new Date().getFullYear()} Tavia. All rights reserved.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthContainer.displayName = 'AuthContainer';
