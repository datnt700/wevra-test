import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonBodyText, SkeletonDisplayText, SketetonTabs, SkeletonCard } from '@tavia/taviad';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Layout/Skeletons',
  component: SkeletonBodyText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof SkeletonBodyText>;

export default meta;
type Story = StoryObj<typeof SkeletonBodyText>;

export const BodyText: Story = {
  render: (args) => {
    return (
      <div
        style={{
          width: '20rem',
        }}
      >
        <SkeletonBodyText {...args} rows={3} />
      </div>
    );
  },
};

export const DisplayText: Story = {
  render: (args) => {
    return <SkeletonDisplayText {...args} width="20rem" height="4rem" hasAnimation />;
  },
};

export const Tabs: Story = {
  render: (args) => {
    return <SketetonTabs {...args} count={3} hasAnimation />;
  },
};

export const Card: Story = {
  render: (args) => {
    return <SkeletonCard {...args} hasAnimation />;
  },
};
