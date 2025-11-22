'use client';

import { useQuery } from '@tanstack/react-query';
import { searchEventsAction, type SearchEventsParams } from '@/actions/event.actions';

export function useEvents(params: SearchEventsParams = {}) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => searchEventsAction(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
