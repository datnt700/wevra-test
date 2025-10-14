import type { Meta, StoryObj } from '@storybook/react';
import { Link, MenuBar, MenuBarProps } from '@tavia/core';
import { Bell } from 'lucide-react';

const DEFAULT_MENU = [
  {
    label: <Bell />,
    items: [
      {
        children: <Link url="https://www.google.com">This is a link</Link>
      },
      { children: 'New Window' },
      { children: 'New Incognito Window' }
    ]
  },
  {
    label: 'Edit',
    items: [{ children: 'Undo' }, { children: 'Redo' }]
  },
  {
    label: 'View',
    items: [{ children: 'Zoom In' }, { children: 'Zoom Out' }]
  }
];

const meta: Meta<typeof MenuBar> = {
  title: 'Core/Dialog/MenuBar',
  component: MenuBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Menu items data structure',
      defaultValue: DEFAULT_MENU
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    }
  }
};
export default meta;

type Story = StoryObj<typeof MenuBar>;

export const Basic: Story = {
  render: (args: MenuBarProps) => {
    return <MenuBar {...args} data={args.data || DEFAULT_MENU} />;
  },
  args: {
    side: 'bottom'
  }
};
