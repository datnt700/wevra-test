import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs, TabsProps } from '@tavia/core'; // Importing Tabs from your design system
import { Home, User, Settings } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Core/Organisms/Tabs',
  component: Tabs,
  args: {
    orientation: 'horizontal',
    activationMode: 'automatic'
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual']
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl']
    },
    onValueChange: { action: 'changed' }
  }
};
export default meta;

type Story = StoryObj<typeof Tabs>;

const items = [
  {
    value: 'home',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Home size={18} /> Home
      </div>
    ),
    children: <div>Welcome to the Home tab!</div>
  },
  {
    value: 'profile',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <User size={18} /> Profile
      </div>
    ),
    children: <div>This is the Profile tab content.</div>
  },
  {
    value: 'settings',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Settings size={18} /> Settings
      </div>
    ),
    children: <div>Here you can configure Settings.</div>
  }
];

export const Basic: Story = {
  render: (args: TabsProps) => <Tabs {...args} items={items} defaultValue="home" />
};

export const VerticalTabs: Story = {
  render: (args: TabsProps) => (
    <Tabs {...args} items={items} orientation="vertical" defaultValue="profile" />
  ),
  args: {
    orientation: 'vertical'
  }
};

export const DisabledTab: Story = {
  render: (args: TabsProps) => (
    <Tabs
      {...args}
      items={[
        ...items,
        {
          value: 'disabled',
          label: 'Disabled Tab',
          children: <div>This tab is disabled.</div>,
          isDisabled: true
        }
      ]}
      defaultValue="home"
    />
  )
};
