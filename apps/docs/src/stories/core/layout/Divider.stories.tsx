import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@tavia/core';

const meta = {
  title: 'Core/Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: ['default', 'sm', 'md', 'lg', 1, 2, 3, 4, 5] }
    },
    className: { control: 'text' },
    orientation: {
      control: { type: 'radio', options: ['horizontal', 'vertical'] }
    }
  }
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    size: 'default',
    orientation: 'horizontal'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    orientation: 'horizontal'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    orientation: 'horizontal'
  }
};

export const Vertical: Story = {
  args: {
    size: 'lg',
    orientation: 'vertical'
  }
};
