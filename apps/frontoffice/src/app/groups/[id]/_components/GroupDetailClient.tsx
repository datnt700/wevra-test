'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Badge } from '@eventure/eventured';
import { ArrowLeft } from 'lucide-react';
import { Styled } from './GroupDetailClient.styles';
import { useJoinGroup } from '../_hooks/useJoinGroup';
import { useLeaveGroup } from '../_hooks/useLeaveGroup';
import { type GroupDetail, MembershipStatus } from '@eventure/database';

interface GroupDetailClientProps {
  group: GroupDetail;
  membershipStatus: MembershipStatus | null;
  isOwner: boolean;
}

export function GroupDetailClient({ group, membershipStatus, isOwner }: GroupDetailClientProps) {
  const t = useTranslations('groups');
  const router = useRouter();
  const joinMutation = useJoinGroup(group.id);
  const leaveMutation = useLeaveGroup(group.id);

  const isMember = membershipStatus === MembershipStatus.ACTIVE;
  const isPending = membershipStatus === MembershipStatus.PENDING;
  const canJoin = !membershipStatus && !isOwner;

  const handleJoin = () => {
    joinMutation.mutate();
  };

  const handleLeave = () => {
    if (window.confirm(t('leave.confirm'))) {
      leaveMutation.mutate();
    }
  };

  return (
    <>
      {/* Hero Cover Image */}
      {group.image && (
        <Styled.HeroSection>
          <Styled.CoverImage src={group.image} alt={group.name} />
          <Styled.HeroOverlay>
            {/* Back Button */}
            <div style={{ marginBottom: '1rem' }}>
              <Button
                variant="link"
                size="sm"
                onClick={() => router.back()}
                icon={<ArrowLeft size={16} />}
              >
                {t('detail.backButton')}
              </Button>
            </div>

            <Styled.HeroContent>
              <Styled.HeroHeader>
                <div style={{ flex: 1 }}>
                  <Styled.HeroTitle>{group.name}</Styled.HeroTitle>
                  <Styled.BadgeGroup>
                    {group.isPremium && <Badge variant="success">{t('detail.premium')}</Badge>}
                    {!group.isPublic && <Badge variant="info">{t('detail.private')}</Badge>}
                  </Styled.BadgeGroup>
                </div>
                {!isOwner && (
                  <div>
                    {canJoin && (
                      <Button
                        variant="primary"
                        onClick={handleJoin}
                        disabled={joinMutation.isPending}
                      >
                        {joinMutation.isPending ? t('join.loading') : t('join.button')}
                      </Button>
                    )}
                    {isMember && (
                      <Button
                        variant="danger"
                        onClick={handleLeave}
                        disabled={leaveMutation.isPending}
                      >
                        {leaveMutation.isPending ? t('leave.loading') : t('leave.button')}
                      </Button>
                    )}
                  </div>
                )}
              </Styled.HeroHeader>
              <Styled.HeroMeta>
                <Styled.HeroCategory>{group.category}</Styled.HeroCategory>
                {group.location && <Styled.HeroLocation>📍 {group.location}</Styled.HeroLocation>}
              </Styled.HeroMeta>
              <Styled.HeroStats>
                <Styled.HeroStatItem>
                  <strong>{group.memberCount}</strong> {t('detail.members').toLowerCase()}
                </Styled.HeroStatItem>
                <Styled.HeroStatDivider>•</Styled.HeroStatDivider>
                <Styled.HeroStatItem>
                  <strong>{group._count.events}</strong> {t('detail.totalEvents').toLowerCase()}
                </Styled.HeroStatItem>
              </Styled.HeroStats>
            </Styled.HeroContent>
          </Styled.HeroOverlay>
        </Styled.HeroSection>
      )}

      <Styled.Container>
        {/* Membership Status */}
        {isPending && (
          <Styled.MembershipStatus>
            <Badge variant="warning">{t('detail.pendingApproval')}</Badge>
            <Styled.MembershipText>{t('detail.pendingMessage')}</Styled.MembershipText>
          </Styled.MembershipStatus>
        )}

        {/* Group Description Section */}
        {group.description && (
          <Styled.Section>
            <Styled.Description>{group.description}</Styled.Description>
          </Styled.Section>
        )}

        {/* If no cover image, show header in regular section */}
        {!group.image && (
          <Styled.Section>
            <Styled.Header>
              <Styled.HeaderContent>
                <Styled.HeaderTop>
                  <Styled.Title>{group.name}</Styled.Title>
                  {group.isPremium && <Badge variant="success">{t('detail.premium')}</Badge>}
                  {!group.isPublic && <Badge variant="info">{t('detail.private')}</Badge>}
                </Styled.HeaderTop>
                <Styled.Category>{group.category}</Styled.Category>
                {group.location && <Styled.Location>📍 {group.location}</Styled.Location>}
              </Styled.HeaderContent>
              {!isOwner && (
                <Styled.Actions>
                  {canJoin && (
                    <Button
                      variant="primary"
                      onClick={handleJoin}
                      disabled={joinMutation.isPending}
                    >
                      {joinMutation.isPending ? t('join.loading') : t('join.button')}
                    </Button>
                  )}
                  {isMember && (
                    <Button
                      variant="danger"
                      onClick={handleLeave}
                      disabled={leaveMutation.isPending}
                    >
                      {leaveMutation.isPending ? t('leave.loading') : t('leave.button')}
                    </Button>
                  )}
                </Styled.Actions>
              )}
            </Styled.Header>

            <Styled.Stats>
              <Styled.StatItem>
                {group.memberCount} {t('detail.members').toLowerCase()}
              </Styled.StatItem>
              <Styled.StatItem>
                {group._count.events} {t('detail.totalEvents').toLowerCase()}
              </Styled.StatItem>
            </Styled.Stats>
          </Styled.Section>
        )}

        {/* Organizer Info */}
        <Styled.Section>
          <Styled.SectionTitle>{t('detail.organizedBy')}</Styled.SectionTitle>
          <Styled.OrganizerInfo>
            <Styled.Avatar $hasImage={!!group.owner.image}>
              {group.owner.image ? (
                <Image
                  src={group.owner.image}
                  alt={group.owner.name || 'Organizer'}
                  width={60}
                  height={60}
                />
              ) : (
                <span>{group.owner.name?.[0] || 'O'}</span>
              )}
            </Styled.Avatar>
            <Styled.OrganizerDetails>
              <Styled.OrganizerName>{group.owner.name}</Styled.OrganizerName>
              <Styled.OrganizerRole>{t('detail.owner')}</Styled.OrganizerRole>
            </Styled.OrganizerDetails>
          </Styled.OrganizerInfo>
        </Styled.Section>

        {/* Events Section */}
        <Styled.Section>
          <Styled.SectionHeader>
            <Styled.SectionTitle>{t('detail.upcomingEvents')}</Styled.SectionTitle>
          </Styled.SectionHeader>
          <Styled.EmptyState>{t('detail.noEvents')}</Styled.EmptyState>
        </Styled.Section>
      </Styled.Container>
    </>
  );
}
