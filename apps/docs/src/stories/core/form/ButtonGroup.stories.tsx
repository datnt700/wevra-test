import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroup, Button } from '@tavia/core';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Core/Form/ButtonGroup',
  component: ButtonGroup
};
export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Basic: Story = {
  render: (args) => {
    return (
      <ButtonGroup {...args}>
        <Button>Hello</Button>
        <Button variant="secondary">Hello</Button>
      </ButtonGroup>
    );
  }
};
