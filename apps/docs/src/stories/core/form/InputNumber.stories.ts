import type { Meta, StoryObj } from '@storybook/react';
import { InputNumber } from '@tavia/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Form/InputNumber',
  component: InputNumber,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    placeholder: 'Enter your number',
    type: 'number',
  },
};

export const HasClear: Story = {
  args: {
    placeholder: 'Enter your name',
    hasClearButton: true,
    type: 'number',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Enter your name',
    name: 'name',
    variant: 'danger',
    errorMessage: 'This is an error',
    type: 'number',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your name',
    value: 'Hello',
    isDisabled: true,
    type: 'number',
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: 'Enter your name',
    value: 'Hello',
    isReadOnly: true,
    type: 'number',
  },
};
