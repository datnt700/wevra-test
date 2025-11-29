/**
 * Auth Divider Component
 * Horizontal divider with text for auth screens
 */
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@tavia/taviax';
import i18n from '@/i18n';

interface AuthDividerProps {
  text?: string;
}

export const AuthDivider = ({ text }: AuthDividerProps) => {
  const dividerText = text || i18n.t('auth.divider.or');

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{dividerText}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray300,
  },
  text: {
    marginHorizontal: spacing.md,
    fontSize: 14,
    color: colors.gray600,
  },
});
