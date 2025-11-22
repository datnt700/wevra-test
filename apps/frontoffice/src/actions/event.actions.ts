'use server';

import prisma from '@/lib/prisma';
import { createLogger } from '@tavia/logger';

const logger = createLogger('event-actions');

export interface Event {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  startDate: Date;
  attendees: number;
  maxAttendees: number;
  location: string;
  groupName: string;
  category: string;
  isOnline: boolean;
  isFree: boolean;
  price: number | null;
  currency: string | null;
}

export interface SearchEventsParams {
  searchQuery?: string;
  location?: string;
  limit?: number;
  page?: number;
}

export interface SearchEventsResponse {
  events: Event[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Search for events with filters
 */
export async function searchEventsAction(
  params: SearchEventsParams = {}
): Promise<SearchEventsResponse> {
  try {
    logger.info('Searching events', { params });
    const { searchQuery = '', location = '', limit = 12, page = 1 } = params;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: true,
      startDate: {
        gte: new Date(), // Only future events
      },
      status: 'PUBLISHED', // Only published events
    };

    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    // Fetch events with group info
    logger.debug('Database query', { where, skip, limit });
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          startDate: 'asc',
        },
        include: {
          group: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              rsvps: true,
            },
          },
        },
      }),
      prisma.event.count({ where }),
    ]);

    // Transform data
    const transformedEvents: Event[] = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      image: event.image,
      startDate: event.startDate,
      attendees: event._count.rsvps,
      maxAttendees: event.capacity || 0,
      location: event.isOnline ? 'Online Event' : event.location || 'TBD',
      groupName: event.group.name,
      category: event.category || 'General',
      isOnline: event.isOnline,
      isFree: event.isFree,
      price: event.price ? Number(event.price) : null,
      currency: event.currency,
    }));

    logger.info('Events fetched successfully', {
      count: transformedEvents.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

    return {
      events: transformedEvents,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    logger.error('Failed to fetch events', { error });
    throw new Error('Failed to fetch events');
  }
}
