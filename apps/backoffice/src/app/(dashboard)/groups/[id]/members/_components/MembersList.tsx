'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Alert } from '@tavia/taviad';
import { useApproveMember, useRemoveMember } from '../../../_hooks/useGroups';

interface Member {
  id: string;
  status: string;
  role: string;
  joinedAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface MembersListProps {
  groupId: string;
  activeMembers: Member[];
  pendingMembers: Member[];
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
    <div className="space-y-6">
      {error && <Alert variant="danger" title={error} />}

      {success && <Alert variant="success" title={success} />}

      {/* Pending Requests */}
      {pendingMembers.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            {t('members.pendingRequests')} ({pendingMembers.length})
          </h2>
          <div className="space-y-4">
            {pendingMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  {member.user.image ? (
                    <img
                      src={member.user.image}
                      alt={member.user.name || 'Member'}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                      <span className="font-medium text-gray-600">
                        {member.user.name?.[0] || member.user.email?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{member.user.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{member.user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => handleApprove(member.id)}
                    disabled={approveMemberMutation.isPending || removeMemberMutation.isPending}
                    className="px-3 py-1 text-sm"
                  >
                    {t('members.approveButton')}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(member.id)}
                    disabled={approveMemberMutation.isPending || removeMemberMutation.isPending}
                    className="px-3 py-1 text-sm"
                  >
                    {t('members.rejectButton')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Members */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          {t('members.activeMembers')} ({activeMembers.length})
        </h2>
        {activeMembers.length === 0 ? (
          <p className="text-gray-600">{t('members.noActiveMembers')}</p>
        ) : (
          <div className="space-y-4">
            {activeMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  {member.user.image ? (
                    <img
                      src={member.user.image}
                      alt={member.user.name || 'Member'}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                      <span className="font-medium text-gray-600">
                        {member.user.name?.[0] || member.user.email?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.user.name || 'Unknown'}</p>
                      {member.role === 'MODERATOR' && (
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                          {t('members.moderator')}
                        </span>
                      )}
                      {member.role === 'ADMIN' && (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          {t('members.admin')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{member.user.email}</p>
                    <p className="text-xs text-gray-400">
                      {t('members.joined', {
                        date: new Date(member.joinedAt).toLocaleDateString(),
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(member.id)}
                  disabled={approveMemberMutation.isPending || removeMemberMutation.isPending}
                  className="px-3 py-1 text-sm"
                >
                  {t('members.removeButton')}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
