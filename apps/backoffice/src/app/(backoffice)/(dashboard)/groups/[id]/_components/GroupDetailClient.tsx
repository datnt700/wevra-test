'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button, Badge } from '@tavia/taviad';
import { ROUTES } from '@/lib/constants';
import { Styled } from './GroupDetailClient.styles';
import type { GroupWithOwner } from '@tavia/database';

interface GroupDetailClientProps {
  group: GroupWithOwner;
  isOwner: boolean;
}

export function GroupDetailClient({ group, isOwner }: GroupDetailClientProps) {
  const t = useTranslations('groups');

  return (
    <>
      {/* Hero Cover Image */}
      {group.image && (
        <Styled.HeroSection>
          <Styled.CoverImage src={group.image} alt={group.name} />
          <Styled.HeroOverlay>
            <Styled.HeroContent>
              <Styled.HeroHeader>
                <Styled.HeroTitle>{group.name}</Styled.HeroTitle>
                <Styled.BadgeGroup>
                  {group.isPremium && (
                    <Badge variant="success" shape="rounded">
                      {t('detail.premium')}
                    </Badge>
                  )}
                  {!group.isPublic && (
                    <Badge variant="info" shape="rounded">
                      {t('detail.private')}
                    </Badge>
                  )}
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
      )}

      <Styled.Container>
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
                  {group.isPremium && (
                    <Badge variant="success" shape="rounded">
                      {t('detail.premium')}
                    </Badge>
                  )}
                  {!group.isPublic && (
                    <Badge variant="info" shape="rounded">
                      {t('detail.private')}
                    </Badge>
                  )}
                </Styled.HeaderTop>
                <Styled.Category>{group.category}</Styled.Category>
                {group.location && <Styled.Location>📍 {group.location}</Styled.Location>}
              </Styled.HeaderContent>
              {isOwner && (
                <Styled.Actions>
                  <Link href={ROUTES.GROUP.EDIT(group.id)}>
                    <Button variant="primary">{t('detail.editGroup')}</Button>
                  </Link>
                  <Link href={ROUTES.GROUP.MEMBERS(group.id)}>
                    <Button variant="secondary">{t('detail.manageMembers')}</Button>
                  </Link>
                </Styled.Actions>
              )}
            </Styled.Header>

            <Styled.Stats>
              <Styled.StatItem>
                {group._count.members} {t('detail.members').toLowerCase()}
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
