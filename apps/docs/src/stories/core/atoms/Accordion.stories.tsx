import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@tavia/core';

const meta: Meta<typeof Accordion> = {
  title: 'Core/Atoms/Accordion',
  component: Accordion,
  argTypes: {
    items: { control: 'object' },
    type: { control: { type: 'radio', options: ['single', 'multiple'] } },
    isDisabled: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    type: 'single',
    isDisabled: false,
    items: [
      {
        value: 'item-1',
        trigger: { content: 'Item 1' },
        content: { content: 'Content for item 1' }
      },
      {
        value: 'item-2',
        trigger: { content: 'Item 2' },
        content: { content: 'Content for item 2' }
      },
      {
        value: 'item-3',
        trigger: { content: 'Item 3' },
        content: { content: 'Content for item 3' }
      }
    ]
  }
};

export const Multiple: Story = {
  args: {
    type: 'single',
    isDisabled: false,
    items: [
      {
        value: 'item-1',
        trigger: { content: 'First Item' },
        content: { content: 'Content of first item' }
      },
      {
        value: 'item-2',
        trigger: { content: 'Second Item' },
        content: { content: 'Content of second item' }
      }
    ]
  }
};

export const Disabled: Story = {
  args: {
    type: 'single',
    isDisabled: true,
    items: [
      {
        value: 'item-1',
        trigger: { content: 'Disabled Item' },
        content: { content: 'This item is disabled' }
      }
    ]
  }
};
