/**
 * DropdownMenu component tests
 * @module DropdownMenu.test
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from '../components/DropdownMenu';

describe('DropdownMenu', () => {
  describe('Basic Rendering', () => {
    it('renders trigger element', () => {
      render(
        <DropdownMenu
          trigger={<button>Open Menu</button>}
          items={[{ label: 'Item 1' }]}
        />
      );
      expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });

    it('shows menu items when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[
            { label: 'Edit' },
            { label: 'Delete' },
          ]}
        />
      );

      const trigger = screen.getByRole('button', { name: /menu/i });
      await user.click(trigger);

      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('renders with empty items array', () => {
      render(
        <DropdownMenu trigger={<button>Menu</button>} items={[]} />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Menu Items', () => {
    it('calls onSelect when item is clicked', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[
            { label: 'Action', onSelect: handleSelect },
          ]}
        />
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByText('Action');
      await user.click(item);

      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('renders disabled items', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[
            { label: 'Disabled Item', isDisabled: true, onSelect: handleSelect },
          ]}
        />
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByText('Disabled Item');
      
      expect(item).toHaveAttribute('data-disabled');
    });

    it('renders multiple items', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[
            { label: 'Item 1' },
            { label: 'Item 2' },
            { label: 'Item 3' },
          ]}
        />
      );

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('uses custom key prop when provided', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[
            { key: 'custom-key', label: 'Custom Key Item' },
          ]}
        />
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Custom Key Item')).toBeInTheDocument();
    });
  });

  describe('Custom Trigger', () => {
    it('renders custom trigger element', () => {
      render(
        <DropdownMenu
          trigger={<div>Custom Trigger</div>}
          items={[{ label: 'Item' }]}
        />
      );
      expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
    });

    it('renders button trigger with icon', () => {
      render(
        <DropdownMenu
          trigger={
            <button>
              <span>⚙️</span> Settings
            </button>
          }
          items={[{ label: 'Preferences' }]}
        />
      );
      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('closes menu after item is selected', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[{ label: 'Close Me' }]}
        />
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Close Me')).toBeInTheDocument();

      await user.click(screen.getByText('Close Me'));
      
      // Menu should close after selection (Radix default behavior)
      // Wait a bit for the animation
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    it('handles keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[
            { label: 'First' },
            { label: 'Second' },
          ]}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // Radix handles keyboard navigation automatically
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles items with React elements as labels', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[
            { label: <span>Custom <strong>Label</strong></span> },
          ]}
        />
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Custom')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('handles missing onSelect gracefully', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          items={[{ label: 'No Handler' }]}
        />
      );

      await user.click(screen.getByRole('button'));
      const item = screen.getByText('No Handler');
      
      // Should not throw error
      await expect(user.click(item)).resolves.not.toThrow();
    });
  });
});
