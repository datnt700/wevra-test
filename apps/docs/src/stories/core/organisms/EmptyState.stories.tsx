import type { Meta, StoryObj } from '@storybook/react';

import { EmptyState, Icon, Button } from '@tavia/core';
import { FileText } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Core/Organisms/EmptyState',
  component: EmptyState
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  render: (args) => {
    return (
      <EmptyState
        icon={<Icon source={<FileText stroke="black" />} />}
        title="This is an empty state"
        subTitle="An empty state can optionally have a subtitle."
        {...args}
      />
    );
  }
};

export const WithAction: Story = {
  render: (args) => {
    return (
      <EmptyState
        icon={<Icon source={<FileText stroke="black" />} />}
        title="This is an empty state"
        subTitle="An empty state can optionally have a subtitle."
        action={<Button>Do something</Button>}
        {...args}
      />
    );
  }
};

export const CustomContent: Story = {
  render: (args) => {
    return (
      <EmptyState {...args}>
        <h2>Empty</h2>
      </EmptyState>
    );
  }
};
