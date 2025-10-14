import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '@tavia/core';

const meta: Meta<typeof Spinner> = {
  title: 'Core/Base/Spinner',
  component: Spinner,
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {
  render: (args) => {
    return <Spinner {...args} />;
  },
};

export const Small: Story = {
  render: (args) => {
    return <Spinner size="sm" {...args} />;
  },
};

export const Large: Story = {
  render: (args) => {
    return <Spinner size="lg" {...args} />;
  },
};

export const XXL: Story = {
  render: (args) => {
    return <Spinner size="xxl" {...args} />;
  },
};
