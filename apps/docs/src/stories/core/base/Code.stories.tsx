import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '@tavia/core';

const meta = {
  title: 'Core/Base/Code',
  component: Code,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Code component for displaying inline code snippets with monospace font and subtle styling. Perfect for inline code references in documentation or UI text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Code content to display' },
    className: { control: 'text', description: 'Custom CSS class for styling' },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'console.log("Hello, World!")',
  },
};

export const Command: Story = {
  args: {
    children: 'npm install @tavia/core',
  },
};

export const VariableName: Story = {
  args: {
    children: 'userName',
  },
};

export const FilePath: Story = {
  args: {
    children: 'src/components/Button.tsx',
  },
};

export const FunctionCall: Story = {
  args: {
    children: 'getData(userId)',
  },
};

export const InSentence: Story = {
  render: (_args) => (
    <p>
      Use the <Code>useState</Code> hook to manage component state in React.
    </p>
  ),
  args: {
    children: 'useState',
  },
};

export const MultipleCodes: Story = {
  render: (_args) => (
    <p>
      Import components with <Code>{'import { Button }'}</Code> from <Code>@tavia/core</Code>.
    </p>
  ),
  args: {
    children: 'import',
  },
};

export const LongCode: Story = {
  args: {
    children: 'const result = fetchUserData(userId).then(data => processData(data))',
  },
};

export const ShortCode: Story = {
  args: {
    children: 'x',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    children: '<Button onClick={() => alert("clicked")}>',
  },
};
