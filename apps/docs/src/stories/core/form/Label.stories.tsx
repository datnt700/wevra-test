import type { Meta, StoryObj } from '@storybook/react';
import { Label, InputText, Field } from '@eventure/eventured';

const meta: Meta<typeof Label> = {
  title: 'Core/Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label component for form fields with optional required indicator. Supports proper accessibility via htmlFor attribute.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form element',
    },
    required: {
      control: 'boolean',
      description: 'Show required indicator (*)',
      defaultValue: false,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  args: {
    children: 'Email Address',
  },
};

export const Required: Story = {
  args: {
    children: 'Password',
    required: true,
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Label {...args} htmlFor="email-input">
        Email Address
      </Label>
      <InputText id="email-input" placeholder="john@example.com" style={{ marginTop: '0.5rem' }} />
    </div>
  ),
};

export const RequiredWithInput: Story = {
  render: (_args) => (
    <div style={{ width: '300px' }}>
      <Label htmlFor="password-input" required>
        Password
      </Label>
      <InputText
        id="password-input"
        type="password"
        placeholder="Enter password"
        style={{ marginTop: '0.5rem' }}
      />
    </div>
  ),
};

export const VariousLabels: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <div>
        <Label>Optional Field</Label>
      </div>
      <div>
        <Label required>Required Field</Label>
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <InputText id="username" placeholder="Enter username" style={{ marginTop: '0.5rem' }} />
      </div>
      <div>
        <Label htmlFor="bio" required>
          Bio
        </Label>
        <textarea
          id="bio"
          rows={3}
          placeholder="Tell us about yourself"
          style={{
            marginTop: '0.5rem',
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc',
          }}
        />
      </div>
    </div>
  ),
};

export const InlineLabels: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Label htmlFor="agree" style={{ marginBottom: 0 }}>
          I agree to the terms
        </Label>
        <input type="checkbox" id="agree" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Label htmlFor="subscribe" style={{ marginBottom: 0 }}>
          Subscribe to newsletter
        </Label>
        <input type="checkbox" id="subscribe" />
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <div>
        <Label style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>
          Large Blue Label
        </Label>
        <InputText placeholder="Custom styled" style={{ marginTop: '0.5rem' }} />
      </div>
      <div>
        <Label style={{ fontSize: '0.875rem', color: '#666', textTransform: 'uppercase' }}>
          Small Uppercase
        </Label>
        <InputText placeholder="Small label" style={{ marginTop: '0.5rem' }} />
      </div>
    </div>
  ),
};

export const WithFieldComponent: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '350px' }}>
      <Field label={<Label>Full Name</Label>} input={<InputText placeholder="John Doe" />} />
      <Field
        label={<Label required>Email</Label>}
        input={<InputText type="email" placeholder="john@example.com" />}
      />
      <Field
        label={<Label required>Password</Label>}
        input={<InputText type="password" placeholder="Enter password" />}
      />
    </div>
  ),
};
