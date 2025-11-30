import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@eventure/eventured';

const meta = {
  title: 'Core/Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card component for containing and organizing content. Supports three variants: elevated (with shadow), outlined (with border), and flat (minimal styling).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Content to display inside the card' },
    header: { control: 'text', description: 'Optional header content' },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Visual style variant of the card',
      defaultValue: 'elevated',
    },
    className: { control: 'text', description: 'Additional CSS class for the card body' },
    wrapperClassName: { control: 'text', description: 'Additional CSS class for the card wrapper' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: {
    children: 'This is an elevated card with a shadow effect.',
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    children: 'This is an outlined card with a border.',
    variant: 'outlined',
  },
};

export const Flat: Story = {
  args: {
    children: 'This is a flat card with minimal styling.',
    variant: 'flat',
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Card Header',
    children: 'This card has a header section above the main content.',
    variant: 'elevated',
  },
};

export const WithComplexContent: Story = {
  render: (args) => (
    <Card {...args}>
      <h3 style={{ margin: '0 0 1rem 0' }}>User Profile</h3>
      <p style={{ margin: '0 0 0.5rem 0' }}>
        <strong>Name:</strong> John Doe
      </p>
      <p style={{ margin: '0 0 0.5rem 0' }}>
        <strong>Email:</strong> john.doe@example.com
      </p>
      <p style={{ margin: '0' }}>
        <strong>Role:</strong> Developer
      </p>
    </Card>
  ),
  args: {
    variant: 'elevated',
    children: '',
  },
};

export const NestedCards: Story = {
  render: (_args) => (
    <Card variant="outlined" header="Parent Card">
      <p style={{ marginBottom: '1rem' }}>This is the parent card content.</p>
      <Card variant="elevated">
        <p style={{ margin: 0 }}>This is a nested elevated card inside the parent.</p>
      </Card>
    </Card>
  ),
  args: {
    children: '',
  },
};

export const CustomStyling: Story = {
  args: {
    children: 'Card with custom styling classes',
    variant: 'elevated',
    className: 'custom-body-class',
    wrapperClassName: 'custom-wrapper-class',
  },
};
