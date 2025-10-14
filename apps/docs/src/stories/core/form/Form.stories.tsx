import type { Meta, StoryObj } from '@storybook/react';

import { Form, InputText, Label, Button, Field } from '@tavia/core';

const meta: Meta<typeof Form> = {
  title: 'Core/Form/Form',
  component: Form,
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Form {...args}>
        <Field label={<Label>Name</Label>} input={<InputText placeholder="Name" />} />

        <Button>Submit</Button>
      </Form>
    );
  },
};
