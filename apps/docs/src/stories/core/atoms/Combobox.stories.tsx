import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '@tavia/core'; // Import đúng vị trí của component Combobox

const meta = {
  title: 'Core/Atoms/Combobox', // Đặt tên cho Story của bạn
  component: Combobox,
  parameters: {
    layout: 'centered' // Căn giữa component trong canvas
  },
  tags: ['autodocs'], // Thêm tag autodocs để Storybook tự tạo tài liệu
  argTypes: {
    placeholder: { control: 'text' }, // Cung cấp control cho các props
    value: { control: 'text' },
    variant: { control: 'select', options: ['default', 'danger', 'success'] },
    errorMessage: { control: 'text' },
    hasClearButton: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    options: { control: 'object' }
  }
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    value: '',
    variant: 'default',
    hasClearButton: true,
    isDisabled: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ]
  }
};

export const Danger: Story = {
  args: {
    placeholder: 'Select an option',
    value: '',
    variant: 'danger',
    hasClearButton: true,
    isDisabled: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ]
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select an option',
    value: '',
    variant: 'default',
    hasClearButton: true,
    isDisabled: true,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ]
  }
};

export const WithError: Story = {
  args: {
    placeholder: 'Select an option',
    value: '',
    variant: 'default',
    errorMessage: 'This field is required',
    hasClearButton: true,
    isDisabled: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ]
  }
};
