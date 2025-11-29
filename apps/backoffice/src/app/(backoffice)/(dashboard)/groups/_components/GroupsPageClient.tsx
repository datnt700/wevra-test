'use client';

import { useTranslations } from 'next-intl';
import { Plus, Users, Calendar, MapPin, Crown } from 'lucide-react';
import { Button, Card, Badge } from '@tavia/taviad';
import { ROUTES } from '@/lib/constants';
import { Styled } from './GroupsPageClient.styles';
import type { GroupWithCounts } from '@tavia/database';

interface GroupsPageClientProps {
  groups: GroupWithCounts[];
}

export function GroupsPageClient({ groups }: GroupsPageClientProps) {
  const t = useTranslations('groups');

  return (
    <Styled.Container>
      {/* Header */}
      <Styled.Header>
        <Styled.HeaderContent>
          <Styled.Title>{t('listTitle')}</Styled.Title>
          <Styled.Subtitle>{t('listSubtitle')}</Styled.Subtitle>
        </Styled.HeaderContent>
        <Button
          variant="primary"
          shape="rounded"
          onClick={() => (window.location.href = ROUTES.GROUP.NEW)}
          icon={<Plus size={18} />}
        >
          {t('createButton')}
        </Button>
      </Styled.Header>

      {/* Empty State */}
      {groups.length === 0 ? (
        <Card>
          <Styled.EmptyState>
            <Users size={64} color="#ccc" />
            <Styled.EmptyTitle>{t('noGroups')}</Styled.EmptyTitle>
            <Styled.EmptyDesc>{t('noGroupsDesc')}</Styled.EmptyDesc>
            <Button
              variant="primary"
              onClick={() => (window.location.href = ROUTES.GROUP.NEW)}
              icon={<Plus size={18} />}
            >
              {t('createNewButton')}
            </Button>
          </Styled.EmptyState>
        </Card>
      ) : (
        <Styled.GroupsGrid>
          {groups.map((group) => (
            <Styled.GroupCard
              key={group.id}
              onClick={() => (window.location.href = ROUTES.GROUP.DETAIL(group.id))}
            >
              {group.image ? (
                <Styled.GroupImage src={group.image} alt={group.name} />
              ) : (
                <Styled.HeroPlaceholder />
              )}
              <Styled.GroupContent>
                <Styled.GroupHeader>
                  <Styled.GroupName>{group.name}</Styled.GroupName>
                  {group.isPremium && (
                    <Badge variant="success" size="sm">
                      <Crown size={12} />
                      {t('detail.premium')}
                    </Badge>
                  )}
                </Styled.GroupHeader>

                {group.description && <Styled.GroupDesc>{group.description}</Styled.GroupDesc>}

                <Styled.GroupStats>
                  <Styled.GroupStat>
                    <Users size={14} />
                    {group._count.members} {t('detail.members').toLowerCase()}
                  </Styled.GroupStat>
                  <Styled.GroupStat>
                    <Calendar size={14} />
                    {group._count.events} {t('detail.totalEvents').toLowerCase()}
                  </Styled.GroupStat>
                </Styled.GroupStats>

                {group.location && (
                  <Styled.GroupLocation>
                    <MapPin size={14} />
                    {group.location}
                  </Styled.GroupLocation>
                )}
              </Styled.GroupContent>
            </Styled.GroupCard>
          ))}
        </Styled.GroupsGrid>
      )}
    </Styled.Container>
  );
}
