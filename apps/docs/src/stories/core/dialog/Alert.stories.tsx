import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from '@tavia/core';

const meta: Meta<typeof Alert> = {
  title: 'Core/Dialog/Alert',
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  render: (args) => {
    return <Alert {...args}></Alert>;
  },
  args: {
    title: 'Alert title',
    description: 'Alert description'
  }
};

export const Success: Story = {
  render: (args) => {
    return <Alert {...args}></Alert>;
  },
  args: {
    title: 'Alert title',
    description: 'Alert description',
    variant: 'success'
  }
};

export const Warning: Story = {
  render: (args) => {
    return <Alert {...args}></Alert>;
  },
  args: {
    title: 'Alert title',
    description: 'Alert description',
    variant: 'warning'
  }
};

export const Info: Story = {
  render: (args) => {
    return <Alert {...args}></Alert>;
  },
  args: {
    title: 'Alert title',
    description: 'Alert description',
    variant: 'info'
  }
};

export const Danger: Story = {
  render: (args) => {
    return <Alert {...args}></Alert>;
  },
  args: {
    title: 'Alert title',
    description: 'Alert description',
    variant: 'danger'
  }
};
