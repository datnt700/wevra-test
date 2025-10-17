import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../components/Pagination';

describe('Pagination', () => {
  describe('Basic Rendering', () => {
    it('renders pagination with correct buttons', () => {
      const { container } = render(<Pagination numPages={20} currentPage={3} />);
      const buttons = container.querySelectorAll('button');
      
      expect(buttons.length).toBeGreaterThan(0);
      expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    });

    it('renders current page as active', () => {
      render(<Pagination numPages={10} currentPage={3} />);
      
      const currentPageButton = screen.getByLabelText('Go to page 3');
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Navigation Interaction', () => {
    it('calls onPageChange when clicking a page number', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      
      render(<Pagination numPages={10} currentPage={1} onPageChange={onPageChange} />);
      
      const page3Button = screen.getByLabelText('Go to page 3');
      await user.click(page3Button);
      
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('calls onPageChange when clicking next button', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      
      render(<Pagination numPages={10} currentPage={5} onPageChange={onPageChange} />);
      
      const nextButton = screen.getByLabelText('Go to next page');
      await user.click(nextButton);
      
      expect(onPageChange).toHaveBeenCalledWith(6);
    });

    it('calls onPageChange when clicking previous button', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      
      render(<Pagination numPages={10} currentPage={5} onPageChange={onPageChange} />);
      
      const prevButton = screen.getByLabelText('Go to previous page');
      await user.click(prevButton);
      
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('does not call onPageChange when clicking current page', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      
      render(<Pagination numPages={10} currentPage={5} onPageChange={onPageChange} />);
      
      const currentPageButton = screen.getByLabelText('Go to page 5');
      await user.click(currentPageButton);
      
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('disables previous button on first page', () => {
      render(<Pagination numPages={10} currentPage={1} />);
      
      const prevButton = screen.getByLabelText('Go to previous page');
      expect(prevButton).toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(<Pagination numPages={10} currentPage={10} />);
      
      const nextButton = screen.getByLabelText('Go to next page');
      expect(nextButton).toBeDisabled();
    });

    it('handles single page correctly', () => {
      render(<Pagination numPages={1} currentPage={1} />);
      
      const prevButton = screen.getByLabelText('Go to previous page');
      const nextButton = screen.getByLabelText('Go to next page');
      
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper navigation role', () => {
      const { container } = render(<Pagination numPages={10} currentPage={5} />);
      
      const nav = container.querySelector('[role="navigation"]');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Pagination');
    });

    it('marks ellipsis as aria-hidden', () => {
      const { container } = render(<Pagination numPages={20} currentPage={10} />);
      
      const ellipsis = container.querySelectorAll('span[aria-hidden="true"]');
      expect(ellipsis.length).toBeGreaterThan(0);
    });
  });
});
