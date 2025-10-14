import type { Meta, StoryObj } from '@storybook/react';
import { ImageUpload } from '@tavia/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Form/ImageUpload',
  component: ImageUpload,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Basic: Story = {
  render: (args) => {
    return (
      <ImageUpload
        {...args}
        content={'Upload photo'}
        onChange={(value: string) => {
          console.log(value);
        }}
        createUploadsFn={async ({ file }: { file: File }) => {
          await console.log(file);
          return file.name;
        }}
      ></ImageUpload>
    );
  }
};
