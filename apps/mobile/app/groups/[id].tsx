/**
 * Group Detail Screen
 * Display group information with join/leave functionality
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@eventure/eventurex';
import { colors, spacing } from '@eventure/eventurex';
import { fetchGroupDetail, joinGroup, leaveGroup } from '@/utils/groupApi';
import { type GroupDetail, MembershipStatus } from '@eventure/database';
import i18n from '@/i18n';

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGroupDetail();
  }, [id]);

  const loadGroupDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGroupDetail(id);
      setGroup(data.group);
      setMembershipStatus(data.membershipStatus);
      setIsOwner(data.isOwner);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load group');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!group) return;

    setActionLoading(true);
    try {
      const result = await joinGroup(group.id);
      if (result.success) {
        Alert.alert(i18n.t('groups.join.success'), result.message);
        loadGroupDetail(); // Refresh
      } else {
        Alert.alert(i18n.t('groups.join.error'), result.error);
      }
    } catch {
      Alert.alert(i18n.t('groups.join.error'), 'Failed to join group');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!group) return;

    Alert.alert(i18n.t('groups.leave.confirm'), i18n.t('groups.leave.confirmMessage'), [
      { text: i18n.t('common.cancel'), style: 'cancel' },
      {
        text: i18n.t('groups.leave.button'),
        style: 'destructive',
        onPress: async () => {
          setActionLoading(true);
          try {
            const result = await leaveGroup(group.id);
            if (result.success) {
              Alert.alert(i18n.t('groups.leave.success'), result.message);
              loadGroupDetail(); // Refresh
            } else {
              Alert.alert(i18n.t('groups.leave.error'), result.error);
            }
          } catch {
            Alert.alert(i18n.t('groups.leave.error'), 'Failed to leave group');
          } finally {
            setActionLoading(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.mainColor} />
      </View>
    );
  }

  if (error || !group) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Group not found'}</Text>
        <Button onPress={() => router.back()} style={styles.backButton}>
          {i18n.t('common.goBack')}
        </Button>
      </View>
    );
  }

  const isMember = membershipStatus === MembershipStatus.ACTIVE;
  const isPending = membershipStatus === MembershipStatus.PENDING;
  const canJoin = !membershipStatus && !isOwner;

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image with Back Button */}
      {group.image && (
        <View style={styles.coverImageContainer}>
          <Image source={{ uri: group.image }} style={styles.coverImage} resizeMode="cover" />
          {/* Back Button Overlay */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={colors.gray700} />
            <Text style={styles.backButtonText}>{i18n.t('groups.detail.backButton')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{group.name}</Text>
        <View style={styles.badgeGroup}>
          {group.isPremium && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{i18n.t('groups.detail.premium')}</Text>
            </View>
          )}
          {!group.isPublic && (
            <View style={[styles.badge, styles.badgeInfo]}>
              <Text style={styles.badgeText}>{i18n.t('groups.detail.private')}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Meta Info */}
      <View style={styles.metaContainer}>
        <Text style={styles.category}>{group.category}</Text>
        {group.location && <Text style={styles.location}>📍 {group.location}</Text>}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>
          <Text style={styles.statValue}>{group.memberCount}</Text>{' '}
          {i18n.t('groups.detail.members')}
        </Text>
        <Text style={styles.statDivider}>•</Text>
        <Text style={styles.statText}>
          <Text style={styles.statValue}>{group._count.events}</Text>{' '}
          {i18n.t('groups.detail.events')}
        </Text>
      </View>

      {/* Membership Status */}
      {isPending && (
        <View style={styles.pendingContainer}>
          <View style={[styles.badge, styles.badgeWarning]}>
            <Text style={styles.badgeText}>{i18n.t('groups.detail.pendingApproval')}</Text>
          </View>
          <Text style={styles.pendingText}>{i18n.t('groups.detail.pendingMessage')}</Text>
        </View>
      )}

      {/* Actions */}
      {!isOwner && (
        <View style={styles.actionsContainer}>
          {canJoin && (
            <Button
              onPress={handleJoin}
              disabled={actionLoading}
              variant="primary"
              style={styles.actionButton}
            >
              {actionLoading ? i18n.t('groups.join.loading') : i18n.t('groups.join.button')}
            </Button>
          )}
          {isMember && (
            <Button
              onPress={handleLeave}
              disabled={actionLoading}
              variant="danger"
              style={styles.actionButton}
            >
              {actionLoading ? i18n.t('groups.leave.loading') : i18n.t('groups.leave.button')}
            </Button>
          )}
        </View>
      )}

      {/* Description */}
      {group.description && (
        <View style={styles.section}>
          <Text style={styles.description}>{group.description}</Text>
        </View>
      )}

      {/* Organizer */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('groups.detail.organizedBy')}</Text>
        <View style={styles.organizerContainer}>
          <View style={styles.avatar}>
            {group.owner.image ? (
              <Image
                source={{ uri: group.owner.image }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.avatarText}>{group.owner.name?.[0] || 'O'}</Text>
            )}
          </View>
          <View style={styles.organizerDetails}>
            <Text style={styles.organizerName}>{group.owner.name}</Text>
            <Text style={styles.organizerRole}>{i18n.t('groups.detail.owner')}</Text>
          </View>
        </View>
      </View>

      {/* Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('groups.detail.upcomingEvents')}</Text>
        <Text style={styles.emptyText}>{i18n.t('groups.detail.noEvents')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  coverImageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.gray700,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.colorSuccess,
    borderRadius: 16,
  },
  badgeInfo: {
    backgroundColor: colors.mainColor,
  },
  badgeWarning: {
    backgroundColor: colors.colorWarning,
  },
  badgeText: {
    color: colors.light,
    fontSize: 12,
    fontWeight: '600' as const,
  },
  metaContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  category: {
    fontSize: 16,
    color: colors.gray600,
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: 16,
    color: colors.gray600,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  statText: {
    fontSize: 16,
    color: colors.gray700,
  },
  statValue: {
    fontWeight: '600' as const,
  },
  statDivider: {
    color: colors.gray400,
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.gray100,
    borderRadius: 8,
  },
  pendingText: {
    flex: 1,
    fontSize: 14,
    color: colors.gray700,
  },
  actionsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  section: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.dark,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray700,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: colors.dark,
  },
  organizerDetails: {
    flex: 1,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  organizerRole: {
    fontSize: 14,
    color: colors.gray600,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.gray600,
    paddingVertical: spacing.lg,
  },
  errorText: {
    fontSize: 16,
    color: colors.colorDanger,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
