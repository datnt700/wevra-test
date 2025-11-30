'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@eventure/eventured';
import { MembersList } from './MembersList';
import { Styled } from './MembersPageClient.styles';
import type { GroupMemberWithUser } from '@eventure/database';

interface MembersPageClientProps {
  groupId: string;
  groupName: string;
  activeMembers: GroupMemberWithUser[];
  pendingMembers: GroupMemberWithUser[];
  maxMembers: number;
}

export function MembersPageClient({
  groupId,
  groupName,
  activeMembers,
  pendingMembers,
  maxMembers,
}: MembersPageClientProps) {
  const t = useTranslations('groups');

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>{t('members.title')}</Styled.Title>
        <Styled.GroupName>{groupName}</Styled.GroupName>
        <Styled.Stats>
          <Styled.StatText>
            {maxMembers === Infinity
              ? t('members.memberCountUnlimited', { count: activeMembers.length })
              : t('members.memberCount', { count: activeMembers.length, max: maxMembers })}
          </Styled.StatText>
          {pendingMembers.length > 0 && (
            <Badge variant="warning">
              {pendingMembers.length} {t('members.pendingRequests').toLowerCase()}
            </Badge>
          )}
        </Styled.Stats>
      </Styled.Header>

      <MembersList
        groupId={groupId}
        activeMembers={activeMembers}
        pendingMembers={pendingMembers}
        maxMembers={maxMembers}
      />
    </Styled.Container>
  );
}
