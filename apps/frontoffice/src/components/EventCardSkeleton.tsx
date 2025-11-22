'use client';

import { RestaurantCard, RestaurantContent, RestaurantHeader } from '@/app/page.styles';
import { Styled } from './EventCardSkeleton.styles';

export function EventCardSkeleton() {
  return (
    <RestaurantCard>
      <Styled.ImageSkeleton />

      <RestaurantContent>
        {/* Date skeleton */}
        <div style={{ marginBottom: '0.5rem' }}>
          <Styled.SkeletonBox width="60%" height="14px" />
        </div>

        {/* Event name skeleton */}
        <RestaurantHeader>
          <Styled.SkeletonBox width="90%" height="20px" />
        </RestaurantHeader>

        {/* Group info skeleton */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}
        >
          <Styled.SkeletonBox width="24px" height="24px" $circle />
          <Styled.SkeletonBox width="40%" height="14px" />
        </div>

        {/* Attendees and location skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Styled.SkeletonBox width="30%" height="14px" />
          <span style={{ color: '#ddd' }}>•</span>
          <Styled.SkeletonBox width="25%" height="14px" />
        </div>
      </RestaurantContent>
    </RestaurantCard>
  );
}
