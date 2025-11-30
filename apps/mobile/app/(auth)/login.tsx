/**
 * Login Screen for Eventure Mobile
 * Attendee authentication with eventurex components
 */
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStorage from '@/utils/secureStorage';
import { Button, TextInput } from '@eventure/eventurex';
import { AuthContainer, SocialAuthButtons, AuthDivider } from '@/components/auth';
import { colors, spacing } from '@/theme';
import i18n from '@/i18n';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.required'));
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.emailInvalid'));
      return;
    }

    if (password.length < 6) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.passwordMin'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/mobile/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // Handle error response format: { success: false, error: { message, code, details } }
        const errorMessage = result.error?.message || 'Invalid credentials';
        throw new Error(errorMessage);
      }

      // Handle success response format: { success: true, data: { message, token, user } }
      const { token, user } = result.data;

      // Store JWT token in secure storage (native) or AsyncStorage (web)
      await SecureStorage.setItemAsync('userToken', token);
      await SecureStorage.setItemAsync('userData', JSON.stringify(user));

      // Navigate to tabs (home screen)
      router.replace('/(tabs)');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : i18n.t('auth.errors.loginFailedMessage');
      Alert.alert(i18n.t('auth.errors.loginFailed'), errorMessage);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer title={i18n.t('auth.login.title')} subtitle={i18n.t('auth.login.description')}>
      <SocialAuthButtons isLoading={isLoading} mode="login" />

      <AuthDivider />

      {/* Email Field */}
      <TextInput
        label={i18n.t('auth.login.email')}
        placeholder={i18n.t('auth.login.emailPlaceholder')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        editable={!isLoading}
        containerStyle={styles.field}
      />

      {/* Password Field */}
      <TextInput
        label={i18n.t('auth.login.password')}
        placeholder={i18n.t('auth.login.passwordPlaceholder')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        hasPasswordToggle
        autoCapitalize="none"
        autoComplete="password"
        editable={!isLoading}
        containerStyle={styles.field}
      />

      {/* Forgot Password */}
      <View style={styles.forgotRow}>
        <TouchableOpacity disabled={isLoading}>
          <Text style={styles.forgotText}>{i18n.t('auth.login.forgotPassword')}</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <Button
        variant="primary"
        size="lg"
        onPress={handleLogin}
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        icon={<Ionicons name="log-in-outline" size={20} color="white" />}
      >
        {i18n.t('auth.login.submit')}
      </Button>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{i18n.t('auth.login.noAccount')} </Text>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity disabled={isLoading}>
            <Text style={styles.footerLink}>{i18n.t('auth.login.signupLink')}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.md,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  submitButton: {
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
