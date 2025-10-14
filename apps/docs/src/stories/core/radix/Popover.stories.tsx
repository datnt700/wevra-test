import type { Meta, StoryObj } from '@storybook/react';
import { Button, Popover } from '@tavia/core';

const meta = {
  title: 'Core/Radix/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasClose: { control: 'boolean' },
    className: { control: 'text' },
    side: {
      control: { type: 'radio', options: ['top', 'right', 'bottom', 'left'] },
    },
    sideOffset: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    showArrow: { control: 'boolean' },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    trigger: <Button>Open Popover</Button>,
    children: <div style={{ padding: '10px' }}>This is a popover content.</div>,
    hasClose: false,
    side: 'top',
    sideOffset: 5,
    showArrow: false,
  },
};

export const WithCloseButton: Story = {
  args: {
    ...Basic.args,
    hasClose: true,
  },
};

export const WithArrow: Story = {
  args: {
    ...Basic.args,
    showArrow: true,
  },
};

export const PositionedRight: Story = {
  args: {
    ...Basic.args,
    side: 'right',
  },
};

export const PositionedBottom: Story = {
  args: {
    ...Basic.args,
    side: 'bottom',
  },
};
