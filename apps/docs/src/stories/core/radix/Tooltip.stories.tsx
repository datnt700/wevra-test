import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button, Badge } from '@eventure/eventured';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { HelpCircle, Info, AlertTriangle, CheckCircle, Star, Trash, Settings } from 'lucide-react';

/**
 * Tooltip component - Contextual information on hover built with Radix UI.
 *
 * Features:
 * - Four position options (top, right, bottom, left)
 * - Optional arrow pointing to trigger
 * - Customizable offset distance
 * - Automatic collision detection
 * - Accessible with proper ARIA labels
 * - Portal rendering for proper layering
 * - Hover and focus triggers
 *
 * Best Practices:
 * - Keep tooltip text concise (1-2 lines)
 * - Use for supplementary information only
 * - Don't hide critical information in tooltips
 * - Ensure trigger elements are keyboard accessible
 * - Use appropriate positioning based on context
 * - Consider touch devices (tooltips may not work well)
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Core/Radix/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip relative to trigger',
    },
    sideOffset: {
      control: 'number',
      description: 'Distance from trigger element in pixels',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow pointing to trigger',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

/**
 * Basic tooltip - appears on hover.
 */
export const Basic: Story = {
  render: () => (
    <Tooltip trigger={<Button variant="secondary">Hover me</Button>}>
      <span>This is a helpful tooltip</span>
    </Tooltip>
  ),
};

/**
 * All four positions - top, right, bottom, left.
 */
export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '3rem',
        padding: '3rem',
      }}
    >
      <Tooltip trigger={<Button variant="secondary">Top</Button>} side="top" showArrow>
        <span>Tooltip on top</span>
      </Tooltip>

      <Tooltip trigger={<Button variant="secondary">Right</Button>} side="right" showArrow>
        <span>Tooltip on right</span>
      </Tooltip>

      <Tooltip trigger={<Button variant="secondary">Bottom</Button>} side="bottom" showArrow>
        <span>Tooltip on bottom</span>
      </Tooltip>

      <Tooltip trigger={<Button variant="secondary">Left</Button>} side="left" showArrow>
        <span>Tooltip on left</span>
      </Tooltip>
    </div>
  ),
};

/**
 * With arrow - visual pointer to trigger element.
 */
export const WithArrow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Tooltip trigger={<Button variant="secondary">With Arrow</Button>} side="top" showArrow>
        <span>This tooltip has an arrow</span>
      </Tooltip>

      <Tooltip
        trigger={<Button variant="secondary">Without Arrow</Button>}
        side="top"
        showArrow={false}
      >
        <span>This tooltip has no arrow</span>
      </Tooltip>
    </div>
  ),
};

/**
 * Icon with tooltip - help and info icons.
 */
export const IconWithTooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip
        trigger={
          <button
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <HelpCircle size={20} color="#6b7280" />
          </button>
        }
        side="top"
        showArrow
      >
        <span>Click for help documentation</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <Info size={20} color="#3b82f6" />
          </button>
        }
        side="top"
        showArrow
      >
        <span>Additional information available</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <AlertTriangle size={20} color="#f59e0b" />
          </button>
        }
        side="top"
        showArrow
      >
        <span>Warning: Action cannot be undone</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <CheckCircle size={20} color="#10b981" />
          </button>
        }
        side="top"
        showArrow
      >
        <span>Operation completed successfully</span>
      </Tooltip>
    </div>
  ),
};

/**
 * Form field tooltip - help text for inputs.
 */
export const FormFieldTooltip: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label style={{ fontWeight: 500 }}>Password</label>
        <Tooltip
          trigger={
            <button
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
            >
              <QuestionMarkCircledIcon style={{ color: '#6b7280' }} />
            </button>
          }
          side="right"
          showArrow
        >
          <div style={{ maxWidth: '250px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Password Requirements:</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One number</li>
              <li>One special character</li>
            </ul>
          </div>
        </Tooltip>
      </div>
      <input
        type="password"
        placeholder="Enter your password"
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
        }}
      />
    </div>
  ),
};

/**
 * Button with tooltip - descriptive action text.
 */
export const ButtonWithTooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip
        trigger={
          <button
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            <Star size={20} color="#f59e0b" />
          </button>
        }
        side="top"
        showArrow
      >
        <span>Add to favorites</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            <Settings size={20} color="#6b7280" />
          </button>
        }
        side="top"
        showArrow
      >
        <span>Open settings</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              padding: '0.5rem',
              border: '1px solid #fee',
              borderRadius: '6px',
              background: '#fef2f2',
              cursor: 'pointer',
            }}
          >
            <Trash size={20} color="#ef4444" />
          </button>
        }
        side="top"
        showArrow
      >
        <span>Delete item (cannot be undone)</span>
      </Tooltip>
    </div>
  ),
};

/**
 * Badge with tooltip - additional context on hover.
 */
export const BadgeWithTooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip
        trigger={
          <Badge style={{ background: '#10b981', color: 'white', cursor: 'pointer' }}>Active</Badge>
        }
        side="top"
        showArrow
      >
        <span>User is currently online and available</span>
      </Tooltip>

      <Tooltip
        trigger={
          <Badge style={{ background: '#f59e0b', color: 'white', cursor: 'pointer' }}>
            Pending
          </Badge>
        }
        side="top"
        showArrow
      >
        <span>Awaiting approval from administrator</span>
      </Tooltip>

      <Tooltip
        trigger={
          <Badge style={{ background: '#ef4444', color: 'white', cursor: 'pointer' }}>
            Blocked
          </Badge>
        }
        side="top"
        showArrow
      >
        <span>Account suspended due to policy violation</span>
      </Tooltip>
    </div>
  ),
};

/**
 * Long content tooltip - multiple lines of text.
 */
export const LongContentTooltip: Story = {
  render: () => (
    <Tooltip trigger={<Button variant="secondary">Complex Feature</Button>} side="right" showArrow>
      <div style={{ maxWidth: '300px' }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Advanced Configuration</div>
        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}>
          This feature allows you to customize the behavior of the application based on your
          specific needs. Configure settings, set preferences, and manage advanced options all in
          one place.
        </p>
      </div>
    </Tooltip>
  ),
};

/**
 * Disabled element tooltip - showing why action is unavailable.
 */
export const DisabledElementTooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip
        trigger={
          <span style={{ display: 'inline-block' }}>
            <Button variant="primary" disabled style={{ pointerEvents: 'none' }}>
              Submit
            </Button>
          </span>
        }
        side="top"
        showArrow
      >
        <span>Please fill in all required fields first</span>
      </Tooltip>

      <Tooltip
        trigger={
          <span style={{ display: 'inline-block' }}>
            <Button variant="secondary" disabled style={{ pointerEvents: 'none' }}>
              Download
            </Button>
          </span>
        }
        side="top"
        showArrow
      >
        <span>Upgrade to Pro to download files</span>
      </Tooltip>
    </div>
  ),
};

/**
 * Keyboard shortcut tooltip - showing shortcuts.
 */
export const KeyboardShortcutTooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip trigger={<Button variant="secondary">Save</Button>} side="bottom" showArrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Save document</span>
          <kbd
            style={{
              padding: '0.125rem 0.375rem',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.75rem',
            }}
          >
            Ctrl+S
          </kbd>
        </div>
      </Tooltip>

      <Tooltip trigger={<Button variant="secondary">Undo</Button>} side="bottom" showArrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Undo last action</span>
          <kbd
            style={{
              padding: '0.125rem 0.375rem',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.75rem',
            }}
          >
            Ctrl+Z
          </kbd>
        </div>
      </Tooltip>

      <Tooltip trigger={<Button variant="secondary">Search</Button>} side="bottom" showArrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Open search</span>
          <kbd
            style={{
              padding: '0.125rem 0.375rem',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.75rem',
            }}
          >
            Ctrl+K
          </kbd>
        </div>
      </Tooltip>
    </div>
  ),
};

/**
 * Custom offset - different distances from trigger.
 */
export const CustomOffset: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Tooltip
        trigger={<Button variant="secondary">Offset 5px</Button>}
        side="top"
        sideOffset={5}
        showArrow
      >
        <span>Default offset (5px)</span>
      </Tooltip>

      <Tooltip
        trigger={<Button variant="secondary">Offset 15px</Button>}
        side="top"
        sideOffset={15}
        showArrow
      >
        <span>Larger offset (15px)</span>
      </Tooltip>

      <Tooltip
        trigger={<Button variant="secondary">Offset 30px</Button>}
        side="top"
        sideOffset={30}
        showArrow
      >
        <span>Even larger offset (30px)</span>
      </Tooltip>
    </div>
  ),
};

/**
 * Rich content tooltip - formatted text with styling.
 */
export const RichContentTooltip: Story = {
  render: () => (
    <Tooltip
      trigger={
        <button
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            background: 'white',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Premium Feature
        </button>
      }
      side="right"
      showArrow
    >
      <div style={{ maxWidth: '280px' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}
        >
          <Star size={16} color="#f59e0b" fill="#f59e0b" />
          <span style={{ fontWeight: 600, color: '#f59e0b' }}>Premium Only</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '0.5rem' }}>
          This feature is available for Premium subscribers only.
        </p>
        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          Upgrade your plan to unlock this and many other features.
        </div>
      </div>
    </Tooltip>
  ),
};

/**
 * Navigation item tooltip - descriptive navigation.
 */
export const NavigationTooltip: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '60px',
        padding: '1rem',
        background: '#1f2937',
        borderRadius: '8px',
      }}
    >
      <Tooltip
        trigger={
          <button
            style={{
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              background: '#374151',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            🏠
          </button>
        }
        side="right"
        showArrow
      >
        <span>Home</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              background: '#374151',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            📊
          </button>
        }
        side="right"
        showArrow
      >
        <span>Dashboard</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              background: '#374151',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            ⚙️
          </button>
        }
        side="right"
        showArrow
      >
        <span>Settings</span>
      </Tooltip>

      <Tooltip
        trigger={
          <button
            style={{
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              background: '#374151',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            👤
          </button>
        }
        side="right"
        showArrow
      >
        <span>Profile</span>
      </Tooltip>
    </div>
  ),
};

/**
 * Showcase of all tooltip variants and use cases.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', padding: '3rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Basic Tooltip</h3>
        <Tooltip trigger={<Button variant="secondary">Hover me</Button>}>
          <span>Simple tooltip text</span>
        </Tooltip>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>With Arrow</h3>
        <Tooltip trigger={<Button variant="secondary">With Arrow</Button>} showArrow>
          <span>Tooltip with arrow pointer</span>
        </Tooltip>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Icon Tooltips</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Tooltip
            trigger={
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
              >
                <HelpCircle size={20} color="#6b7280" />
              </button>
            }
            showArrow
          >
            <span>Help</span>
          </Tooltip>
          <Tooltip
            trigger={
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
              >
                <Info size={20} color="#3b82f6" />
              </button>
            }
            showArrow
          >
            <span>Information</span>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Keyboard Shortcuts</h3>
        <Tooltip trigger={<Button variant="secondary">Save</Button>} showArrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Save</span>
            <kbd
              style={{
                padding: '0.125rem 0.375rem',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.75rem',
              }}
            >
              Ctrl+S
            </kbd>
          </div>
        </Tooltip>
      </div>
    </div>
  ),
};
