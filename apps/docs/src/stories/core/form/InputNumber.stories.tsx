import type { Meta, StoryObj } from '@storybook/react';
import { InputNumber, Label, Field } from '@tavia/taviad';
import { useState } from 'react';

const meta: Meta<typeof InputNumber> = {
  title: 'Core/Form/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Number input component with validation, error states, min/max constraints, and accessibility features. Supports controlled and uncontrolled modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      description: 'Visual variant',
      defaultValue: 'default',
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    step: {
      control: 'number',
      description: 'Step increment value',
      defaultValue: 1,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Read-only state',
      defaultValue: false,
    },
    hasClearButton: {
      control: 'boolean',
      description: 'Show clear button',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Enter a number',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter a number',
    value: 42,
  },
};

export const WithMinMax: Story = {
  args: {
    placeholder: 'Enter a number (1-100)',
    min: 1,
    max: 100,
    value: 50,
  },
};

export const WithStep: Story = {
  args: {
    placeholder: 'Enter a number',
    value: 0,
    step: 5,
  },
};

export const WithClearButton: Story = {
  args: {
    placeholder: 'Enter a number',
    hasClearButton: true,
    value: 123,
  },
};

export const SuccessVariant: Story = {
  args: {
    placeholder: 'Enter a number',
    value: 100,
    variant: 'success',
  },
};

export const WarningVariant: Story = {
  args: {
    placeholder: 'Enter a number',
    value: 75,
    variant: 'warning',
  },
};

export const ErrorVariant: Story = {
  args: {
    placeholder: 'Enter a number',
    variant: 'danger',
    errorMessage: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter a number',
    value: 42,
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: 'Enter a number',
    value: 42,
    isReadOnly: true,
  },
};

export const WithValidation: Story = {
  render: (_args) => {
    const [value, setValue] = useState<number | undefined>(undefined);
    const hasError = value !== undefined && (value < 1 || value > 100);

    return (
      <div style={{ width: '300px' }}>
        <InputNumber
          placeholder="Enter a number (1-100)"
          value={value}
          onChange={(e) => setValue(e.target.value ? Number(e.target.value) : undefined)}
          min={1}
          max={100}
          variant={hasError ? 'danger' : undefined}
          errorMessage={hasError ? 'Number must be between 1 and 100' : undefined}
        />
      </div>
    );
  },
  args: {},
};

export const AgeInput: Story = {
  render: (_args) => {
    const [age, setAge] = useState<number | undefined>(undefined);
    const hasError = age !== undefined && (age < 0 || age > 120);

    return (
      <div style={{ width: '300px' }}>
        <Field
          label={
            <Label required>
              Age <span style={{ color: '#e53e3e' }}>*</span>
            </Label>
          }
          input={
            <InputNumber
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)}
              min={0}
              max={120}
              variant={hasError ? 'danger' : undefined}
              errorMessage={hasError ? 'Please enter a valid age (0-120)' : undefined}
            />
          }
        />
      </div>
    );
  },
  args: {},
};

export const PriceInput: Story = {
  render: (_args) => {
    const [price, setPrice] = useState<number>(0);

    return (
      <div style={{ width: '300px' }}>
        <Field
          label={<Label>Price (USD)</Label>}
          input={
            <InputNumber
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : 0)}
              min={0}
              step={0.01}
            />
          }
        />
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
          Total: ${price.toFixed(2)}
        </p>
      </div>
    );
  },
  args: {},
};

export const QuantitySelector: Story = {
  render: (_args) => {
    const [quantity, setQuantity] = useState<number>(1);
    const pricePerItem = 29.99;

    return (
      <div style={{ width: '350px' }}>
        <div
          style={{
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Product Name</h4>
          <Field
            label={<Label>Quantity</Label>}
            input={
              <InputNumber
                value={quantity}
                onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : 1)}
                min={1}
                max={99}
                step={1}
              />
            }
          />
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 600 }}>Total:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>
              ${(quantity * pricePerItem).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  },
  args: {},
};

export const FormWithValidation: Story = {
  render: (_args) => {
    const [formData, setFormData] = useState({
      age: undefined as number | undefined,
      weight: undefined as number | undefined,
      height: undefined as number | undefined,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.age) newErrors.age = 'Age is required';
      else if (formData.age < 0 || formData.age > 120)
        newErrors.age = 'Age must be between 0 and 120';

      if (!formData.weight) newErrors.weight = 'Weight is required';
      else if (formData.weight < 1 || formData.weight > 500)
        newErrors.weight = 'Weight must be between 1 and 500 kg';

      if (!formData.height) newErrors.height = 'Height is required';
      else if (formData.height < 50 || formData.height > 300)
        newErrors.height = 'Height must be between 50 and 300 cm';

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
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Health Information</h3>

        <div>
          <Field
            label={
              <Label required>
                Age (years) <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <InputNumber
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                min={0}
                max={120}
                variant={errors.age ? 'danger' : undefined}
                errorMessage={errors.age}
              />
            }
          />
        </div>

        <div>
          <Field
            label={
              <Label required>
                Weight (kg) <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <InputNumber
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                min={1}
                max={500}
                step={0.1}
                variant={errors.weight ? 'danger' : undefined}
                errorMessage={errors.weight}
              />
            }
          />
        </div>

        <div>
          <Field
            label={
              <Label required>
                Height (cm) <span style={{ color: '#e53e3e' }}>*</span>
              </Label>
            }
            input={
              <InputNumber
                placeholder="Enter your height"
                value={formData.height}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                min={50}
                max={300}
                variant={errors.height ? 'danger' : undefined}
                errorMessage={errors.height}
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
          Submit
        </button>
      </form>
    );
  },
  args: {},
};

export const AllVariants: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <div>
        <Label>Default</Label>
        <InputNumber placeholder="Enter a number" value={42} />
      </div>
      <div>
        <Label>Success</Label>
        <InputNumber placeholder="Enter a number" value={100} variant="success" />
      </div>
      <div>
        <Label>Warning</Label>
        <InputNumber placeholder="Enter a number" value={75} variant="warning" />
      </div>
      <div>
        <Label>Error</Label>
        <InputNumber placeholder="Enter a number" variant="danger" errorMessage="Invalid number" />
      </div>
      <div>
        <Label>Disabled</Label>
        <InputNumber placeholder="Enter a number" value={42} isDisabled />
      </div>
      <div>
        <Label>Read-only</Label>
        <InputNumber placeholder="Enter a number" value={42} isReadOnly />
      </div>
    </div>
  ),
  args: {},
};
