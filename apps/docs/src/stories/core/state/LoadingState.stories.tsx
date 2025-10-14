import type { Meta, StoryObj } from '@storybook/react';

import { LoadingState } from '@tavia/core';

const meta: Meta<typeof LoadingState> = {
  title: 'Core/State/LoadingState',
  component: LoadingState
};
export default meta;

type Story = StoryObj<typeof LoadingState>;

export const Basic: Story = {
  render: (args) => {
    return <LoadingState title="This is loading" {...args} />;
  }
};

export const CustomContent: Story = {
  render: (args) => {
    return (
      <LoadingState {...args}>
        <h2>Empty</h2>
      </LoadingState>
    );
  }
};
