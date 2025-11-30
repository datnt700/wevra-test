/**
 * Tabs component tests
 * @module Tabs.test
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../components/Tabs';

describe('Tabs', () => {
  describe('Basic Rendering', () => {
    it('renders all tab triggers', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'Tab 1', value: 'tab1', children: <div>Content 1</div> },
            { label: 'Tab 2', value: 'tab2', children: <div>Content 2</div> },
          ]}
        />
      );

      expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
    });

    it('renders default active tab content', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'Tab 1', value: 'tab1', children: <div>Content 1</div> },
            { label: 'Tab 2', value: 'tab2', children: <div>Content 2</div> },
          ]}
        />
      );

      // Active tab content is visible
      expect(screen.getByText('Content 1')).toBeVisible();

      // Inactive tab content is not in the document (Radix hides with display: none)
      const inactivePanel = screen
        .getAllByRole('tabpanel', { hidden: true })
        .find((panel) => panel.getAttribute('data-state') === 'inactive');
      expect(inactivePanel).toBeInTheDocument();
    });

    it('renders with empty items array', () => {
      render(<Tabs defaultValue="none" items={[]} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  describe('Tab Switching', () => {
    it('switches content when tab is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'Tab 1', value: 'tab1', children: <div>Content 1</div> },
            { label: 'Tab 2', value: 'tab2', children: <div>Content 2</div> },
          ]}
        />
      );

      expect(screen.getByText('Content 1')).toBeVisible();

      await user.click(screen.getByRole('tab', { name: /tab 2/i }));

      // Content 2 is now visible
      expect(screen.getByText('Content 2')).toBeVisible();

      // Content 1 no longer visible (but panel still exists in DOM as hidden)
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      const inactivePanel = panels.find((p) => p.getAttribute('data-state') === 'inactive');
      expect(inactivePanel).toBeInTheDocument();
    });

    it('updates active state when tab is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'First', value: 'tab1', children: <div>First Content</div> },
            { label: 'Second', value: 'tab2', children: <div>Second Content</div> },
          ]}
        />
      );

      const tab1 = screen.getByRole('tab', { name: /first/i });
      const tab2 = screen.getByRole('tab', { name: /second/i });

      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(tab2).toHaveAttribute('data-state', 'inactive');

      await user.click(tab2);

      expect(tab1).toHaveAttribute('data-state', 'inactive');
      expect(tab2).toHaveAttribute('data-state', 'active');
    });
  });

  describe('Disabled Tabs', () => {
    it('renders disabled tabs', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'Enabled', value: 'tab1', children: <div>Enabled Content</div> },
            {
              label: 'Disabled',
              value: 'tab2',
              children: <div>Disabled Content</div>,
              isDisabled: true,
            },
          ]}
        />
      );

      const disabledTab = screen.getByRole('tab', { name: /disabled/i });
      expect(disabledTab).toBeDisabled();
    });

    it('does not switch to disabled tab when clicked', async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'Tab 1', value: 'tab1', children: <div>Content 1</div> },
            { label: 'Tab 2', value: 'tab2', children: <div>Content 2</div>, isDisabled: true },
          ]}
        />
      );

      expect(screen.getByText('Content 1')).toBeVisible();

      const disabledTab = screen.getByRole('tab', { name: /tab 2/i });
      await user.click(disabledTab);

      // Should still show Content 1 (tab 1 still active)
      expect(screen.getByText('Content 1')).toBeVisible();

      // Tab 1 should still be active
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      expect(tab1).toHaveAttribute('data-state', 'active');
    });
  });

  describe('Orientation', () => {
    it('renders with horizontal orientation by default', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[{ label: 'Tab 1', value: 'tab1', children: <div>Content</div> }]}
        />
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders with vertical orientation', () => {
      render(
        <Tabs
          defaultValue="tab1"
          orientation="vertical"
          items={[{ label: 'Tab 1', value: 'tab1', children: <div>Content</div> }]}
        />
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA roles', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[{ label: 'Tab 1', value: 'tab1', children: <div>Content 1</div> }]}
        />
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('tablist has aria-label', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[{ label: 'Tab 1', value: 'tab1', children: <div>Content</div> }]}
        />
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Tabs');
    });

    it('active tab has correct aria-selected', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'Tab 1', value: 'tab1', children: <div>Content 1</div> },
            { label: 'Tab 2', value: 'tab2', children: <div>Content 2</div> },
          ]}
        />
      );

      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      const tab2 = screen.getByRole('tab', { name: /tab 2/i });

      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Multiple Tabs', () => {
    it('renders many tabs correctly', () => {
      render(
        <Tabs
          defaultValue="tab1"
          items={[
            { label: 'Tab 1', value: 'tab1', children: <div>Content 1</div> },
            { label: 'Tab 2', value: 'tab2', children: <div>Content 2</div> },
            { label: 'Tab 3', value: 'tab3', children: <div>Content 3</div> },
            { label: 'Tab 4', value: 'tab4', children: <div>Content 4</div> },
          ]}
        />
      );

      expect(screen.getAllByRole('tab')).toHaveLength(4);
      expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(4);
    });
  });
});
