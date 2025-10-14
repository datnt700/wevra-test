import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@tavia/core';
import { PlusIcon } from '@radix-ui/react-icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Radix/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: {
      control: 'number',
    },
    showArrow: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  render: (args) => (
    <Tooltip {...args} trigger={<PlusIcon />}>
      <span>Tooltip content</span>
    </Tooltip>
  ),
  args: {
    side: 'top',
    sideOffset: 5,
    showArrow: true,
  },
};
