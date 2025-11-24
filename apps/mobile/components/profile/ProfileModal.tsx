/**
 * Profile Modal Component
 * Shows user profile with logout option
 */
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStorage from '@/utils/secureStorage';
import { getInitials } from '@/utils/helpers';
import { colors, spacing } from '@/theme';
import i18n from '@/i18n';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user?: {
    name?: string;
    email?: string;
  };
}

export const ProfileModal = ({ visible, onClose, user }: ProfileModalProps) => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(i18n.t('profile.logout'), i18n.t('profile.logoutConfirm'), [
      {
        text: i18n.t('profile.cancel'),
        style: 'cancel',
      },
      {
        text: i18n.t('profile.logout'),
        style: 'destructive',
        onPress: async () => {
          try {
            // Clear all stored data
            await SecureStorage.deleteItemAsync('userToken');
            await SecureStorage.deleteItemAsync('userData');

            // Close modal and navigate to login
            onClose();
            router.replace('/(auth)/login');
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{i18n.t('profile.title')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
            </View>
            <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={20} color={colors.colorDanger} />
            <Text style={styles.logoutText}>{i18n.t('profile.logout')}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.colorDanger,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.colorDanger,
  },
});
