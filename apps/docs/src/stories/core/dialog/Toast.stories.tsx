import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, Button } from '@tavia/core';

const meta: Meta<typeof Toast> = {
  title: 'Core/Dialog/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    isShowing: { control: 'boolean' },
    canUndo: { control: 'boolean' },
    canClose: { control: 'boolean' },
    duration: { control: { type: 'number', min: 1000, max: 10000, step: 500 } },
    position: {
      control: 'select',
      options: [
        'bottom-right',
        'top-right',
        'bottom-left',
        'top-left',
        'bottom-center',
        'top-center',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Basic: Story = {
  render: (args) => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Toast</Button>
        <Toast {...args} isShowing={isShowing} setShowing={setShowing} />
      </>
    );
  },
  args: {
    title: 'Notification',
    content: 'This is a toast message',
    canUndo: true,
    canClose: false,
    duration: 5000,
    position: 'bottom-right',
  },
};
