/**
 * Social Auth Buttons Component
 * Reusable OAuth buttons for Google, Apple, Facebook
 */
import { View, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SocialButton, spacing } from '@tavia/taviax';
import i18n from '@/i18n';

interface SocialAuthButtonsProps {
  isLoading?: boolean;
  mode?: 'login' | 'signup';
}

export const SocialAuthButtons = ({
  isLoading = false,
  mode = 'login',
}: SocialAuthButtonsProps) => {
  const handleSocialAuth = (provider: string) => {
    const message = i18n.t('auth.social.comingSoonMessage', {
      provider,
      mode: mode === 'login' ? i18n.t('auth.login.title') : i18n.t('auth.signup.title'),
    });
    Alert.alert(i18n.t('auth.social.comingSoon'), message);
  };

  const actionText =
    mode === 'login' ? i18n.t('auth.social.continueWith') : i18n.t('auth.social.signupWith');

  // Official brand colors for social providers
  const BRAND_COLORS = {
    google: '#DB4437', // Google Red
    apple: '#000000', // Apple Black
    facebook: '#1877F2', // Facebook Blue
  };

  return (
    <View style={styles.container}>
      <SocialButton
        variant="tertiary"
        onPress={() => handleSocialAuth('Google')}
        disabled={isLoading}
        icon={<Ionicons name="logo-google" size={20} color={BRAND_COLORS.google} />}
      >
        {`${actionText} ${i18n.t('auth.social.google')}`}
      </SocialButton>

      <SocialButton
        variant="tertiary"
        onPress={() => handleSocialAuth('Apple')}
        disabled={isLoading}
        icon={<Ionicons name="logo-apple" size={20} color={BRAND_COLORS.apple} />}
      >
        {`${actionText} ${i18n.t('auth.social.apple')}`}
      </SocialButton>

      <SocialButton
        variant="tertiary"
        onPress={() => handleSocialAuth('Facebook')}
        disabled={isLoading}
        icon={<Ionicons name="logo-facebook" size={20} color={BRAND_COLORS.facebook} />}
      >
        {`${actionText} ${i18n.t('auth.social.facebook')}`}
      </SocialButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
});
