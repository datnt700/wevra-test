import type { Meta, StoryObj } from '@storybook/react';
import { TextArea, Field, Label } from '@tavia/core';
import { useState } from 'react';

const meta: Meta<typeof TextArea> = {
  title: 'Core/Form/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'TextArea component for multi-line text input with validation states, error messages, and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    validate: {
      control: 'select',
      options: ['error', 'success', 'warning'],
      description: 'Validation state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only state',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
      defaultValue: 4,
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'This is some pre-filled text content.',
    rows: 4,
  },
};

export const WithValidation: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');
    const hasError = value.length > 0 && value.length < 10;

    return (
      <div style={{ width: '400px' }}>
        <TextArea
          placeholder="Enter at least 10 characters..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          validate={hasError ? 'error' : undefined}
          errorMessage={hasError ? 'Text must be at least 10 characters' : undefined}
          rows={4}
        />
      </div>
    );
  },
};

export const WithCharacterCount: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');
    const maxLength = 200;
    const remaining = maxLength - value.length;

    return (
      <div style={{ width: '400px' }}>
        <TextArea
          placeholder="Enter your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          maxLength={maxLength}
        />
        <p
          style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.875rem',
            color: remaining < 20 ? '#e53e3e' : '#666',
          }}
        >
          {remaining} characters remaining
        </p>
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'This field has an error',
    validate: 'error',
    errorMessage: 'This field is required',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This field is disabled',
    disabled: true,
    rows: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'This content is read-only and cannot be edited.',
    readOnly: true,
    rows: 4,
  },
};

export const DifferentSizes: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <div>
        <Label>Small (2 rows)</Label>
        <TextArea placeholder="Small textarea" rows={2} />
      </div>
      <div>
        <Label>Medium (4 rows)</Label>
        <TextArea placeholder="Medium textarea" rows={4} />
      </div>
      <div>
        <Label>Large (8 rows)</Label>
        <TextArea placeholder="Large textarea" rows={8} />
      </div>
    </div>
  ),
};

export const WithFieldComponent: Story = {
  render: (_args) => (
    <div style={{ width: '400px' }}>
      <Field
        label={<Label required>Description</Label>}
        input={<TextArea placeholder="Describe your issue..." rows={6} />}
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: (_args) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      feedback: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.title) newErrors.title = 'Title is required';
      if (formData.description.length < 20)
        newErrors.description = 'Description must be at least 20 characters';

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '500px' }}
      >
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Submit Feedback</h3>

        <div>
          <Field
            label={
              <Label required>
                Title <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <input
                type="text"
                placeholder="Brief title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: errors.title ? '1px solid #e53e3e' : '1px solid #ccc',
                }}
              />
            }
          />
          {errors.title && (
            <p style={{ color: '#e53e3e', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <Field
            label={
              <Label required>
                Description <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <TextArea
                placeholder="Detailed description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                validate={errors.description ? 'error' : undefined}
                errorMessage={errors.description}
                rows={6}
              />
            }
          />
        </div>

        <div>
          <Field
            label={<Label>Additional Feedback (Optional)</Label>}
            input={
              <TextArea
                placeholder="Any other thoughts?"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                rows={4}
              />
            }
          />
        </div>

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
          Submit Feedback
        </button>
      </form>
    );
  },
};
