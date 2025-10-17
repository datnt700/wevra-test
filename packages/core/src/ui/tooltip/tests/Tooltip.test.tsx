import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../components/Tooltip';

describe('Tooltip', () => {
  describe('Basic Rendering', () => {
    it('should render the trigger element', () => {
      render(
        <Tooltip trigger={<button>Hover me</button>}>
          <div>Tooltip content</div>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should not show tooltip content initially', () => {
      render(
        <Tooltip trigger={<button>Hover me</button>}>
          <div>Tooltip content</div>
        </Tooltip>
      );
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(
        <Tooltip trigger={<button>Trigger</button>}>
          <div>Content</div>
        </Tooltip>
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('should render trigger as button', () => {
      render(
        <Tooltip trigger={<button type="button">Click me</button>}>
          <div>Info</div>
        </Tooltip>
      );
      // Radix UI wraps trigger in another button, so check for text instead
      const button = screen.getByText('Click me');
      expect(button).toBeInTheDocument();
    });

    it('should render trigger as span', () => {
      render(
        <Tooltip trigger={<span>Span trigger</span>}>
          <div>Content</div>
        </Tooltip>
      );
      expect(screen.getByText('Span trigger')).toBeInTheDocument();
    });
  });

  describe('Hover Behavior', () => {
    it('should show tooltip on hover', async () => {
      render(
        <Tooltip trigger={<button>Hover trigger 1</button>}>
          <div data-testid="tooltip-1">Tooltip content 1</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Hover trigger 1');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-1');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should show tooltip with span trigger', async () => {
      render(
        <Tooltip trigger={<span>Help icon</span>}>
          <div data-testid="tooltip-3">Help text</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Help icon');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-3');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });
  });

  describe('Positioning (side prop)', () => {
    it('should render with top position by default', async () => {
      render(
        <Tooltip trigger={<button>Top trigger</button>}>
          <div data-testid="tooltip-top">Top content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Top trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-top');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should render with right position', async () => {
      render(
        <Tooltip side="right" trigger={<button>Right trigger</button>}>
          <div data-testid="tooltip-right">Right content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Right trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-right');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should render with bottom position', async () => {
      render(
        <Tooltip side="bottom" trigger={<button>Bottom trigger</button>}>
          <div data-testid="tooltip-bottom">Bottom content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Bottom trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-bottom');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should render with left position', async () => {
      render(
        <Tooltip side="left" trigger={<button>Left trigger</button>}>
          <div data-testid="tooltip-left">Left content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Left trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-left');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });
  });

  describe('Side Offset', () => {
    it('should render with default sideOffset', async () => {
      render(
        <Tooltip trigger={<button>Default offset</button>}>
          <div data-testid="tooltip-offset-default">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Default offset');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-offset-default');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should render with custom sideOffset', async () => {
      render(
        <Tooltip sideOffset={10} trigger={<button>Custom offset</button>}>
          <div data-testid="tooltip-offset-10">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Custom offset');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-offset-10');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should render with zero sideOffset', async () => {
      render(
        <Tooltip sideOffset={0} trigger={<button>Zero offset</button>}>
          <div data-testid="tooltip-offset-0">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Zero offset');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-offset-0');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });
  });

  describe('Arrow', () => {
    it('should not show arrow by default', async () => {
      const { container } = render(
        <Tooltip trigger={<button>No arrow</button>}>
          <div data-testid="tooltip-no-arrow">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('No arrow');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-no-arrow');
        expect(tooltips[0]).toBeInTheDocument();
      });

      const arrows = container.querySelectorAll('[data-radix-popper-arrow]');
      expect(arrows.length).toBe(0);
    });

    it('should show arrow when showArrow is true', async () => {
      render(
        <Tooltip showArrow={true} trigger={<button>With arrow</button>}>
          <div data-testid="tooltip-with-arrow">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('With arrow');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-with-arrow');
        expect(tooltips[0]).toBeInTheDocument();
        // Check arrow is rendered within the tooltip
        const arrows = document.querySelectorAll('svg');
        expect(arrows.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Content Types', () => {
    it('should render text content', async () => {
      render(
        <Tooltip trigger={<button>Text trigger</button>}>
          <div data-testid="tooltip-text">Simple text content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Text trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-text');
        expect(tooltips[0]).toHaveTextContent('Simple text content');
      });
    });

    it('should render complex HTML content', async () => {
      render(
        <Tooltip trigger={<button>HTML trigger</button>}>
          <div data-testid="tooltip-html">
            <strong>Bold text</strong>
            <p>Paragraph</p>
          </div>
        </Tooltip>
      );

      const trigger = screen.getByText('HTML trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-html');
        expect(tooltips[0]).toBeInTheDocument();
        const boldElements = screen.getAllByText('Bold text');
        const paragraphElements = screen.getAllByText('Paragraph');
        expect(boldElements[0]).toBeInTheDocument();
        expect(paragraphElements[0]).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined side', async () => {
      render(
        <Tooltip side={undefined} trigger={<button>Undefined side</button>}>
          <div data-testid="tooltip-undef-side">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Undefined side');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-undef-side');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should handle undefined sideOffset', async () => {
      render(
        <Tooltip sideOffset={undefined} trigger={<button>Undefined offset</button>}>
          <div data-testid="tooltip-undef-offset">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Undefined offset');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-undef-offset');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should handle very long content', async () => {
      const longText = 'A'.repeat(200);
      render(
        <Tooltip trigger={<button>Long content trigger</button>}>
          <div data-testid="tooltip-long">{longText}</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Long content trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-long');
        expect(tooltips[0]).toHaveTextContent(longText);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible trigger', () => {
      render(
        <Tooltip trigger={<button aria-label="Help">?</button>}>
          <div>Help text</div>
        </Tooltip>
      );

      const trigger = screen.getByLabelText('Help');
      expect(trigger).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      render(
        <Tooltip trigger={<button>Keyboard trigger</button>}>
          <div data-testid="tooltip-keyboard">Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Keyboard trigger');
      trigger.focus();

      expect(trigger).toHaveFocus();
    });

    it('should support tab navigation', async () => {
      render(
        <>
          <button>Before</button>
          <Tooltip trigger={<button>Target</button>}>
            <div>Content</div>
          </Tooltip>
          <button>After</button>
        </>
      );

      await userEvent.tab();
      expect(screen.getByText('Before')).toHaveFocus();

      await userEvent.tab();
      // Radix UI Tooltip wraps the trigger in a button
      const triggerWrapper = screen.getAllByRole('button')[1]; // Skip "Before", get Target wrapper
      expect(triggerWrapper).toHaveFocus();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all props combined', async () => {
      render(
        <Tooltip
          side="right"
          sideOffset={15}
          showArrow={true}
          trigger={<button>All props trigger</button>}
        >
          <div data-testid="tooltip-all-props">Complex tooltip content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('All props trigger');
      await userEvent.hover(trigger);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-all-props');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should handle multiple tooltips on same page', async () => {
      render(
        <>
          <Tooltip trigger={<button>Tooltip 1</button>}>
            <div data-testid="tooltip-multi-1">Content 1</div>
          </Tooltip>
          <Tooltip trigger={<button>Tooltip 2</button>}>
            <div data-testid="tooltip-multi-2">Content 2</div>
          </Tooltip>
        </>
      );

      const trigger1 = screen.getByText('Tooltip 1');
      const trigger2 = screen.getByText('Tooltip 2');

      await userEvent.hover(trigger1);
      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-multi-1');
        expect(tooltips[0]).toBeInTheDocument();
      });

      await userEvent.unhover(trigger1);
      await userEvent.hover(trigger2);

      await waitFor(() => {
        const tooltips = screen.getAllByTestId('tooltip-multi-2');
        expect(tooltips[0]).toBeInTheDocument();
      });
    });

    it('should handle tooltip with disabled trigger', () => {
      render(
        <Tooltip trigger={<button disabled>Disabled button</button>}>
          <div>Content</div>
        </Tooltip>
      );

      const trigger = screen.getByText('Disabled button');
      expect(trigger).toBeDisabled();
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Tooltip.displayName).toBe('Tooltip');
    });
  });
});
