import type { Meta, StoryObj } from '@storybook/react';
import { Button, Icon } from '@eventure/eventured';
import { Search, FileText } from 'lucide-react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Base/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
    isLoading: { control: 'boolean' },
    variant: { control: 'text' },
    shape: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Hello World 🌍!',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Hello Mars🚀!',
    variant: 'secondary',
  },
};

export const Dark: Story = {
  args: {
    children: 'Hello Mars🚀!',
    variant: 'dark',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Hello Mars🚀!',
    variant: 'tertiary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Hello Mars🚀!',
    isLoading: true,
  },
};

export const LoadingOnly: Story = {
  args: {
    isLoading: true,
    shape: 'square',
  },
};

export const WithIcon: Story = {
  render: (args) => {
    return (
      <Button icon={<Icon source={<Search size={16} />} />} {...args}>
        Search
      </Button>
    );
  },
  args: {
    variant: 'primary',
  },
};

export const IconOnly: Story = {
  render: (args) => {
    return <Button icon={<Icon source={<FileText size={16} />} />} {...args} />;
  },
  args: {
    variant: 'primary',
    shape: 'square',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Hello Mars🚀!',
    disabled: true,
  },
};
