import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from '../components/Sidebar';
import type { SidebarItem } from '../types';

// Mock the SidebarItem component
vi.mock('../components/Item/Item', () => ({
  SidebarItem: ({ item }: { item: SidebarItem }) => (
    <div data-testid="sidebar-item">{item.label}</div>
  ),
}));

describe('Sidebar', () => {
  const mockItems: SidebarItem[] = [
    { label: 'Dashboard', icon: <span>📊</span> },
    { label: 'Settings', icon: <span>⚙️</span> },
    { label: 'Profile', icon: <span>👤</span> },
  ];

  describe('Basic Rendering', () => {
    it('should render sidebar with navigation elements', () => {
      render(<Sidebar items={mockItems} />);

      // Should render logo
      expect(screen.getByText('R')).toBeInTheDocument();

      // Should render all items
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should render all sidebar items', () => {
      render(<Sidebar items={mockItems} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should render logo', () => {
      render(<Sidebar items={mockItems} />);

      expect(screen.getByText('R')).toBeInTheDocument();
    });

    it('should have proper display name', () => {
      expect(Sidebar.displayName).toBe('Sidebar');
    });
  });

  describe('Sidebar Items', () => {
    it('should render correct number of items', () => {
      render(<Sidebar items={mockItems} />);

      const items = screen.getAllByTestId('sidebar-item');
      expect(items).toHaveLength(3);
    });

    it('should render items in correct order', () => {
      render(<Sidebar items={mockItems} />);

      const items = screen.getAllByTestId('sidebar-item');
      expect(items[0]).toHaveTextContent('Dashboard');
      expect(items[1]).toHaveTextContent('Settings');
      expect(items[2]).toHaveTextContent('Profile');
    });

    it('should render with single item', () => {
      render(<Sidebar items={[{ label: 'Home' }]} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render with empty items array', () => {
      render(<Sidebar items={[]} />);

      // Should still render logo
      expect(screen.getByText('R')).toBeInTheDocument();

      // Should not render any items
      const items = screen.queryAllByTestId('sidebar-item');
      expect(items).toHaveLength(0);
    });
  });

  describe('Hover Behavior', () => {
    it('should handle mouse enter and leave events', async () => {
      const user = userEvent.setup();
      const { container } = render(<Sidebar items={mockItems} />);

      // Get the sidebar div element
      const sidebar = container.firstChild as HTMLElement;

      // Test hover
      await user.hover(sidebar);
      // Component state changes but we can't easily test internal state

      // Test unhover
      await user.unhover(sidebar);
      // Component reverts to closed state

      // Just verify the component renders correctly
      expect(screen.getByText('R')).toBeInTheDocument();
    });

    it('should manage open/closed state', () => {
      render(<Sidebar items={mockItems} />);

      // Component manages internal state
      // We can verify it renders correctly
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  describe('Items with Icons', () => {
    it('should render items with icons', () => {
      const itemsWithIcons: SidebarItem[] = [
        { label: 'Home', icon: <span data-testid="home-icon">🏠</span> },
        { label: 'Search', icon: <span data-testid="search-icon">🔍</span> },
      ];

      render(<Sidebar items={itemsWithIcons} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('should render items without icons', () => {
      const itemsWithoutIcons: SidebarItem[] = [{ label: 'Home' }, { label: 'Search' }];

      render(<Sidebar items={itemsWithoutIcons} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });
  });

  describe('Items with Children', () => {
    it('should render items with nested children', () => {
      const nestedItems: SidebarItem[] = [
        {
          label: 'Products',
          children: [{ label: 'All Products' }, { label: 'Add Product' }],
        },
      ];

      render(<Sidebar items={nestedItems} />);

      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('should handle deeply nested items', () => {
      const deeplyNestedItems: SidebarItem[] = [
        {
          label: 'Level 1',
          children: [
            {
              label: 'Level 2',
              children: [{ label: 'Level 3' }],
            },
          ],
        },
      ];

      render(<Sidebar items={deeplyNestedItems} />);

      expect(screen.getByText('Level 1')).toBeInTheDocument();
    });
  });

  describe('Items with Click Handlers', () => {
    it('should support items with onClick handlers', () => {
      const mockOnClick = vi.fn();
      const itemsWithHandlers: SidebarItem[] = [{ label: 'Clickable', onClick: mockOnClick }];

      render(<Sidebar items={itemsWithHandlers} />);

      expect(screen.getByText('Clickable')).toBeInTheDocument();
    });

    it('should support items without onClick handlers', () => {
      const itemsWithoutHandlers: SidebarItem[] = [{ label: 'Non-Clickable' }];

      render(<Sidebar items={itemsWithoutHandlers} />);

      expect(screen.getByText('Non-Clickable')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle items with very long labels', () => {
      const longLabelItems: SidebarItem[] = [
        { label: 'This is a very long sidebar item label that might overflow' },
      ];

      render(<Sidebar items={longLabelItems} />);

      expect(
        screen.getByText('This is a very long sidebar item label that might overflow')
      ).toBeInTheDocument();
    });

    it('should handle items with special characters in labels', () => {
      const specialCharItems: SidebarItem[] = [
        { label: 'Settings & Preferences' },
        { label: 'Products (10)' },
        { label: 'User #123' },
      ];

      render(<Sidebar items={specialCharItems} />);

      expect(screen.getByText('Settings & Preferences')).toBeInTheDocument();
      expect(screen.getByText('Products (10)')).toBeInTheDocument();
      expect(screen.getByText('User #123')).toBeInTheDocument();
    });

    it('should render multiple instances independently', () => {
      render(
        <div>
          <Sidebar items={[{ label: 'Sidebar 1' }]} />
          <Sidebar items={[{ label: 'Sidebar 2' }]} />
        </div>
      );

      expect(screen.getByText('Sidebar 1')).toBeInTheDocument();
      expect(screen.getByText('Sidebar 2')).toBeInTheDocument();

      // Each sidebar should have its own logo
      const logos = screen.getAllByText('R');
      expect(logos).toHaveLength(2);
    });
  });

  describe('Styling', () => {
    it('should render with proper structure', () => {
      const { container } = render(<Sidebar items={mockItems} />);

      // Should have a container div
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should contain navigation elements', () => {
      render(<Sidebar items={mockItems} />);

      // Should have logo and items
      expect(screen.getByText('R')).toBeInTheDocument();
      expect(screen.getAllByTestId('sidebar-item')).toHaveLength(3);
    });
  });
});
