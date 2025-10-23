'use client';

import { useTrackClick, usePageView, useTrack, TrackClick } from '@tavia/analytics';
import { useState } from 'react';
import Link from 'next/link';
import styles from './analytics-demo.module.css';

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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>📊 Analytics Demo</h1>
        <p>Test the @tavia/analytics SDK with various tracking methods</p>
      </header>

      <main className={styles.main}>
        {/* Section 1: Hook-based tracking */}
        <section className={styles.section}>
          <h2>1. Hook-based Tracking (useTrackClick)</h2>
          <p>Click these buttons to track events using the useTrackClick hook:</p>
          <div className={styles.buttonGroup}>
            <button
              className={styles.button}
              onClick={trackClick('primary_cta_clicked', {
                location: 'demo_page',
                variant: 'blue',
              })}
            >
              Primary CTA
            </button>
            <button
              className={`${styles.button} ${styles.secondary}`}
              onClick={trackClick('secondary_cta_clicked', {
                location: 'demo_page',
                variant: 'gray',
              })}
            >
              Secondary CTA
            </button>
            <button
              className={`${styles.button} ${styles.danger}`}
              onClick={trackClick('delete_clicked', { location: 'demo_page', variant: 'red' })}
            >
              Delete Action
            </button>
          </div>
        </section>

        {/* Section 2: Component-based tracking */}
        <section className={styles.section}>
          <h2>2. Component-based Tracking (TrackClick)</h2>
          <p>Click these buttons wrapped with the TrackClick component:</p>
          <div className={styles.buttonGroup}>
            <TrackClick
              eventName="signup_clicked"
              metadata={{ campaign: 'demo', source: 'analytics_page' }}
            >
              <button className={styles.button}>Sign Up</button>
            </TrackClick>
            <TrackClick eventName="login_clicked" metadata={{ source: 'analytics_page' }}>
              <button className={`${styles.button} ${styles.secondary}`}>Login</button>
            </TrackClick>
            <TrackClick
              eventName="contact_clicked"
              metadata={{ source: 'analytics_page', type: 'support' }}
            >
              <button className={`${styles.button} ${styles.success}`}>Contact Support</button>
            </TrackClick>
          </div>
        </section>

        {/* Section 3: Custom event tracking */}
        <section className={styles.section}>
          <h2>3. Custom Event Tracking (useTrack)</h2>
          <p>Track custom events with arbitrary data:</p>
          <div className={styles.card}>
            <p className={styles.counter}>Counter: {counter}</p>
            <button className={styles.button} onClick={handleCustomEvent}>
              Trigger Custom Event
            </button>
            <p className={styles.hint}>
              This tracks a custom event with counter value and timestamp
            </p>
          </div>
        </section>

        {/* Section 4: Link tracking */}
        <section className={styles.section}>
          <h2>4. Link Tracking</h2>
          <p>Track clicks on navigation links:</p>
          <div className={styles.linkGroup}>
            <TrackClick eventName="nav_home_clicked" metadata={{ section: 'demo_links' }}>
              <Link href="/" className={styles.link}>
                Go to Home
              </Link>
            </TrackClick>
            <TrackClick eventName="nav_animations_clicked" metadata={{ section: 'demo_links' }}>
              <Link href="/animations" className={styles.link}>
                View Animations
              </Link>
            </TrackClick>
            <TrackClick
              eventName="external_link_clicked"
              metadata={{ destination: 'github', section: 'demo_links' }}
            >
              <a
                href="https://github.com/tavia-io/tavia"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub Repository ↗
              </a>
            </TrackClick>
          </div>
        </section>

        {/* Section 5: Info panel */}
        <section className={styles.section}>
          <div className={styles.infoPanel}>
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
            <div className={styles.note}>
              <strong>Note:</strong> Backend API endpoint (<code>/api/analytics</code>) is not yet
              implemented. Events are logged to console in debug mode.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
