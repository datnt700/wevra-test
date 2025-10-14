import type { Meta, StoryObj } from '@storybook/react';

import { Drawer, Button } from '@tavia/core';
import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
  title: 'Core/Organisms/Drawer',
  component: Drawer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Content for the drawer header',
      defaultValue: 'Default Drawer Header'
    },
    footer: {
      control: 'text',
      description: 'Content for the drawer footer',
      defaultValue: 'Default Drawer Footer'
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the drawer',
      defaultValue: 'right'
    },
    isOpen: {
      control: false,
      description: 'Controls whether the drawer is open'
    },
    onClose: {
      control: false,
      description: 'Function to close the drawer'
    }
  }
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: (args) => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Open Drawer</Button>
        <Drawer
          {...args}
          isOpen={isShowing}
          onClose={() => setShowing(false)}
          header={args.header || 'Drawer Header'}
          footer={args.footer || <Button onClick={() => setShowing(false)}>Close</Button>}
        >
          <p>This is an example drawer with customizable content.</p>
        </Drawer>
      </>
    );
  }
};
