import { Meta, StoryObj } from '@storybook/react';
import { CheckboxCard, Button } from '@tavia/taviad';
import { useState } from 'react';

/**
 * CheckboxCard component - Visually enhanced checkbox with label and description.
 *
 * Features:
 * - Card-like presentation with clickable surface
 * - Clear visual state (checked/unchecked)
 * - Label and description for context
 * - Built with Radix UI for accessibility
 * - Keyboard navigation support
 * - Perfect for feature selection and preferences
 *
 * Best Practices:
 * - Use for mutually non-exclusive choices
 * - Keep labels concise and descriptive
 * - Use descriptions to clarify options
 * - Group related options together
 * - Show visual feedback on hover/focus
 * - Consider mobile touch targets
 */
const meta: Meta<typeof CheckboxCard> = {
  title: 'Core/Radix/CheckboxCard',
  component: CheckboxCard,
  argTypes: {
    label: {
      control: 'text',
      description: 'The main label or title',
    },
    description: {
      control: 'text',
      description: 'Additional context or details',
    },
    checked: {
      control: 'boolean',
      description: 'Selected state',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when state changes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxCard>;

/**
 * Basic checkbox card - single selectable option.
 */
export const Basic: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <CheckboxCard
        label="Enable notifications"
        description="Receive email updates about your account"
        checked={checked}
        onCheckedChange={(newChecked) => {
          if (typeof newChecked === 'boolean') setChecked(newChecked);
        }}
      />
    );
  },
};

/**
 * Multiple cards - select one or more options.
 */
export const MultipleCards: Story = {
  render: () => {
    const [selections, setSelections] = useState<Record<string, boolean>>({
      email: true,
      sms: false,
      push: true,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setSelections((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <CheckboxCard
          label="Email notifications"
          description="Receive updates via email"
          checked={selections.email}
          onCheckedChange={handleChange('email')}
        />
        <CheckboxCard
          label="SMS notifications"
          description="Get text messages for important alerts"
          checked={selections.sms}
          onCheckedChange={handleChange('sms')}
        />
        <CheckboxCard
          label="Push notifications"
          description="Browser and mobile app notifications"
          checked={selections.push}
          onCheckedChange={handleChange('push')}
        />
      </div>
    );
  },
};

/**
 * Product selection - choose products with features.
 */
export const ProductSelection: Story = {
  render: () => {
    const [products, setProducts] = useState<Record<string, boolean>>({
      keyboard: false,
      mouse: false,
      mat: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setProducts((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    const total =
      (products.keyboard ? 159 : 0) + (products.mouse ? 79 : 0) + (products.mat ? 49 : 0);

    return (
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <CheckboxCard
            label="A1 Keyboard"
            description="Mechanical · RGB · $159"
            checked={products.keyboard}
            onCheckedChange={handleChange('keyboard')}
          />
          <CheckboxCard
            label="Pro Mouse"
            description="Wireless · Ergonomic · $79"
            checked={products.mouse}
            onCheckedChange={handleChange('mouse')}
          />
          <CheckboxCard
            label="Lightning Mat"
            description="XL Size · RGB · $49"
            checked={products.mat}
            onCheckedChange={handleChange('mat')}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#f9fafb',
            borderRadius: '8px',
          }}
        >
          <span style={{ fontWeight: 600 }}>Total:</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>${total}</span>
        </div>
      </div>
    );
  },
};

/**
 * Plan features - select add-ons for a subscription.
 */
export const PlanFeatures: Story = {
  render: () => {
    const [features, setFeatures] = useState<Record<string, boolean>>({
      analytics: true,
      support: false,
      api: false,
      storage: true,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setFeatures((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Customize Your Plan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxCard
            label="Advanced Analytics"
            description="Real-time insights and custom reports · +$29/mo"
            checked={features.analytics}
            onCheckedChange={handleChange('analytics')}
          />
          <CheckboxCard
            label="Priority Support"
            description="24/7 support with 1-hour response time · +$49/mo"
            checked={features.support}
            onCheckedChange={handleChange('support')}
          />
          <CheckboxCard
            label="API Access"
            description="REST API with 10,000 requests/month · +$19/mo"
            checked={features.api}
            onCheckedChange={handleChange('api')}
          />
          <CheckboxCard
            label="Extra Storage"
            description="Additional 500GB cloud storage · +$15/mo"
            checked={features.storage}
            onCheckedChange={handleChange('storage')}
          />
        </div>
      </div>
    );
  },
};

/**
 * With icons - visual enhancements.
 */
export const WithIcons: Story = {
  render: () => {
    const [preferences, setPreferences] = useState<Record<string, boolean>>({
      darkMode: true,
      animations: true,
      sounds: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setPreferences((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <CheckboxCard
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🌙</span>
              <span>Dark Mode</span>
            </div>
          }
          description="Reduce eye strain in low light"
          checked={preferences.darkMode}
          onCheckedChange={handleChange('darkMode')}
        />
        <CheckboxCard
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✨</span>
              <span>Smooth Animations</span>
            </div>
          }
          description="Enable transitions and effects"
          checked={preferences.animations}
          onCheckedChange={handleChange('animations')}
        />
        <CheckboxCard
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔊</span>
              <span>Sound Effects</span>
            </div>
          }
          description="Play audio feedback for actions"
          checked={preferences.sounds}
          onCheckedChange={handleChange('sounds')}
        />
      </div>
    );
  },
};

/**
 * Consent form - legal agreements and terms.
 */
export const ConsentForm: Story = {
  render: () => {
    const [consents, setConsents] = useState<Record<string, boolean>>({
      terms: false,
      privacy: false,
      marketing: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setConsents((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    const canSubmit = consents.terms && consents.privacy;

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Before you continue</h3>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}
        >
          <CheckboxCard
            label="Terms of Service"
            description="I agree to the terms and conditions (Required)"
            checked={consents.terms}
            onCheckedChange={handleChange('terms')}
          />
          <CheckboxCard
            label="Privacy Policy"
            description="I have read and accept the privacy policy (Required)"
            checked={consents.privacy}
            onCheckedChange={handleChange('privacy')}
          />
          <CheckboxCard
            label="Marketing Communications"
            description="Send me updates and promotional offers (Optional)"
            checked={consents.marketing}
            onCheckedChange={handleChange('marketing')}
          />
        </div>
        <Button variant="primary" disabled={!canSubmit} style={{ width: '100%' }}>
          {canSubmit ? 'Continue' : 'Please accept required terms'}
        </Button>
      </div>
    );
  },
};

/**
 * Service selection - choose multiple services.
 */
export const ServiceSelection: Story = {
  render: () => {
    const [services, setServices] = useState<Record<string, boolean>>({
      hosting: true,
      domain: true,
      ssl: false,
      backup: false,
      cdn: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setServices((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    const selectedCount = Object.values(services).filter(Boolean).length;

    return (
      <div style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3>Select Services</h3>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            {selectedCount} {selectedCount === 1 ? 'service' : 'services'} selected
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <CheckboxCard
            label="Web Hosting"
            description="99.9% uptime · 10GB SSD"
            checked={services.hosting}
            onCheckedChange={handleChange('hosting')}
          />
          <CheckboxCard
            label="Domain Name"
            description="Free for first year"
            checked={services.domain}
            onCheckedChange={handleChange('domain')}
          />
          <CheckboxCard
            label="SSL Certificate"
            description="Secure HTTPS connection"
            checked={services.ssl}
            onCheckedChange={handleChange('ssl')}
          />
          <CheckboxCard
            label="Daily Backups"
            description="Automatic backups · 30-day retention"
            checked={services.backup}
            onCheckedChange={handleChange('backup')}
          />
          <CheckboxCard
            label="CDN Service"
            description="Global content delivery"
            checked={services.cdn}
            onCheckedChange={handleChange('cdn')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Workshop registration - select sessions to attend.
 */
export const WorkshopRegistration: Story = {
  render: () => {
    const [sessions, setSessions] = useState<Record<string, boolean>>({
      intro: true,
      advanced: false,
      design: false,
      deployment: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setSessions((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Tech Conference 2024</h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Select the workshops you&apos;d like to attend
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxCard
            label="Introduction to React"
            description="9:00 AM - 11:00 AM · Room A · Beginner"
            checked={sessions.intro}
            onCheckedChange={handleChange('intro')}
          />
          <CheckboxCard
            label="Advanced TypeScript"
            description="11:30 AM - 1:30 PM · Room B · Advanced"
            checked={sessions.advanced}
            onCheckedChange={handleChange('advanced')}
          />
          <CheckboxCard
            label="Design Systems"
            description="2:00 PM - 4:00 PM · Room C · Intermediate"
            checked={sessions.design}
            onCheckedChange={handleChange('design')}
          />
          <CheckboxCard
            label="CI/CD & Deployment"
            description="4:30 PM - 6:30 PM · Room D · Intermediate"
            checked={sessions.deployment}
            onCheckedChange={handleChange('deployment')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Permission settings - granular access control.
 */
export const PermissionSettings: Story = {
  render: () => {
    const [permissions, setPermissions] = useState<Record<string, boolean>>({
      read: true,
      write: true,
      delete: false,
      share: false,
      admin: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setPermissions((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>User Permissions</h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Configure access rights for this user
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <CheckboxCard
            label="Read Access"
            description="View files and folders"
            checked={permissions.read}
            onCheckedChange={handleChange('read')}
          />
          <CheckboxCard
            label="Write Access"
            description="Create and edit content"
            checked={permissions.write}
            onCheckedChange={handleChange('write')}
          />
          <CheckboxCard
            label="Delete Access"
            description="Remove files permanently"
            checked={permissions.delete}
            onCheckedChange={handleChange('delete')}
          />
          <CheckboxCard
            label="Share Access"
            description="Share with external users"
            checked={permissions.share}
            onCheckedChange={handleChange('share')}
          />
          <CheckboxCard
            label="Admin Access"
            description="Full system control"
            checked={permissions.admin}
            onCheckedChange={handleChange('admin')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Feature toggles - enable/disable features.
 */
export const FeatureToggles: Story = {
  render: () => {
    const [features, setFeatures] = useState<Record<string, boolean>>({
      beta: false,
      experimental: false,
      telemetry: true,
      updates: true,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setFeatures((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ maxWidth: '450px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Feature Flags</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxCard
            label="Beta Features"
            description="Access new features before general release"
            checked={features.beta}
            onCheckedChange={handleChange('beta')}
          />
          <CheckboxCard
            label="Experimental Mode"
            description="⚠️ Warning: May cause instability"
            checked={features.experimental}
            onCheckedChange={handleChange('experimental')}
          />
          <CheckboxCard
            label="Anonymous Telemetry"
            description="Help improve our product with usage data"
            checked={features.telemetry}
            onCheckedChange={handleChange('telemetry')}
          />
          <CheckboxCard
            label="Auto Updates"
            description="Download and install updates automatically"
            checked={features.updates}
            onCheckedChange={handleChange('updates')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Pre-selected cards - showing initial state.
 */
export const PreSelected: Story = {
  render: () => {
    const [options, setOptions] = useState<Record<string, boolean>>({
      option1: true,
      option2: true,
      option3: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setOptions((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          Some options are pre-selected based on your preferences
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxCard
            label="Recommended for you"
            description="Based on your usage patterns"
            checked={options.option1}
            onCheckedChange={handleChange('option1')}
          />
          <CheckboxCard
            label="Popular choice"
            description="Most users enable this feature"
            checked={options.option2}
            onCheckedChange={handleChange('option2')}
          />
          <CheckboxCard
            label="Advanced option"
            description="For power users only"
            checked={options.option3}
            onCheckedChange={handleChange('option3')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Compact layout - minimal spacing.
 */
export const CompactLayout: Story = {
  render: () => {
    const [compact, setCompact] = useState<Record<string, boolean>>({
      c1: true,
      c2: false,
      c3: true,
      c4: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setCompact((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ maxWidth: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <CheckboxCard
            label="Option 1"
            description="Quick description"
            checked={compact.c1}
            onCheckedChange={handleChange('c1')}
          />
          <CheckboxCard
            label="Option 2"
            description="Quick description"
            checked={compact.c2}
            onCheckedChange={handleChange('c2')}
          />
          <CheckboxCard
            label="Option 3"
            description="Quick description"
            checked={compact.c3}
            onCheckedChange={handleChange('c3')}
          />
          <CheckboxCard
            label="Option 4"
            description="Quick description"
            checked={compact.c4}
            onCheckedChange={handleChange('c4')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Grid layout - multiple columns for many options.
 */
export const GridLayout: Story = {
  render: () => {
    const [interests, setInterests] = useState<Record<string, boolean>>({
      tech: true,
      design: true,
      business: false,
      marketing: false,
      finance: false,
      health: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setInterests((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ maxWidth: '700px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Select Your Interests</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <CheckboxCard
            label="Technology"
            description="Software & Hardware"
            checked={interests.tech}
            onCheckedChange={handleChange('tech')}
          />
          <CheckboxCard
            label="Design"
            description="UI/UX & Graphics"
            checked={interests.design}
            onCheckedChange={handleChange('design')}
          />
          <CheckboxCard
            label="Business"
            description="Strategy & Management"
            checked={interests.business}
            onCheckedChange={handleChange('business')}
          />
          <CheckboxCard
            label="Marketing"
            description="Digital & Content"
            checked={interests.marketing}
            onCheckedChange={handleChange('marketing')}
          />
          <CheckboxCard
            label="Finance"
            description="Investing & Trading"
            checked={interests.finance}
            onCheckedChange={handleChange('finance')}
          />
          <CheckboxCard
            label="Health"
            description="Fitness & Wellness"
            checked={interests.health}
            onCheckedChange={handleChange('health')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Showcase of various checkbox card uses.
 */
export const AllVariants: Story = {
  render: () => {
    const [state, setState] = useState<Record<string, boolean>>({
      basic: false,
      withIcon: true,
      detailed: false,
    });

    const handleChange = (key: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setState((prev) => ({ ...prev, [key]: newChecked }));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Basic</h3>
          <CheckboxCard
            label="Simple option"
            description="Clean and minimal"
            checked={state.basic}
            onCheckedChange={handleChange('basic')}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>With Icon</h3>
          <CheckboxCard
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⭐</span>
                <span>Premium Feature</span>
              </div>
            }
            description="Enhanced with visual icon"
            checked={state.withIcon}
            onCheckedChange={handleChange('withIcon')}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Detailed Information</h3>
          <CheckboxCard
            label="Advanced Analytics"
            description="Real-time insights, custom reports, data export · +$29/mo"
            checked={state.detailed}
            onCheckedChange={handleChange('detailed')}
          />
        </div>
      </div>
    );
  },
};
