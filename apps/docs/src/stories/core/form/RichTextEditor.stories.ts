import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from '@tavia/core';
import { content } from './mock-data';

const meta = {
  title: 'Core/Form/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    setValue: { action: 'setValue' },
    uploadImage: { action: 'uploadImage' },
  },
} satisfies Meta<typeof RichTextEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: content,
    uploadImage: async ({ file }) => {
      return new Promise((resolve) => setTimeout(() => resolve('image-url'), 1000));
    },
  },
};
