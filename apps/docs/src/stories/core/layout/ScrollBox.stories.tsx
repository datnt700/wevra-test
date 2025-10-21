import type { Meta, StoryObj } from '@storybook/react';
import { ScrollBox, Card } from '@tavia/core';

const meta: Meta<typeof ScrollBox> = {
  title: 'Core/Layout/ScrollBox',
  component: ScrollBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'text',
      description: 'Fixed height for the scroll box',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height before scrolling',
    },
    children: {
      control: false,
      description: 'Content to scroll',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollBox>;

export const Basic: Story = {
  render: () => (
    <Card style={{ width: '500px' }}>
      <ScrollBox height="200px">
        <h3 style={{ marginTop: 0 }}>Terms of Service</h3>
        <p>By signing up for the service you are agreeing to be bound by the following terms.</p>
        <p>The Services offered under the Terms of Service include various products.</p>
        <p>Any new features shall be subject to the Terms of Service.</p>
        <p>You must be 18 years or older to use this Service.</p>
      </ScrollBox>
    </Card>
  ),
};

export const ShortContent: Story = {
  render: () => (
    <Card style={{ width: '500px' }}>
      <ScrollBox height="200px">
        <h3 style={{ marginTop: 0 }}>Welcome</h3>
        <p>This content is short and doesn't require scrolling.</p>
      </ScrollBox>
    </Card>
  ),
};

export const WithMaxHeight: Story = {
  render: () => (
    <Card style={{ width: '500px' }}>
      <ScrollBox maxHeight="300px">
        <h3 style={{ marginTop: 0 }}>Product Description</h3>
        <p>This is a comprehensive description of our amazing product.</p>
        <p>The ScrollBox will grow to fit the content until it reaches 300px.</p>
        <p>Once the content exceeds the max height, scrolling will be enabled.</p>
        <p>Shadow indicators will appear at the top and bottom.</p>
        <p>This is particularly useful when you don't know the exact content length.</p>
        <p>More content to ensure we exceed the maximum height.</p>
      </ScrollBox>
    </Card>
  ),
};

export const TallContent: Story = {
  render: () => (
    <Card style={{ width: '500px' }}>
      <ScrollBox height="250px">
        <h3 style={{ marginTop: 0 }}>Privacy Policy</h3>
        {[...Array(10)].map((_, i) => (
          <div key={i}>
            <h4>Section {i + 1}</h4>
            <p>
              This is section {i + 1} of the privacy policy. Your data security is our top priority.
            </p>
          </div>
        ))}
      </ScrollBox>
    </Card>
  ),
};

export const ItemList: Story = {
  render: () => (
    <Card style={{ width: '400px' }}>
      <h3 style={{ margin: '1rem 1rem 0.5rem 1rem' }}>Notifications</h3>
      <ScrollBox height="300px">
        <div style={{ padding: '0 1rem' }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                padding: '0.75rem',
                marginBottom: '0.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.375rem',
                borderLeft: '3px solid #3b82f6',
              }}
            >
              <strong>Notification {i + 1}</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
                This is notification message {i + 1}. Click to view details.
              </p>
            </div>
          ))}
        </div>
      </ScrollBox>
    </Card>
  ),
};

export const ChatMessages: Story = {
  render: () => (
    <div style={{ width: '500px', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: 0 }}>Chat with Support</h3>
      </div>
      <ScrollBox height="400px">
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { sender: 'them', message: 'Hello! How can I help you today?' },
            { sender: 'you', message: 'Hi! I have a question about my order.' },
            { sender: 'them', message: 'Of course! What is your order number?' },
            { sender: 'you', message: 'It is #12345' },
            { sender: 'them', message: 'Let me check that for you...' },
            {
              sender: 'them',
              message: 'Your order is currently being processed and will ship tomorrow.',
            },
            { sender: 'you', message: 'Great! When will it arrive?' },
            { sender: 'them', message: 'Estimated delivery is 3-5 business days.' },
            { sender: 'you', message: 'Perfect, thank you!' },
            { sender: 'them', message: 'You are welcome! Is there anything else I can help with?' },
          ].map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === 'you' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
              }}
            >
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: msg.sender === 'you' ? '#3b82f6' : '#f3f4f6',
                  color: msg.sender === 'you' ? 'white' : '#374151',
                  borderRadius: '0.75rem',
                }}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      </ScrollBox>
      <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <input
          type="text"
          placeholder="Type a message..."
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
          }}
        />
      </div>
    </div>
  ),
};

export const SidebarNavigation: Story = {
  render: () => (
    <div
      style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', borderRadius: '0.5rem' }}
    >
      <div style={{ padding: '1rem', borderBottom: '1px solid #374151' }}>
        <h3 style={{ margin: 0 }}>Dashboard</h3>
      </div>
      <ScrollBox maxHeight="400px">
        <nav>
          {[
            'Overview',
            'Analytics',
            'Reports',
            'Customers',
            'Products',
            'Orders',
            'Inventory',
            'Marketing',
            'Discounts',
            'Content',
            'Online Store',
            'Apps',
            'Settings',
            'Help Center',
            'Support',
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                color: 'white',
                textDecoration: 'none',
                borderBottom: '1px solid #374151',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {item}
            </a>
          ))}
        </nav>
      </ScrollBox>
    </div>
  ),
};

export const TableBody: Story = {
  render: () => (
    <div style={{ width: '600px', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f9fafb' }}>
          <tr>
            <th
              style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}
            >
              Name
            </th>
            <th
              style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}
            >
              Email
            </th>
            <th
              style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}
            >
              Role
            </th>
          </tr>
        </thead>
      </table>
      <ScrollBox height="300px">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {[...Array(20)].map((_, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}>User {i + 1}</td>
                <td style={{ padding: '0.75rem' }}>user{i + 1}@example.com</td>
                <td style={{ padding: '0.75rem' }}>{i % 3 === 0 ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollBox>
    </div>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <div
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#1f2937',
          color: 'white',
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
        }}
      >
        <code>example.tsx</code>
      </div>
      <ScrollBox height="300px">
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
        >
          {`import React from 'react';
import { ScrollBox } from '@tavia/core';

export const MyComponent = () => {
  return (
    <ScrollBox height="400px">
      <div>
        <h1>Hello World</h1>
        <p>This is scrollable content.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <p>Additional content continues...</p>
      </div>
    </ScrollBox>
  );
};

export default MyComponent;`}
        </pre>
      </ScrollBox>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Fixed Height (200px)</h3>
        <Card>
          <ScrollBox height="200px">
            <p>Content with fixed height. Shadows appear when scrolling.</p>
            {[...Array(5)].map((_, i) => (
              <p key={i}>Paragraph {i + 1} with some content to demonstrate scrolling behavior.</p>
            ))}
          </ScrollBox>
        </Card>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Max Height (150px)</h3>
        <Card>
          <ScrollBox maxHeight="150px">
            <p>Content with max height. Grows until max height is reached.</p>
            {[...Array(5)].map((_, i) => (
              <p key={i}>Paragraph {i + 1}.</p>
            ))}
          </ScrollBox>
        </Card>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Short Content (No Scroll)</h3>
        <Card>
          <ScrollBox height="200px">
            <p>This content is short and doesn't need scrolling. No shadows appear.</p>
          </ScrollBox>
        </Card>
      </div>
    </div>
  ),
};
