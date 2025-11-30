import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@eventure/eventured';

const meta: Meta<typeof Spinner> = {
  title: 'Core/Base/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Spinner component for loading states. Available in 3 sizes (sm, lg, xxl) with smooth animation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg', 'xxl'],
      description: 'Size variant of the spinner',
      defaultValue: 'sm',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const XXL: Story = {
  args: {
    size: 'xxl',
  },
};

export const InButton: Story = {
  render: (_args) => (
    <button
      style={{
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        border: 'none',
        borderRadius: '0.25rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        cursor: 'not-allowed',
      }}
    >
      <Spinner size="sm" />
      <span>Loading...</span>
    </button>
  ),
  args: {
    size: 'sm',
  },
};

export const Centered: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '200px',
        border: '1px dashed #ccc',
        borderRadius: '0.5rem',
      }}
    >
      <Spinner {...args} />
    </div>
  ),
  args: {
    size: 'lg',
  },
};

export const WithText: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <Spinner {...args} />
      <p style={{ margin: 0, color: '#666' }}>Loading data...</p>
    </div>
  ),
  args: {
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <Spinner size="sm" />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Small</span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <Spinner size="lg" />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Large</span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <Spinner size="xxl" />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>XX-Large</span>
      </div>
    </div>
  ),
};
