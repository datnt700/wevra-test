import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '@eventure/eventured';
import { useState } from 'react';

/**
 * Stepper component - a number input with increment/decrement buttons.
 *
 * Features:
 * - Increment/decrement buttons with icons
 * - Min/max value constraints
 * - Custom step values
 * - Error state validation
 * - Disabled and read-only states
 * - Keyboard navigation (arrow keys)
 * - Accessible ARIA labels
 */
const meta: Meta<typeof Stepper> = {
  title: 'Core/Form/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Current numeric value',
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
      description: 'Step increment/decrement value',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the stepper is disabled',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the stepper is read-only',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic stepper with default settings.
 * Click + or - buttons to increment/decrement.
 */
export const Basic: Story = {
  args: {
    value: 5,
  },
};

/**
 * Stepper with min and max constraints.
 * Value is constrained between 0 and 10.
 */
export const WithMinMax: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
  },
};

/**
 * Stepper with custom step value.
 * Increments/decrements by 5 instead of 1.
 */
export const CustomStep: Story = {
  args: {
    value: 10,
    min: 0,
    max: 100,
    step: 5,
  },
};

/**
 * Stepper with decimal step value.
 * Useful for prices or measurements.
 */
export const DecimalStep: Story = {
  args: {
    value: 2.5,
    min: 0,
    max: 10,
    step: 0.5,
  },
};

/**
 * Disabled stepper - buttons are not clickable.
 */
export const Disabled: Story = {
  args: {
    value: 5,
    isDisabled: true,
  },
};

/**
 * Read-only stepper - displays value but cannot be changed.
 */
export const ReadOnly: Story = {
  args: {
    value: 5,
    isReadOnly: true,
  },
};

/**
 * Stepper with error message.
 * Shows validation error below the input.
 */
export const WithError: Story = {
  args: {
    value: 15,
    min: 0,
    max: 10,
    errorMessage: 'Value must be between 0 and 10',
  },
};

/**
 * Controlled stepper with state management.
 * Demonstrates full control over the value.
 */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(5);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value) || 0;
      setValue(newValue);
    };

    return (
      <div style={{ width: '300px' }}>
        <Stepper {...args} value={value} onChange={handleChange} />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Current value: {value}
        </p>
      </div>
    );
  },
  args: {
    min: 0,
    max: 20,
  },
};

/**
 * Stepper with validation logic.
 * Shows error when value is out of range.
 */
export const WithValidation: Story = {
  render: (args) => {
    const [value, setValue] = useState(5);
    const [error, setError] = useState('');
    const MIN = 1;
    const MAX = 10;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value) || 0;
      setValue(newValue);

      if (newValue < MIN) {
        setError(`Value must be at least ${MIN}`);
      } else if (newValue > MAX) {
        setError(`Value must not exceed ${MAX}`);
      } else {
        setError('');
      }
    };

    return (
      <div style={{ width: '300px' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Quantity (1-10)
        </label>
        <Stepper
          {...args}
          value={value}
          onChange={handleChange}
          min={MIN}
          max={MAX}
          errorMessage={error}
        />
      </div>
    );
  },
};

/**
 * Quantity selector for e-commerce cart.
 * Common use case with min 1 and realistic max.
 */
export const QuantitySelector: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(1);
    const pricePerItem = 29.99;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = parseInt(e.target.value) || 1;
      setQuantity(newQuantity);
    };

    return (
      <div
        style={{
          width: '400px',
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <img
            src="https://via.placeholder.com/80"
            alt="Product"
            style={{ width: '80px', height: '80px', borderRadius: '0.375rem' }}
          />
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0' }}>Awesome Product</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>
              ${pricePerItem.toFixed(2)} each
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Quantity
            </label>
            <Stepper {...args} value={quantity} onChange={handleChange} min={1} max={99} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#666' }}>Total</p>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
              ${(quantity * pricePerItem).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Age selector with appropriate constraints.
 * Min 0, max 120, step 1.
 */
export const AgeSelector: Story = {
  render: (args) => {
    const [age, setAge] = useState(25);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAge = parseInt(e.target.value) || 0;
      setAge(newAge);
    };

    return (
      <div style={{ width: '300px' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Age</label>
        <Stepper {...args} value={age} onChange={handleChange} min={0} max={120} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Enter your age (0-120 years)
        </p>
      </div>
    );
  },
};

/**
 * Temperature control with decimal values.
 * Useful for thermostat or scientific applications.
 */
export const TemperatureControl: Story = {
  render: (args) => {
    const [temperature, setTemperature] = useState(22.0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTemp = parseFloat(e.target.value) || 0;
      setTemperature(newTemp);
    };

    return (
      <div
        style={{
          width: '300px',
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Room Temperature</h3>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6' }}>
            {temperature.toFixed(1)}°C
          </div>
        </div>

        <Stepper
          {...args}
          value={temperature}
          onChange={handleChange}
          min={16}
          max={30}
          step={0.5}
        />

        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color: '#666',
          }}
        >
          <span>Min: 16°C</span>
          <span>Max: 30°C</span>
        </div>
      </div>
    );
  },
};

/**
 * Volume control with custom step.
 * Increments by 10 for easier control.
 */
export const VolumeControl: Story = {
  render: (args) => {
    const [volume, setVolume] = useState(50);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseInt(e.target.value) || 0;
      setVolume(newVolume);
    };

    const volumeIcon = volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊';

    return (
      <div
        style={{
          width: '300px',
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{volumeIcon}</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{volume}%</div>
        </div>

        <Stepper {...args} value={volume} onChange={handleChange} min={0} max={100} step={10} />

        <div
          style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}
        >
          Adjust volume (0-100%)
        </div>
      </div>
    );
  },
};

/**
 * Complete form with multiple steppers.
 * Shows integration with other form elements.
 */
export const CompleteForm: Story = {
  render: (_args) => {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(1);
    const [nights, setNights] = useState(3);
    const pricePerNight = 150;
    const childDiscount = 0.5;

    const totalPrice = (adults * pricePerNight + children * pricePerNight * childDiscount) * nights;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(
        `Booking: ${adults} adults, ${children} children for ${nights} nights\nTotal: $${totalPrice.toFixed(2)}`
      );
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          width: '400px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Hotel Booking</h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Adults
          </label>
          <Stepper
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
            min={1}
            max={10}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Children
          </label>
          <Stepper
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            min={0}
            max={10}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Number of Nights
          </label>
          <Stepper
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value) || 1)}
            min={1}
            max={30}
          />
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            <span>
              Adults ({adults} × ${pricePerNight})
            </span>
            <span>${(adults * pricePerNight * nights).toFixed(2)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            <span>
              Children ({children} × ${pricePerNight * childDiscount})
            </span>
            <span>${(children * pricePerNight * childDiscount * nights).toFixed(2)}</span>
          </div>
          <div
            style={{
              borderTop: '1px solid #d1d5db',
              marginTop: '0.5rem',
              paddingTop: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
            }}
          >
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '1rem',
          }}
        >
          Book Now
        </button>
      </form>
    );
  },
};

/**
 * Showcase of all Stepper states and variants.
 */
export const AllVariants: Story = {
  render: (_args) => {
    const [value1, setValue1] = useState(5);
    const [value2, setValue2] = useState(5);

    return (
      <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Basic</h3>
          <Stepper value={5} />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>With Min/Max (0-10)</h3>
          <Stepper
            value={value1}
            onChange={(e) => setValue1(parseInt(e.target.value) || 0)}
            min={0}
            max={10}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Custom Step (±5)</h3>
          <Stepper
            value={value2}
            onChange={(e) => setValue2(parseInt(e.target.value) || 0)}
            min={0}
            max={100}
            step={5}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Decimal Step (±0.5)</h3>
          <Stepper value={2.5} min={0} max={10} step={0.5} />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Disabled</h3>
          <Stepper value={5} isDisabled />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Read Only</h3>
          <Stepper value={5} isReadOnly />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>With Error</h3>
          <Stepper value={15} min={0} max={10} errorMessage="Value exceeds maximum" />
        </div>
      </div>
    );
  },
};
