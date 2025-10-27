import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from '@tavia/taviad';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Form/InputText',
  component: InputText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    placeholder: 'Enter your name',
    type: 'text',
  },
};

export const HasClear: Story = {
  args: {
    placeholder: 'Enter your name',
    hasClearButton: true,
    type: 'text',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Enter your name',
    name: 'name',
    variant: 'danger',
    errorMessage: 'This is an error',
    type: 'text',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your name',
    value: 'Hello',
    isDisabled: true,
    type: 'text',
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: 'Enter your name',
    value: 'Hello',
    isReadOnly: true,
    type: 'text',
  },
};
