import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@tavia/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/State/ProgressBar',
  component: ProgressBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    progress: { control: 'number' },
    hasLabel: { control: 'boolean' },
    variant: { control: 'text' },
    isIndeterminate: { control: 'boolean' }
  }
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    progress: 20,
    hasLabel: false
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const HasLabel: Story = {
  args: {
    progress: 20,
    hasLabel: true
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Success: Story = {
  args: {
    progress: 20,
    hasLabel: true,
    variant: 'success'
  }
};
