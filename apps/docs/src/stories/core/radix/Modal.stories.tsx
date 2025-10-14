import type { Meta, StoryObj } from '@storybook/react';

import { Modal, Button } from '@tavia/core';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Core/Radix/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Content for the modal header',
      defaultValue: 'Default Modal Header'
    },
    footer: {
      control: 'text',
      description: 'Content for the modal footer',
      defaultValue: 'Default Modal Footer'
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom'],
      description: 'Position of the modal',
      defaultValue: 'center'
    },
    isOpen: {
      control: false,
      description: 'Controls whether the modal is open'
    },
    onClose: {
      control: false,
      description: 'Function to close the modal'
    }
  }
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: (args) => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isShowing}
          onClose={() => setShowing(false)}
          header={args.header || 'Modal Header'}
          footer={args.footer || <Button onClick={() => setShowing(false)}>Close</Button>}
        >
          <p>This is an example modal with customizable content.</p>
        </Modal>
      </>
    );
  }
};
