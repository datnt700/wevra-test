/**
 * Profile Screen for Tavia Mobile
 * Shows user profile with list of actions including logout
 */
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStorage from '@/utils/secureStorage';
import { getInitials } from '@/utils/helpers';
import { colors, spacing } from '@/theme';
import i18n from '@/i18n';

interface MenuItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: 'default' | 'danger';
}

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string }>();

  useEffect(() => {
    // Load user data from storage
    const loadUser = async () => {
      try {
        const userData = await SecureStorage.getItemAsync('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUser();
  }, []);

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

            // Navigate to login
            router.replace('/(auth)/login');
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      id: 'edit-profile',
      label: i18n.t('profile.editProfile'),
      icon: 'person-outline',
      onPress: () => {
        router.push('/profile/edit');
      },
    },
    {
      id: 'settings',
      label: i18n.t('profile.settings'),
      icon: 'settings-outline',
      onPress: () => {
        Alert.alert('Coming Soon', 'Settings will be available soon.');
      },
    },
    {
      id: 'help',
      label: i18n.t('profile.help'),
      icon: 'help-circle-outline',
      onPress: () => {
        Alert.alert('Coming Soon', 'Help center will be available soon.');
      },
    },
    {
      id: 'about',
      label: i18n.t('profile.about'),
      icon: 'information-circle-outline',
      onPress: () => {
        Alert.alert('Tavia', 'Version 0.1.0\n© 2025 Tavia. All rights reserved.');
      },
    },
    {
      id: 'logout',
      label: i18n.t('profile.logout'),
      icon: 'log-out-outline',
      onPress: handleLogout,
      variant: 'danger',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Info Section */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === 0 && styles.menuItemFirst,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.variant === 'danger' ? colors.colorDanger : colors.text}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    item.variant === 'danger' && styles.menuItemTextDanger,
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={item.variant === 'danger' ? colors.colorDanger : colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={styles.version}>Version 0.1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuSection: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  menuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  menuItemTextDanger: {
    color: colors.colorDanger,
  },
  version: {
    textAlign: 'center',
    marginTop: spacing.xl,
    fontSize: 12,
    color: colors.textTertiary,
  },
});
