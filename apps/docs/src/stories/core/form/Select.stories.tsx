import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@tavia/core';

const meta: Meta<typeof Select> = {
  title: 'Core/Form/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    options: { control: 'object' }
  }
};

export default meta;
type Story = StoryObj<typeof Select>;

// Mock data for options
const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' }
];

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Select your choice',
    options: mockOptions
  }
};

export const Empty: Story = {
  args: {
    options: []
  }
};

export const WithDisabledItem: Story = {
  args: {
    placeholder: 'Select your choice',
    isDisabled: true,
    options: []
  }
};
