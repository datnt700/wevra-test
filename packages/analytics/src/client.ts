import type { AnalyticsConfig, AnalyticsEvent, BaseEventProperties } from './types.js';

/**
 * Analytics client for tracking events
 */
export class AnalyticsClient {
  private config: AnalyticsConfig & {
    debug: boolean;
    autoTrackPageViews: boolean;
    batchEvents: boolean;
    batchSize: number;
    flushInterval: number;
  };
  private queue: AnalyticsEvent[] = [];
  private flushTimer?: ReturnType<typeof setInterval>;

  constructor(config: AnalyticsConfig) {
    this.config = {
      ...config,
      debug: config.debug ?? false,
      autoTrackPageViews: config.autoTrackPageViews ?? false,
      batchEvents: config.batchEvents ?? false,
      batchSize: config.batchSize ?? 10,
      flushInterval: config.flushInterval ?? 5000,
    };

    if (this.config.batchEvents) {
      this.startFlushTimer();
    }
  }

  /**
   * Get base event properties (URL, referrer, user agent, etc.)
   */
  private getBaseProperties(): BaseEventProperties {
    if (typeof window === 'undefined') {
      return {
        timestamp: new Date().toISOString(),
        url: '',
      };
    }

    return {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    };
  }

  /**
   * Send event to analytics API
   */
  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
      }

      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }

      if (this.config.debug) {
        console.log('[Analytics] Event sent:', event);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('[Analytics] Failed to send event:', error);
      }
    }
  }

  /**
   * Send batch of events
   */
  private async sendBatch(events: AnalyticsEvent[]): Promise<void> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
      }

      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }

      if (this.config.debug) {
        console.log('[Analytics] Batch sent:', events.length, 'events');
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('[Analytics] Failed to send batch:', error);
      }
    }
  }

  /**
   * Start flush timer for batched events
   */
  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  /**
   * Add event to queue or send immediately
   */
  private enqueue(event: AnalyticsEvent): void {
    if (this.config.batchEvents) {
      this.queue.push(event);

      if (this.queue.length >= this.config.batchSize) {
        this.flush();
      }
    } else {
      void this.sendEvent(event);
    }
  }

  /**
   * Flush queued events
   */
  public async flush(): Promise<void> {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    await this.sendBatch(events);
  }

  /**
   * Track a click event
   */
  public trackClick(data: {
    elementType: string;
    elementText?: string;
    elementId?: string;
    elementClasses?: string[];
    clickX?: number;
    clickY?: number;
    eventName?: string;
    metadata?: Record<string, unknown>;
  }): void {
    const event: AnalyticsEvent = {
      type: 'click',
      ...this.getBaseProperties(),
      ...data,
    };

    this.enqueue(event);
  }

  /**
   * Track a page view
   */
  public trackPageView(data?: {
    title?: string;
    path?: string;
    metadata?: Record<string, unknown>;
  }): void {
    if (typeof window === 'undefined') return;

    const event: AnalyticsEvent = {
      type: 'pageview',
      ...this.getBaseProperties(),
      title: data?.title || document.title,
      path: data?.path || window.location.pathname,
      metadata: data?.metadata,
    };

    this.enqueue(event);
  }

  /**
   * Track a custom event
   */
  public track(name: string, properties?: Record<string, unknown>): void {
    const event: AnalyticsEvent = {
      type: 'custom',
      name,
      ...this.getBaseProperties(),
      properties,
    };

    this.enqueue(event);
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    void this.flush();
  }
}
