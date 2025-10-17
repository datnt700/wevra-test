import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@tavia/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Navigation/Link',
  component: Link,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    url: { control: 'text' },
    children: { control: 'text' },
    target: { control: 'text' },
    variant: { control: 'select', options: ['default', 'monochrome'] },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    url: 'https://www.google.com',
    children: 'This is a link',
  },
};

export const External: Story = {
  args: {
    url: 'https://www.google.com',
    children: 'This is a link',
    target: '_blank',
  },
};

export const Monochrome: Story = {
  args: {
    url: 'https://www.google.com',
    children: 'This is a link',
    target: '_blank',
    variant: 'monochrome',
  },
};

export const Underlined: Story = {
  args: {
    url: 'https://www.google.com',
    children: 'This is a link',
    target: '_blank',
    variant: 'monochrome',
    underlined: true,
  },
};
