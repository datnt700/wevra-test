import type { Meta, StoryObj } from '@storybook/react';
import { LoadingScreen, Spinner } from '@tavia/core';
import { useState, useEffect } from 'react';

/**
 * LoadingScreen component - Full-screen loading indicator for app initialization.
 *
 * Features:
 * - Full viewport coverage
 * - Centered animated logo
 * - Clean, minimal design
 * - Perfect for app startup/initialization
 *
 * Note: This component has no props - it's a static full-screen loader.
 * The stories demonstrate different use cases and contexts.
 */
const meta: Meta<typeof LoadingScreen> = {
  title: 'Core/Layout/LoadingScreen',
  component: LoadingScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingScreen>;

/**
 * Basic full-screen loading screen.
 * Used during app initialization or page transitions.
 */
export const Basic: Story = {
  render: () => <LoadingScreen />,
};

/**
 * App initialization example.
 * Simulates app loading with automatic dismissal after 2 seconds.
 */
export const AppInitialization: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);

    if (!loading) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Welcome to the App!</h1>
          <p>The app has finished loading.</p>
          <button
            onClick={() => setLoading(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return <LoadingScreen />;
  },
};

/**
 * Route transition loading.
 * Shows loading screen during navigation between pages.
 */
export const RouteTransition: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState('Home');

    const navigate = (page: string) => {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(page);
        setLoading(false);
      }, 1000);
    };

    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div style={{ padding: '2rem' }}>
        <nav style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('Home')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentPage === 'Home' ? '#3b82f6' : '#e5e7eb',
              color: currentPage === 'Home' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Home
          </button>
          <button
            onClick={() => navigate('Dashboard')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentPage === 'Dashboard' ? '#3b82f6' : '#e5e7eb',
              color: currentPage === 'Dashboard' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('Settings')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentPage === 'Settings' ? '#3b82f6' : '#e5e7eb',
              color: currentPage === 'Settings' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Settings
          </button>
        </nav>
        <h1>{currentPage} Page</h1>
        <p>Welcome to the {currentPage} page!</p>
      </div>
    );
  },
};

/**
 * Data loading example.
 * Shows loading screen while fetching data.
 */
export const DataLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
      // Simulate API call
      setTimeout(() => {
        setData([
          { id: 1, title: 'Item 1' },
          { id: 2, title: 'Item 2' },
          { id: 3, title: 'Item 3' },
        ]);
        setLoading(false);
      }, 1500);
    }, []);

    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div style={{ padding: '2rem' }}>
        <h2>Data Loaded Successfully</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          }}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Reload Data
        </button>
      </div>
    );
  },
};

/**
 * Authentication flow example.
 * Shows loading during login/authentication.
 */
export const AuthenticationFlow: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const handleLogin = () => {
      setLoading(true);
      setTimeout(() => {
        setAuthenticated(true);
        setLoading(false);
      }, 2000);
    };

    if (loading) {
      return <LoadingScreen />;
    }

    if (authenticated) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Welcome Back!</h1>
          <p>You are now logged in.</p>
          <button
            onClick={() => {
              setAuthenticated(false);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
        }}
      >
        <div
          style={{
            width: '400px',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Login</h2>
          <input
            type="email"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  },
};

/**
 * With overlay context.
 * Shows how LoadingScreen looks with page content underneath.
 */
export const WithOverlay: Story = {
  render: () => {
    const [showLoading, setShowLoading] = useState(false);

    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Page content */}
        <div style={{ padding: '2rem' }}>
          <h1>Page Content</h1>
          <p>This content is underneath the loading screen.</p>
          <button
            onClick={() => {
              setShowLoading(true);
              setTimeout(() => setShowLoading(false), 2000);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Show Loading Screen
          </button>
        </div>

        {/* Loading overlay */}
        {showLoading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
          >
            <LoadingScreen />
          </div>
        )}
      </div>
    );
  },
};

/**
 * Splash screen style.
 * First screen users see when opening the app.
 */
export const SplashScreen: Story = {
  render: () => {
    const [splash, setSplash] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setSplash(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    if (splash) {
      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1f2937',
          }}
        >
          <LoadingScreen />
          <p style={{ marginTop: '2rem', color: 'white', fontSize: '0.875rem' }}>Version 1.0.0</p>
        </div>
      );
    }

    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>App Loaded</h1>
        <p>Splash screen dismissed after 3 seconds</p>
      </div>
    );
  },
};

/**
 * Inline loading state alternative.
 * Shows how to use Spinner for non-full-screen loading.
 */
export const InlineLoadingAlternative: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <h2>Inline Loading State</h2>
        <p>For non-full-screen loading, use the Spinner component instead:</p>

        <div
          style={{
            padding: '2rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            textAlign: 'center',
          }}
        >
          {loading ? (
            <div>
              <Spinner size="lg" />
              <p style={{ marginTop: '1rem' }}>Loading...</p>
            </div>
          ) : (
            <div>
              <p>Content loaded successfully!</p>
              <button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 2000);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                Reload
              </button>
            </div>
          )}
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          <strong>Note:</strong> Use LoadingScreen for full-page loading, Spinner for inline loading
          states.
        </p>
      </div>
    );
  },
};

/**
 * Comparison: Full-screen vs Inline loading.
 */
export const ComparisonGuide: Story = {
  render: () => {
    const [fullScreenLoading, setFullScreenLoading] = useState(false);
    const [inlineLoading, setInlineLoading] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <h2>When to Use LoadingScreen vs Spinner</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          <div style={{ padding: '1.5rem', border: '2px solid #3b82f6', borderRadius: '0.5rem' }}>
            <h3>LoadingScreen</h3>
            <p>
              <strong>Use for:</strong>
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>App initialization</li>
              <li>Page transitions</li>
              <li>Authentication flows</li>
              <li>Full-page data loading</li>
              <li>Splash screens</li>
            </ul>
            <button
              onClick={() => {
                setFullScreenLoading(true);
                setTimeout(() => setFullScreenLoading(false), 2000);
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
              }}
            >
              Show Example
            </button>
          </div>

          <div style={{ padding: '1.5rem', border: '2px solid #10b981', borderRadius: '0.5rem' }}>
            <h3>Spinner</h3>
            <p>
              <strong>Use for:</strong>
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Button loading states</li>
              <li>Section loading</li>
              <li>Inline content updates</li>
              <li>Form submissions</li>
              <li>Partial page updates</li>
            </ul>
            <button
              onClick={() => {
                setInlineLoading(true);
                setTimeout(() => setInlineLoading(false), 2000);
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {inlineLoading && <Spinner size="sm" />}
              Show Example
            </button>
          </div>
        </div>

        {fullScreenLoading && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
            <LoadingScreen />
          </div>
        )}
      </div>
    );
  },
};
