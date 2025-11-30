/**
 * Signup Screen for Eventure Mobile
 * Attendee registration with eventurex components
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

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.required'));
      return;
    }

    if (name.length < 2) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.nameTooShort'));
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.emailInvalid'));
      return;
    }

    if (password.length < 8) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.passwordMin'));
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.passwordStrength'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(i18n.t('auth.errors.generic'), i18n.t('auth.validation.passwordMismatch'));
      return;
    }

    setIsLoading(true);

    try {
      // Register new user
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/mobile/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // Handle error response format: { success: false, error: { message, code, details } }
        const errorMessage = result.error?.message || 'Registration failed';
        // Show validation details if available
        const errorDetails = result.error?.details
          ? '\n' +
            result.error.details
              .map((d: { field?: string; message: string }) => `${d.field}: ${d.message}`)
              .join('\n')
          : '';
        throw new Error(errorMessage + errorDetails);
      }

      // Handle success response format: { success: true, data: { message, token, user } }
      const { token, user } = result.data;

      // Store JWT token in secure storage (native) or AsyncStorage (web)
      await SecureStorage.setItemAsync('userToken', token);
      await SecureStorage.setItemAsync('userData', JSON.stringify(user));

      // Navigate to tabs immediately after successful registration
      router.replace('/(tabs)');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : i18n.t('auth.errors.signupFailedMessage');
      Alert.alert(i18n.t('auth.errors.signupFailed'), message);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer title={i18n.t('auth.signup.title')} subtitle={i18n.t('auth.signup.description')}>
      <SocialAuthButtons isLoading={isLoading} mode="signup" />

      <AuthDivider />

      {/* Name Field */}
      <TextInput
        label={i18n.t('auth.signup.name')}
        placeholder={i18n.t('auth.signup.namePlaceholder')}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        editable={!isLoading}
        containerStyle={styles.field}
      />

      {/* Email Field */}
      <TextInput
        label={i18n.t('auth.signup.email')}
        placeholder={i18n.t('auth.signup.emailPlaceholder')}
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
        label={i18n.t('auth.signup.password')}
        placeholder={i18n.t('auth.signup.passwordPlaceholder')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        hasPasswordToggle
        autoCapitalize="none"
        autoComplete="password-new"
        editable={!isLoading}
        containerStyle={styles.field}
      />

      {/* Confirm Password Field */}
      <TextInput
        label={i18n.t('auth.signup.confirmPassword')}
        placeholder={i18n.t('auth.signup.confirmPasswordPlaceholder')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        hasPasswordToggle
        autoCapitalize="none"
        autoComplete="password-new"
        editable={!isLoading}
        containerStyle={styles.field}
      />

      {/* Submit Button */}
      <Button
        variant="primary"
        size="lg"
        onPress={handleSignup}
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        icon={<Ionicons name="person-add-outline" size={20} color="white" />}
      >
        {i18n.t('auth.signup.submit')}
      </Button>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{i18n.t('auth.signup.hasAccount')} </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity disabled={isLoading}>
            <Text style={styles.footerLink}>{i18n.t('auth.signup.loginLink')}</Text>
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
  submitButton: {
    marginTop: spacing.xs,
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
