import type { Meta, StoryObj } from '@storybook/react';
import { Tag, Card } from '@tavia/core';
import { useState } from 'react';

const meta: Meta<typeof Tag> = {
  title: 'Core/Base/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tag component for labeling, categorization, and tagging. Supports interactive states, close buttons, and URL links.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content displayed inside the tag',
    },
    hasClose: {
      control: 'boolean',
      description: 'Whether to show a close button',
      defaultValue: false,
    },
    onClick: {
      description: 'Click handler for interactive tags',
    },
    url: {
      control: 'text',
      description: 'Optional URL to make the tag a link (opens in new tab)',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Basic: Story = {
  render: (args) => (
    <Card>
      <Tag {...args}>Label</Tag>
    </Card>
  ),
};

export const Clickable: Story = {
  render: (args) => (
    <Card>
      <Tag {...args} onClick={() => alert('Tag clicked!')}>
        Clickable Tag
      </Tag>
    </Card>
  ),
};

export const WithClose: Story = {
  render: (_args) => {
    const [visible, setVisible] = useState(true);
    return (
      <Card>
        {visible ? (
          <Tag hasClose onCloseClick={() => setVisible(false)}>
            Removable Tag
          </Tag>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>Tag removed</p>
        )}
      </Card>
    );
  },
};

export const AsLink: Story = {
  render: (args) => (
    <Card>
      <Tag {...args} url="https://github.com">
        GitHub
      </Tag>
    </Card>
  ),
};

export const MultipleTags: Story = {
  render: (_args) => (
    <Card>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <Tag>React</Tag>
        <Tag>TypeScript</Tag>
        <Tag>Next.js</Tag>
        <Tag>Tailwind CSS</Tag>
        <Tag>Storybook</Tag>
      </div>
    </Card>
  ),
};

export const TagCollection: Story = {
  render: (_args) => {
    const [tags, setTags] = useState(['JavaScript', 'Python', 'Go', 'Rust', 'Java']);

    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
      <Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {tags.map((tag) => (
            <Tag key={tag} hasClose onCloseClick={() => removeTag(tag)}>
              {tag}
            </Tag>
          ))}
          {tags.length === 0 && (
            <p style={{ color: '#666', fontStyle: 'italic' }}>All tags removed</p>
          )}
        </div>
      </Card>
    );
  },
};

export const Categories: Story = {
  render: (_args) => (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Frontend
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <Tag>React</Tag>
            <Tag>Vue</Tag>
            <Tag>Angular</Tag>
          </div>
        </div>
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Backend</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <Tag>Node.js</Tag>
            <Tag>Django</Tag>
            <Tag>Spring</Tag>
          </div>
        </div>
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Database
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <Tag>PostgreSQL</Tag>
            <Tag>MongoDB</Tag>
            <Tag>Redis</Tag>
          </div>
        </div>
      </div>
    </Card>
  ),
};

export const InteractiveTags: Story = {
  render: (_args) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['React']);
    const availableTags = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'];

    const toggleTag = (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };

    return (
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
            Click tags to toggle selection
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {availableTags.map((tag) => (
              <Tag
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  opacity: selectedTags.includes(tag) ? 1 : 0.5,
                  fontWeight: selectedTags.includes(tag) ? 600 : 400,
                }}
              >
                {tag}
              </Tag>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Selected: <strong>{selectedTags.join(', ')}</strong>
          </p>
        </div>
      </Card>
    );
  },
};
