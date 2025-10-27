import type { Meta, StoryObj } from '@storybook/react';
import { LoadingLogo } from '@tavia/taviad';

const meta = {
  title: 'Core/State/LoadingLogo',
  component: LoadingLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'LoadingLogo component - An animated logo SVG component for loading states. Features scalable vector graphics and theme-aware coloring.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 50, max: 300 },
      description: 'Width of the logo in pixels',
      defaultValue: 99.86,
    },
    height: {
      control: { type: 'number', min: 20, max: 150 },
      description: 'Height of the logo in pixels',
      defaultValue: 43.35,
    },
  },
} satisfies Meta<typeof LoadingLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    width: 80,
    height: 35,
  },
};

export const Medium: Story = {
  args: {
    width: 120,
    height: 52,
  },
};

export const Large: Story = {
  args: {
    width: 150,
    height: 65,
  },
};

export const ExtraLarge: Story = {
  args: {
    width: 200,
    height: 87,
  },
};

export const InLoadingScreen: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem',
      }}
    >
      <LoadingLogo {...args} />
      <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 500 }}>Loading...</p>
    </div>
  ),
  args: {
    width: 120,
    height: 52,
  },
};
