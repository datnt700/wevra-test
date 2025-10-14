import type { Meta, StoryObj } from '@storybook/react';
import { Field, InputText, Label } from '@tavia/core';

const meta = {
  title: 'Core/Atoms/Field',
  component: Field,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['column', 'row'],
      description: 'Layout type for the field (column or row)'
    },
    label: { control: 'text', description: 'Label for the field' },
    input: { control: false, description: 'Input element for the field' }
  }
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story cơ bản
export const Basic: Story = {
  args: {
    label: <Label children={'Basic Input'} />,
    input: <InputText placeholder="Enter your text" />,
    type: 'column'
  }
};

// Story với layout 'row'
export const RowLayout: Story = {
  args: {
    label: <Label children={'Row Input'} />,
    input: <InputText placeholder="Enter your text" />,
    type: 'row'
  }
};

// Story với layout 'column'
export const ColumnLayout: Story = {
  args: {
    label: <Label children={'Column Input'} />,
    input: <InputText placeholder="Enter your text" />,
    type: 'column'
  }
};
