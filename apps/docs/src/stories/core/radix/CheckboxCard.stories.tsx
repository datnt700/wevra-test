import { Meta, StoryObj } from '@storybook/react';
import { CheckboxCard } from '@tavia/core';
import { useState } from 'react';

const meta: Meta<typeof CheckboxCard> = {
  title: 'Core/Radix/CheckboxCard',
  component: CheckboxCard,
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the checkbox card',
      defaultValue: 'A1 Keyboard',
    },
    description: {
      control: 'text',
      description: 'The description of the checkbox card',
      defaultValue: 'US Layout',
    },
    checked: {
      control: 'boolean',
      description: 'Indicates if the checkbox is checked',
      defaultValue: false,
    },
    onCheckedChange: { action: 'checked changed' },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxCard>;

export const Default: Story = {
  render: (args) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
      'A1 Keyboard': args.checked ?? false,
      'Pro Mouse': false,
      'Lightning Mat': false,
    });

    const handleCheckedChange = (label: string) => (newChecked: boolean | 'indeterminate') => {
      if (typeof newChecked === 'boolean') {
        setCheckedItems((prev) => ({ ...prev, [label]: newChecked }));
      }
    };

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <CheckboxCard
          {...args}
          label="A1 Keyboard"
          description="US Layout"
          checked={checkedItems['A1 Keyboard']}
          onCheckedChange={handleCheckedChange('A1 Keyboard')}
        />
        <CheckboxCard
          {...args}
          label="Pro Mouse"
          description="Zero-lag wireless"
          checked={checkedItems['Pro Mouse']}
          onCheckedChange={handleCheckedChange('Pro Mouse')}
        />
        <CheckboxCard
          {...args}
          label="Lightning Mat"
          description="Wireless charging"
          checked={checkedItems['Lightning Mat']}
          onCheckedChange={handleCheckedChange('Lightning Mat')}
        />
      </div>
    );
  },
  args: {
    checked: false,
  },
};
