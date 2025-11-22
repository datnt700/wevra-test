/**
 * Centralized route constants for the frontoffice app
 * Update routes here to avoid changing them everywhere
 */

export const ROUTES = {
  HOME: '/',

  // Authentication
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Events
  EVENTS: '/events',
  EVENT_DETAIL: (id: string) => `/events/${id}`,

  // Groups
  GROUPS: '/groups',
  GROUP_DETAIL: (id: string) => `/groups/${id}`,
  CREATE_GROUP: '/create-group',

  // User Profile
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

/**
 * Helper to build event search URL with query params
 */
export const buildEventSearchUrl = (searchQuery: string): string => {
  return `${ROUTES.EVENTS}?search=${encodeURIComponent(searchQuery)}`;
};
