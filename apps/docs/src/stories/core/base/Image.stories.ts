import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '@tavia/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Base/Image',
  component: Image,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    fallbackSrc: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    src: 'https://picsum.photos/200/300',
    alt: 'This is an image',
  },
};

export const Fallback: Story = {
  args: {
    src: 'https://picsum.ph/200/300',
    alt: 'This is an image',
    fallbackSrc: 'https://picsum.photos/200/300',
  },
};

export const Error: Story = {
  args: {
    src: 'https://picsum.ph/200/300',
    alt: 'This is an image',
    fallbackSrc: 'https://picsum.ph/200/300',
  },
};

export const Loading: Story = {
  args: {
    src: 'https://picsum.photos/200/300',
    alt: 'This is an image',
    placeholder: 'Loading',
    src: 'https://picsum.photos/200/300',
  },
};
