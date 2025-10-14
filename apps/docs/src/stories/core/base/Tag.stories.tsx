import type { Meta, StoryObj } from '@storybook/react';

import { Tag, Card } from '@tavia/core';

const meta: Meta<typeof Tag> = {
  title: 'Core/Base/Tag',
  component: Tag,
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Card>
        <Tag {...args}>Tag</Tag>
      </Card>
    );
  },
};

export const Clickable: Story = {
  render: (args) => {
    return (
      <Card>
        <Tag {...args} onClick={() => alert('Clicked')}>
          Tag
        </Tag>
      </Card>
    );
  },
};

export const Link: Story = {
  render: (args) => {
    return (
      <Card>
        <Tag {...args} url="https://www.revt.io">
          Tag
        </Tag>
      </Card>
    );
  },
};
