import type { Meta, StoryObj } from '@storybook/react';
import { Slider, SliderProps } from '@tavia/core';

const meta: Meta<typeof Slider> = {
  title: 'Core/Form/Slider',
  component: Slider,
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the slider',
      defaultValue: 'slider',
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the slider',
      defaultValue: 'horizontal',
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'The default value of the slider',
      defaultValue: [50],
    },
    value: {
      control: { type: 'object' },
      description: 'The controlled value of the slider',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback function triggered when value changes',
    },
    onValueCommit: {
      action: 'value committed',
      description: 'Callback function triggered when value is committed',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value of the slider',
      defaultValue: 0,
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value of the slider',
      defaultValue: 100,
    },
    step: {
      control: { type: 'number' },
      description: 'Step interval for slider',
      defaultValue: 1,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  args: {
    name: 'slider',
    orientation: 'horizontal',
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
  },
  render: (args: SliderProps) => <Slider {...args} />,
};
