import { Meta, StoryObj } from '@storybook/react';
import { RadioCard } from '@tavia/core'; // Đảm bảo đường dẫn đúng tới file RadioCard
import { useState } from 'react';

const meta: Meta<typeof RadioCard> = {
  title: 'Core/Organisms/RadioCard',
  component: RadioCard,
  argTypes: {
    value: { control: 'text', description: 'The value of the radio card', defaultValue: 'option1' },
    label: {
      control: 'text',
      description: 'The label of the radio card',
      defaultValue: 'Select an option'
    }
  }
};

export default meta;

type Story = StoryObj<typeof RadioCard>;

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleRadioChange = (value: string) => {
      setSelectedValue(value);
    };

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <RadioCard
          {...args}
          value="option1"
          label="Option 1"
          checked={selectedValue === 'option1'}
          onChange={handleRadioChange}
        />
        <RadioCard
          {...args}
          value="option2"
          label="Option 2"
          checked={selectedValue === 'option2'}
          onChange={handleRadioChange}
        />
        <RadioCard
          {...args}
          value="option3"
          label="Option 3"
          checked={selectedValue === 'option3'}
          onChange={handleRadioChange}
        />
      </div>
    );
  },
  args: {
    label: 'Select an option',
    value: 'option1'
  }
};
