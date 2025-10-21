import { Meta, StoryObj } from '@storybook/react';
import { RadioCard, Button, Badge } from '@tavia/core';
import { useState } from 'react';

/**
 * RadioCard component - Visually enhanced radio button for mutually exclusive choices.
 *
 * Features:
 * - Card-style presentation with clear selection state
 * - Built with Radix UI for accessibility
 * - Supports header content for rich layouts
 * - Keyboard navigation (arrow keys, Space)
 * - Only one option can be selected at a time
 * - Perfect for pricing plans, payment methods, preferences
 *
 * Best Practices:
 * - Use for mutually exclusive choices (only one selection)
 * - Keep labels clear and concise
 * - Show selected state prominently
 * - Group related options together
 * - Use descriptions to clarify differences
 * - Consider mobile touch targets (min 44x44px)
 */
const meta: Meta<typeof RadioCard> = {
  title: 'Core/Radix/RadioCard',
  component: RadioCard,
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier',
    },
    value: {
      control: 'text',
      description: 'Option value',
    },
    label: {
      control: 'text',
      description: 'Display label',
    },
    checked: {
      control: 'boolean',
      description: 'Selected state',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selected',
    },
    header: {
      description: 'Optional header content',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable interaction',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioCard>;

/**
 * Basic radio cards - simple mutually exclusive choices.
 */
export const Basic: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('option1');

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <RadioCard
          id="basic-1"
          value="option1"
          label="Option 1"
          checked={selected === 'option1'}
          onChange={setSelected}
        />
        <RadioCard
          id="basic-2"
          value="option2"
          label="Option 2"
          checked={selected === 'option2'}
          onChange={setSelected}
        />
        <RadioCard
          id="basic-3"
          value="option3"
          label="Option 3"
          checked={selected === 'option3'}
          onChange={setSelected}
        />
      </div>
    );
  },
};

/**
 * Pricing plans - subscription tier selection.
 */
export const PricingPlans: Story = {
  render: () => {
    const [plan, setPlan] = useState<string>('pro');

    return (
      <div style={{ maxWidth: '900px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Choose Your Plan</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <RadioCard
            id="plan-basic"
            value="basic"
            label="Basic"
            checked={plan === 'basic'}
            onChange={setPlan}
            header={
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>$9</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
              </div>
            }
          />
          <RadioCard
            id="plan-pro"
            value="pro"
            label="Pro"
            checked={plan === 'pro'}
            onChange={setPlan}
            header={
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <Badge style={{ background: '#3b82f6', color: 'white', marginBottom: '0.5rem' }}>
                  Popular
                </Badge>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>$29</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
              </div>
            }
          />
          <RadioCard
            id="plan-enterprise"
            value="enterprise"
            label="Enterprise"
            checked={plan === 'enterprise'}
            onChange={setPlan}
            header={
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>$99</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
              </div>
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Payment methods - select payment type.
 */
export const PaymentMethods: Story = {
  render: () => {
    const [method, setMethod] = useState<string>('card');

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Payment Method</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioCard
            id="payment-card"
            value="card"
            label="Credit or Debit Card"
            checked={method === 'card'}
            onChange={setMethod}
            header={<div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</div>}
          />
          <RadioCard
            id="payment-paypal"
            value="paypal"
            label="PayPal"
            checked={method === 'paypal'}
            onChange={setMethod}
            header={<div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🅿️</div>}
          />
          <RadioCard
            id="payment-bank"
            value="bank"
            label="Bank Transfer"
            checked={method === 'bank'}
            onChange={setMethod}
            header={<div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏦</div>}
          />
          <RadioCard
            id="payment-crypto"
            value="crypto"
            label="Cryptocurrency"
            checked={method === 'crypto'}
            onChange={setMethod}
            header={<div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>₿</div>}
          />
        </div>
      </div>
    );
  },
};

/**
 * Shipping options - delivery speed selection.
 */
export const ShippingOptions: Story = {
  render: () => {
    const [shipping, setShipping] = useState<string>('standard');

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Shipping Method</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <RadioCard
            id="ship-standard"
            value="standard"
            label="Standard Shipping"
            checked={shipping === 'standard'}
            onChange={setShipping}
            header={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>5-7 business days</span>
                <span style={{ fontWeight: 600 }}>FREE</span>
              </div>
            }
          />
          <RadioCard
            id="ship-express"
            value="express"
            label="Express Shipping"
            checked={shipping === 'express'}
            onChange={setShipping}
            header={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>2-3 business days</span>
                <span style={{ fontWeight: 600 }}>$9.99</span>
              </div>
            }
          />
          <RadioCard
            id="ship-overnight"
            value="overnight"
            label="Overnight Shipping"
            checked={shipping === 'overnight'}
            onChange={setShipping}
            header={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Next business day</span>
                <span style={{ fontWeight: 600 }}>$24.99</span>
              </div>
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Billing frequency - monthly vs annual.
 */
export const BillingFrequency: Story = {
  render: () => {
    const [frequency, setFrequency] = useState<string>('annual');

    const monthlyPrice = 29;
    const annualPrice = 290;
    const savings = (monthlyPrice * 12 - annualPrice).toFixed(0);

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Billing Frequency</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <RadioCard
            id="freq-monthly"
            value="monthly"
            label="Monthly"
            checked={frequency === 'monthly'}
            onChange={setFrequency}
            header={
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>${monthlyPrice}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
              </div>
            }
          />
          <RadioCard
            id="freq-annual"
            value="annual"
            label="Annual"
            checked={frequency === 'annual'}
            onChange={setFrequency}
            header={
              <div style={{ marginBottom: '0.5rem' }}>
                <Badge style={{ background: '#10b981', color: 'white', marginBottom: '0.5rem' }}>
                  Save ${savings}
                </Badge>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>${annualPrice}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per year</div>
              </div>
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Template selection - choose design template.
 */
export const TemplateSelection: Story = {
  render: () => {
    const [template, setTemplate] = useState<string>('modern');

    return (
      <div style={{ maxWidth: '800px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Choose a Template</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <RadioCard
            id="temp-modern"
            value="modern"
            label="Modern"
            checked={template === 'modern'}
            onChange={setTemplate}
            header={
              <div
                style={{
                  height: '100px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '6px',
                  marginBottom: '0.75rem',
                }}
              />
            }
          />
          <RadioCard
            id="temp-minimal"
            value="minimal"
            label="Minimal"
            checked={template === 'minimal'}
            onChange={setTemplate}
            header={
              <div
                style={{
                  height: '100px',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  borderRadius: '6px',
                  marginBottom: '0.75rem',
                }}
              />
            }
          />
          <RadioCard
            id="temp-bold"
            value="bold"
            label="Bold"
            checked={template === 'bold'}
            onChange={setTemplate}
            header={
              <div
                style={{
                  height: '100px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  borderRadius: '6px',
                  marginBottom: '0.75rem',
                }}
              />
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Notification preference - how to receive updates.
 */
export const NotificationPreference: Story = {
  render: () => {
    const [preference, setPreference] = useState<string>('email');

    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Notification Preferences</h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
          How would you like to receive notifications?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <RadioCard
            id="notif-email"
            value="email"
            label="Email notifications"
            checked={preference === 'email'}
            onChange={setPreference}
            header={<div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📧</div>}
          />
          <RadioCard
            id="notif-sms"
            value="sms"
            label="SMS notifications"
            checked={preference === 'sms'}
            onChange={setPreference}
            header={<div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>💬</div>}
          />
          <RadioCard
            id="notif-push"
            value="push"
            label="Push notifications"
            checked={preference === 'push'}
            onChange={setPreference}
            header={<div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🔔</div>}
          />
          <RadioCard
            id="notif-none"
            value="none"
            label="No notifications"
            checked={preference === 'none'}
            onChange={setPreference}
            header={<div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🔕</div>}
          />
        </div>
      </div>
    );
  },
};

/**
 * Support plan - select support level.
 */
export const SupportPlan: Story = {
  render: () => {
    const [support, setSupport] = useState<string>('standard');

    return (
      <div style={{ maxWidth: '700px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Support Level</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioCard
            id="support-community"
            value="community"
            label="Community Support"
            checked={support === 'community'}
            onChange={setSupport}
            header={
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>FREE</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Forum access · 48-hour response
                </div>
              </div>
            }
          />
          <RadioCard
            id="support-standard"
            value="standard"
            label="Standard Support"
            checked={support === 'standard'}
            onChange={setSupport}
            header={
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>$49/month</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Email support · 12-hour response · Business hours
                </div>
              </div>
            }
          />
          <RadioCard
            id="support-priority"
            value="priority"
            label="Priority Support"
            checked={support === 'priority'}
            onChange={setSupport}
            header={
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>$149/month</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Phone & email · 2-hour response · 24/7 availability
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Account type - personal vs business.
 */
export const AccountType: Story = {
  render: () => {
    const [accountType, setAccountType] = useState<string>('personal');

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Account Type</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <RadioCard
            id="acc-personal"
            value="personal"
            label="Personal Account"
            checked={accountType === 'personal'}
            onChange={setAccountType}
            header={
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
                  For individual use
                  <br />
                  Personal projects
                  <br />
                  Single user access
                </div>
              </div>
            }
          />
          <RadioCard
            id="acc-business"
            value="business"
            label="Business Account"
            checked={accountType === 'business'}
            onChange={setAccountType}
            header={
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
                  For organizations
                  <br />
                  Team collaboration
                  <br />
                  Multiple users
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Storage plan - select storage tier.
 */
export const StoragePlan: Story = {
  render: () => {
    const [storage, setStorage] = useState<string>('100gb');

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Storage Plan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <RadioCard
            id="storage-50"
            value="50gb"
            label="50 GB"
            checked={storage === '50gb'}
            onChange={setStorage}
            header={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Basic storage</span>
                <span style={{ fontWeight: 600 }}>$5/mo</span>
              </div>
            }
          />
          <RadioCard
            id="storage-100"
            value="100gb"
            label="100 GB"
            checked={storage === '100gb'}
            onChange={setStorage}
            header={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <Badge style={{ background: '#3b82f6', color: 'white', marginRight: 'auto' }}>
                  Recommended
                </Badge>
                <span style={{ fontWeight: 600 }}>$10/mo</span>
              </div>
            }
          />
          <RadioCard
            id="storage-500"
            value="500gb"
            label="500 GB"
            checked={storage === '500gb'}
            onChange={setStorage}
            header={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>For power users</span>
                <span style={{ fontWeight: 600 }}>$25/mo</span>
              </div>
            }
          />
          <RadioCard
            id="storage-1tb"
            value="1tb"
            label="1 TB"
            checked={storage === '1tb'}
            onChange={setStorage}
            header={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Maximum storage</span>
                <span style={{ fontWeight: 600 }}>$50/mo</span>
              </div>
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Pre-selected option - showing initial state.
 */
export const PreSelected: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('option2');

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          Option 2 is pre-selected based on your previous choice
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RadioCard
            id="pre-1"
            value="option1"
            label="Option 1"
            checked={selected === 'option1'}
            onChange={setSelected}
          />
          <RadioCard
            id="pre-2"
            value="option2"
            label="Option 2"
            checked={selected === 'option2'}
            onChange={setSelected}
          />
          <RadioCard
            id="pre-3"
            value="option3"
            label="Option 3"
            checked={selected === 'option3'}
            onChange={setSelected}
          />
        </div>
      </div>
    );
  },
};

/**
 * With form submission - complete flow.
 */
export const WithFormSubmission: Story = {
  render: () => {
    const [plan, setPlan] = useState<string>('pro');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Select Your Plan</h3>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}
        >
          <RadioCard
            id="form-basic"
            value="basic"
            label="Basic - $9/month"
            checked={plan === 'basic'}
            onChange={setPlan}
          />
          <RadioCard
            id="form-pro"
            value="pro"
            label="Pro - $29/month"
            checked={plan === 'pro'}
            onChange={setPlan}
          />
          <RadioCard
            id="form-enterprise"
            value="enterprise"
            label="Enterprise - $99/month"
            checked={plan === 'enterprise'}
            onChange={setPlan}
          />
        </div>
        <Button variant="primary" onClick={handleSubmit} style={{ width: '100%' }}>
          {submitted ? 'Plan Selected!' : 'Continue'}
        </Button>
      </div>
    );
  },
};

/**
 * Vertical layout - stacked cards.
 */
export const VerticalLayout: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('option2');

    return (
      <div style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <RadioCard
            id="vert-1"
            value="option1"
            label="First Option"
            checked={selected === 'option1'}
            onChange={setSelected}
          />
          <RadioCard
            id="vert-2"
            value="option2"
            label="Second Option"
            checked={selected === 'option2'}
            onChange={setSelected}
          />
          <RadioCard
            id="vert-3"
            value="option3"
            label="Third Option"
            checked={selected === 'option3'}
            onChange={setSelected}
          />
          <RadioCard
            id="vert-4"
            value="option4"
            label="Fourth Option"
            checked={selected === 'option4'}
            onChange={setSelected}
          />
        </div>
      </div>
    );
  },
};

/**
 * Showcase of various radio card configurations.
 */
export const AllVariants: Story = {
  render: () => {
    const [basic, setBasic] = useState<string>('option1');
    const [withHeader, setWithHeader] = useState<string>('plan2');
    const [withIcon, setWithIcon] = useState<string>('method1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Basic Radio Cards</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <RadioCard
              id="var-basic-1"
              value="option1"
              label="Option 1"
              checked={basic === 'option1'}
              onChange={setBasic}
            />
            <RadioCard
              id="var-basic-2"
              value="option2"
              label="Option 2"
              checked={basic === 'option2'}
              onChange={setBasic}
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>With Header Content</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              maxWidth: '600px',
            }}
          >
            <RadioCard
              id="var-header-1"
              value="plan1"
              label="Basic"
              checked={withHeader === 'plan1'}
              onChange={setWithHeader}
              header={
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>$9</div>
                </div>
              }
            />
            <RadioCard
              id="var-header-2"
              value="plan2"
              label="Pro"
              checked={withHeader === 'plan2'}
              onChange={setWithHeader}
              header={
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>$29</div>
                </div>
              }
            />
            <RadioCard
              id="var-header-3"
              value="plan3"
              label="Enterprise"
              checked={withHeader === 'plan3'}
              onChange={setWithHeader}
              header={
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>$99</div>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>With Icons</h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '400px' }}
          >
            <RadioCard
              id="var-icon-1"
              value="method1"
              label="Credit Card"
              checked={withIcon === 'method1'}
              onChange={setWithIcon}
              header={<div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</div>}
            />
            <RadioCard
              id="var-icon-2"
              value="method2"
              label="PayPal"
              checked={withIcon === 'method2'}
              onChange={setWithIcon}
              header={<div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🅿️</div>}
            />
          </div>
        </div>
      </div>
    );
  },
};
