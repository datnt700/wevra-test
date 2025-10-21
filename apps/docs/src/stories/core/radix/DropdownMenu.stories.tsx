import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, Button, Badge } from '@tavia/core';
import { HamburgerMenuIcon, DotsVerticalIcon, GearIcon } from '@radix-ui/react-icons';
import {
  Settings,
  User,
  LogOut,
  Edit,
  Trash,
  Copy,
  Download,
  Share2,
  Archive,
  Star,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Mail,
  Bell,
  Search,
  Plus,
  MoreVertical,
} from 'lucide-react';

/**
 * DropdownMenu component - Context menus and action lists built with Radix UI.
 *
 * Features:
 * - Accessible keyboard navigation (Arrow keys, Enter, Escape)
 * - Automatic focus management
 * - Portal rendering for proper z-index
 * - Arrow pointing to trigger
 * - Disabled item support
 * - Custom trigger elements
 * - Separator support for grouping
 * - Rich content with icons and labels
 *
 * Best Practices:
 * - Use meaningful labels for each item
 * - Group related actions with separators
 * - Disable unavailable actions instead of hiding them
 * - Provide visual feedback with icons
 * - Keep menus concise (max 10-12 items)
 * - Use consistent ordering (destructive actions last)
 */
const meta: Meta<typeof DropdownMenu> = {
  title: 'Core/Radix/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

/**
 * Basic dropdown menu - simple action list.
 */
export const Basic: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={
          <Button variant="secondary">
            <HamburgerMenuIcon style={{ marginRight: '0.5rem' }} />
            Menu
          </Button>
        }
        items={[
          {
            label: 'Edit',
            onSelect: () => alert('Edit clicked'),
          },
          {
            label: 'Duplicate',
            onSelect: () => alert('Duplicate clicked'),
          },
          {
            label: 'Archive',
            onSelect: () => alert('Archive clicked'),
          },
          {
            label: 'Delete',
            onSelect: () => alert('Delete clicked'),
            isDisabled: true,
          },
        ]}
      />
    );
  },
};

/**
 * With icons - visual indicators for each action.
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={
          <Button variant="secondary">
            <DotsVerticalIcon style={{ marginRight: '0.5rem' }} />
            Actions
          </Button>
        }
        items={[
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Edit size={16} />
                <span>Edit</span>
              </div>
            ),
            onSelect: () => console.log('Edit'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Copy size={16} />
                <span>Duplicate</span>
              </div>
            ),
            onSelect: () => console.log('Duplicate'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Archive size={16} />
                <span>Archive</span>
              </div>
            ),
            onSelect: () => console.log('Archive'),
          },
          {
            label: (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}
              >
                <Trash size={16} />
                <span>Delete</span>
              </div>
            ),
            onSelect: () => console.log('Delete'),
          },
        ]}
      />
    );
  },
};

/**
 * With separators - grouped actions for better organization.
 */
export const WithSeparators: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={<Button variant="secondary">Options</Button>}
        items={[
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Edit size={16} />
                <span>Edit</span>
              </div>
            ),
            onSelect: () => console.log('Edit'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Copy size={16} />
                <span>Duplicate</span>
              </div>
            ),
            onSelect: () => console.log('Duplicate'),
          },
          { type: 'separator' },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Download size={16} />
                <span>Download</span>
              </div>
            ),
            onSelect: () => console.log('Download'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Share2 size={16} />
                <span>Share</span>
              </div>
            ),
            onSelect: () => console.log('Share'),
          },
          { type: 'separator' },
          {
            label: (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}
              >
                <Trash size={16} />
                <span>Delete</span>
              </div>
            ),
            onSelect: () => console.log('Delete'),
          },
        ]}
      />
    );
  },
};

/**
 * User profile menu - typical account dropdown.
 */
export const UserProfileMenu: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: '#666' }}>
          Signed in as <strong>john@example.com</strong>
        </span>
        <DropdownMenu
          trigger={
            <button
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #3b82f6',
                background: '#eff6ff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: '#3b82f6',
              }}
            >
              JD
            </button>
          }
          items={[
            {
              label: (
                <div style={{ padding: '0.5rem 0' }}>
                  <div style={{ fontWeight: 600 }}>John Doe</div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>john@example.com</div>
                </div>
              ),
              isDisabled: true,
            },
            { type: 'separator' },
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <User size={16} />
                  <span>Profile</span>
                </div>
              ),
              onSelect: () => console.log('Profile'),
            },
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Settings size={16} />
                  <span>Settings</span>
                </div>
              ),
              onSelect: () => console.log('Settings'),
            },
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Bell size={16} />
                  <span>Notifications</span>
                </div>
              ),
              onSelect: () => console.log('Notifications'),
            },
            { type: 'separator' },
            {
              label: (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#ef4444',
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </div>
              ),
              onSelect: () => console.log('Sign out'),
            },
          ]}
        />
      </div>
    );
  },
};

/**
 * Table row actions - context menu for data table rows.
 */
export const TableRowActions: Story = {
  render: () => {
    return (
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem' }}>John Doe</td>
              <td style={{ padding: '0.75rem' }}>john@example.com</td>
              <td style={{ padding: '0.75rem' }}>
                <Badge style={{ background: '#10b981', color: 'white', fontSize: '0.75rem' }}>
                  Active
                </Badge>
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                <DropdownMenu
                  trigger={
                    <button
                      style={{
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        background: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  }
                  items={[
                    {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Eye size={16} />
                          <span>View Details</span>
                        </div>
                      ),
                      onSelect: () => console.log('View'),
                    },
                    {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Edit size={16} />
                          <span>Edit User</span>
                        </div>
                      ),
                      onSelect: () => console.log('Edit'),
                    },
                    {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Mail size={16} />
                          <span>Send Email</span>
                        </div>
                      ),
                      onSelect: () => console.log('Email'),
                    },
                    { type: 'separator' },
                    {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Lock size={16} />
                          <span>Suspend Account</span>
                        </div>
                      ),
                      onSelect: () => console.log('Suspend'),
                    },
                    {
                      label: (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: '#ef4444',
                          }}
                        >
                          <Trash size={16} />
                          <span>Delete User</span>
                        </div>
                      ),
                      onSelect: () => console.log('Delete'),
                    },
                  ]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};

/**
 * Card actions menu - dropdown for card components.
 */
export const CardActionsMenu: Story = {
  render: () => {
    return (
      <div
        style={{
          width: '350px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: '1rem',
          }}
        >
          <div>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Project Alpha</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>
              Website redesign project
            </p>
          </div>
          <DropdownMenu
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
                <DotsVerticalIcon />
              </button>
            }
            items={[
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Eye size={16} />
                    <span>View Project</span>
                  </div>
                ),
                onSelect: () => console.log('View'),
              },
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Edit size={16} />
                    <span>Edit Details</span>
                  </div>
                ),
                onSelect: () => console.log('Edit'),
              },
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Star size={16} />
                    <span>Add to Favorites</span>
                  </div>
                ),
                onSelect: () => console.log('Favorite'),
              },
              { type: 'separator' },
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Share2 size={16} />
                    <span>Share</span>
                  </div>
                ),
                onSelect: () => console.log('Share'),
              },
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Download size={16} />
                    <span>Export</span>
                  </div>
                ),
                onSelect: () => console.log('Export'),
              },
              { type: 'separator' },
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Archive size={16} />
                    <span>Archive</span>
                  </div>
                ),
                onSelect: () => console.log('Archive'),
              },
              {
                label: (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: '#ef4444',
                    }}
                  >
                    <Trash size={16} />
                    <span>Delete</span>
                  </div>
                ),
                onSelect: () => console.log('Delete'),
              },
            ]}
          />
        </div>
        <div style={{ fontSize: '0.875rem', color: '#666' }}>
          <div>
            Status:{' '}
            <Badge style={{ background: '#f59e0b', color: 'white', fontSize: '0.75rem' }}>
              In Progress
            </Badge>
          </div>
          <div style={{ marginTop: '0.5rem' }}>Due: Dec 31, 2025</div>
        </div>
      </div>
    );
  },
};

/**
 * File actions menu - typical file manager actions.
 */
export const FileActionsMenu: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontSize: '2rem' }}>📄</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600 }}>document.pdf</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>2.4 MB • Modified 2 hours ago</div>
        </div>
        <DropdownMenu
          trigger={
            <Button variant="secondary">
              <MoreVertical size={16} />
            </Button>
          }
          items={[
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Eye size={16} />
                  <span>Preview</span>
                </div>
              ),
              onSelect: () => console.log('Preview'),
            },
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Download size={16} />
                  <span>Download</span>
                </div>
              ),
              onSelect: () => console.log('Download'),
            },
            { type: 'separator' },
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Edit size={16} />
                  <span>Rename</span>
                </div>
              ),
              onSelect: () => console.log('Rename'),
            },
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Copy size={16} />
                  <span>Make a Copy</span>
                </div>
              ),
              onSelect: () => console.log('Copy'),
            },
            {
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Share2 size={16} />
                  <span>Share</span>
                </div>
              ),
              onSelect: () => console.log('Share'),
            },
            { type: 'separator' },
            {
              label: (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#ef4444',
                  }}
                >
                  <Trash size={16} />
                  <span>Move to Trash</span>
                </div>
              ),
              onSelect: () => console.log('Delete'),
            },
          ]}
        />
      </div>
    );
  },
};

/**
 * Settings menu - configuration options.
 */
export const SettingsMenu: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={
          <Button variant="secondary">
            <GearIcon style={{ marginRight: '0.5rem' }} />
            Settings
          </Button>
        }
        items={[
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <User size={16} />
                <span>Account Settings</span>
              </div>
            ),
            onSelect: () => console.log('Account'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Bell size={16} />
                <span>Notifications</span>
              </div>
            ),
            onSelect: () => console.log('Notifications'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Lock size={16} />
                <span>Privacy & Security</span>
              </div>
            ),
            onSelect: () => console.log('Privacy'),
          },
          { type: 'separator' },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Settings size={16} />
                <span>Preferences</span>
              </div>
            ),
            onSelect: () => console.log('Preferences'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={16} />
                <span>Email Settings</span>
              </div>
            ),
            onSelect: () => console.log('Email'),
          },
        ]}
      />
    );
  },
};

/**
 * Visibility toggle menu - show/hide options.
 */
export const VisibilityMenu: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={
          <Button variant="secondary">
            <Eye size={16} style={{ marginRight: '0.5rem' }} />
            Visibility
          </Button>
        }
        items={[
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Eye size={16} />
                <span>Public</span>
              </div>
            ),
            onSelect: () => console.log('Public'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Unlock size={16} />
                <span>Unlisted</span>
              </div>
            ),
            onSelect: () => console.log('Unlisted'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Lock size={16} />
                <span>Private</span>
              </div>
            ),
            onSelect: () => console.log('Private'),
          },
          { type: 'separator' },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <EyeOff size={16} />
                <span>Hidden</span>
              </div>
            ),
            onSelect: () => console.log('Hidden'),
          },
        ]}
      />
    );
  },
};

/**
 * Compact icon-only trigger - minimal design.
 */
export const CompactIconTrigger: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={
          <button
            style={{
              width: '32px',
              height: '32px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DotsVerticalIcon />
          </button>
        }
        items={[
          {
            label: 'Edit',
            onSelect: () => console.log('Edit'),
          },
          {
            label: 'Duplicate',
            onSelect: () => console.log('Duplicate'),
          },
          {
            label: 'Delete',
            onSelect: () => console.log('Delete'),
          },
        ]}
      />
    );
  },
};

/**
 * Disabled items - unavailable actions grayed out.
 */
export const WithDisabledItems: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={<Button variant="secondary">Actions</Button>}
        items={[
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Edit size={16} />
                <span>Edit (Available)</span>
              </div>
            ),
            onSelect: () => console.log('Edit'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Copy size={16} />
                <span>Duplicate (Disabled)</span>
              </div>
            ),
            onSelect: () => console.log('Duplicate'),
            isDisabled: true,
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Download size={16} />
                <span>Download (Disabled)</span>
              </div>
            ),
            onSelect: () => console.log('Download'),
            isDisabled: true,
          },
          { type: 'separator' },
          {
            label: (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}
              >
                <Trash size={16} />
                <span>Delete (Available)</span>
              </div>
            ),
            onSelect: () => console.log('Delete'),
          },
        ]}
      />
    );
  },
};

/**
 * Add new menu - creation actions.
 */
export const AddNewMenu: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={
          <Button variant="primary">
            <Plus size={16} style={{ marginRight: '0.5rem' }} />
            Add New
          </Button>
        }
        items={[
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>📄</span>
                <span>Document</span>
              </div>
            ),
            onSelect: () => console.log('Document'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>📊</span>
                <span>Spreadsheet</span>
              </div>
            ),
            onSelect: () => console.log('Spreadsheet'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>📁</span>
                <span>Folder</span>
              </div>
            ),
            onSelect: () => console.log('Folder'),
          },
          { type: 'separator' },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>🖼️</span>
                <span>Image</span>
              </div>
            ),
            onSelect: () => console.log('Image'),
          },
          {
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>🎬</span>
                <span>Video</span>
              </div>
            ),
            onSelect: () => console.log('Video'),
          },
        ]}
      />
    );
  },
};

/**
 * Many items menu - long list with scrolling.
 */
export const ManyItems: Story = {
  render: () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      label: `Item ${i + 1}`,
      onSelect: () => console.log(`Item ${i + 1}`),
    }));

    return (
      <DropdownMenu
        trigger={<Button variant="secondary">Long List ({items.length} items)</Button>}
        items={items}
      />
    );
  },
};

/**
 * Search menu - with search functionality.
 */
export const SearchMenu: Story = {
  render: () => {
    return (
      <DropdownMenu
        trigger={
          <Button variant="secondary">
            <Search size={16} style={{ marginRight: '0.5rem' }} />
            Quick Actions
          </Button>
        }
        items={[
          {
            label: (
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Search Documents</div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+K</div>
              </div>
            ),
            onSelect: () => console.log('Search'),
          },
          {
            label: (
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Find and Replace</div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+H</div>
              </div>
            ),
            onSelect: () => console.log('Find & Replace'),
          },
          { type: 'separator' },
          {
            label: (
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Go to Line</div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+G</div>
              </div>
            ),
            onSelect: () => console.log('Go to Line'),
          },
        ]}
      />
    );
  },
};

/**
 * Showcase of all dropdown menu variants and use cases.
 */
export const AllVariants: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Basic Menu</h3>
          <DropdownMenu
            trigger={<Button variant="secondary">Basic Actions</Button>}
            items={[
              { label: 'Edit', onSelect: () => {} },
              { label: 'Duplicate', onSelect: () => {} },
              { label: 'Delete', onSelect: () => {}, isDisabled: true },
            ]}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>With Icons</h3>
          <DropdownMenu
            trigger={<Button variant="secondary">Icon Actions</Button>}
            items={[
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Edit size={16} />
                    <span>Edit</span>
                  </div>
                ),
                onSelect: () => {},
              },
              {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Copy size={16} />
                    <span>Copy</span>
                  </div>
                ),
                onSelect: () => {},
              },
            ]}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>With Separators</h3>
          <DropdownMenu
            trigger={<Button variant="secondary">Grouped Actions</Button>}
            items={[
              { label: 'Edit', onSelect: () => {} },
              { label: 'Duplicate', onSelect: () => {} },
              { type: 'separator' },
              { label: 'Delete', onSelect: () => {} },
            ]}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Icon-only Trigger</h3>
          <DropdownMenu
            trigger={
              <button
                style={{
                  width: '32px',
                  height: '32px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: 'white',
                  cursor: 'pointer',
                }}
              >
                <DotsVerticalIcon />
              </button>
            }
            items={[
              { label: 'Option 1', onSelect: () => {} },
              { label: 'Option 2', onSelect: () => {} },
            ]}
          />
        </div>
      </div>
    );
  },
};
