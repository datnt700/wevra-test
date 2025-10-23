// Core client
export { AnalyticsClient } from './client.js';

// React provider and hooks
export {
  AnalyticsProvider,
  useAnalytics,
  useTrackClick,
  usePageView,
  useTrack,
} from './provider.js';

// Components
export { TrackClick } from './components/index.js';

// Types
export type {
  AnalyticsConfig,
  BaseEventProperties,
  ClickEvent,
  PageViewEvent,
  CustomEvent,
  AnalyticsEvent,
} from './types.js';
export type { TrackClickProps } from './components/index.js';
