import type { Meta, StoryObj } from '@storybook/react';

import { ErrorState } from '@eventure/eventured';
import { Icon, Button } from '@eventure/eventured';
import { ServerOff } from 'lucide-react';

const meta: Meta<typeof ErrorState> = {
  title: 'Core/State/ErrorState',
  component: ErrorState,
};
export default meta;

type Story = StoryObj<typeof ErrorState>;

export const Basic: Story = {
  render: (args) => {
    return (
      <ErrorState
        icon={<Icon source={<ServerOff stroke="black" />} />}
        title="This is an error state"
        subTitle="An error state can optionally have a subtitle."
        {...args}
      />
    );
  },
};

export const WithAction: Story = {
  render: (args) => {
    return (
      <ErrorState
        icon={<Icon source={<ServerOff stroke="black" />} />}
        title="This is an error state"
        subTitle="An error state can optionally have a subtitle."
        action={<Button>Refresh</Button>}
        {...args}
      />
    );
  },
};

export const CustomContent: Story = {
  render: (args) => {
    return (
      <ErrorState {...args}>
        <h2>Error</h2>
      </ErrorState>
    );
  },
};
