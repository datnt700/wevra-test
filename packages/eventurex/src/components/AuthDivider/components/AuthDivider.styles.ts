/**
 * AuthDivider component styles
 */
import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

export const Styled = StyleSheet.create({
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
    fontWeight: '500',
  },
});
