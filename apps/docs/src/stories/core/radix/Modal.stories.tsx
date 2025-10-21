import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button, InputText, Checkbox } from '@tavia/core';
import { useState } from 'react';

/**
 * Modal component - Dialog overlays with accessibility support.
 *
 * Features:
 * - Three position variants (center, top, bottom)
 * - Keyboard navigation (Escape key to close)
 * - Click overlay to close
 * - Portal rendering for proper layering
 * - Accessible ARIA attributes
 * - Optional header and footer sections
 * - Prevents body scroll when open
 */
const meta: Meta<typeof Modal> = {
  title: 'Core/Radix/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Content for the modal header',
    },
    footer: {
      control: false,
      description: 'Content for the modal footer',
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom'],
      description: 'Position of the modal',
    },
    isOpen: {
      control: false,
      description: 'Controls whether the modal is open',
    },
    onClose: {
      control: false,
      description: 'Function to close the modal',
    },
    children: {
      control: false,
      description: 'Modal content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Basic centered modal with header and footer.
 */
export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Basic Modal"
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <p>This is a basic modal dialog centered on the screen.</p>
          <p>Click the X button, press Escape, or click the overlay to close.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Confirmation dialog - user action confirmation.
 */
export const Confirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Delete Item</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Confirm Deletion"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Delete</Button>
            </div>
          }
        >
          <p>Are you sure you want to delete this item?</p>
          <p style={{ color: '#ef4444', fontWeight: 500 }}>This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Form modal - user input with validation.
 */
export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create Account</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Create New Account"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Create Account</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Full Name
              </label>
              <InputText placeholder="Enter your full name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email
              </label>
              <InputText placeholder="your@email.com" type="email" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Password
              </label>
              <InputText placeholder="Enter password" type="password" />
            </div>
            <div>
              <Checkbox label="I agree to the terms and conditions" />
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Modal without header - minimalist design.
 */
export const WithoutHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Headerless Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={<Button onClick={() => setIsOpen(false)}>Got it</Button>}
        >
          <h2 style={{ marginTop: 0 }}>Welcome!</h2>
          <p>This modal has no header, giving you full control over the content layout.</p>
          <p>The close button still appears in the top-right corner for accessibility.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Modal without footer - simple content display.
 */
export const WithoutFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Details</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} header="Product Details">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.375rem',
              }}
            />
            <h3 style={{ marginTop: 0 }}>Wireless Headphones</h3>
            <p>Premium noise-canceling wireless headphones with 30-hour battery life.</p>
            <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>$299.99</p>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Top position modal - appears at the top of the screen.
 */
export const TopPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Top Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Top Modal"
          position="top"
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <p>This modal appears at the top of the screen.</p>
          <p>Useful for notifications or non-critical information.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Bottom position modal - appears at the bottom (mobile-friendly).
 */
export const BottomPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Bottom Modal"
          position="bottom"
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <p>This modal appears at the bottom of the screen.</p>
          <p>Great for mobile interfaces and quick actions.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Modal with scrollable content - long content handling.
 */
export const WithScrollContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Read Terms</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Terms and Conditions"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Decline
              </Button>
              <Button onClick={() => setIsOpen(false)}>Accept</Button>
            </div>
          }
        >
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <h3>Terms of Service</h3>
            {[...Array(10)].map((_, i) => (
              <div key={i}>
                <h4>Section {i + 1}</h4>
                <p>
                  This is section {i + 1} of the terms and conditions. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur.
                </p>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Success message modal.
 */
export const SuccessMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Complete Action</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Success!"
          footer={<Button onClick={() => setIsOpen(false)}>Continue</Button>}
        >
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ marginTop: 0, color: '#10b981' }}>Payment Successful</h3>
            <p>Your order has been confirmed and will be shipped within 2-3 business days.</p>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>Order #12345</p>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Error message modal.
 */
export const ErrorMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Trigger Error</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Error"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Try Again</Button>
            </div>
          }
        >
          <div style={{ padding: '1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>❌</div>
            <h3 style={{ marginTop: 0, color: '#ef4444' }}>Something went wrong</h3>
            <p>We were unable to process your request. Please try again or contact support.</p>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>Error code: 500</p>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Image gallery modal.
 */
export const ImageGallery: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Gallery</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Image Gallery"
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '0.375rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: '#9ca3af',
                }}
              >
                Image {i + 1}
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Settings modal with tabs.
 */
export const SettingsModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('account');

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Settings"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
            </div>
          }
        >
          <div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '1rem',
              }}
            >
              <button
                onClick={() => setActiveTab('account')}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  borderBottom:
                    activeTab === 'account' ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'account' ? 600 : 400,
                }}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  borderBottom:
                    activeTab === 'privacy' ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'privacy' ? 600 : 400,
                }}
              >
                Privacy
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  borderBottom:
                    activeTab === 'notifications' ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'notifications' ? 600 : 400,
                }}
              >
                Notifications
              </button>
            </div>

            {activeTab === 'account' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Username
                  </label>
                  <InputText defaultValue="john_doe" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Email
                  </label>
                  <InputText defaultValue="john@example.com" type="email" />
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Checkbox label="Profile visible to public" />
                <Checkbox label="Show online status" />
                <Checkbox label="Allow search engines to index my profile" />
              </div>
            )}

            {activeTab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Checkbox label="Email notifications" />
                <Checkbox label="Push notifications" />
                <Checkbox label="SMS notifications" />
                <Checkbox label="Newsletter subscription" />
              </div>
            )}
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Pricing modal with options.
 */
export const PricingModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Pricing</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Choose Your Plan"
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              {
                name: 'Basic',
                price: '$9',
                features: ['10 Projects', '5GB Storage', 'Email Support'],
              },
              {
                name: 'Pro',
                price: '$29',
                features: [
                  'Unlimited Projects',
                  '50GB Storage',
                  'Priority Support',
                  'Advanced Analytics',
                ],
              },
              {
                name: 'Enterprise',
                price: '$99',
                features: [
                  'Unlimited Everything',
                  'Custom Integration',
                  '24/7 Support',
                  'Dedicated Manager',
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  border: i === 1 ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  backgroundColor: i === 1 ? '#eff6ff' : 'white',
                }}
              >
                <h4 style={{ marginTop: 0 }}>{plan.name}</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0' }}>
                  {plan.price}/mo
                </p>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
                  {plan.features.map((feature, j) => (
                    <li key={j}>{feature}</li>
                  ))}
                </ul>
                <Button variant={i === 1 ? 'primary' : 'secondary'}>Select Plan</Button>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Contact form modal.
 */
export const ContactForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Contact Us</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Get in Touch"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Send Message</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Name
              </label>
              <InputText placeholder="Your name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email
              </label>
              <InputText placeholder="your@email.com" type="email" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Subject
              </label>
              <InputText placeholder="How can we help?" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Message
              </label>
              <textarea
                placeholder="Tell us more..."
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  minHeight: '120px',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Showcase of all modal variants and positions.
 */
export const AllVariants: Story = {
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <Button onClick={() => setActiveModal('center')}>Center (Default)</Button>
        <Button onClick={() => setActiveModal('top')}>Top Position</Button>
        <Button onClick={() => setActiveModal('bottom')}>Bottom Position</Button>
        <Button onClick={() => setActiveModal('confirm')}>Confirmation</Button>
        <Button onClick={() => setActiveModal('form')}>With Form</Button>
        <Button onClick={() => setActiveModal('success')}>Success</Button>
        <Button onClick={() => setActiveModal('error')}>Error</Button>

        {/* Center Modal */}
        <Modal
          isOpen={activeModal === 'center'}
          onClose={() => setActiveModal(null)}
          header="Center Modal"
          footer={<Button onClick={() => setActiveModal(null)}>Close</Button>}
        >
          <p>Default centered modal.</p>
        </Modal>

        {/* Top Modal */}
        <Modal
          isOpen={activeModal === 'top'}
          onClose={() => setActiveModal(null)}
          header="Top Modal"
          position="top"
          footer={<Button onClick={() => setActiveModal(null)}>Close</Button>}
        >
          <p>Modal at the top of the screen.</p>
        </Modal>

        {/* Bottom Modal */}
        <Modal
          isOpen={activeModal === 'bottom'}
          onClose={() => setActiveModal(null)}
          header="Bottom Modal"
          position="bottom"
          footer={<Button onClick={() => setActiveModal(null)}>Close</Button>}
        >
          <p>Modal at the bottom - mobile friendly.</p>
        </Modal>

        {/* Confirmation */}
        <Modal
          isOpen={activeModal === 'confirm'}
          onClose={() => setActiveModal(null)}
          header="Confirm Action"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
              <Button onClick={() => setActiveModal(null)}>Confirm</Button>
            </div>
          }
        >
          <p>Are you sure you want to proceed?</p>
        </Modal>

        {/* Form */}
        <Modal
          isOpen={activeModal === 'form'}
          onClose={() => setActiveModal(null)}
          header="Form Example"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
              <Button onClick={() => setActiveModal(null)}>Submit</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <InputText placeholder="Name" />
            <InputText placeholder="Email" type="email" />
          </div>
        </Modal>

        {/* Success */}
        <Modal
          isOpen={activeModal === 'success'}
          onClose={() => setActiveModal(null)}
          header="Success!"
          footer={<Button onClick={() => setActiveModal(null)}>Continue</Button>}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>✅</div>
            <p>Operation completed successfully!</p>
          </div>
        </Modal>

        {/* Error */}
        <Modal
          isOpen={activeModal === 'error'}
          onClose={() => setActiveModal(null)}
          header="Error"
          footer={<Button onClick={() => setActiveModal(null)}>Close</Button>}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>❌</div>
            <p style={{ color: '#ef4444' }}>Something went wrong!</p>
          </div>
        </Modal>
      </div>
    );
  },
};
