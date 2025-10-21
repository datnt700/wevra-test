import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '@tavia/core';

const meta = {
  title: 'Core/Base/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Image component with lazy loading, error handling, and fallback support. Automatically shows placeholder while loading and handles failed image loads gracefully.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Primary image source URL' },
    alt: { control: 'text', description: 'Alternative text for accessibility' },
    fallbackSrc: { control: 'text', description: 'Fallback image URL if primary fails' },
    placeholder: { control: 'text', description: 'Placeholder content while loading' },
    width: { control: 'text', description: 'Image width (CSS value)' },
    height: { control: 'text', description: 'Image height (CSS value)' },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://picsum.photos/200/300',
    alt: 'Random landscape image',
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.example.com/image.jpg',
    alt: 'Image with fallback',
    fallbackSrc: 'https://picsum.photos/200/300',
  },
};

export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url.example.com/image.jpg',
    alt: 'Broken image without fallback',
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: 'https://picsum.photos/200/300?random=1',
    alt: 'Image with loading placeholder',
    placeholder: 'Loading image...',
  },
};

export const Small: Story = {
  args: {
    src: 'https://picsum.photos/100/100',
    alt: 'Small square image',
    width: '100px',
    height: '100px',
  },
};

export const Medium: Story = {
  args: {
    src: 'https://picsum.photos/300/200',
    alt: 'Medium rectangular image',
    width: '300px',
    height: '200px',
  },
};

export const Large: Story = {
  args: {
    src: 'https://picsum.photos/600/400',
    alt: 'Large image',
    width: '600px',
    height: '400px',
  },
};

export const Portrait: Story = {
  args: {
    src: 'https://picsum.photos/200/400',
    alt: 'Portrait orientation image',
    width: '200px',
    height: '400px',
  },
};

export const Landscape: Story = {
  args: {
    src: 'https://picsum.photos/400/200',
    alt: 'Landscape orientation image',
    width: '400px',
    height: '200px',
  },
};

export const Square: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Square image',
    width: '300px',
    height: '300px',
  },
};
