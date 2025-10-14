import type { Meta, StoryObj } from '@storybook/react';

import { LoadingScreen } from '@tavia/core';

const meta: Meta<typeof LoadingScreen> = {
  title: 'Core/Layout/LoadingScreen',
  component: LoadingScreen
};
export default meta;

type Story = StoryObj<typeof LoadingScreen>;

export const Basic: Story = {
  render: () => {
    return <LoadingScreen />;
  }
};
