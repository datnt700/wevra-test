import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@tavia/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Form/Switch',
  component: Switch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    labelLeft: { control: 'text' },
    labelRight: { control: 'text' },
    iconLeft: { control: 'text' },
    iconRight: { control: 'text' },
    defaultChecked: { control: 'boolean' },
    checked: { control: 'boolean' },
    onCheckedChange: { action: 'onCheckedChange' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
    hasShadow: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    labelLeft: 'Off',
    labelRight: 'On',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    labelLeft: 'Off',
    labelRight: 'On',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    labelLeft: 'Off',
    labelRight: 'On',
    isDisabled: true,
  },
};

export const WithIcons: Story = {
  args: {
    labelLeft: 'Off',
    labelRight: 'On',
    iconLeft: '🌙', // Example icon
    iconRight: '🌞', // Example icon
    defaultChecked: false,
  },
};

export const Required: Story = {
  args: {
    labelLeft: 'Off',
    labelRight: 'On',
    isRequired: true,
  },
};
