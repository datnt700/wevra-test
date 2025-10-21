import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, Button } from '@tavia/core';
import { useState } from 'react';
import {
  Copy,
  Download,
  Share2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heart,
  MessageCircle,
  Repeat2,
  Grid,
  List,
  Map,
} from 'lucide-react';

/**
 * ButtonGroup component for grouping related buttons together.
 *
 * Features:
 * - Default spacing or attached (no gap) variants
 * - Horizontal or vertical orientation
 * - Perfect for toolbars, segmented controls, and action groups
 * - Maintains button states (active, disabled) within group
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Core/Form/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'attached'],
      description: 'Button group variant - default has spacing, attached has no gap',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    children: {
      control: false,
      description: 'Button elements to group',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/**
 * Basic button group with default spacing.
 */
export const Basic: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  ),
};

/**
 * Attached button group with no spacing between buttons.
 * Perfect for segmented controls or toolbars.
 */
export const Attached: Story = {
  render: (args) => (
    <ButtonGroup {...args} variant="attached">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
};

/**
 * Vertical orientation button group.
 * Useful for side panels or mobile layouts.
 */
export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} orientation="vertical">
      <Button variant="secondary">Top</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Bottom</Button>
    </ButtonGroup>
  ),
};

/**
 * Vertical attached button group.
 */
export const VerticalAttached: Story = {
  render: (args) => (
    <ButtonGroup {...args} variant="attached" orientation="vertical">
      <Button variant="secondary">First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="secondary">Third</Button>
    </ButtonGroup>
  ),
};

/**
 * Button group with icons only.
 * Common pattern for toolbars and action bars.
 */
export const IconButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args} variant="attached">
      <Button variant="secondary" icon={<Copy size={18} />} />
      <Button variant="secondary" icon={<Download size={18} />} />
      <Button variant="secondary" icon={<Share2 size={18} />} />
    </ButtonGroup>
  ),
};

/**
 * Text formatting toolbar with icon buttons.
 * Classic rich text editor pattern.
 */
export const FormattingToolbar: Story = {
  render: (args) => {
    const [formats, setFormats] = useState<string[]>([]);

    const toggleFormat = (format: string) => {
      if (formats.includes(format)) {
        setFormats(formats.filter((f) => f !== format));
      } else {
        setFormats([...formats, format]);
      }
    };

    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonGroup {...args} variant="attached">
          <Button
            variant={formats.includes('bold') ? 'primary' : 'secondary'}
            icon={<Bold size={18} />}
            onClick={() => toggleFormat('bold')}
          />
          <Button
            variant={formats.includes('italic') ? 'primary' : 'secondary'}
            icon={<Italic size={18} />}
            onClick={() => toggleFormat('italic')}
          />
          <Button
            variant={formats.includes('underline') ? 'primary' : 'secondary'}
            icon={<Underline size={18} />}
            onClick={() => toggleFormat('underline')}
          />
        </ButtonGroup>

        <ButtonGroup {...args} variant="attached">
          <Button
            variant={formats.includes('left') ? 'primary' : 'secondary'}
            icon={<AlignLeft size={18} />}
            onClick={() => toggleFormat('left')}
          />
          <Button
            variant={formats.includes('center') ? 'primary' : 'secondary'}
            icon={<AlignCenter size={18} />}
            onClick={() => toggleFormat('center')}
          />
          <Button
            variant={formats.includes('right') ? 'primary' : 'secondary'}
            icon={<AlignRight size={18} />}
            onClick={() => toggleFormat('right')}
          />
        </ButtonGroup>
      </div>
    );
  },
};

/**
 * Segmented control for view switching.
 * Single selection pattern.
 */
export const SegmentedControl: Story = {
  render: (args) => {
    const [view, setView] = useState<'grid' | 'list' | 'map'>('grid');

    return (
      <div>
        <ButtonGroup {...args} variant="attached">
          <Button
            variant={view === 'grid' ? 'primary' : 'secondary'}
            icon={<Grid size={18} />}
            onClick={() => setView('grid')}
          >
            Grid
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'secondary'}
            icon={<List size={18} />}
            onClick={() => setView('list')}
          >
            List
          </Button>
          <Button
            variant={view === 'map' ? 'primary' : 'secondary'}
            icon={<Map size={18} />}
            onClick={() => setView('map')}
          >
            Map
          </Button>
        </ButtonGroup>
        <p style={{ marginTop: '1rem', color: '#666' }}>Current view: {view}</p>
      </div>
    );
  },
};

/**
 * Social media action buttons.
 * Common pattern for post interactions.
 */
export const SocialActions: Story = {
  render: (args) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(42);

    const handleLike = () => {
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    };

    return (
      <div
        style={{
          width: '400px',
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <p style={{ marginBottom: '1rem' }}>
          Just deployed our new feature! 🚀 Check it out and let us know what you think.
        </p>
        <ButtonGroup {...args}>
          <Button
            variant={liked ? 'primary' : 'secondary'}
            icon={<Heart size={18} fill={liked ? 'currentColor' : 'none'} />}
            onClick={handleLike}
          >
            {likeCount}
          </Button>
          <Button variant="secondary" icon={<MessageCircle size={18} />}>
            12
          </Button>
          <Button variant="secondary" icon={<Repeat2 size={18} />}>
            5
          </Button>
        </ButtonGroup>
      </div>
    );
  },
};

/**
 * Form action buttons at different positions.
 * Common patterns for forms and dialogs.
 */
export const FormActions: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Left Aligned</h4>
        <ButtonGroup {...args}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Right Aligned</h4>
          <ButtonGroup {...args}>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
          </ButtonGroup>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Center Aligned</h4>
          <ButtonGroup {...args}>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  ),
};

/**
 * Button group with disabled buttons.
 */
export const WithDisabled: Story = {
  render: (args) => (
    <ButtonGroup {...args} variant="attached">
      <Button variant="secondary">First</Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="secondary">Third</Button>
    </ButtonGroup>
  ),
};

/**
 * Button group with different sizes.
 */
export const DifferentSizes: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Small</h4>
        <ButtonGroup {...args}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Medium (Default)</h4>
        <ButtonGroup {...args}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Large</h4>
        <ButtonGroup {...args}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

/**
 * Button group with mixed variants.
 */
export const MixedVariants: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="danger">Delete</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  ),
};

/**
 * Complete dialog with button group footer.
 */
export const DialogExample: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    if (!open) {
      return <Button onClick={() => setOpen(true)}>Open Dialog</Button>;
    }

    return (
      <div
        style={{
          width: '500px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Confirm Action</h2>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonGroup {...args}>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                alert('Item deleted');
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
};

/**
 * Pagination controls using button group.
 */
export const PaginationControls: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Page {currentPage} of {totalPages}
        </p>
        <ButtonGroup {...args} variant="attached">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? 'primary' : 'secondary'}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            Next
          </Button>
        </ButtonGroup>
      </div>
    );
  },
};

/**
 * Showcase of all ButtonGroup variants and states.
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}
    >
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Default Horizontal</h3>
        <ButtonGroup>
          <Button variant="secondary">One</Button>
          <Button variant="secondary">Two</Button>
          <Button variant="secondary">Three</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Attached Horizontal</h3>
        <ButtonGroup variant="attached">
          <Button variant="secondary">One</Button>
          <Button variant="secondary">Two</Button>
          <Button variant="secondary">Three</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Default Vertical</h3>
        <ButtonGroup orientation="vertical">
          <Button variant="secondary">One</Button>
          <Button variant="secondary">Two</Button>
          <Button variant="secondary">Three</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Attached Vertical</h3>
        <ButtonGroup variant="attached" orientation="vertical">
          <Button variant="secondary">One</Button>
          <Button variant="secondary">Two</Button>
          <Button variant="secondary">Three</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Icon Only</h3>
        <ButtonGroup variant="attached">
          <Button variant="secondary" icon={<Copy size={18} />} />
          <Button variant="secondary" icon={<Download size={18} />} />
          <Button variant="secondary" icon={<Share2 size={18} />} />
        </ButtonGroup>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>With Disabled</h3>
        <ButtonGroup variant="attached">
          <Button variant="secondary">Enabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="secondary">Enabled</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};
