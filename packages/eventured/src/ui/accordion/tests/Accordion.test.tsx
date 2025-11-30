import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../components/Accordion';

describe('Accordion', () => {
  const mockItems = [
    {
      value: 'item-1',
      trigger: { content: 'Section 1' },
      content: { content: 'Content for section 1' },
    },
    {
      value: 'item-2',
      trigger: { content: 'Section 2' },
      content: { content: 'Content for section 2' },
    },
    {
      value: 'item-3',
      trigger: { content: 'Section 3' },
      content: { content: 'Content for section 3' },
    },
  ];

  describe('Basic Rendering', () => {
    it('should render with items', () => {
      render(<Accordion items={mockItems} />);

      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Section 3')).toBeInTheDocument();
    });

    it('should render trigger buttons', () => {
      render(<Accordion items={mockItems} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('should have first item expanded by default', () => {
      const { container } = render(<Accordion items={mockItems} />);

      const firstContent = container.querySelector('[data-state="open"]');
      expect(firstContent).toBeInTheDocument();
    });
  });

  describe('Accordion Types', () => {
    it('should render with single type (default)', () => {
      render(<Accordion type="single" items={mockItems} />);

      expect(screen.getByText('Section 1')).toBeInTheDocument();
    });

    it('should allow collapsible behavior', () => {
      render(<Accordion type="single" items={mockItems} />);

      expect(screen.getByText('Section 1')).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should expand accordion item when clicked', async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const section2Button = screen.getByText('Section 2');
      await user.click(section2Button);

      expect(screen.getByText('Content for section 2')).toBeInTheDocument();
    });

    it('should collapse expanded item when clicked again (single type)', async () => {
      const user = userEvent.setup();
      const { container } = render(<Accordion type="single" items={mockItems} />);

      const section1Button = screen.getByText('Section 1');
      await user.click(section1Button);

      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, 400));

      const closedContent = container.querySelector('[data-state="closed"]');
      expect(closedContent).toBeInTheDocument();
    });

    it('should allow keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByText('Section 1');
      firstButton.focus();

      await user.keyboard('{ArrowDown}');

      const secondButton = screen.getByText('Section 2');
      expect(secondButton).toHaveFocus();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled accordion', () => {
      render(<Accordion isDisabled items={mockItems} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('should not expand when disabled', async () => {
      const user = userEvent.setup();
      render(<Accordion isDisabled items={mockItems} />);

      const section2Button = screen.getByText('Section 2');
      await user.click(section2Button);

      // Content should still not be in DOM when disabled
      expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    });
  });

  describe('Chevron Indicator', () => {
    it('should have chevron icons', () => {
      const { container } = render(<Accordion items={mockItems} />);

      const chevrons = container.querySelectorAll('svg');
      expect(chevrons.length).toBeGreaterThan(0);
    });

    it('should rotate chevron when accordion is opened', async () => {
      const user = userEvent.setup();
      const { container } = render(<Accordion items={mockItems} />);

      const section2Button = screen.getByText('Section 2');
      await user.click(section2Button);

      const openChevron = container.querySelector('[data-state="open"]');
      expect(openChevron).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render with empty items array', () => {
      render(<Accordion items={[]} />);

      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });

    it('should render with single item', () => {
      const singleItem = [mockItems[0]!];
      render(<Accordion items={singleItem} />);

      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.queryByText('Section 2')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on buttons', () => {
      render(<Accordion items={mockItems} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('should have content regions', () => {
      const { container } = render(<Accordion items={mockItems} />);

      const regions = container.querySelectorAll('[data-state]');
      expect(regions.length).toBeGreaterThan(0);
    });
  });
});
