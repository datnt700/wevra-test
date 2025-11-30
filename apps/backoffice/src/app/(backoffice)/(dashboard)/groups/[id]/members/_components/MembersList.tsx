'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Alert } from '@eventure/eventured';
import { useApproveMember, useRemoveMember } from '../../../_hooks/useGroups';
import { Styled } from './MembersList.styles';
import type { GroupMemberWithUser } from '@eventure/database';

interface MembersListProps {
  groupId: string;
  activeMembers: GroupMemberWithUser[];
  pendingMembers: GroupMemberWithUser[];
  maxMembers: number;
}

export function MembersList({
  groupId,
  activeMembers: initialActive,
  pendingMembers: initialPending,
  maxMembers,
}: MembersListProps) {
  const t = useTranslations('groups');
  const approveMemberMutation = useApproveMember(groupId);
  const removeMemberMutation = useRemoveMember(groupId);

  const [activeMembers, setActiveMembers] = useState(initialActive);
  const [pendingMembers, setPendingMembers] = useState(initialPending);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleApprove = async (memberId: string) => {
    if (maxMembers !== Infinity && activeMembers.length >= maxMembers) {
      setError(t('members.errors.capacityReached', { max: maxMembers }));
      return;
    }

    setError(null);
    approveMemberMutation.mutate(memberId, {
      onSuccess: () => {
        // Move member from pending to active
        const approvedMember = pendingMembers.find((m) => m.id === memberId);
        if (approvedMember) {
          setPendingMembers(pendingMembers.filter((m) => m.id !== memberId));
          setActiveMembers([...activeMembers, { ...approvedMember, status: 'ACTIVE' }]);
          setSuccess(t('members.success.approved'));
        }
      },
      onError: (error) => {
        setError(error instanceof Error ? error.message : t('members.errors.approveFailed'));
      },
    });
  };

  const handleReject = async (memberId: string) => {
    setError(null);
    removeMemberMutation.mutate(memberId, {
      onSuccess: () => {
        setPendingMembers(pendingMembers.filter((m) => m.id !== memberId));
        setSuccess(t('members.success.rejected'));
      },
      onError: (error) => {
        setError(error instanceof Error ? error.message : t('members.errors.rejectFailed'));
      },
    });
  };

  const handleRemove = async (memberId: string) => {
    if (!confirm(t('members.confirmRemove'))) {
      return;
    }

    setError(null);
    removeMemberMutation.mutate(memberId, {
      onSuccess: () => {
        setActiveMembers(activeMembers.filter((m) => m.id !== memberId));
        setSuccess(t('members.success.removed'));
      },
      onError: (error) => {
        setError(error instanceof Error ? error.message : t('members.errors.removeFailed'));
      },
    });
  };

  return (
    <Styled.Container>
      {error && <Alert variant="danger" title={error} />}

      {success && <Alert variant="success" title={success} />}

      {/* Pending Requests */}
      {pendingMembers.length > 0 && (
        <Styled.Section>
          <Styled.SectionTitle>
            {t('members.pendingRequests')} ({pendingMembers.length})
          </Styled.SectionTitle>
          <Styled.MembersList>
            {pendingMembers.map((member) => (
              <Styled.MemberCard key={member.id}>
                <Styled.MemberInfo>
                  <Styled.Avatar $hasImage={!!member.user.image}>
                    {member.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.user.image} alt={member.user.name || 'Member'} />
                    ) : (
                      <span>
                        {member.user.name?.[0] || member.user.email?.[0]?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </Styled.Avatar>
                  <Styled.MemberDetails>
                    <Styled.MemberName>{member.user.name || 'Unknown'}</Styled.MemberName>
                    <Styled.MemberEmail>{member.user.email}</Styled.MemberEmail>
                  </Styled.MemberDetails>
                </Styled.MemberInfo>
                <Styled.ActionButtons>
                  <Button
                    variant="primary"
                    onClick={() => handleApprove(member.id)}
                    disabled={approveMemberMutation.isPending || removeMemberMutation.isPending}
                  >
                    {t('members.approveButton')}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(member.id)}
                    disabled={approveMemberMutation.isPending || removeMemberMutation.isPending}
                  >
                    {t('members.rejectButton')}
                  </Button>
                </Styled.ActionButtons>
              </Styled.MemberCard>
            ))}
          </Styled.MembersList>
        </Styled.Section>
      )}

      {/* Active Members */}
      <Styled.Section>
        <Styled.SectionTitle>
          {t('members.activeMembers')} ({activeMembers.length})
        </Styled.SectionTitle>
        {activeMembers.length === 0 ? (
          <Styled.EmptyState>{t('members.noActiveMembers')}</Styled.EmptyState>
        ) : (
          <Styled.MembersList>
            {activeMembers.map((member) => (
              <Styled.MemberCard key={member.id}>
                <Styled.MemberInfo>
                  <Styled.Avatar $hasImage={!!member.user.image}>
                    {member.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.user.image} alt={member.user.name || 'Member'} />
                    ) : (
                      <span>
                        {member.user.name?.[0] || member.user.email?.[0]?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </Styled.Avatar>
                  <Styled.MemberDetails>
                    <Styled.MemberNameWithRoles>
                      <Styled.MemberName>{member.user.name || 'Unknown'}</Styled.MemberName>
                      {member.role === 'MODERATOR' && (
                        <Styled.RoleBadge $role="moderator">
                          {t('members.moderator')}
                        </Styled.RoleBadge>
                      )}
                      {member.role === 'ADMIN' && (
                        <Styled.RoleBadge $role="admin">{t('members.admin')}</Styled.RoleBadge>
                      )}
                    </Styled.MemberNameWithRoles>
                    <Styled.MemberEmail>{member.user.email}</Styled.MemberEmail>
                    <Styled.MemberMeta>
                      {t('members.joined', {
                        date: new Date(member.joinedAt).toLocaleDateString(),
                      })}
                    </Styled.MemberMeta>
                  </Styled.MemberDetails>
                </Styled.MemberInfo>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(member.id)}
                  disabled={approveMemberMutation.isPending || removeMemberMutation.isPending}
                >
                  {t('members.removeButton')}
                </Button>
              </Styled.MemberCard>
            ))}
          </Styled.MembersList>
        )}
      </Styled.Section>
    </Styled.Container>
  );
}
