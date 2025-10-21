import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from '@tavia/core';
import { Volume2, VolumeX, Minus, Plus, DollarSign, ThermometerSun } from 'lucide-react';

/**
 * Slider component - Interactive range input built with Radix UI.
 *
 * Features:
 * - Single value or range (two thumbs) support
 * - Horizontal and vertical orientations
 * - Customizable min, max, and step values
 * - Keyboard navigation support
 * - Accessible with ARIA labels
 * - Smooth drag interactions
 * - Value change and commit callbacks
 *
 * Best Practices:
 * - Always provide ariaLabel for accessibility
 * - Use step values appropriate for your use case
 * - Show current value(s) visually for better UX
 * - Consider using onValueCommit for expensive operations
 * - Provide visual feedback for disabled state
 */
const meta: Meta<typeof Slider> = {
  title: 'Core/Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Slider orientation (horizontal or vertical)',
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'Initial value(s) for uncontrolled usage (e.g., [50] or [20, 80])',
    },
    value: {
      control: { type: 'object' },
      description: 'Controlled value(s) of the slider',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback triggered when value changes during drag',
    },
    onValueCommit: {
      action: 'value committed',
      description: 'Callback triggered when value is committed (drag end)',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum slider value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum slider value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment for slider movements',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

/**
 * Basic slider - single value from 0 to 100.
 */
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 500 }}>Value:</span>
          <span style={{ color: '#3b82f6', fontWeight: 600 }}>{value[0]}</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={1}
          ariaLabel="Basic slider"
        />
      </div>
    );
  },
};

/**
 * Range slider - two thumbs for min and max values.
 */
export const RangeSlider: Story = {
  render: () => {
    const [value, setValue] = useState([20, 80]);

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 500 }}>Range:</span>
          <span style={{ color: '#3b82f6', fontWeight: 600 }}>
            {value[0]} - {value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={1}
          ariaLabel="Range slider"
        />
      </div>
    );
  },
};

/**
 * With step values - discrete increments (step of 10).
 */
export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div style={{ width: '350px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 500 }}>Value (step: 10):</span>
            <span style={{ color: '#3b82f6', fontWeight: 600 }}>{value[0]}</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Snaps to increments of 10</div>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={10}
          ariaLabel="Stepped slider"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
          <span>60</span>
          <span>70</span>
          <span>80</span>
          <span>90</span>
          <span>100</span>
        </div>
      </div>
    );
  },
};

/**
 * Volume control - slider with mute button and icons.
 */
export const VolumeControl: Story = {
  render: () => {
    const [value, setValue] = useState([75]);
    const [isMuted, setIsMuted] = useState(false);
    const [previousValue, setPreviousValue] = useState(75);

    const handleMuteToggle = () => {
      if (isMuted) {
        setValue([previousValue]);
        setIsMuted(false);
      } else {
        setPreviousValue(value[0]);
        setValue([0]);
        setIsMuted(true);
      }
    };

    return (
      <div
        style={{ width: '350px', padding: '1.5rem', background: '#f9fafb', borderRadius: '8px' }}
      >
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleMuteToggle}
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isMuted || value[0] === 0 ? (
              <VolumeX size={20} color="#6b7280" />
            ) : (
              <Volume2 size={20} color="#3b82f6" />
            )}
          </button>
          <div style={{ flex: 1 }}>
            <Slider
              value={value}
              onValueChange={(v) => {
                setValue(v);
                if (v[0] > 0) setIsMuted(false);
              }}
              min={0}
              max={100}
              step={1}
              ariaLabel="Volume"
            />
          </div>
          <span style={{ minWidth: '3rem', textAlign: 'right', fontWeight: 600, color: '#3b82f6' }}>
            {value[0]}%
          </span>
        </div>
      </div>
    );
  },
};

/**
 * Price range filter - for e-commerce filtering.
 */
export const PriceRangeFilter: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([25, 75]);

    return (
      <div
        style={{
          width: '400px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Price Range</h4>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0.75rem',
                background: '#f9fafb',
                borderRadius: '6px',
                flex: 1,
              }}
            >
              <DollarSign size={16} color="#666" />
              <span style={{ fontWeight: 600 }}>{priceRange[0]}</span>
            </div>
            <span style={{ color: '#999' }}>to</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0.75rem',
                background: '#f9fafb',
                borderRadius: '6px',
                flex: 1,
              }}
            >
              <DollarSign size={16} color="#666" />
              <span style={{ fontWeight: 600 }}>{priceRange[1]}</span>
            </div>
          </div>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={100}
          step={5}
          ariaLabel="Price range"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>$0</span>
          <span>$100</span>
        </div>
      </div>
    );
  },
};

/**
 * Temperature control - slider with visual feedback.
 */
export const TemperatureControl: Story = {
  render: () => {
    const [temp, setTemp] = useState([22]);

    const getTempColor = (temperature: number) => {
      if (temperature < 18) return '#3b82f6'; // cold - blue
      if (temperature < 24) return '#10b981'; // comfortable - green
      return '#ef4444'; // hot - red
    };

    return (
      <div
        style={{ width: '350px', padding: '1.5rem', background: '#f9fafb', borderRadius: '8px' }}
      >
        <div
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ThermometerSun size={24} color={getTempColor(temp[0])} />
            <span style={{ fontWeight: 500 }}>Temperature</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: getTempColor(temp[0]) }}>
              {temp[0]}
            </span>
            <span style={{ fontSize: '1.25rem', color: '#666' }}>°C</span>
          </div>
        </div>
        <Slider
          value={temp}
          onValueChange={setTemp}
          min={16}
          max={30}
          step={0.5}
          ariaLabel="Temperature"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>16°C</span>
          <span>30°C</span>
        </div>
      </div>
    );
  },
};

/**
 * Vertical slider - useful for height or vertical controls.
 */
export const VerticalSlider: Story = {
  render: () => {
    const [value, setValue] = useState([60]);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
        <div>
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Vertical Slider</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#3b82f6' }}>{value[0]}%</div>
          </div>
          <div style={{ height: '250px' }}>
            <Slider
              value={value}
              onValueChange={setValue}
              orientation="vertical"
              min={0}
              max={100}
              step={1}
              ariaLabel="Vertical slider"
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Disabled slider - non-interactive state.
 */
export const DisabledSlider: Story = {
  render: () => {
    return (
      <div style={{ width: '350px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: 500, color: '#999' }}>Disabled Slider (Value: 65)</span>
          <div style={{ fontSize: '0.875rem', color: '#999', marginTop: '0.25rem' }}>
            This slider cannot be adjusted
          </div>
        </div>
        <Slider
          defaultValue={[65]}
          min={0}
          max={100}
          step={1}
          disabled
          ariaLabel="Disabled slider"
        />
      </div>
    );
  },
};

/**
 * With custom range - non-standard min/max values.
 */
export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState([500]);

    return (
      <div style={{ width: '400px' }}>
        <div
          style={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 500 }}>Custom Range (100-1000):</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#3b82f6' }}>{value[0]}</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={100}
          max={1000}
          step={50}
          ariaLabel="Custom range slider"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>100</span>
          <span>550</span>
          <span>1000</span>
        </div>
      </div>
    );
  },
};

/**
 * Brightness control - slider with icons and visual styling.
 */
export const BrightnessControl: Story = {
  render: () => {
    const [brightness, setBrightness] = useState([70]);

    return (
      <div
        style={{
          width: '350px',
          padding: '1.5rem',
          background: '#1f2937',
          borderRadius: '8px',
          color: 'white',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ fontWeight: 500 }}>Brightness</span>
            <span style={{ fontWeight: 600, color: '#60a5fa' }}>{brightness[0]}%</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Minus size={16} color="#9ca3af" />
          <div style={{ flex: 1 }}>
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              min={0}
              max={100}
              step={1}
              ariaLabel="Brightness"
            />
          </div>
          <Plus size={16} color="#60a5fa" />
        </div>
      </div>
    );
  },
};

/**
 * Age range selector - for demographic filtering.
 */
export const AgeRangeSelector: Story = {
  render: () => {
    const [ageRange, setAgeRange] = useState([25, 45]);

    return (
      <div
        style={{
          width: '400px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Age Range</h4>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div
              style={{
                padding: '0.5rem 1rem',
                background: '#f9fafb',
                borderRadius: '6px',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.25rem' }}>Min</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{ageRange[0]}</div>
            </div>
            <span style={{ color: '#999' }}>—</span>
            <div
              style={{
                padding: '0.5rem 1rem',
                background: '#f9fafb',
                borderRadius: '6px',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.25rem' }}>Max</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{ageRange[1]}</div>
            </div>
          </div>
        </div>
        <Slider
          value={ageRange}
          onValueChange={setAgeRange}
          min={18}
          max={65}
          step={1}
          ariaLabel="Age range"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>18</span>
          <span>65</span>
        </div>
      </div>
    );
  },
};

/**
 * Opacity control - fine-grained control with decimal steps.
 */
export const OpacityControl: Story = {
  render: () => {
    const [opacity, setOpacity] = useState([0.7]);

    return (
      <div style={{ width: '350px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontWeight: 500 }}>Opacity</span>
            <span style={{ fontWeight: 600, color: '#3b82f6' }}>
              {(opacity[0] * 100).toFixed(0)}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '80px',
              background: `rgba(59, 130, 246, ${opacity[0]})`,
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: opacity[0] > 0.5 ? 'white' : '#3b82f6',
              fontWeight: 600,
            }}
          >
            Preview
          </div>
        </div>
        <Slider
          value={opacity}
          onValueChange={setOpacity}
          min={0}
          max={1}
          step={0.01}
          ariaLabel="Opacity"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    );
  },
};

/**
 * Zoom level control - typical use case for image/map zoom.
 */
export const ZoomControl: Story = {
  render: () => {
    const [zoom, setZoom] = useState([100]);

    const getZoomLabel = (value: number) => {
      if (value === 100) return 'Fit';
      return `${value}%`;
    };

    return (
      <div
        style={{ width: '350px', padding: '1.5rem', background: '#f9fafb', borderRadius: '8px' }}
      >
        <div
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 500 }}>Zoom Level</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#3b82f6' }}>
            {getZoomLabel(zoom[0])}
          </span>
        </div>
        <Slider
          value={zoom}
          onValueChange={setZoom}
          min={25}
          max={200}
          step={25}
          ariaLabel="Zoom level"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>25%</span>
          <span>100%</span>
          <span>200%</span>
        </div>
      </div>
    );
  },
};

/**
 * Delay/Duration control - time-based slider in seconds.
 */
export const DurationControl: Story = {
  render: () => {
    const [duration, setDuration] = useState([5]);

    const formatDuration = (seconds: number) => {
      if (seconds < 60) return `${seconds}s`;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs}s`;
    };

    return (
      <div
        style={{
          width: '400px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ fontWeight: 500 }}>Animation Duration</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#3b82f6' }}>
              {formatDuration(duration[0])}
            </span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            How long should the animation last?
          </div>
        </div>
        <Slider
          value={duration}
          onValueChange={setDuration}
          min={1}
          max={30}
          step={1}
          ariaLabel="Duration"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          <span>1s</span>
          <span>15s</span>
          <span>30s</span>
        </div>
      </div>
    );
  },
};

/**
 * Showcase of all slider variants and use cases.
 */
export const AllVariants: Story = {
  render: () => {
    const [basicValue, setBasicValue] = useState([50]);
    const [rangeValue, setRangeValue] = useState([25, 75]);
    const [volumeValue, setVolumeValue] = useState([60]);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          padding: '2rem',
          maxWidth: '500px',
        }}
      >
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Basic Slider</h3>
          <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Value:</span>
            <span style={{ fontWeight: 600, color: '#3b82f6' }}>{basicValue[0]}</span>
          </div>
          <Slider
            value={basicValue}
            onValueChange={setBasicValue}
            min={0}
            max={100}
            step={1}
            ariaLabel="Basic"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Range Slider</h3>
          <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Range:</span>
            <span style={{ fontWeight: 600, color: '#3b82f6' }}>
              {rangeValue[0]} - {rangeValue[1]}
            </span>
          </div>
          <Slider
            value={rangeValue}
            onValueChange={setRangeValue}
            min={0}
            max={100}
            step={1}
            ariaLabel="Range"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>With Steps (10)</h3>
          <Slider defaultValue={[50]} min={0} max={100} step={10} ariaLabel="Stepped" />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Volume Control</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Volume2 size={20} color="#3b82f6" />
            <div style={{ flex: 1 }}>
              <Slider
                value={volumeValue}
                onValueChange={setVolumeValue}
                min={0}
                max={100}
                step={1}
                ariaLabel="Volume"
              />
            </div>
            <span style={{ minWidth: '2.5rem', fontWeight: 600, color: '#3b82f6' }}>
              {volumeValue[0]}%
            </span>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Disabled</h3>
          <Slider defaultValue={[40]} min={0} max={100} step={1} disabled ariaLabel="Disabled" />
        </div>
      </div>
    );
  },
};
