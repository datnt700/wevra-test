import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '@tavia/core';
import { Button } from '@tavia/core';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
const meta: Meta<typeof DropdownMenu> = {
  title: 'Core/Radix/DropdownMenu',
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  render: (args) => {
    return (
      <DropdownMenu
        {...args}
        trigger={
          <Button>
            <HamburgerMenuIcon style={{ color: 'var(--dark)' }} />
          </Button>
        }
        items={[
          { label: 'Item 1', onSelect: () => console.log('Item 1 selected') },
          { label: 'Item 2', onSelect: () => console.log('Item 2 selected') },
          { label: 'Disabled Item', isDisabled: true },
        ]}
      />
    );
  },
};
