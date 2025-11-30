import type { Meta, StoryObj } from '@storybook/react';
import { InputTags } from '@eventure/eventured';
import { useState } from 'react';

/**
 * InputTags component for entering multiple tag values with autocomplete suggestions.
 *
 * Supports:
 * - Add/remove tags via keyboard (Enter) or click
 * - Tag suggestions with autocomplete
 * - Custom tag colors
 * - Error state validation
 * - Accessible keyboard navigation
 */
const meta: Meta<typeof InputTags> = {
  title: 'Core/Form/InputTags',
  component: InputTags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    status: {
      control: 'select',
      options: ['default', 'error'],
      description: 'Visual status of the input',
    },
    tags: {
      control: 'object',
      description: 'Array of current tags',
    },
    tagsSuggestion: {
      control: 'object',
      description: 'Array of suggested tags for autocomplete',
    },
    onChange: {
      action: 'tag added',
      description: 'Callback when a tag is added',
    },
    removeTag: {
      action: 'tag removed',
      description: 'Callback when a tag is removed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic empty InputTags with placeholder.
 * Press Enter after typing to add a tag.
 */
export const Basic: Story = {
  args: {
    placeholder: 'Type and press Enter...',
    tags: [],
  },
};

/**
 * InputTags with pre-populated tags.
 * Click the X icon to remove tags.
 */
export const WithTags: Story = {
  args: {
    placeholder: 'Add more tags...',
    tags: [
      { id: '1', name: 'React', color: '#61dafb' },
      { id: '2', name: 'TypeScript', color: '#3178c6' },
      { id: '3', name: 'JavaScript', color: '#f7df1e' },
    ],
  },
};

/**
 * InputTags with tag suggestions.
 * Focus the input to see autocomplete dropdown with suggested tags.
 */
export const WithSuggestions: Story = {
  args: {
    placeholder: 'Start typing to see suggestions...',
    tags: [{ id: '1', name: 'React' }],
    tagsSuggestion: [
      { id: '2', name: 'TypeScript' },
      { id: '3', name: 'JavaScript' },
      { id: '4', name: 'Next.js' },
      { id: '5', name: 'Node.js' },
      { id: '6', name: 'Express' },
    ],
  },
};

/**
 * InputTags with error state.
 * Useful for showing validation errors.
 */
export const ErrorState: Story = {
  args: {
    placeholder: 'At least one tag required',
    status: 'error',
    tags: [],
  },
};

/**
 * InputTags with custom colored tags.
 * Each tag can have a unique color.
 */
export const CustomColors: Story = {
  args: {
    placeholder: 'Add colorful tags...',
    tags: [
      { id: '1', name: 'Frontend', color: '#ff6b6b' },
      { id: '2', name: 'Backend', color: '#4ecdc4' },
      { id: '3', name: 'DevOps', color: '#45b7d1' },
      { id: '4', name: 'Design', color: '#f9ca24' },
      { id: '5', name: 'Testing', color: '#6c5ce7' },
    ],
  },
};

/**
 * Controlled InputTags component with state management.
 * Demonstrates full CRUD operations: add and remove tags.
 */
export const Controlled: Story = {
  render: (args) => {
    const [tags, setTags] = useState([
      { id: '1', name: 'React' },
      { id: '2', name: 'TypeScript' },
    ]);

    const handleAddTag = (data: { name: string }) => {
      const newTag = {
        id: Date.now().toString(),
        name: data.name,
      };
      setTags([...tags, newTag]);
    };

    const handleRemoveTag = (id: string) => {
      setTags(tags.filter((tag) => tag.id !== id));
    };

    return (
      <div style={{ width: '400px' }}>
        <InputTags {...args} tags={tags} onChange={handleAddTag} removeTag={handleRemoveTag} />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Total tags: {tags.length}
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Add or remove tags...',
  },
};

/**
 * InputTags with validation - maximum 5 tags allowed.
 * Shows error state when limit is reached.
 */
export const WithValidation: Story = {
  render: (args) => {
    const [tags, setTags] = useState([
      { id: '1', name: 'React' },
      { id: '2', name: 'TypeScript' },
    ]);
    const [error, setError] = useState('');
    const MAX_TAGS = 5;

    const handleAddTag = (data: { name: string }) => {
      if (tags.length >= MAX_TAGS) {
        setError(`Maximum ${MAX_TAGS} tags allowed`);
        return;
      }

      const newTag = {
        id: Date.now().toString(),
        name: data.name,
      };
      setTags([...tags, newTag]);
      setError('');
    };

    const handleRemoveTag = (id: string) => {
      setTags(tags.filter((tag) => tag.id !== id));
      setError('');
    };

    return (
      <div style={{ width: '400px' }}>
        <InputTags
          {...args}
          tags={tags}
          onChange={handleAddTag}
          removeTag={handleRemoveTag}
          status={error ? 'error' : 'default'}
        />
        {error && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#dc2626' }}>{error}</p>
        )}
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          {tags.length} / {MAX_TAGS} tags
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Add up to 5 tags...',
  },
};

/**
 * Skills tagging example with predefined suggestions.
 * Common use case for job applications or profiles.
 */
export const SkillsTagging: Story = {
  render: (args) => {
    const [skills, setSkills] = useState([
      { id: '1', name: 'JavaScript' },
      { id: '2', name: 'React' },
    ]);

    const suggestions = [
      { id: 's1', name: 'TypeScript' },
      { id: 's2', name: 'Node.js' },
      { id: 's3', name: 'Python' },
      { id: 's4', name: 'Go' },
      { id: 's5', name: 'Docker' },
      { id: 's6', name: 'Kubernetes' },
      { id: 's7', name: 'AWS' },
      { id: 's8', name: 'GraphQL' },
    ];

    const handleAddSkill = (data: { name: string }) => {
      const newSkill = {
        id: Date.now().toString(),
        name: data.name,
      };
      setSkills([...skills, newSkill]);
    };

    const handleRemoveSkill = (id: string) => {
      setSkills(skills.filter((skill) => skill.id !== id));
    };

    return (
      <div style={{ width: '500px' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Your Skills
        </label>
        <InputTags
          {...args}
          tags={skills}
          tagsSuggestion={suggestions}
          onChange={handleAddSkill}
          removeTag={handleRemoveSkill}
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Add your technical skills (press Enter or select from suggestions)
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Add skills...',
  },
};

/**
 * Category tagging for blog posts or articles.
 * Shows how to use InputTags with custom categories.
 */
export const CategoryTagging: Story = {
  render: (args) => {
    const [categories, setCategories] = useState([
      { id: '1', name: 'Web Development', color: '#3b82f6' },
      { id: '2', name: 'Tutorial', color: '#10b981' },
    ]);

    const handleAddCategory = (data: { name: string }) => {
      const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6'];
      const newCategory = {
        id: Date.now().toString(),
        name: data.name,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setCategories([...categories, newCategory]);
    };

    const handleRemoveCategory = (id: string) => {
      setCategories(categories.filter((cat) => cat.id !== id));
    };

    return (
      <div style={{ width: '500px' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Article Categories
        </label>
        <InputTags
          {...args}
          tags={categories}
          onChange={handleAddCategory}
          removeTag={handleRemoveCategory}
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Add categories for your article (automatically colored)
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Add category...',
  },
};

/**
 * Email recipients input using InputTags.
 * Common pattern for email composition interfaces.
 */
export const EmailRecipients: Story = {
  render: (args) => {
    const [recipients, setRecipients] = useState([{ id: '1', name: 'john@example.com' }]);
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleAddRecipient = (data: { name: string }) => {
      if (!validateEmail(data.name)) {
        setError('Please enter a valid email address');
        return;
      }

      const newRecipient = {
        id: Date.now().toString(),
        name: data.name,
      };
      setRecipients([...recipients, newRecipient]);
      setError('');
    };

    const handleRemoveRecipient = (id: string) => {
      setRecipients(recipients.filter((r) => r.id !== id));
    };

    return (
      <div style={{ width: '600px' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>To:</label>
        <InputTags
          {...args}
          tags={recipients}
          onChange={handleAddRecipient}
          removeTag={handleRemoveRecipient}
          status={error ? 'error' : 'default'}
        />
        {error && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#dc2626' }}>{error}</p>
        )}
      </div>
    );
  },
  args: {
    placeholder: 'Enter email addresses...',
    type: 'email',
  },
};

/**
 * Tags with autocomplete filtering.
 * Suggestions filter based on input value.
 */
export const FilteredSuggestions: Story = {
  render: (args) => {
    const [tags, setTags] = useState<Array<{ id: string; name: string }>>([]);
    const [inputValue, setInputValue] = useState('');

    const allSuggestions = [
      { id: 's1', name: 'React' },
      { id: 's2', name: 'Redux' },
      { id: 's3', name: 'React Router' },
      { id: 's4', name: 'TypeScript' },
      { id: 's5', name: 'JavaScript' },
      { id: 's6', name: 'Node.js' },
      { id: 's7', name: 'Next.js' },
      { id: 's8', name: 'Nest.js' },
    ];

    const filteredSuggestions = inputValue
      ? allSuggestions.filter((s) => s.name.toLowerCase().includes(inputValue.toLowerCase()))
      : allSuggestions;

    const handleAddTag = (data: { name: string }) => {
      const newTag = {
        id: Date.now().toString(),
        name: data.name,
      };
      setTags([...tags, newTag]);
      setInputValue('');
    };

    const handleRemoveTag = (id: string) => {
      setTags(tags.filter((tag) => tag.id !== id));
    };

    return (
      <div style={{ width: '500px' }}>
        <InputTags
          {...args}
          tags={tags}
          tagsSuggestion={filteredSuggestions}
          onChange={handleAddTag}
          removeTag={handleRemoveTag}
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Start typing to filter suggestions
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Type to search...',
  },
};

/**
 * Complete form example with InputTags.
 * Shows integration with other form elements.
 */
export const CompleteForm: Story = {
  render: (args) => {
    const [tags, setTags] = useState([{ id: '1', name: 'React' }]);

    const handleAddTag = (data: { name: string }) => {
      const newTag = {
        id: Date.now().toString(),
        name: data.name,
      };
      setTags([...tags, newTag]);
    };

    const handleRemoveTag = (id: string) => {
      setTags(tags.filter((tag) => tag.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted with tags: ${tags.map((t) => t.name).join(', ')}`);
    };

    return (
      <form onSubmit={handleSubmit} style={{ width: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Project Name
          </label>
          <input
            type="text"
            placeholder="My Awesome Project"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Technologies Used
          </label>
          <InputTags {...args} tags={tags} onChange={handleAddTag} removeTag={handleRemoveTag} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Description
          </label>
          <textarea
            placeholder="Describe your project..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Create Project
        </button>
      </form>
    );
  },
  args: {
    placeholder: 'Add technologies...',
  },
};

/**
 * Showcase of all InputTags states and variants.
 */
export const AllVariants: Story = {
  render: (_args) => {
    const [tags1, setTags1] = useState([{ id: '1', name: 'Default' }]);
    const [tags2, setTags2] = useState([{ id: '1', name: 'Error' }]);

    return (
      <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Empty State</h3>
          <InputTags placeholder="Add tags..." tags={[]} />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>With Tags</h3>
          <InputTags
            placeholder="Add more..."
            tags={tags1}
            onChange={(data) =>
              setTags1([...tags1, { id: Date.now().toString(), name: data.name }])
            }
            removeTag={(id) => setTags1(tags1.filter((t) => t.id !== id))}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Error State</h3>
          <InputTags
            placeholder="Required field"
            status="error"
            tags={tags2}
            onChange={(data) =>
              setTags2([...tags2, { id: Date.now().toString(), name: data.name }])
            }
            removeTag={(id) => setTags2(tags2.filter((t) => t.id !== id))}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>With Suggestions</h3>
          <InputTags
            placeholder="Start typing..."
            tags={[]}
            tagsSuggestion={[
              { id: '1', name: 'React' },
              { id: '2', name: 'Vue' },
              { id: '3', name: 'Angular' },
            ]}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Custom Colors</h3>
          <InputTags
            placeholder="Colorful tags..."
            tags={[
              { id: '1', name: 'Red', color: '#ef4444' },
              { id: '2', name: 'Blue', color: '#3b82f6' },
              { id: '3', name: 'Green', color: '#10b981' },
            ]}
          />
        </div>
      </div>
    );
  },
};
