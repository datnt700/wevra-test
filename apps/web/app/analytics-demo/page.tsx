'use client';

import { useTrackClick, usePageView, useTrack, TrackClick } from '@tavia/analytics';
import { useState } from 'react';
import Link from 'next/link';

export default function AnalyticsDemoPage() {
  const trackClick = useTrackClick();
  const track = useTrack();
  const [counter, setCounter] = useState(0);

  // Auto-track page view on mount
  usePageView({ page: 'analytics_demo', section: 'testing' });

  const handleCustomEvent = () => {
    track('custom_interaction', {
      type: 'manual_trigger',
      counter_value: counter,
      timestamp: Date.now(),
    });
    setCounter((prev) => prev + 1);
  };

  return (
    <div>
      <header>
        <h1>📊 Analytics Demo</h1>
        <p>Test the @tavia/analytics SDK with various tracking methods</p>
      </header>

      <main>
        {/* Section 1: Hook-based tracking */}
        <section>
          <h2>1. Hook-based Tracking (useTrackClick)</h2>
          <p>Click these buttons to track events using the useTrackClick hook:</p>
          <div>
            <button
              onClick={trackClick('primary_cta_clicked', {
                location: 'demo_page',
                variant: 'blue',
              })}
            >
              Primary CTA
            </button>
            <button
              onClick={trackClick('secondary_cta_clicked', {
                location: 'demo_page',
                variant: 'gray',
              })}
            >
              Secondary CTA
            </button>
            <button
              onClick={trackClick('delete_clicked', { location: 'demo_page', variant: 'red' })}
            >
              Delete Action
            </button>
          </div>
        </section>

        {/* Section 2: Component-based tracking */}
        <section>
          <h2>2. Component-based Tracking (TrackClick)</h2>
          <p>Click these buttons wrapped with the TrackClick component:</p>
          <div>
            <TrackClick
              eventName="signup_clicked"
              metadata={{ campaign: 'demo', source: 'analytics_page' }}
            >
              <button>Sign Up</button>
            </TrackClick>
            <TrackClick eventName="login_clicked" metadata={{ source: 'analytics_page' }}>
              <button>Login</button>
            </TrackClick>
            <TrackClick
              eventName="contact_clicked"
              metadata={{ source: 'analytics_page', type: 'support' }}
            >
              <button>Contact Support</button>
            </TrackClick>
          </div>
        </section>

        {/* Section 3: Custom event tracking */}
        <section>
          <h2>3. Custom Event Tracking (useTrack)</h2>
          <p>Track custom events with arbitrary data:</p>
          <div>
            <p>Counter: {counter}</p>
            <button onClick={handleCustomEvent}>Trigger Custom Event</button>
            <p>This tracks a custom event with counter value and timestamp</p>
          </div>
        </section>

        {/* Section 4: Link tracking */}
        <section>
          <h2>4. Link Tracking</h2>
          <p>Track clicks on navigation links:</p>
          <div>
            <TrackClick eventName="nav_home_clicked" metadata={{ section: 'demo_links' }}>
              <Link href="/">Go to Home</Link>
            </TrackClick>
            <TrackClick eventName="nav_animations_clicked" metadata={{ section: 'demo_links' }}>
              <Link href="/animations">View Animations</Link>
            </TrackClick>
            <TrackClick
              eventName="external_link_clicked"
              metadata={{ destination: 'github', section: 'demo_links' }}
            >
              <a href="https://github.com/tavia-io/tavia" target="_blank" rel="noopener noreferrer">
                GitHub Repository ↗
              </a>
            </TrackClick>
          </div>
        </section>

        {/* Section 5: Info panel */}
        <section>
          <div>
            <h3>🔍 How to View Tracked Events</h3>
            <ol>
              <li>Open browser DevTools (F12)</li>
              <li>Go to Console tab</li>
              <li>Click any button or link above</li>
              <li>
                Look for <code>[Analytics]</code> logs showing captured events
              </li>
              <li>Events are batched and sent every 5 seconds or after 10 events</li>
            </ol>
            <div>
              <strong>Note:</strong> Backend API endpoint (<code>/api/analytics</code>) is not yet
              implemented. Events are logged to console in debug mode.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
