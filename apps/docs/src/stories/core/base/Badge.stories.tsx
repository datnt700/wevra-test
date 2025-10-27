import type { Meta, StoryObj } from '@storybook/react';

import { Badge, Card } from '@tavia/taviad';

const meta: Meta<typeof Badge> = {
  title: 'Core/Base/Badge',
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Card>
        <Badge {...args}>Tag</Badge>
      </Card>
    );
  },
};

export const Clickable: Story = {
  render: (args) => {
    return (
      <Card>
        <Badge {...args} onClick={() => alert('Clicked')}>
          Tag
        </Badge>
      </Card>
    );
  },
};

export const Link: Story = {
  render: (args) => {
    return (
      <Card>
        <Badge {...args} url="https://www.revt.io">
          Tag
        </Badge>
      </Card>
    );
  },
};
