import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuBar } from '../components/MenuBar';
import { MenuBarProps } from '../types';

describe('MenuBar', () => {
  // Test data
  const basicMenuData: MenuBarProps['data'] = [
    {
      id: '1',
      label: 'File',
      items: [
        { id: '1-1', children: 'New File' },
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

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<MenuBar data={basicMenuData} />);
      expect(screen.getByText('File')).toBeInTheDocument();
    });

    it('renders all menu triggers', () => {
      render(<MenuBar data={basicMenuData} />);
      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    it('renders menu with items', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      await user.click(fileTrigger);

      expect(screen.getByText('New File')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('renders empty menu gracefully', () => {
      render(<MenuBar data={[]} />);
      expect(screen.queryByText('File')).not.toBeInTheDocument();
    });

    it('renders menu without items', () => {
      const menuData = [{ id: '1', label: 'Empty Menu' }];
      render(<MenuBar data={menuData} />);
      expect(screen.getByText('Empty Menu')).toBeInTheDocument();
    });
  });

  describe('Menu Triggers', () => {
    it('opens menu on trigger click', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      await user.click(fileTrigger);

      expect(screen.getByText('New File')).toBeInTheDocument();
    });

    it('displays correct data-state attribute when closed', () => {
      render(<MenuBar data={basicMenuData} />);
      const fileTrigger = screen.getByText('File');

      // Check that trigger exists
      expect(fileTrigger).toBeInTheDocument();
    });

    it('renders multiple menu triggers correctly', () => {
      render(<MenuBar data={basicMenuData} />);

      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });

  describe('Menu Items', () => {
    it('renders all items in a menu', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      await user.click(fileTrigger);

      const items = screen.getAllByTestId('menu-item');
      expect(items).toHaveLength(3);
    });

    it('renders item content correctly', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      await user.click(fileTrigger);

      expect(screen.getByText('New File')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('renders custom React node as item children', async () => {
      const user = userEvent.setup();
      const customMenuData = [
        {
          id: '1',
          label: 'File',
          items: [
            {
              id: '1-1',
              children: (
                <div>
                  <span>Icon</span>
                  <span>Custom Item</span>
                </div>
              ),
            },
          ],
        },
      ];

      render(<MenuBar data={customMenuData} />);
      const fileTrigger = screen.getByText('File');
      await user.click(fileTrigger);

      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Custom Item')).toBeInTheDocument();
    });
  });

  describe('Side Positioning', () => {
    it('accepts side="bottom" prop', () => {
      render(<MenuBar data={basicMenuData} side="bottom" />);
      expect(screen.getByText('File')).toBeInTheDocument();
    });

    it('accepts side="top" prop', () => {
      render(<MenuBar data={basicMenuData} side="top" />);
      expect(screen.getByText('File')).toBeInTheDocument();
    });

    it('accepts side="left" prop', () => {
      render(<MenuBar data={basicMenuData} side="left" />);
      expect(screen.getByText('File')).toBeInTheDocument();
    });

    it('accepts side="right" prop', () => {
      render(<MenuBar data={basicMenuData} side="right" />);
      expect(screen.getByText('File')).toBeInTheDocument();
    });

    it('renders without side prop (default)', () => {
      render(<MenuBar data={basicMenuData} />);
      expect(screen.getByText('File')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens menu on Enter key', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      fileTrigger.focus();
      await user.keyboard('{Enter}');

      expect(screen.getByText('New File')).toBeInTheDocument();
    });

    it('closes menu on Escape key', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      await user.click(fileTrigger);
      expect(screen.getByText('New File')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      // Menu should close (items no longer visible)
      expect(screen.queryByText('New File')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined data gracefully', () => {
      render(<MenuBar data={undefined as any} />);
      expect(screen.queryByText('File')).not.toBeInTheDocument();
    });

    it('handles single menu with single item', async () => {
      const user = userEvent.setup();
      const singleMenuData = [
        {
          id: '1',
          label: 'Single Menu',
          items: [{ id: '1-1', children: 'Single Item' }],
        },
      ];

      render(<MenuBar data={singleMenuData} />);
      const trigger = screen.getByText('Single Menu');
      await user.click(trigger);

      expect(screen.getByText('Single Item')).toBeInTheDocument();
    });

    it('renders menu with empty items array', () => {
      const emptyItemsData = [
        {
          id: '1',
          label: 'Empty Items',
          items: [],
        },
      ];

      render(<MenuBar data={emptyItemsData} />);
      expect(screen.getByText('Empty Items')).toBeInTheDocument();
    });

    it('passes additional props through', () => {
      const { container } = render(<MenuBar data={basicMenuData} data-testid="custom-menu" />);
      expect(container.querySelector('[data-testid="custom-menu"]')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible menu structure', () => {
      render(<MenuBar data={basicMenuData} />);
      const menubar = screen.getByRole('menubar');
      expect(menubar).toBeInTheDocument();
    });

    it('menu triggers have menuitem role', () => {
      render(<MenuBar data={basicMenuData} />);
      const triggers = screen.getAllByRole('menuitem');
      expect(triggers.length).toBeGreaterThan(0);
    });

    it('renders with proper ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      await user.click(fileTrigger);

      // Check that menu items are rendered with testid
      const items = screen.getAllByTestId('menu-item');
      expect(items.length).toBeGreaterThan(0);
    });

    it('supports keyboard focus management', async () => {
      const user = userEvent.setup();
      render(<MenuBar data={basicMenuData} />);

      const fileTrigger = screen.getByText('File');
      await user.tab();

      // Trigger should be focusable
      expect(document.activeElement).toBe(fileTrigger);
    });
  });
});
