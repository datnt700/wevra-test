import type { Meta, StoryObj } from '@storybook/react';
import { InputSearch, Label, Field, Card, Spinner } from '@tavia/taviad';
import { useState, useEffect } from 'react';

const meta: Meta<typeof InputSearch> = {
  title: 'Core/Form/InputSearch',
  component: InputSearch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Search input component with integrated search icon, error states, and accessibility features. Perfect for search bars, filter inputs, and autocomplete.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      defaultValue: 'Search...',
    },
    status: {
      control: 'select',
      options: ['default', 'error'],
      description: 'Input status/variant',
      defaultValue: 'default',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search...',
    value: 'React components',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search for products...',
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Search...',
    status: 'error',
    errorMessage: 'Please enter a valid search term',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search...',
    disabled: true,
    value: 'Disabled search',
  },
};

export const Controlled: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: '400px' }}>
        <InputSearch
          placeholder="Type to search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
          Search term: <strong>{value || '(empty)'}</strong>
        </p>
      </div>
    );
  },
  args: {},
};

export const WithValidation: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');
    const hasError = value.length > 0 && value.length < 3;

    return (
      <div style={{ width: '400px' }}>
        <InputSearch
          placeholder="Search (min 3 characters)..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          status={hasError ? 'error' : undefined}
          errorMessage={hasError ? 'Search term must be at least 3 characters' : undefined}
        />
      </div>
    );
  },
  args: {},
};

export const WithClearButton: Story = {
  render: (_args) => {
    const [value, setValue] = useState('Initial search term');

    return (
      <div style={{ width: '400px', position: 'relative' }}>
        <InputSearch
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <button
            onClick={() => setValue('')}
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              color: '#666',
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    );
  },
  args: {},
};

export const WithLoadingState: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (value.length >= 3) {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsLoading(false);
      }
    }, [value]);

    return (
      <div style={{ width: '400px', position: 'relative' }}>
        <InputSearch
          placeholder="Search products..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Spinner size="sm" />
          </div>
        )}
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
          {isLoading ? 'Searching...' : 'Type at least 3 characters to search'}
        </p>
      </div>
    );
  },
  args: {},
};

export const WithAutocomplete: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');
    const [suggestions] = useState([
      'React',
      'React Native',
      'Redux',
      'React Router',
      'React Query',
      'Next.js',
      'Remix',
    ]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
      if (value.length > 0) {
        const filtered = suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()));
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, [value, suggestions]);

    return (
      <div style={{ width: '400px', position: 'relative' }}>
        <InputSearch
          placeholder="Search frameworks..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '0.25rem',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 10,
            }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  setValue(suggestion);
                  setShowSuggestions(false);
                }}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  borderBottom:
                    index < filteredSuggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  args: {},
};

export const InHeader: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: '600px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#3b82f6',
            borderRadius: '0.5rem',
          }}
        >
          <h2 style={{ margin: 0, color: 'white', fontSize: '1.25rem', fontWeight: 600 }}>
            My App
          </h2>
          <div style={{ flex: 1 }}>
            <InputSearch
              placeholder="Search..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  },
  args: {},
};

export const SearchPage: Story = {
  render: (_args) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results] = useState([
      { id: 1, title: 'Getting Started with React', category: 'Tutorial' },
      { id: 2, title: 'React Hooks Deep Dive', category: 'Article' },
      { id: 3, title: 'Building Forms in React', category: 'Guide' },
      { id: 4, title: 'React Performance Tips', category: 'Article' },
    ]);

    const filteredResults = results.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div style={{ width: '600px' }}>
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: 600 }}>
          Search Documentation
        </h2>
        <Field
          label={<Label>Search</Label>}
          input={
            <InputSearch
              placeholder="Search articles, guides, tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          }
        />

        <div style={{ marginTop: '1.5rem' }}>
          {searchTerm && (
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#666' }}>
              Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
            </p>
          )}

          {filteredResults.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredResults.map((result) => (
                <Card key={result.id} variant="outlined">
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>
                    {result.title}
                  </h3>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#e0e7ff',
                      color: '#3730a3',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {result.category}
                  </span>
                </Card>
              ))}
            </div>
          ) : searchTerm ? (
            <Card variant="outlined">
              <p style={{ margin: 0, color: '#666', textAlign: 'center' }}>
                No results found for "{searchTerm}"
              </p>
            </Card>
          ) : null}
        </div>
      </div>
    );
  },
  args: {},
};

export const WithFieldComponent: Story = {
  render: (_args) => {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: '400px' }}>
        <Field
          label={<Label>Search Products</Label>}
          input={
            <InputSearch
              placeholder="Enter product name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          }
        />
      </div>
    );
  },
  args: {},
};

export const DifferentSizes: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px' }}>
      <div style={{ width: '200px' }}>
        <Label>Small</Label>
        <InputSearch placeholder="Search..." style={{ fontSize: '0.875rem', padding: '0.5rem' }} />
      </div>
      <div style={{ width: '300px' }}>
        <Label>Medium (Default)</Label>
        <InputSearch placeholder="Search..." />
      </div>
      <div style={{ width: '500px' }}>
        <Label>Large</Label>
        <InputSearch placeholder="Search..." style={{ fontSize: '1.125rem', padding: '1rem' }} />
      </div>
    </div>
  ),
  args: {},
};
