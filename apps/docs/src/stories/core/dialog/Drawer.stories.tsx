import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, Button, InputText, Checkbox } from '@eventure/eventured';
import { useState } from 'react';

/**
 * Drawer component - Slide-in panel for navigation, forms, and additional content.
 *
 * Features:
 * - Four position variants (right, left, top, bottom)
 * - Smooth slide animations with transitions
 * - Keyboard navigation (Escape key to close)
 * - Click overlay to close
 * - Portal rendering for proper layering
 * - Accessible ARIA attributes
 * - Optional header and footer sections
 */
const meta: Meta<typeof Drawer> = {
  title: 'Core/Dialog/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Content for the drawer header',
    },
    footer: {
      control: false,
      description: 'Content for the drawer footer',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the drawer',
    },
    isOpen: {
      control: false,
      description: 'Controls whether the drawer is open',
    },
    onClose: {
      control: false,
      description: 'Function to close the drawer',
    },
    children: {
      control: false,
      description: 'Drawer content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Basic drawer from the right side (default position).
 */
export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Basic Drawer"
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <p>This is a basic drawer that slides in from the right side.</p>
          <p>Click the X button, press Escape, or click the overlay to close.</p>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer from the left side - ideal for navigation menus.
 */
export const LeftPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Navigation Menu"
          position="left"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a
              href="#"
              style={{
                padding: '0.75rem',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                background: '#f3f4f6',
              }}
            >
              Dashboard
            </a>
            <a
              href="#"
              style={{
                padding: '0.75rem',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                background: '#f3f4f6',
              }}
            >
              Products
            </a>
            <a
              href="#"
              style={{
                padding: '0.75rem',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                background: '#f3f4f6',
              }}
            >
              Orders
            </a>
            <a
              href="#"
              style={{
                padding: '0.75rem',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                background: '#f3f4f6',
              }}
            >
              Customers
            </a>
            <a
              href="#"
              style={{
                padding: '0.75rem',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                background: '#f3f4f6',
              }}
            >
              Analytics
            </a>
            <a
              href="#"
              style={{
                padding: '0.75rem',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                background: '#f3f4f6',
              }}
            >
              Settings
            </a>
          </nav>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer from the top - useful for notifications or alerts.
 */
export const TopPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Top Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Notifications"
          position="top"
          footer={<Button onClick={() => setIsOpen(false)}>Dismiss All</Button>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '0.375rem',
                  borderLeft: '4px solid #3b82f6',
                }}
              >
                <strong>Notification {i}</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#666' }}>
                  This is notification message {i}
                </p>
              </div>
            ))}
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer from the bottom - good for mobile action sheets.
 */
export const BottomPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Share Options"
          position="bottom"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Button onClick={() => setIsOpen(false)}>Share via Email</Button>
            <Button onClick={() => setIsOpen(false)}>Share via Link</Button>
            <Button onClick={() => setIsOpen(false)}>Share via Social Media</Button>
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Cancel
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer with a form for user input.
 */
export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Add New Product"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Product</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Product Name
              </label>
              <InputText placeholder="Enter product name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Price
              </label>
              <InputText placeholder="0.00" type="number" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Description
              </label>
              <textarea
                placeholder="Enter product description"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  minHeight: '100px',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <div>
              <Checkbox label="In Stock" />
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer without a header - minimalist design.
 */
export const WithoutHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Headerless Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <h2 style={{ marginTop: 0 }}>Custom Content</h2>
          <p>This drawer has no header, giving you full control over the content layout.</p>
          <p>The close button still appears in the top-right corner for accessibility.</p>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer without a footer.
 */
export const WithoutFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Footerless Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} header="Information">
          <p>This drawer has no footer section.</p>
          <p>Close it by clicking the X, pressing Escape, or clicking the overlay.</p>
          <p>This is useful for simple content that doesn't require action buttons.</p>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer with long scrollable content.
 */
export const WithScrollContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer with Long Content</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Terms and Conditions"
          footer={<Button onClick={() => setIsOpen(false)}>I Agree</Button>}
        >
          <div>
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
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            ))}
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Drawer for filtering products.
 */
export const FilterDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Filter Products"
          position="left"
          footer={
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Clear All
              </Button>
              <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h4 style={{ marginTop: 0 }}>Category</h4>
              <Checkbox label="Electronics" />
              <Checkbox label="Clothing" />
              <Checkbox label="Home & Garden" />
              <Checkbox label="Sports" />
            </div>
            <div>
              <h4>Price Range</h4>
              <Checkbox label="Under $25" />
              <Checkbox label="$25 - $50" />
              <Checkbox label="$50 - $100" />
              <Checkbox label="Over $100" />
            </div>
            <div>
              <h4>Brand</h4>
              <Checkbox label="Brand A" />
              <Checkbox label="Brand B" />
              <Checkbox label="Brand C" />
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Shopping cart drawer from the right.
 */
export const ShoppingCart: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Cart (3 items)</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Shopping Cart"
          footer={
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                }}
              >
                <span>Total:</span>
                <span>$147.00</span>
              </div>
              <Button onClick={() => setIsOpen(false)}>Proceed to Checkout</Button>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Wireless Headphones', price: 79.99, qty: 1 },
              { name: 'Phone Case', price: 19.99, qty: 2 },
              { name: 'USB Cable', price: 12.99, qty: 2 },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: '#f3f4f6',
                    borderRadius: '0.375rem',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{item.name}</strong>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
                    Qty: {item.qty}
                  </p>
                  <p style={{ margin: 0, fontWeight: 600 }}>${item.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * User profile settings drawer.
 */
export const ProfileSettings: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Profile Settings</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Profile Settings"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#e5e7eb',
                  margin: '0 auto 0.5rem',
                }}
              />
              <Button variant="secondary">Change Avatar</Button>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Full Name
              </label>
              <InputText placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email
              </label>
              <InputText
                placeholder="john@example.com"
                defaultValue="john@example.com"
                type="email"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Phone
              </label>
              <InputText placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
            </div>
            <div>
              <h4 style={{ marginTop: 0 }}>Preferences</h4>
              <Checkbox label="Email notifications" />
              <Checkbox label="SMS notifications" />
              <Checkbox label="Newsletter subscription" />
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Help & support drawer with sections.
 */
export const HelpDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Get Help</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} header="Help & Support">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ marginTop: 0 }}>Common Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a
                  href="#"
                  style={{
                    padding: '0.75rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                  }}
                >
                  How do I reset my password?
                </a>
                <a
                  href="#"
                  style={{
                    padding: '0.75rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                  }}
                >
                  How do I update my billing info?
                </a>
                <a
                  href="#"
                  style={{
                    padding: '0.75rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                  }}
                >
                  How do I cancel my subscription?
                </a>
              </div>
            </div>
            <div>
              <h3>Contact Support</h3>
              <p>Email: support@example.com</p>
              <p>Phone: +1 (800) 123-4567</p>
              <p>Hours: Mon-Fri 9am-5pm EST</p>
            </div>
            <Button onClick={() => setIsOpen(false)}>Start Live Chat</Button>
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Notification center with badges.
 */
export const NotificationCenter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Notifications (5)</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Notifications"
          footer={
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Mark All as Read
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                type: 'success',
                title: 'Order Shipped',
                message: 'Your order #12345 has been shipped',
                time: '2 hours ago',
              },
              {
                type: 'info',
                title: 'New Feature',
                message: 'Check out our new dashboard analytics',
                time: '5 hours ago',
              },
              {
                type: 'warning',
                title: 'Payment Due',
                message: 'Your subscription renews in 3 days',
                time: '1 day ago',
              },
              {
                type: 'error',
                title: 'Action Required',
                message: 'Please verify your email address',
                time: '2 days ago',
              },
              {
                type: 'info',
                title: 'Weekly Summary',
                message: 'Your weekly report is ready',
                time: '3 days ago',
              },
            ].map((notif, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '0.375rem',
                  borderLeft: `4px solid ${notif.type === 'success' ? '#10b981' : notif.type === 'error' ? '#ef4444' : notif.type === 'warning' ? '#f59e0b' : '#3b82f6'}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.25rem',
                  }}
                >
                  <strong>{notif.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>{notif.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>{notif.message}</p>
              </div>
            ))}
          </div>
        </Drawer>
      </>
    );
  },
};

/**
 * Showcase of all drawer positions and configurations.
 */
export const AllVariants: Story = {
  render: () => {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <Button onClick={() => setOpenDrawer('right')}>Right (Default)</Button>
        <Button onClick={() => setOpenDrawer('left')}>Left</Button>
        <Button onClick={() => setOpenDrawer('top')}>Top</Button>
        <Button onClick={() => setOpenDrawer('bottom')}>Bottom</Button>
        <Button onClick={() => setOpenDrawer('withForm')}>With Form</Button>
        <Button onClick={() => setOpenDrawer('cart')}>Shopping Cart</Button>

        {/* Right Drawer */}
        <Drawer
          isOpen={openDrawer === 'right'}
          onClose={() => setOpenDrawer(null)}
          header="Right Drawer"
          footer={<Button onClick={() => setOpenDrawer(null)}>Close</Button>}
        >
          <p>Default drawer from the right side.</p>
        </Drawer>

        {/* Left Drawer */}
        <Drawer
          isOpen={openDrawer === 'left'}
          onClose={() => setOpenDrawer(null)}
          header="Left Drawer"
          position="left"
          footer={<Button onClick={() => setOpenDrawer(null)}>Close</Button>}
        >
          <p>Drawer from the left side - great for navigation.</p>
        </Drawer>

        {/* Top Drawer */}
        <Drawer
          isOpen={openDrawer === 'top'}
          onClose={() => setOpenDrawer(null)}
          header="Top Drawer"
          position="top"
          footer={<Button onClick={() => setOpenDrawer(null)}>Close</Button>}
        >
          <p>Drawer from the top - useful for notifications.</p>
        </Drawer>

        {/* Bottom Drawer */}
        <Drawer
          isOpen={openDrawer === 'bottom'}
          onClose={() => setOpenDrawer(null)}
          header="Bottom Drawer"
          position="bottom"
          footer={<Button onClick={() => setOpenDrawer(null)}>Close</Button>}
        >
          <p>Drawer from the bottom - ideal for mobile action sheets.</p>
        </Drawer>

        {/* With Form */}
        <Drawer
          isOpen={openDrawer === 'withForm'}
          onClose={() => setOpenDrawer(null)}
          header="Form Example"
          footer={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setOpenDrawer(null)}>
                Cancel
              </Button>
              <Button onClick={() => setOpenDrawer(null)}>Submit</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <InputText placeholder="Name" />
            <InputText placeholder="Email" type="email" />
            <textarea
              placeholder="Message"
              style={{
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                minHeight: '80px',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </Drawer>

        {/* Cart */}
        <Drawer
          isOpen={openDrawer === 'cart'}
          onClose={() => setOpenDrawer(null)}
          header="Shopping Cart (3)"
          footer={
            <div style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                }}
              >
                <span>Total:</span>
                <span>$147.00</span>
              </div>
              <Button onClick={() => setOpenDrawer(null)}>Checkout</Button>
            </div>
          }
        >
          <p>3 items in your cart</p>
          <p>Ready to proceed to checkout?</p>
        </Drawer>
      </div>
    );
  },
};
