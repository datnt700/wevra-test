'use client';

import { useTranslations } from 'next-intl';
import {
  Users,
  Calendar,
  UserPlus,
  TrendingUp,
  Plus,
  ArrowRight,
  Crown,
  MapPin,
  Clock,
} from 'lucide-react';
import { Card, Button, Badge, useTheme } from '@tavia/taviad';
import { UserRole, SubscriptionStatus } from '@tavia/database/enums';
import { ROUTES } from '@/lib/constants';
import { Styled } from './DashboardClient.styles';
import type { DashboardData } from '../types';

interface DashboardClientProps {
  data: DashboardData;
}

export function DashboardClient({ data }: DashboardClientProps) {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  useTheme();

  const { stats, recentGroups, recentEvents, user } = data;

  const isPremium = user.subscriptionStatus === SubscriptionStatus.PREMIUM;
  const isAdmin = user.role === UserRole.ADMIN;

  return (
    <Styled.Container>
      {/* Header */}
      <Styled.Header>
        <Styled.HeaderContent>
          <Styled.Title>
            {t('welcome')}, {user.name}! 👋
          </Styled.Title>
          <Styled.Subtitle>
            {isPremium ? (
              <Badge variant="success" size="sm">
                <Crown size={14} />
                {t('premiumAccount')}
              </Badge>
            ) : (
              <Badge variant="warning" size="sm">
                {t('freePlan')}
              </Badge>
            )}
          </Styled.Subtitle>
        </Styled.HeaderContent>
        <Styled.Actions>
          <Button
            variant="primary"
            shape="rounded"
            onClick={() => (window.location.href = ROUTES.GROUP.NEW)}
            icon={<Plus size={18} />}
          >
            {t('createGroup')}
          </Button>
          <Button
            variant="secondary"
            shape="rounded"
            onClick={() => (window.location.href = ROUTES.EVENT.NEW)}
            icon={<Calendar size={18} />}
          >
            {t('createEvent')}
          </Button>
        </Styled.Actions>
      </Styled.Header>

      {/* Stats Cards */}
      <Styled.StatsGrid>
        <Card>
          <Styled.StatCard>
            <Styled.StatIcon $color="#e21822">
              <Users size={24} />
            </Styled.StatIcon>
            <Styled.StatContent>
              <Styled.StatValue>{stats.groups}</Styled.StatValue>
              <Styled.StatLabel>{t('totalGroups')}</Styled.StatLabel>
            </Styled.StatContent>
          </Styled.StatCard>
        </Card>

        <Card>
          <Styled.StatCard>
            <Styled.StatIcon $color="#ffc107">
              <Calendar size={24} />
            </Styled.StatIcon>
            <Styled.StatContent>
              <Styled.StatValue>{stats.events}</Styled.StatValue>
              <Styled.StatLabel>{t('totalEvents')}</Styled.StatLabel>
            </Styled.StatContent>
          </Styled.StatCard>
        </Card>

        <Card>
          <Styled.StatCard>
            <Styled.StatIcon $color="#28a745">
              <UserPlus size={24} />
            </Styled.StatIcon>
            <Styled.StatContent>
              <Styled.StatValue>{stats.members}</Styled.StatValue>
              <Styled.StatLabel>{t('totalMembers')}</Styled.StatLabel>
            </Styled.StatContent>
          </Styled.StatCard>
        </Card>

        {isAdmin && (
          <Card>
            <Styled.StatCard>
              <Styled.StatIcon $color="#17a2b8">
                <TrendingUp size={24} />
              </Styled.StatIcon>
              <Styled.StatContent>
                <Styled.StatValue>
                  {((stats.members / Math.max(stats.groups, 1)) * 1).toFixed(1)}
                </Styled.StatValue>
                <Styled.StatLabel>{t('avgMembersPerGroup')}</Styled.StatLabel>
              </Styled.StatContent>
            </Styled.StatCard>
          </Card>
        )}
      </Styled.StatsGrid>

      {/* Quick Actions */}
      <Styled.Section>
        <Styled.SectionTitle>{t('quickActions')}</Styled.SectionTitle>
        <Styled.QuickActionsGrid>
          <Card>
            <Styled.QuickAction onClick={() => (window.location.href = ROUTES.GROUP.LIST)}>
              <Users size={32} color="#e21822" />
              <Styled.QuickActionTitle>{t('manageGroups')}</Styled.QuickActionTitle>
              <Styled.QuickActionDesc>{t('viewAndManageAllGroups')}</Styled.QuickActionDesc>
            </Styled.QuickAction>
          </Card>

          <Card>
            <Styled.QuickAction onClick={() => (window.location.href = ROUTES.EVENT.LIST)}>
              <Calendar size={32} color="#ffc107" />
              <Styled.QuickActionTitle>{t('manageEvents')}</Styled.QuickActionTitle>
              <Styled.QuickActionDesc>{t('viewAndManageAllEvents')}</Styled.QuickActionDesc>
            </Styled.QuickAction>
          </Card>

          <Card>
            <Styled.QuickAction onClick={() => (window.location.href = ROUTES.SETTINGS.HOME)}>
              <Users size={32} color="#28a745" />
              <Styled.QuickActionTitle>{t('settings')}</Styled.QuickActionTitle>
              <Styled.QuickActionDesc>{t('configureAccount')}</Styled.QuickActionDesc>
            </Styled.QuickAction>
          </Card>

          <Card>
            <Styled.QuickAction onClick={() => (window.location.href = '/api/docs/swagger')}>
              <TrendingUp size={32} color="#17a2b8" />
              <Styled.QuickActionTitle>{t('apiDocs')}</Styled.QuickActionTitle>
              <Styled.QuickActionDesc>{t('viewApiDocumentation')}</Styled.QuickActionDesc>
            </Styled.QuickAction>
          </Card>
        </Styled.QuickActionsGrid>
      </Styled.Section>

      {/* Recent Activity */}
      <Styled.ActivityGrid>
        {/* Recent Groups */}
        <Styled.Section>
          <Styled.SectionHeader>
            <Styled.SectionTitle>{t('recentGroups')}</Styled.SectionTitle>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => (window.location.href = ROUTES.GROUP.LIST)}
              icon={<ArrowRight size={16} />}
            >
              {tCommon('viewAll')}
            </Button>
          </Styled.SectionHeader>

          {recentGroups.length === 0 ? (
            <Card>
              <Styled.EmptyState>
                <Users size={48} color="#ccc" />
                <p>{t('noGroupsYet')}</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => (window.location.href = ROUTES.GROUP.NEW)}
                >
                  {t('createFirstGroup')}
                </Button>
              </Styled.EmptyState>
            </Card>
          ) : (
            <Styled.List>
              {recentGroups.map((group) => (
                <Card key={group.id}>
                  <Styled.ListItem
                    onClick={() => (window.location.href = ROUTES.GROUP.DETAIL(group.id))}
                  >
                    <Styled.ListItemContent>
                      <Styled.ListItemTitle>
                        {group.name}
                        {group.isPremium && <Crown size={14} color="#ffc107" />}
                      </Styled.ListItemTitle>
                      <Styled.ListItemMeta>
                        <span>
                          <Users size={14} />
                          {group.memberCount} {tCommon('members')}
                        </span>
                        {group.category && (
                          <Badge variant="info" size="sm">
                            {group.category}
                          </Badge>
                        )}
                      </Styled.ListItemMeta>
                    </Styled.ListItemContent>
                    <ArrowRight size={20} color="#666" />
                  </Styled.ListItem>
                </Card>
              ))}
            </Styled.List>
          )}
        </Styled.Section>

        {/* Recent Events */}
        <Styled.Section>
          <Styled.SectionHeader>
            <Styled.SectionTitle>{t('recentEvents')}</Styled.SectionTitle>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => (window.location.href = ROUTES.EVENT.LIST)}
              icon={<ArrowRight size={16} />}
            >
              {tCommon('viewAll')}
            </Button>
          </Styled.SectionHeader>

          {recentEvents.length === 0 ? (
            <Card>
              <Styled.EmptyState>
                <Calendar size={48} color="#ccc" />
                <p>{t('noEventsYet')}</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => (window.location.href = ROUTES.EVENT.NEW)}
                >
                  {t('createFirstEvent')}
                </Button>
              </Styled.EmptyState>
            </Card>
          ) : (
            <Styled.List>
              {recentEvents.map((event) => (
                <Card key={event.id}>
                  <Styled.ListItem
                    onClick={() => (window.location.href = ROUTES.EVENT.DETAIL(event.id))}
                  >
                    <Styled.ListItemContent>
                      <Styled.ListItemTitle>{event.title}</Styled.ListItemTitle>
                      <Styled.ListItemMeta>
                        <span>
                          <Clock size={14} />
                          {new Date(event.startDate).toLocaleDateString()}
                        </span>
                        {event.location && (
                          <span>
                            <MapPin size={14} />
                            {event.location}
                          </span>
                        )}
                        <span>
                          <Users size={14} />
                          {event.attendeeCount} {tCommon('attendees')}
                        </span>
                        {event.isFree ? (
                          <Badge variant="success" size="sm">
                            {tCommon('free')}
                          </Badge>
                        ) : (
                          <Badge variant="info" size="sm">
                            {event.currency || '$'}
                            {event.price}
                          </Badge>
                        )}
                      </Styled.ListItemMeta>
                      <Styled.ListItemDesc>{event.group.name}</Styled.ListItemDesc>
                    </Styled.ListItemContent>
                    <ArrowRight size={20} color="#666" />
                  </Styled.ListItem>
                </Card>
              ))}
            </Styled.List>
          )}
        </Styled.Section>
      </Styled.ActivityGrid>

      {/* Upgrade CTA for Free Users */}
      {!isPremium && (
        <Card>
          <Styled.UpgradeCTA>
            <Styled.UpgradeContent>
              <Crown size={48} color="#ffc107" />
              <div>
                <Styled.UpgradeTitle>{t('upgradeToPremium')}</Styled.UpgradeTitle>
                <Styled.UpgradeDesc>{t('unlockAllFeatures')}</Styled.UpgradeDesc>
              </div>
            </Styled.UpgradeContent>
            <Button
              variant="primary"
              shape="rounded"
              onClick={() => (window.location.href = ROUTES.BILLING.PLANS)}
            >
              {t('viewPlans')}
            </Button>
          </Styled.UpgradeCTA>
        </Card>
      )}
    </Styled.Container>
  );
}
