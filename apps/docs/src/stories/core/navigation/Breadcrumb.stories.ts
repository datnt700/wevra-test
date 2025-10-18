import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '@tavia/core';

const meta = {
  title: 'Core/Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb component for hierarchical navigation. Displays a trail of links showing the current page location within the site structure.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label and optional href',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'About' }],
  },
};

export const DeepNavigation: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: 'Electronics', href: '/categories/electronics' },
      { label: 'Computers', href: '/categories/electronics/computers' },
      { label: 'Laptops' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Product Categories', href: '/categories' },
      { label: 'Electronic Devices and Accessories', href: '/categories/electronics' },
      { label: 'Current Product Page' },
    ],
  },
};

export const WithoutLinks: Story = {
  args: {
    items: [
      { label: 'Section 1' },
      { label: 'Section 2' },
      { label: 'Section 3' },
      { label: 'Current Page' },
    ],
  },
};
