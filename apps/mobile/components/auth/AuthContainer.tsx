/**
 * Auth Container Component
 * Reusable wrapper for authentication screens
 */
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

interface AuthContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthContainer = ({ children, title, subtitle }: AuthContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Card */}
        <View style={styles.card}>{children}</View>

        {/* Copyright */}
        <Text style={styles.copyright}>
          © {new Date().getFullYear()} Tavia. All rights reserved.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  copyright: {
    textAlign: 'center',
    marginTop: spacing.lg,
    fontSize: 12,
    color: colors.textTertiary,
  },
});
