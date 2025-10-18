import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@tavia/core';
import { Home, Settings, Users, FileText, Folder, BarChart } from 'lucide-react';

const meta = {
  title: 'Core/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sidebar component - A collapsible navigation sidebar with hover-to-expand behavior. Automatically expands on hover to show full labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of navigation items to display in the sidebar',
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { label: 'Dashboard', icon: <Home size={20} /> },
      { label: 'Users', icon: <Users size={20} /> },
      { label: 'Documents', icon: <FileText size={20} /> },
      { label: 'Settings', icon: <Settings size={20} /> },
    ],
  },
};

export const WithNestedItems: Story = {
  args: {
    items: [
      { label: 'Home', icon: <Home size={20} /> },
      {
        label: 'Products',
        icon: <Folder size={20} />,
        children: [{ label: 'All Products' }, { label: 'Categories' }, { label: 'Inventory' }],
      },
      {
        label: 'Analytics',
        icon: <BarChart size={20} />,
        children: [{ label: 'Overview' }, { label: 'Reports' }],
      },
      { label: 'Settings', icon: <Settings size={20} /> },
    ],
  },
};

export const IconsOnly: Story = {
  args: {
    items: [
      { icon: <Home size={20} /> },
      { icon: <Users size={20} /> },
      { icon: <FileText size={20} /> },
      { icon: <Settings size={20} /> },
    ],
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      {
        label: 'Dashboard',
        icon: <Home size={20} />,
        onClick: () => alert('Dashboard clicked'),
      },
      {
        label: 'Users',
        icon: <Users size={20} />,
        onClick: () => alert('Users clicked'),
      },
      {
        label: 'Settings',
        icon: <Settings size={20} />,
        onClick: () => alert('Settings clicked'),
      },
    ],
  },
};

export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Home', icon: <Home size={20} /> },
      {
        label: 'Products',
        icon: <Folder size={20} />,
        children: [
          { label: 'All Products' },
          {
            label: 'Categories',
            children: [{ label: 'Electronics' }, { label: 'Clothing' }, { label: 'Books' }],
          },
        ],
      },
    ],
  },
};
