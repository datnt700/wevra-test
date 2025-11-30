# @eventure/analytics

> Simple in-house click tracking and analytics SDK for Eventure applications

## Installation

```bash
pnpm add @eventure/analytics
```

## Quick Start

### 1. Wrap your app with AnalyticsProvider

```tsx
import { AnalyticsProvider } from '@eventure/analytics';

function App() {
  return (
    <AnalyticsProvider
      config={{
        endpoint: 'https://your-backend.com/api/analytics',
        apiKey: 'your-api-key', // Optional
        debug: true, // Enable console logging
        batchSize: 10, // Send events in batches of 10
        flushInterval: 5000, // Flush events every 5 seconds
      }}
    >
      {/* Your app */}
    </AnalyticsProvider>
  );
}
```

### 2. Track clicks with hooks

```tsx
import { useTrackClick } from '@eventure/analytics';

function MyButton() {
  const trackClick = useTrackClick();

  return (
    <button onClick={trackClick('cta_clicked', { campaign: 'summer' })}>
      Click me
    </button>
  );
}
```

### 3. Or use the TrackClick component

```tsx
import { TrackClick } from '@eventure/analytics';

function MyComponent() {
  return (
    <TrackClick eventName="cta_clicked" metadata={{ campaign: 'summer' }}>
      <button>Click me</button>
    </TrackClick>
  );
}
```

## Features

### 🎯 Click Tracking

Automatically captures:

- Element type (button, link, etc.)
- Element text content
- Element ID and classes
- Click coordinates (x, y)
- Timestamp
- Current URL and referrer
- Screen resolution and viewport size
- User agent

### 📦 Event Batching

Configure batching to reduce network requests:

```tsx
<AnalyticsProvider
  config={{
    endpoint: '/api/analytics',
    batchSize: 20, // Send 20 events at once
    flushInterval: 10000, // Or flush every 10 seconds
  }}
>
```

### 🔍 Debug Mode

Enable debug logging to see events in console:

```tsx
<AnalyticsProvider
  config={{
    endpoint: '/api/analytics',
    debug: true, // See all tracked events
  }}
>
```

## API Reference

### AnalyticsProvider

React Context provider for analytics.

**Props:**

- `config: AnalyticsConfig` - Configuration object
  - `endpoint: string` - Backend API endpoint (required)
  - `apiKey?: string` - Optional API key for authentication
  - `debug?: boolean` - Enable console logging (default: `false`)
  - `batchSize?: number` - Number of events to batch (default: `10`)
  - `flushInterval?: number` - Flush interval in ms (default: `5000`)
- `children: ReactNode` - Child components

### useAnalytics()

Access the analytics client instance.

```tsx
const client = useAnalytics();

// Manually flush queued events
client?.flush();

// Clean up
client?.destroy();
```

### useTrackClick(eventName, metadata?)

Returns an onClick handler for tracking clicks.

**Parameters:**

- `eventName: string` - Name of the event
- `metadata?: Record<string, unknown>` - Custom metadata

**Returns:** `(event: React.MouseEvent) => void`

**Example:**

```tsx
const trackClick = useTrackClick();

<button onClick={trackClick('signup_clicked', { source: 'homepage' })}>
  Sign Up
</button>;
```

### usePageView(metadata?)

Automatically track page views on component mount.

**Parameters:**

- `metadata?: Record<string, unknown>` - Custom metadata

**Example:**

```tsx
function ProductPage({ productId }) {
  usePageView({ productId, category: 'electronics' });

  return <div>Product details...</div>;
}
```

### useTrack()

Returns a function for tracking custom events.

**Returns:** `(eventName: string, properties?: Record<string, unknown>) => void`

**Example:**

```tsx
const track = useTrack();

const handlePurchase = () => {
  track('purchase_completed', {
    amount: 99.99,
    currency: 'USD',
    items: 3,
  });
};
```

### TrackClick Component

Wrapper component for automatic click tracking.

**Props:**

- `eventName: string` - Name of the event (required)
- `metadata?: Record<string, unknown>` - Custom metadata
- `children: ReactNode` - Child element to track
- `className?: string` - Additional CSS class
- `onClick?: (event: React.MouseEvent) => void` - Additional click handler

**Example:**

```tsx
<TrackClick
  eventName="cta_clicked"
  metadata={{ campaign: 'summer', position: 'hero' }}
  onClick={() => console.log('Also handle click')}
>
  <button>Get Started</button>
</TrackClick>
```

### AnalyticsClient

Core client class (accessible via `useAnalytics()`).

**Methods:**

- `trackClick(event: React.MouseEvent, eventName?: string, metadata?: Record<string, unknown>)` -
  Track click events
- `trackPageView(metadata?: Record<string, unknown>)` - Track page views
- `track(eventName: string, properties?: Record<string, unknown>)` - Track
  custom events
- `flush()` - Manually flush queued events
- `destroy()` - Clean up and stop flush timer

## Event Structure

### Click Event

```typescript
{
  type: 'click',
  timestamp: '2024-01-15T12:00:00.000Z',
  url: 'https://example.com/page',
  referrer: 'https://example.com/home',
  userAgent: 'Mozilla/5.0...',
  screen: { width: 1920, height: 1080 },
  viewport: { width: 1200, height: 800 },
  elementType: 'button',
  elementText: 'Click me',
  elementId: 'cta-button',
  elementClasses: ['btn', 'btn-primary'],
  clickX: 150,
  clickY: 200,
  eventName: 'cta_clicked',
  metadata: { campaign: 'summer' }
}
```

### Page View Event

```typescript
{
  type: 'pageview',
  timestamp: '2024-01-15T12:00:00.000Z',
  url: 'https://example.com/products/123',
  referrer: 'https://example.com/home',
  userAgent: 'Mozilla/5.0...',
  screen: { width: 1920, height: 1080 },
  viewport: { width: 1200, height: 800 },
  title: 'Product Details',
  path: '/products/123',
  metadata: { productId: '123', category: 'electronics' }
}
```

### Custom Event

```typescript
{
  type: 'custom',
  timestamp: '2024-01-15T12:00:00.000Z',
  url: 'https://example.com/checkout',
  referrer: 'https://example.com/cart',
  userAgent: 'Mozilla/5.0...',
  screen: { width: 1920, height: 1080 },
  viewport: { width: 1200, height: 800 },
  name: 'purchase_completed',
  properties: {
    amount: 99.99,
    currency: 'USD',
    items: 3
  }
}
```

## Backend Integration

The SDK sends events to your backend endpoint via POST requests:

```typescript
// POST /api/analytics
{
  events: [
    { type: 'click', ... },
    { type: 'pageview', ... }
  ]
}
```

**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer <apiKey>` (if apiKey is configured)

Expected response: `200 OK`

## TypeScript Support

Fully typed with TypeScript. All interfaces are exported:

```typescript
import type {
  AnalyticsConfig,
  ClickEvent,
  PageViewEvent,
  CustomEvent,
  AnalyticsEvent,
  BaseEventProperties,
} from '@eventure/analytics';
```

## License

MIT
