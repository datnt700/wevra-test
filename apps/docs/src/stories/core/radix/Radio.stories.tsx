import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '@tavia/taviad';

const meta = {
  title: 'Core/Radix/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radio component - Built with Radix UI primitives and Emotion styling. Provides accessible radio input with proper ARIA attributes and multiple size variants. Use within a RadioGroup for grouped options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Value of the radio option' },
    label: { control: 'text', description: 'Label text displayed next to the radio' },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
      description: 'Size variant of the radio button',
      defaultValue: 'default',
    },
    isDisabled: { control: 'boolean', description: 'Whether the radio is disabled' },
    isRequired: { control: 'boolean', description: 'Whether selection is required' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option1">
      <Radio {...args} />
    </RadioGroup>
  ),
  args: {
    value: 'option1',
    label: 'Option 1',
    id: 'radio-1',
    size: 'default',
  },
};

export const Small: Story = {
  render: (args) => (
    <RadioGroup defaultValue="small">
      <Radio {...args} />
    </RadioGroup>
  ),
  args: {
    value: 'small',
    label: 'Small Radio',
    id: 'radio-small',
    size: 'sm',
  },
};

export const Medium: Story = {
  render: (args) => (
    <RadioGroup defaultValue="medium">
      <Radio {...args} />
    </RadioGroup>
  ),
  args: {
    value: 'medium',
    label: 'Medium Radio',
    id: 'radio-medium',
    size: 'md',
  },
};

export const Large: Story = {
  render: (args) => (
    <RadioGroup defaultValue="large">
      <Radio {...args} />
    </RadioGroup>
  ),
  args: {
    value: 'large',
    label: 'Large Radio',
    id: 'radio-large',
    size: 'lg',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="disabled">
      <Radio {...args} />
    </RadioGroup>
  ),
  args: {
    value: 'disabled',
    label: 'Disabled Radio',
    id: 'radio-disabled',
    isDisabled: true,
  },
};

export const WithoutLabel: Story = {
  render: (args) => (
    <RadioGroup defaultValue="no-label">
      <Radio {...args} />
    </RadioGroup>
  ),
  args: {
    value: 'no-label',
    id: 'radio-no-label',
  },
};

export const Required: Story = {
  render: (args) => (
    <RadioGroup defaultValue="required">
      <Radio {...args} />
    </RadioGroup>
  ),
  args: {
    value: 'required',
    label: 'Required Option *',
    id: 'radio-required',
    isRequired: true,
  },
};

export const MultipleOptions: Story = {
  render: (_args) => (
    <RadioGroup defaultValue="option1">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Radio value="option1" label="Option 1" id="multi-1" />
        <Radio value="option2" label="Option 2" id="multi-2" />
        <Radio value="option3" label="Option 3" id="multi-3" />
        <Radio value="option4" label="Option 4 (Disabled)" id="multi-4" isDisabled />
      </div>
    </RadioGroup>
  ),
  args: {
    value: 'option1',
    label: 'Option 1',
    id: 'multi-1',
  },
};
