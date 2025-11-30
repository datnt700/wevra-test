'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, Badge } from '@eventure/eventured';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { Styled } from './GroupDetailClient.styles';
import type { GroupWithOwner } from '@eventure/database';

interface GroupDetailClientProps {
  group: GroupWithOwner;
  isOwner: boolean;
}

export function GroupDetailClient({ group, isOwner }: GroupDetailClientProps) {
  const t = useTranslations('groups');
  const router = useRouter();

  return (
    <>
      {/* Hero Cover Image or Placeholder */}
      <Styled.HeroSection>
        {group.image ? (
          <Styled.CoverImage src={group.image} alt={group.name} />
        ) : (
          <Styled.HeroPlaceholder />
        )}
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
              <Styled.HeroTitle>{group.name}</Styled.HeroTitle>
              <Styled.BadgeGroup>
                {group.isPremium && <Badge variant="success">{t('detail.premium')}</Badge>}
                {!group.isPublic && <Badge variant="info">{t('detail.private')}</Badge>}
              </Styled.BadgeGroup>
            </Styled.HeroHeader>
            <Styled.HeroMeta>
              <Styled.HeroCategory>{group.category}</Styled.HeroCategory>
              {group.location && <Styled.HeroLocation>📍 {group.location}</Styled.HeroLocation>}
            </Styled.HeroMeta>
            <Styled.HeroStats>
              <Styled.HeroStatItem>
                <strong>{group._count.members}</strong> {t('detail.members').toLowerCase()}
              </Styled.HeroStatItem>
              <Styled.HeroStatDivider>•</Styled.HeroStatDivider>
              <Styled.HeroStatItem>
                <strong>{group._count.events}</strong> {t('detail.totalEvents').toLowerCase()}
              </Styled.HeroStatItem>
            </Styled.HeroStats>
          </Styled.HeroContent>
          {isOwner && (
            <Styled.HeroActions>
              <Link href={ROUTES.GROUP.EDIT(group.id)}>
                <Button variant="primary">{t('detail.editGroup')}</Button>
              </Link>
              <Link href={ROUTES.GROUP.MEMBERS(group.id)}>
                <Button variant="secondary">{t('detail.manageMembers')}</Button>
              </Link>
            </Styled.HeroActions>
          )}
        </Styled.HeroOverlay>
      </Styled.HeroSection>

      <Styled.Container>
        {/* Group Description Section */}
        {group.description && (
          <Styled.Section>
            <Styled.Description>{group.description}</Styled.Description>
          </Styled.Section>
        )}

        {/* Organizer Info */}
        <Styled.Section>
          <Styled.SectionTitle>{t('detail.organizedBy')}</Styled.SectionTitle>
          <Styled.OrganizerInfo>
            <Styled.Avatar $hasImage={!!group.owner.image}>
              {group.owner.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={group.owner.image} alt={group.owner.name || 'Organizer'} />
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
            {isOwner && (
              <Link href={`${ROUTES.EVENT.NEW}?groupId=${group.id}`}>
                <Button variant="primary">{t('detail.createEvent')}</Button>
              </Link>
            )}
          </Styled.SectionHeader>
          <Styled.EmptyState>
            {t('detail.noEvents')} {isOwner && t('detail.noEvents')}
          </Styled.EmptyState>
        </Styled.Section>
      </Styled.Container>
    </>
  );
}
