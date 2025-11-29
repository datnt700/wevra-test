'use client';

import { useTranslations } from 'next-intl';
import { Users, AlertCircle } from 'lucide-react';
import { ErrorState, Button } from '@tavia/taviad';
import { useLogger } from '@tavia/logger';
import { useEvents } from '@/hooks/useEvents';
import { EventCardSkeleton } from './EventCardSkeleton';
import {
  MainContent,
  SectionTitle,
  RestaurantGrid,
  RestaurantCard,
  RestaurantImage,
  RestaurantContent,
  RestaurantHeader,
  RestaurantName,
  RatingContainer,
  CenteredMessage,
  EventDate,
  GroupInfo,
  GroupAvatar,
  AttendeeCount,
  EventBadge,
} from '@/app/page.styles';

export function EventSearch() {
  const t = useTranslations('home');
  const tErrors = useTranslations('errors');
  const logger = useLogger('EventSearch');

  const { data, isLoading, error } = useEvents({
    limit: 12,
  });

  const events = data?.events || [];

  if (error) {
    logger.error('Failed to load events', { error });
    return (
      <MainContent style={{ paddingTop: '5rem' }}>
        <CenteredMessage>
          <ErrorState
            icon={<AlertCircle size={80} color="#e21822" />}
            title={tErrors('loadingEvents')}
            subTitle={tErrors('loadingEventsDescription')}
            action={
              <Button variant="primary" onClick={() => window.location.reload()}>
                {tErrors('tryAgain')}
              </Button>
            }
          />
        </CenteredMessage>
      </MainContent>
    );
  }

  logger.info('Events loaded', { count: events.length, isLoading });

  return (
    <>
      <MainContent style={{ paddingTop: '5rem' }}>
        <SectionTitle>{t('popularNearYou')}</SectionTitle>

        {isLoading ? (
          <RestaurantGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </RestaurantGrid>
        ) : (
          <>
            <RestaurantGrid>
              {events.map((event) => (
                <RestaurantCard key={event.id}>
                  <RestaurantImage
                    $src={
                      event.image ||
                      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
                    }
                  >
                    <EventBadge>
                      {event.isFree
                        ? 'Free'
                        : event.price
                          ? `${event.currency || '$'}${Number(event.price).toFixed(0)}`
                          : 'Free'}
                    </EventBadge>
                  </RestaurantImage>
                  <RestaurantContent>
                    <EventDate>
                      {new Date(event.startDate)
                        .toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })
                        .toUpperCase()}
                    </EventDate>
                    <RestaurantHeader>
                      <RestaurantName>{event.title}</RestaurantName>
                    </RestaurantHeader>

                    <GroupInfo>
                      <GroupAvatar>{event.groupName.charAt(0)}</GroupAvatar>
                      <span>{event.groupName}</span>
                    </GroupInfo>

                    <RatingContainer>
                      <AttendeeCount>
                        <Users size={14} />
                        {event.attendees} attending
                      </AttendeeCount>
                    </RatingContainer>
                  </RestaurantContent>
                </RestaurantCard>
              ))}
            </RestaurantGrid>

            {events.length === 0 && (
              <CenteredMessage>
                <h3>{t('noResults')}</h3>
                <p>{t('tryDifferentSearch')}</p>
              </CenteredMessage>
            )}
          </>
        )}
      </MainContent>
    </>
  );
}
