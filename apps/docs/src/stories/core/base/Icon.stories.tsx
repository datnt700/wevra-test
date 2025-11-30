import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@eventure/eventured';
import {
  Check,
  X,
  Info as InfoIcon,
  AlertTriangle,
  Search,
  Settings,
  Heart,
  Star,
  Home,
} from 'lucide-react';

const meta = {
  title: 'Core/Base/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon component - A flexible icon wrapper that supports SVG strings or React elements. Works seamlessly with Lucide React icons and supports multiple color variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: false,
      description: 'Icon source - can be SVG string or React element',
    },
    variant: {
      control: 'select',
      options: ['base', 'inherit', 'primary', 'info', 'success', 'caution', 'warning', 'danger'],
      description: 'Color variant for the icon',
      defaultValue: 'base',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    source: <Check size={24} />,
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    source: <X size={24} />,
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    source: <AlertTriangle size={24} />,
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    source: <InfoIcon size={24} />,
    variant: 'info',
  },
};

export const Primary: Story = {
  args: {
    source: <Star size={24} />,
    variant: 'primary',
  },
};

export const Base: Story = {
  args: {
    source: <Settings size={24} />,
    variant: 'base',
  },
};

export const Inherit: Story = {
  render: (_args) => (
    <div style={{ color: '#9333ea' }}>
      <Icon source={<Heart size={24} />} variant="inherit" />
    </div>
  ),
  args: {
    source: <Heart size={24} />,
    variant: 'inherit',
  },
};

export const Small: Story = {
  args: {
    source: <Search size={16} />,
    variant: 'primary',
  },
};

export const Medium: Story = {
  args: {
    source: <Search size={24} />,
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    source: <Search size={32} />,
    variant: 'primary',
  },
};

export const ExtraLarge: Story = {
  args: {
    source: <Search size={48} />,
    variant: 'primary',
  },
};

export const WithSVGString: Story = {
  args: {
    source:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    variant: 'info',
  },
};

export const IconGallery: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Icon source={<Home size={24} />} variant="base" />
      <Icon source={<Search size={24} />} variant="primary" />
      <Icon source={<Settings size={24} />} variant="info" />
      <Icon source={<Heart size={24} />} variant="danger" />
      <Icon source={<Star size={24} />} variant="warning" />
      <Icon source={<Check size={24} />} variant="success" />
    </div>
  ),
  args: {
    source: <Home size={24} />,
  },
};
