import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@eventure/eventured';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Base/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    src: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    label: 'QN',
    src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/58ef74d4-eed1-47f9-b825-abed0371f0d9/deqbr9p-1ba60883-0171-4488-ad51-6683519d98e5.jpg/v1/fit/w_375,h_467,q_70,strp/sung_jin_woo_by_issashuzen_deqbr9p-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI3NiIsInBhdGgiOiJcL2ZcLzU4ZWY3NGQ0LWVlZDEtNDdmOS1iODI1LWFiZWQwMzcxZjBkOVwvZGVxYnI5cC0xYmE2MDg4My0wMTcxLTQ0ODgtYWQ1MS02NjgzNTE5ZDk4ZTUuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hIaDzTwvATkJDuA_0pswbKYkVvTQCmcK-En__IziGRU',
  },
};

export const Error: Story = {
  args: {
    label: 'QN',
  },
};
