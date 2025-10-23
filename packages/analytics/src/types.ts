/**
 * Configuration options for the Analytics SDK
 */
export interface AnalyticsConfig {
  /**
   * API endpoint to send tracking events
   */
  endpoint: string;

  /**
   * Optional API key for authentication
   */
  apiKey?: string;

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;

  /**
   * Automatically track page views
   * @default false
   */
  autoTrackPageViews?: boolean;

  /**
   * Batch events before sending
   * @default false
   */
  batchEvents?: boolean;

  /**
   * Batch size (number of events)
   * @default 10
   */
  batchSize?: number;

  /**
   * Flush interval in milliseconds
   * @default 5000
   */
  flushInterval?: number;
}

/**
 * Base event properties
 */
export interface BaseEventProperties {
  /**
   * Event timestamp (ISO 8601)
   */
  timestamp: string;

  /**
   * Page URL where event occurred
   */
  url: string;

  /**
   * Page referrer
   */
  referrer?: string;

  /**
   * User agent string
   */
  userAgent?: string;

  /**
   * Screen resolution
   */
  screenResolution?: string;

  /**
   * Viewport size
   */
  viewportSize?: string;

  /**
   * Custom metadata
   */
  metadata?: Record<string, unknown>;
}

/**
 * Click event data
 */
export interface ClickEvent extends BaseEventProperties {
  /**
   * Event type
   */
  type: 'click';

  /**
   * Element type (button, link, etc.)
   */
  elementType: string;

  /**
   * Element text content
   */
  elementText?: string;

  /**
   * Element ID
   */
  elementId?: string;

  /**
   * Element classes
   */
  elementClasses?: string[];

  /**
   * Click X coordinate
   */
  clickX?: number;

  /**
   * Click Y coordinate
   */
  clickY?: number;

  /**
   * Custom event name
   */
  eventName?: string;
}

/**
 * Page view event data
 */
export interface PageViewEvent extends BaseEventProperties {
  /**
   * Event type
   */
  type: 'pageview';

  /**
   * Page title
   */
  title: string;

  /**
   * Page path
   */
  path: string;
}

/**
 * Custom event data
 */
export interface CustomEvent extends BaseEventProperties {
  /**
   * Event type
   */
  type: 'custom';

  /**
   * Event name
   */
  name: string;

  /**
   * Event properties
   */
  properties?: Record<string, unknown>;
}

/**
 * Union type for all event types
 */
export type AnalyticsEvent = ClickEvent | PageViewEvent | CustomEvent;
