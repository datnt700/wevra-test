/**
 * Social Auth Buttons Component with OAuth Implementation
 * Supports Google, Apple (iOS only), and Facebook authentication
 */
import React from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from 'expo-router';
import { Button, spacing } from '@tavia/taviax';
import { setItemAsync } from '@/utils/secureStorage';
import i18n from '@/i18n';

WebBrowser.maybeCompleteAuthSession();

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface SocialAuthButtonsProps {
  isLoading?: boolean;
  mode?: 'login' | 'signup';
}

export const SocialAuthButtons = ({
  isLoading = false,
  mode = 'login',
}: SocialAuthButtonsProps) => {
  const router = useRouter();
  const actionText =
    mode === 'login' ? i18n.t('auth.social.continueWith') : i18n.t('auth.social.signupWith');

  // Official brand colors
  const BRAND_COLORS = {
    google: '#DB4437',
    apple: '#000000',
    facebook: '#1877F2',
  };

  // Google OAuth configuration
  const [googleRequest, googleResponse, googlePromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'tavia',
        path: 'auth/callback',
      }),
      scopes: ['profile', 'email'],
      responseType: AuthSession.ResponseType.Code,
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    }
  );

  // Facebook OAuth configuration
  const facebookRedirectUri = AuthSession.makeRedirectUri({
    scheme: 'tavia',
    path: 'auth/callback',
  });

  // Debug: Log redirect URI (CRITICAL for Facebook OAuth setup)
  React.useEffect(() => {
    if (facebookRedirectUri) {
      console.log('='.repeat(60));
      console.log('🔵 FACEBOOK REDIRECT URI (Add this to Facebook App Dashboard):');
      console.log(facebookRedirectUri);
      console.log('='.repeat(60));
      console.log('Steps to fix:');
      console.log('1. Go to https://developers.facebook.com/apps/');
      console.log(`2. Select your app (ID: ${process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID})`);
      console.log('3. Go to "Facebook Login" -> "Settings"');
      console.log('4. Add the above URI to "Valid OAuth Redirect URIs"');
      console.log('5. Save changes and try again');
      console.log('='.repeat(60));
    }
  }, [facebookRedirectUri]);

  const [facebookRequest, facebookResponse, facebookPromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID || '',
      redirectUri: facebookRedirectUri,
      scopes: ['public_profile', 'email'],
      responseType: AuthSession.ResponseType.Code,
    },
    {
      authorizationEndpoint: 'https://www.facebook.com/v12.0/dialog/oauth',
    }
  );

  // Handle Google OAuth response
  React.useEffect(() => {
    if (googleResponse?.type === 'success' && 'code' in googleResponse.params) {
      handleOAuthCallback('google', googleResponse.params.code);
    }
  }, [googleResponse]);

  // Handle Facebook OAuth response
  React.useEffect(() => {
    if (facebookResponse?.type === 'success') {
      if ('code' in facebookResponse.params) {
        handleOAuthCallback('facebook', facebookResponse.params.code);
      } else if ('error' in facebookResponse.params) {
        console.error('Facebook OAuth error:', facebookResponse.params);
        Alert.alert(
          i18n.t('auth.errors.authFailed'),
          facebookResponse.params.error_description || i18n.t('auth.errors.tryAgain')
        );
      }
    } else if (facebookResponse?.type === 'error') {
      console.error('Facebook OAuth error:', facebookResponse.error);
      Alert.alert(i18n.t('auth.errors.error'), i18n.t('auth.errors.authComplete'));
    }
  }, [facebookResponse]);

  // Exchange OAuth code for JWT token
  const handleOAuthCallback = async (provider: string, code: string) => {
    console.log(`Processing ${provider} OAuth callback with code:`, code.substring(0, 10) + '...');

    try {
      const response = await fetch(`${API_URL}/api/mobile/auth/oauth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, code }),
      });

      const data = await response.json();
      console.log(`${provider} OAuth response:`, {
        success: data.success,
        hasToken: !!data.data?.token,
      });

      if (response.ok && data.success && data.data?.token) {
        await setItemAsync('authToken', data.data.token);
        console.log('Token saved, navigating to tabs...');

        // Use router.push with replace to ensure navigation happens
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 100);
      } else {
        console.error(`${provider} OAuth failed:`, data);
        Alert.alert(
          i18n.t('auth.errors.authFailed'),
          data.error?.message || i18n.t('auth.errors.tryAgain')
        );
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      Alert.alert(i18n.t('auth.errors.error'), i18n.t('auth.errors.authComplete'));
    }
  };

  // Handle Apple Sign In (iOS only)
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Send Apple credential to backend
      const response = await fetch(`${API_URL}/api/mobile/auth/apple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identityToken: credential.identityToken,
          authorizationCode: credential.authorizationCode,
          user: credential.user,
          fullName: credential.fullName,
          email: credential.email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await setItemAsync('authToken', data.data.token);
        router.replace('/(tabs)');
      } else {
        Alert.alert(
          i18n.t('auth.errors.authFailed'),
          data.error?.message || i18n.t('auth.errors.tryAgain')
        );
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_CANCELED') {
        return; // User canceled
      }
      console.error('Apple Sign In error:', error);
      Alert.alert(i18n.t('auth.errors.error'), i18n.t('auth.errors.appleSignIn'));
    }
  };

  const handleGooglePress = () => {
    if (!process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID) {
      Alert.alert(i18n.t('auth.social.comingSoon'), i18n.t('auth.social.googleComingSoon'));
      return;
    }
    googlePromptAsync();
  };

  const handleApplePress = () => {
    if (Platform.OS !== 'ios') {
      Alert.alert(i18n.t('auth.errors.notAvailable'), i18n.t('auth.errors.appleIOSOnly'));
      return;
    }
    handleAppleSignIn();
  };

  const handleFacebookPress = () => {
    if (!process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID) {
      Alert.alert(i18n.t('auth.social.comingSoon'), i18n.t('auth.social.facebookComingSoon'));
      return;
    }
    facebookPromptAsync();
  };

  return (
    <View style={styles.container}>
      <Button
        variant="tertiary"
        onPress={handleGooglePress}
        disabled={isLoading || !googleRequest}
        icon={<Ionicons name="logo-google" size={20} color={BRAND_COLORS.google} />}
      >
        {`${actionText} ${i18n.t('auth.social.google')}`}
      </Button>

      {Platform.OS === 'ios' && (
        <Button
          variant="tertiary"
          onPress={handleApplePress}
          disabled={isLoading}
          icon={<Ionicons name="logo-apple" size={20} color={BRAND_COLORS.apple} />}
        >
          {`${actionText} ${i18n.t('auth.social.apple')}`}
        </Button>
      )}

      <Button
        variant="tertiary"
        onPress={handleFacebookPress}
        disabled={isLoading || !facebookRequest}
        icon={<Ionicons name="logo-facebook" size={20} color={BRAND_COLORS.facebook} />}
      >
        {`${actionText} ${i18n.t('auth.social.facebook')}`}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
});
