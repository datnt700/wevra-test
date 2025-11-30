import type { Meta, StoryObj } from '@storybook/react';
import { Link, MenuBar } from '@eventure/eventured';
import {
  File,
  Edit,
  Eye,
  HelpCircle,
  Settings,
  User,
  LogOut,
  Plus,
  Folder,
  Save,
  Trash,
  Copy,
  Scissors,
  ClipboardPaste,
  Search,
  Download,
} from 'lucide-react';

/**
 * MenuBar component - Horizontal navigation menu with Radix UI.
 *
 * Features:
 * - Horizontal menu layout with dropdown submenus
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Customizable positioning (top, right, bottom, left)
 * - Accessible with ARIA labels
 * - Support for icons, links, and custom content
 * - Automatic focus management
 */
const meta: Meta<typeof MenuBar> = {
  title: 'Core/Dialog/MenuBar',
  component: MenuBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Menu items data structure',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The side on which the menu content should appear',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

/**
 * Basic menu bar with File, Edit, and View menus.
 */
export const Basic: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'File',
        items: [
          { id: '1-1', children: 'New File' },
          { id: '1-2', children: 'Open' },
          { id: '1-3', children: 'Save' },
          { id: '1-4', children: 'Close' },
        ],
      },
      {
        id: '2',
        label: 'Edit',
        items: [
          { id: '2-1', children: 'Undo' },
          { id: '2-2', children: 'Redo' },
          { id: '2-3', children: 'Cut' },
          { id: '2-4', children: 'Copy' },
          { id: '2-5', children: 'Paste' },
        ],
      },
      {
        id: '3',
        label: 'View',
        items: [
          { id: '3-1', children: 'Zoom In' },
          { id: '3-2', children: 'Zoom Out' },
          { id: '3-3', children: 'Reset Zoom' },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Menu with icons - visual indicators for actions.
 */
export const WithIcons: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <File size={16} />
            <span>File</span>
          </div>
        ),
        items: [
          {
            id: '1-1',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={14} />
                <span>New File</span>
              </div>
            ),
          },
          {
            id: '1-2',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Folder size={14} />
                <span>Open Folder</span>
              </div>
            ),
          },
          {
            id: '1-3',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={14} />
                <span>Save</span>
              </div>
            ),
          },
          {
            id: '1-4',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trash size={14} />
                <span>Delete</span>
              </div>
            ),
          },
        ],
      },
      {
        id: '2',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit size={16} />
            <span>Edit</span>
          </div>
        ),
        items: [
          {
            id: '2-1',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scissors size={14} />
                <span>Cut</span>
              </div>
            ),
          },
          {
            id: '2-2',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Copy size={14} />
                <span>Copy</span>
              </div>
            ),
          },
          {
            id: '2-3',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClipboardPaste size={14} />
                <span>Paste</span>
              </div>
            ),
          },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Menu with keyboard shortcuts displayed.
 */
export const WithShortcuts: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'File',
        items: [
          {
            id: '1-1',
            children: (
              <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '180px' }}>
                <span>New File</span>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+N</span>
              </div>
            ),
          },
          {
            id: '1-2',
            children: (
              <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '180px' }}>
                <span>Open</span>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+O</span>
              </div>
            ),
          },
          {
            id: '1-3',
            children: (
              <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '180px' }}>
                <span>Save</span>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+S</span>
              </div>
            ),
          },
        ],
      },
      {
        id: '2',
        label: 'Edit',
        items: [
          {
            id: '2-1',
            children: (
              <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '180px' }}>
                <span>Undo</span>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+Z</span>
              </div>
            ),
          },
          {
            id: '2-2',
            children: (
              <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '180px' }}>
                <span>Redo</span>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+Y</span>
              </div>
            ),
          },
          {
            id: '2-3',
            children: (
              <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '180px' }}>
                <span>Find</span>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+F</span>
              </div>
            ),
          },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Menu with links - navigate to external URLs.
 */
export const WithLinks: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'Resources',
        items: [
          {
            id: '1-1',
            children: <Link url="https://www.example.com/docs">Documentation</Link>,
          },
          {
            id: '1-2',
            children: <Link url="https://www.example.com/blog">Blog</Link>,
          },
          {
            id: '1-3',
            children: <Link url="https://www.example.com/support">Support</Link>,
          },
        ],
      },
      {
        id: '2',
        label: 'Community',
        items: [
          {
            id: '2-1',
            children: <Link url="https://github.com">GitHub</Link>,
          },
          {
            id: '2-2',
            children: <Link url="https://discord.com">Discord</Link>,
          },
          {
            id: '2-3',
            children: <Link url="https://twitter.com">Twitter</Link>,
          },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Application menu bar - complete app navigation.
 */
export const ApplicationMenu: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'File',
        items: [
          { id: '1-1', children: 'New Project' },
          { id: '1-2', children: 'Open Project' },
          { id: '1-3', children: 'Save' },
          { id: '1-4', children: 'Save As...' },
          { id: '1-5', children: 'Export' },
          { id: '1-6', children: 'Close' },
        ],
      },
      {
        id: '2',
        label: 'Edit',
        items: [
          { id: '2-1', children: 'Undo' },
          { id: '2-2', children: 'Redo' },
          { id: '2-3', children: 'Cut' },
          { id: '2-4', children: 'Copy' },
          { id: '2-5', children: 'Paste' },
          { id: '2-6', children: 'Delete' },
        ],
      },
      {
        id: '3',
        label: 'View',
        items: [
          { id: '3-1', children: 'Zoom In' },
          { id: '3-2', children: 'Zoom Out' },
          { id: '3-3', children: 'Full Screen' },
          { id: '3-4', children: 'Show Sidebar' },
          { id: '3-5', children: 'Show Toolbar' },
        ],
      },
      {
        id: '4',
        label: 'Tools',
        items: [
          { id: '4-1', children: 'Settings' },
          { id: '4-2', children: 'Extensions' },
          { id: '4-3', children: 'Keyboard Shortcuts' },
          { id: '4-4', children: 'Command Palette' },
        ],
      },
      {
        id: '5',
        label: 'Help',
        items: [
          { id: '5-1', children: 'Documentation' },
          { id: '5-2', children: 'Keyboard Shortcuts' },
          { id: '5-3', children: 'Report Issue' },
          { id: '5-4', children: 'About' },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * User account menu - profile and settings.
 */
export const UserMenu: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={16} />
            <span>John Doe</span>
          </div>
        ),
        items: [
          {
            id: '1-1',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={14} />
                <span>Profile</span>
              </div>
            ),
          },
          {
            id: '1-2',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={14} />
                <span>Settings</span>
              </div>
            ),
          },
          {
            id: '1-3',
            children: (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={14} />
                <span>Help</span>
              </div>
            ),
          },
          {
            id: '1-4',
            children: (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </div>
            ),
          },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Icon-only menu triggers.
 */
export const IconOnly: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: <File size={18} />,
        items: [
          { id: '1-1', children: 'New File' },
          { id: '1-2', children: 'Open' },
          { id: '1-3', children: 'Save' },
        ],
      },
      {
        id: '2',
        label: <Edit size={18} />,
        items: [
          { id: '2-1', children: 'Undo' },
          { id: '2-2', children: 'Redo' },
        ],
      },
      {
        id: '3',
        label: <Eye size={18} />,
        items: [
          { id: '3-1', children: 'Zoom In' },
          { id: '3-2', children: 'Zoom Out' },
        ],
      },
      {
        id: '4',
        label: <Settings size={18} />,
        items: [
          { id: '4-1', children: 'Preferences' },
          { id: '4-2', children: 'Extensions' },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Top position - menu drops down from top.
 */
export const TopPosition: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'File',
        items: [
          { id: '1-1', children: 'New' },
          { id: '1-2', children: 'Open' },
          { id: '1-3', children: 'Save' },
        ],
      },
      {
        id: '2',
        label: 'Edit',
        items: [
          { id: '2-1', children: 'Undo' },
          { id: '2-2', children: 'Redo' },
        ],
      },
    ];

    return (
      <div style={{ paddingTop: '150px' }}>
        <MenuBar data={menuData} side="top" />
      </div>
    );
  },
};

/**
 * Right position - menu appears to the right.
 */
export const RightPosition: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'File',
        items: [
          { id: '1-1', children: 'New' },
          { id: '1-2', children: 'Open' },
          { id: '1-3', children: 'Save' },
        ],
      },
      {
        id: '2',
        label: 'Edit',
        items: [
          { id: '2-1', children: 'Undo' },
          { id: '2-2', children: 'Redo' },
        ],
      },
    ];

    return <MenuBar data={menuData} side="right" />;
  },
};

/**
 * Left position - menu appears to the left.
 */
export const LeftPosition: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'File',
        items: [
          { id: '1-1', children: 'New' },
          { id: '1-2', children: 'Open' },
          { id: '1-3', children: 'Save' },
        ],
      },
      {
        id: '2',
        label: 'Edit',
        items: [
          { id: '2-1', children: 'Undo' },
          { id: '2-2', children: 'Redo' },
        ],
      },
    ];

    return <MenuBar data={menuData} side="left" />;
  },
};

/**
 * Minimal menu with few items.
 */
export const MinimalMenu: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'Actions',
        items: [
          { id: '1-1', children: 'Create' },
          { id: '1-2', children: 'Update' },
          { id: '1-3', children: 'Delete' },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Search and actions menu.
 */
export const SearchMenu: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={16} />
            <span>Search</span>
          </div>
        ),
        items: [
          { id: '1-1', children: 'Find in Files' },
          { id: '1-2', children: 'Find and Replace' },
          { id: '1-3', children: 'Search Settings' },
        ],
      },
      {
        id: '2',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} />
            <span>Downloads</span>
          </div>
        ),
        items: [
          { id: '2-1', children: 'View Downloads' },
          { id: '2-2', children: 'Clear Downloads' },
          { id: '2-3', children: 'Download Settings' },
        ],
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Menu with many items - scrollable content.
 */
export const ManyItems: Story = {
  render: () => {
    const menuData = [
      {
        id: '1',
        label: 'Options',
        items: Array.from({ length: 20 }, (_, i) => ({
          id: `1-${i + 1}`,
          children: `Option ${i + 1}`,
        })),
      },
    ];

    return <MenuBar data={menuData} side="bottom" />;
  },
};

/**
 * Showcase of all menu variants and positions.
 */
export const AllVariants: Story = {
  render: () => {
    const basicMenu = [
      {
        id: '1',
        label: 'File',
        items: [
          { id: '1-1', children: 'New' },
          { id: '1-2', children: 'Open' },
          { id: '1-3', children: 'Save' },
        ],
      },
      {
        id: '2',
        label: 'Edit',
        items: [
          { id: '2-1', children: 'Undo' },
          { id: '2-2', children: 'Redo' },
        ],
      },
    ];

    const iconMenu = [
      {
        id: '1',
        label: <File size={18} />,
        items: [
          { id: '1-1', children: 'New File' },
          { id: '1-2', children: 'Open' },
        ],
      },
      {
        id: '2',
        label: <Settings size={18} />,
        items: [
          { id: '2-1', children: 'Preferences' },
          { id: '2-2', children: 'Extensions' },
        ],
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', padding: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Basic Menu (Bottom)</h3>
          <MenuBar data={basicMenu} side="bottom" />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Icon Menu</h3>
          <MenuBar data={iconMenu} side="bottom" />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Menu with Shortcuts</h3>
          <MenuBar
            data={[
              {
                id: '1',
                label: 'File',
                items: [
                  {
                    id: '1-1',
                    children: (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          minWidth: '150px',
                        }}
                      >
                        <span>Save</span>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>Ctrl+S</span>
                      </div>
                    ),
                  },
                ],
              },
            ]}
            side="bottom"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>User Menu</h3>
          <MenuBar
            data={[
              {
                id: '1',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} />
                    <span>Account</span>
                  </div>
                ),
                items: [
                  { id: '1-1', children: 'Profile' },
                  { id: '1-2', children: 'Settings' },
                  { id: '1-3', children: 'Logout' },
                ],
              },
            ]}
            side="bottom"
          />
        </div>
      </div>
    );
  },
};
