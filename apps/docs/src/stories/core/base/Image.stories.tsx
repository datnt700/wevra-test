import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '@tavia/taviad';

const meta = {
  title: 'Core/Base/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Image component with lazy loading, error handling, fallback support, and **preview mode**. Click on preview-enabled images to view them in fullscreen with zoom, download, and other actions.',
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
    preview: {
      control: 'boolean',
      description: 'Enable preview mode - click to view fullscreen with zoom/download',
    },
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

/**
 * Click on the image to open preview mode with zoom and download functionality.
 */
export const WithPreview: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'Clickable image with preview',
    width: '400px',
    preview: true,
  },
};

/**
 * Multiple images with preview enabled - great for galleries.
 */
export const Gallery = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
    <Image
      src="https://picsum.photos/400/300?random=1"
      alt="Gallery image 1"
      preview
      width="200px"
    />
    <Image
      src="https://picsum.photos/400/300?random=2"
      alt="Gallery image 2"
      preview
      width="200px"
    />
    <Image
      src="https://picsum.photos/400/300?random=3"
      alt="Gallery image 3"
      preview
      width="200px"
    />
    <Image
      src="https://picsum.photos/400/300?random=4"
      alt="Gallery image 4"
      preview
      width="200px"
    />
    <Image
      src="https://picsum.photos/400/300?random=5"
      alt="Gallery image 5"
      preview
      width="200px"
    />
    <Image
      src="https://picsum.photos/400/300?random=6"
      alt="Gallery image 6"
      preview
      width="200px"
    />
  </div>
);

/**
 * High resolution image with preview - zoom in to see details.
 */
export const HighResolution: Story = {
  args: {
    src: 'https://picsum.photos/2000/1500',
    alt: 'High resolution image',
    width: '400px',
    preview: true,
  },
};
