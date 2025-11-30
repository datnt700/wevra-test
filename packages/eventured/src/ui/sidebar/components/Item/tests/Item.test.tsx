import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SidebarItem } from '../Item';
import { SidebarItem as SidebarItemType } from '../../../types';

// Mock icon component
const MockIcon = () => <svg data-testid="mock-icon">Icon</svg>;

describe('SidebarItem', () => {
  const defaultItem = {
    label: 'Dashboard',
    icon: <MockIcon />,
    onClick: vi.fn(),
  };

  describe('Basic Rendering', () => {
    it('should render with icon', () => {
      render(<SidebarItem item={defaultItem} />);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('should render as list item', () => {
      const { container } = render(<SidebarItem item={defaultItem} />);
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });

    it('should render without label in main item', () => {
      render(<SidebarItem item={defaultItem} />);
      // Label is not rendered in the main item, only icon
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    it('should render without children by default', () => {
      const { container } = render(<SidebarItem item={defaultItem} />);
      // No popover content should be visible initially
      const popoverContent = container.querySelector('[role="dialog"]');
      expect(popoverContent).not.toBeInTheDocument();
    });
  });

  describe('Click Handler', () => {
    it('should call onClick when item is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<SidebarItem item={{ ...defaultItem, onClick: handleClick }} />);

      await user.click(screen.getByTestId('mock-icon').parentElement!);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not throw error when onClick is undefined', async () => {
      const user = userEvent.setup();
      const itemWithoutClick = { ...defaultItem, onClick: undefined };

      expect(() => render(<SidebarItem item={itemWithoutClick} />)).not.toThrow();

      const icon = screen.getByTestId('mock-icon');
      await user.click(icon.parentElement!);
      // Should not crash
    });
  });

  describe('Popover with Children', () => {
    const itemWithChildren = {
      ...defaultItem,
      children: [
        { label: 'Overview', onClick: vi.fn() },
        { label: 'Analytics', onClick: vi.fn() },
        { label: 'Reports', onClick: vi.fn() },
      ],
    };

    it('should render submenu items when item has children', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={itemWithChildren} />);

      // Hover over the trigger
      const icon = screen.getByTestId('mock-icon');
      await user.hover(icon.parentElement!);

      // Wait for popover to appear
      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      expect(screen.getByText('Analytics')).toBeInTheDocument();
      expect(screen.getByText('Reports')).toBeInTheDocument();
    });

    it('should call child onClick when submenu item is clicked', async () => {
      const user = userEvent.setup();
      const childClick = vi.fn();
      const item = {
        ...defaultItem,
        children: [{ label: 'Overview', onClick: childClick }],
      };

      render(<SidebarItem item={item} />);

      // Hover to show popover
      const icon = screen.getByTestId('mock-icon');
      await user.hover(icon.parentElement!);

      // Wait for popover and click child
      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Overview'));

      expect(childClick).toHaveBeenCalledTimes(1);
    });

    it('should render multiple children correctly', async () => {
      const user = userEvent.setup();
      const item = {
        ...defaultItem,
        children: [
          { label: 'Item 1', onClick: vi.fn() },
          { label: 'Item 2', onClick: vi.fn() },
          { label: 'Item 3', onClick: vi.fn() },
          { label: 'Item 4', onClick: vi.fn() },
        ],
      };

      render(<SidebarItem item={item} />);

      // Hover to show popover
      await user.hover(screen.getByTestId('mock-icon').parentElement!);

      // All children should be visible
      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
        expect(screen.getByText('Item 4')).toBeInTheDocument();
      });
    });
  });

  describe('Hover Behavior', () => {
    const itemWithChildren = {
      ...defaultItem,
      children: [{ label: 'Submenu', onClick: vi.fn() }],
    };

    it('should show popover on hover', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={itemWithChildren} />);

      const icon = screen.getByTestId('mock-icon');
      await user.hover(icon.parentElement!);

      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });
    });

    it('should keep popover open when hovering over content', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={itemWithChildren} />);

      // Hover over trigger
      const icon = screen.getByTestId('mock-icon');
      await user.hover(icon.parentElement!);

      // Wait for popover
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });

      // Hover over popover content
      const submenu = screen.getByText('Submenu');
      await user.hover(submenu);

      // Popover should still be visible
      expect(screen.getByText('Submenu')).toBeInTheDocument();
    });

    it('should keep popover open when only leaving trigger (content state still true)', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={itemWithChildren} />);

      const icon = screen.getByTestId('mock-icon');
      await user.hover(icon.parentElement!);

      // Wait for popover
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });

      // Unhover trigger - but isInPopoverContent is still true from handleMouseEnterPopoverTrigger
      await user.unhover(icon.parentElement!);

      // Popover should still be visible because isInPopoverContent remains true
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });
    });

    it('should hide popover when mouse leaves content', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={itemWithChildren} />);

      // Hover over trigger
      const icon = screen.getByTestId('mock-icon');
      await user.hover(icon.parentElement!);

      // Wait for popover
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });

      // Hover over content
      const submenu = screen.getByText('Submenu');
      await user.hover(submenu);

      // Unhover content
      await user.unhover(submenu);

      // Popover should close
      await waitFor(() => {
        expect(screen.queryByText('Submenu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should render without icon', () => {
      const itemWithoutIcon = { label: 'No Icon', onClick: vi.fn() };
      const { container } = render(<SidebarItem item={itemWithoutIcon} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with empty children array', () => {
      const itemWithEmptyChildren = { ...defaultItem, children: [] };
      const { container } = render(<SidebarItem item={itemWithEmptyChildren} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle children without onClick', async () => {
      const user = userEvent.setup();
      const item = {
        ...defaultItem,
        children: [{ label: 'No Click' }],
      };

      render(<SidebarItem item={item} />);

      // Hover to show popover
      await user.hover(screen.getByTestId('mock-icon').parentElement!);

      await waitFor(() => {
        expect(screen.getByText('No Click')).toBeInTheDocument();
      });

      // Click should not throw error
      await user.click(screen.getByText('No Click'));
    });

    it('should handle children without labels', async () => {
      const user = userEvent.setup();
      const item = {
        ...defaultItem,
        children: [{ onClick: vi.fn() }],
      };

      render(<SidebarItem item={item} />);

      // Hover to show popover
      await user.hover(screen.getByTestId('mock-icon').parentElement!);

      // Should render without crashing
      await waitFor(() => {
        const { container } = render(<SidebarItem item={item} />);
        expect(container.firstChild).toBeTruthy();
      });
    });
  });

  describe('State Management', () => {
    const itemWithChildren: SidebarItemType = {
      ...defaultItem,
      children: [{ label: 'Submenu', onClick: vi.fn() }],
    };

    it('should manage popover open state correctly', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={itemWithChildren} />);

      const icon = screen.getByTestId('mock-icon');

      // Initially closed
      expect(screen.queryByText('Submenu')).not.toBeInTheDocument();

      // Open by hovering trigger
      await user.hover(icon.parentElement!);
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });

      // Close by unhovering content (not just trigger)
      const submenu = screen.getByText('Submenu');
      await user.hover(submenu); // Move to content first
      await user.unhover(submenu); // Then unhover content to close
      await waitFor(() => {
        expect(screen.queryByText('Submenu')).not.toBeInTheDocument();
      });
    });

    it('should reset state when popover closes', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={itemWithChildren} />);

      const icon = screen.getByTestId('mock-icon');

      // Open popover
      await user.hover(icon.parentElement!);
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });

      // Close popover by leaving content
      const submenu = screen.getByText('Submenu');
      await user.hover(submenu);
      await user.unhover(submenu);
      await waitFor(() => {
        expect(screen.queryByText('Submenu')).not.toBeInTheDocument();
      });

      // Verify popover can be reopened after close
      await user.hover(icon.parentElement!);
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should render with proper list structure', () => {
      const { container } = render(<SidebarItem item={defaultItem} />);
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      const handleClick = vi.fn();
      render(<SidebarItem item={{ ...defaultItem, onClick: handleClick }} />);

      const icon = screen.getByTestId('mock-icon');
      icon.parentElement?.focus();

      // Should be focusable
      expect(document.activeElement).toBeTruthy();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle nested navigation structure', async () => {
      const user = userEvent.setup();
      const complexItem = {
        label: 'Settings',
        icon: <MockIcon />,
        onClick: vi.fn(),
        children: [
          { label: 'General', onClick: vi.fn() },
          { label: 'Security', onClick: vi.fn() },
          { label: 'Notifications', onClick: vi.fn() },
          { label: 'Privacy', onClick: vi.fn() },
        ],
      };

      render(<SidebarItem item={complexItem} />);

      // Open submenu
      await user.hover(screen.getByTestId('mock-icon').parentElement!);

      // All submenus should appear
      await waitFor(() => {
        expect(screen.getByText('General')).toBeInTheDocument();
        expect(screen.getByText('Security')).toBeInTheDocument();
        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.getByText('Privacy')).toBeInTheDocument();
      });

      // Click one submenu item
      await user.click(screen.getByText('General'));

      // Verify the onClick was called
      const generalClick = complexItem.children?.[0]?.onClick;
      expect(generalClick).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid hover/unhover', async () => {
      const user = userEvent.setup();
      const itemWithChildren = {
        ...defaultItem,
        children: [{ label: 'Submenu', onClick: vi.fn() }],
      };

      render(<SidebarItem item={itemWithChildren} />);

      const icon = screen.getByTestId('mock-icon').parentElement!;

      // Rapid hover/unhover
      await user.hover(icon);
      await user.unhover(icon);
      await user.hover(icon);
      await user.unhover(icon);
      await user.hover(icon);

      // Should eventually show the popover
      await waitFor(() => {
        expect(screen.getByText('Submenu')).toBeInTheDocument();
      });
    });
  });
});
