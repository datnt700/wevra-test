import type { Meta, StoryObj } from '@storybook/react';
import { Field, InputText, Label, Switch, TextArea, Select } from '@tavia/core';
import { useState } from 'react';

const meta: Meta<typeof Field> = {
  title: 'Core/Form/Field',
  component: Field,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Field component for grouping form labels with inputs. Supports column (stacked) and row (inline) layouts with validation states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['column', 'row'],
      description: 'Layout orientation (column or row)',
      defaultValue: 'column',
    },
    label: {
      control: false,
      description: 'Label element for the field',
    },
    input: {
      control: false,
      description: 'Input element for the field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: <Label>Email Address</Label>,
    input: <InputText placeholder="Enter your email" />,
    type: 'column',
  },
};

export const RowLayout: Story = {
  args: {
    label: <Label>Remember Me</Label>,
    input: <Switch />,
    type: 'row',
  },
};

export const ColumnLayout: Story = {
  args: {
    label: <Label>Full Name</Label>,
    input: <InputText placeholder="John Doe" />,
    type: 'column',
  },
};

export const WithTextArea: Story = {
  args: {
    label: <Label>Description</Label>,
    input: <TextArea placeholder="Enter a description..." rows={4} />,
    type: 'column',
  },
};

export const WithSelect: Story = {
  args: {
    label: <Label>Country</Label>,
    input: (
      <Select
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
        ]}
        placeholder="Select a country"
      />
    ),
    type: 'column',
  },
};

export const RequiredField: Story = {
  args: {
    label: (
      <Label>
        Password <span style={{ color: '#e53e3e' }}>*</span>
      </Label>
    ),
    input: <InputText type="password" placeholder="Enter password" />,
    type: 'column',
  },
};

export const WithValidationError: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');
    const hasError = value.length > 0 && value.length < 3;

    return (
      <div style={{ width: '300px' }}>
        <Field
          label={
            <Label>
              Username <span style={{ color: '#e53e3e' }}>*</span>
            </Label>
          }
          input={
            <InputText
              placeholder="Enter username"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ borderColor: hasError ? '#e53e3e' : undefined }}
            />
          }
          type="column"
        />
        {hasError && (
          <p style={{ color: '#e53e3e', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Username must be at least 3 characters
          </p>
        )}
      </div>
    );
  },
  args: {},
};

export const WithHelpText: Story = {
  render: (_args) => (
    <div style={{ width: '300px' }}>
      <Field
        label={<Label>API Key</Label>}
        input={<InputText placeholder="Enter your API key" />}
        type="column"
      />
      <p style={{ color: '#666', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
        You can find your API key in your account settings
      </p>
    </div>
  ),
  args: {},
};

export const CompleteForm: Story = {
  render: (_args) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subscribe: false,
      country: '',
      message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.country) newErrors.country = 'Please select a country';

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <div>
          <Field
            label={
              <Label>
                Full Name <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <InputText
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ borderColor: errors.name ? '#e53e3e' : undefined }}
              />
            }
            type="column"
          />
          {errors.name && (
            <p style={{ color: '#e53e3e', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Field
            label={
              <Label>
                Email <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <InputText
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ borderColor: errors.email ? '#e53e3e' : undefined }}
              />
            }
            type="column"
          />
          {errors.email && (
            <p style={{ color: '#e53e3e', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <Field
            label={
              <Label>
                Country <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <Select
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'ca', label: 'Canada' },
                ]}
                placeholder="Select a country"
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
                isInvalid={!!errors.country}
              />
            }
            type="column"
          />
          {errors.country && (
            <p style={{ color: '#e53e3e', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
              {errors.country}
            </p>
          )}
        </div>

        <Field
          label={<Label>Message</Label>}
          input={
            <TextArea
              placeholder="Your message..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          }
          type="column"
        />

        <Field
          label={<Label>Subscribe to newsletter</Label>}
          input={
            <Switch
              checked={formData.subscribe}
              onCheckedChange={(checked) => setFormData({ ...formData, subscribe: checked })}
            />
          }
          type="row"
        />

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Submit
        </button>
      </form>
    );
  },
  args: {},
};
