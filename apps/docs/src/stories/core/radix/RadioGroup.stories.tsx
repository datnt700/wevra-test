import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '@tavia/core';
import { Radio } from '@tavia/core';

const meta: Meta<typeof RadioGroup> = {
  title: 'Core/Radix/RadioGroup',
  component: RadioGroup,
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    dir: {
      control: { type: 'radio' },
      options: ['ltr', 'rtl'],
    },
    defaultValue: { control: 'text' },
    onValueChange: { action: 'value changed' },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const VerticalGroup: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" value="option-1" />
      <Radio label="Option 2" value="option-2" />
      <Radio label="Option 3" value="option-3" />
    </RadioGroup>
  ),
  args: {
    orientation: 'vertical',
    defaultValue: 'option-1',
  },
};

export const HorizontalGroup: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" value="option-1" />
      <Radio label="Option 2" value="option-2" />
      <Radio label="Option 3" value="option-3" />
    </RadioGroup>
  ),
  args: {
    orientation: 'horizontal',
    defaultValue: 'option-2',
  },
};

export const WithCustomDirection: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option A" value="option-a" />
      <Radio label="Option B" value="option-b" />
    </RadioGroup>
  ),
  args: {
    dir: 'rtl',
    orientation: 'vertical',
    defaultValue: 'option-a',
  },
};
