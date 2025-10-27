import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@tavia/taviad';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Radix/Checkbox',
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    label: 'Label',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Multiple: Story = {
  render: (args) => {
    const handleOptionChecked = (option: any) => {
      console.log(option);
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Checkbox
          {...args}
          label="Option 1"
          onCheckedChange={() => handleOptionChecked('option1')}
          value="option1"
        />
        <Checkbox
          {...args}
          label="Option 2"
          onCheckedChange={() => handleOptionChecked('option2')}
          value="option2"
        />
      </div>
    );
  },
};

export const Card: Story = {
  render: (args) => {
    const handleOptionChecked = (option: any) => {
      console.log(option);
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Checkbox
          {...args}
          onCheckedChange={() => handleOptionChecked('option1')}
          value="option1"
          id={'option1'}
          label={
            <div>
              <h1>Card 1</h1>
            </div>
          }
        />
        <Checkbox
          {...args}
          onCheckedChange={() => handleOptionChecked('option2')}
          value="option2"
          id={'option2'}
          label={
            <div>
              <h1>Card 2</h1>
            </div>
          }
        />
      </div>
    );
  },
};
