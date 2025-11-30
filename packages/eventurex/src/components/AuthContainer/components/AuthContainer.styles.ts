/**
 * AuthContainer component styles
 */
import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

export const Styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
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
    color: colors.gray900,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray600,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.gray0,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.gray1000,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  copyright: {
    textAlign: 'center',
    marginTop: spacing.lg,
    fontSize: 12,
    color: colors.gray400,
  },
});
