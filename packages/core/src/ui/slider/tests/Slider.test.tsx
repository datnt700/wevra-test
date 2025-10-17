import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from '../components/Slider';

describe('Slider', () => {
  describe('Basic Rendering', () => {
    it('should render the slider', () => {
      render(<Slider />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });

    it('should render with default value', () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByTestId('slider');
      expect(slider).toBeInTheDocument();
    });

    it('should render with single thumb', () => {
      render(<Slider defaultValue={[30]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toBeInTheDocument();
    });

    it('should render with aria-label', () => {
      render(<Slider ariaLabel="Volume control" />);
      const thumb = screen.getByRole('slider', { name: 'Volume control' });
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('Value Props', () => {
    it('should render with min value', () => {
      render(<Slider min={0} defaultValue={[0]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '0');
    });

    it('should render with max value', () => {
      render(<Slider max={100} defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemax', '100');
    });

    it('should render with custom min and max', () => {
      render(<Slider min={10} max={90} defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '10');
      expect(thumb).toHaveAttribute('aria-valuemax', '90');
    });

    it('should render with step value', () => {
      render(<Slider step={5} defaultValue={[50]} />);
      const slider = screen.getByTestId('slider');
      expect(slider).toBeInTheDocument();
    });

    it('should render with controlled value', () => {
      render(<Slider value={[75]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('Orientation', () => {
    it('should render horizontal orientation by default', () => {
      render(<Slider />);
      const slider = screen.getByTestId('slider');
      expect(slider).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should render vertical orientation', () => {
      render(<Slider orientation="vertical" />);
      const slider = screen.getByTestId('slider');
      expect(slider).toHaveAttribute('data-orientation', 'vertical');
    });

    it('should render horizontal orientation explicitly', () => {
      render(<Slider orientation="horizontal" />);
      const slider = screen.getByTestId('slider');
      expect(slider).toHaveAttribute('data-orientation', 'horizontal');
    });
  });

  describe('Disabled State', () => {
    it('should render enabled by default', () => {
      render(<Slider />);
      const thumb = screen.getByRole('slider');
      expect(thumb).not.toHaveAttribute('data-disabled');
    });

    it('should render in disabled state', () => {
      render(<Slider disabled />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('data-disabled');
    });

    it('should not respond to interactions when disabled', async () => {
      const handleChange = vi.fn();
      render(<Slider disabled onValueChange={handleChange} />);
      const thumb = screen.getByRole('slider');

      await userEvent.click(thumb);

      // Disabled slider should not trigger value change
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Event Handlers', () => {
    it('should call onValueChange when value changes', async () => {
      const handleChange = vi.fn();
      render(<Slider onValueChange={handleChange} defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');

      // Focus the thumb and use arrow keys to change value
      thumb.focus();
      await userEvent.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
      });
    });

    it('should call onValueCommit when value is committed', async () => {
      const handleCommit = vi.fn();
      render(<Slider onValueCommit={handleCommit} defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');

      thumb.focus();
      await userEvent.keyboard('{ArrowRight}');
      // Blur to commit the value
      thumb.blur();

      await waitFor(() => {
        expect(handleCommit).toHaveBeenCalled();
      });
    });

    it('should update value with keyboard navigation (ArrowUp)', async () => {
      const handleChange = vi.fn();
      render(<Slider onValueChange={handleChange} defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');

      thumb.focus();
      await userEvent.keyboard('{ArrowUp}');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
        const callArgs = handleChange.mock.calls[0]?.[0];
        expect(callArgs?.[0]).toBeGreaterThan(50);
      });
    });

    it('should update value with keyboard navigation (ArrowDown)', async () => {
      const handleChange = vi.fn();
      render(<Slider onValueChange={handleChange} defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');

      thumb.focus();
      await userEvent.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
        const callArgs = handleChange.mock.calls[0]?.[0];
        expect(callArgs?.[0]).toBeLessThan(50);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA role', () => {
      render(<Slider />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toBeInTheDocument();
    });

    it('should have aria-valuemin attribute', () => {
      render(<Slider min={0} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax attribute', () => {
      render(<Slider max={100} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have aria-valuenow attribute', () => {
      render(<Slider defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuenow', '50');
    });

    it('should have aria-label attribute', () => {
      render(<Slider ariaLabel="Volume" />);
      const thumb = screen.getByRole('slider', { name: 'Volume' });
      expect(thumb).toHaveAttribute('aria-label', 'Volume');
    });

    it('should be keyboard navigable', () => {
      render(<Slider />);
      const thumb = screen.getByRole('slider');
      thumb.focus();
      expect(thumb).toHaveFocus();
    });

    it('should support tab navigation', () => {
      render(<Slider />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('tabindex', '0');
    });

    it('should have aria-orientation attribute', () => {
      render(<Slider orientation="vertical" />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative min value', () => {
      render(<Slider min={-50} max={50} defaultValue={[0]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '-50');
    });

    it('should handle negative max value', () => {
      render(<Slider min={-100} max={-50} defaultValue={[-75]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemax', '-50');
    });

    it('should handle large step values', () => {
      render(<Slider step={25} defaultValue={[50]} />);
      const slider = screen.getByTestId('slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle decimal step values', () => {
      render(<Slider step={0.1} defaultValue={[5.5]} min={0} max={10} />);
      const slider = screen.getByTestId('slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle empty defaultValue array', () => {
      render(<Slider defaultValue={[]} />);
      const slider = screen.getByTestId('slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle undefined ariaLabel', () => {
      render(<Slider ariaLabel={undefined} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toBeInTheDocument();
    });

    it('should handle very small range (min/max)', () => {
      render(<Slider min={0} max={1} step={0.01} defaultValue={[0.5]} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '0');
      expect(thumb).toHaveAttribute('aria-valuemax', '1');
    });
  });

  describe('Form Integration', () => {
    it('should support name attribute for form submission', () => {
      render(<Slider name="volume" />);
      // Radix UI Slider handles form submission internally
      // The name prop is passed but doesn't create a visible input element
      const slider = screen.getByTestId('slider');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle dynamic value updates', () => {
      const { rerender } = render(<Slider value={[25]} />);
      let thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuenow', '25');

      rerender(<Slider value={[75]} />);
      thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuenow', '75');
    });

    it('should handle dynamic min/max updates', () => {
      const { rerender } = render(<Slider min={0} max={100} defaultValue={[50]} />);
      let thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '0');
      expect(thumb).toHaveAttribute('aria-valuemax', '100');

      rerender(<Slider min={10} max={90} defaultValue={[50]} />);
      thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '10');
      expect(thumb).toHaveAttribute('aria-valuemax', '90');
    });

    it('should handle orientation changes', () => {
      const { rerender } = render(<Slider orientation="horizontal" />);
      let slider = screen.getByTestId('slider');
      expect(slider).toHaveAttribute('data-orientation', 'horizontal');

      rerender(<Slider orientation="vertical" />);
      slider = screen.getByTestId('slider');
      expect(slider).toHaveAttribute('data-orientation', 'vertical');
    });

    it('should handle disabled state changes', () => {
      const { rerender } = render(<Slider disabled={false} />);
      let thumb = screen.getByRole('slider');
      expect(thumb).not.toHaveAttribute('data-disabled');

      rerender(<Slider disabled={true} />);
      thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('data-disabled');
    });

    it('should handle multiple keyboard interactions', async () => {
      const handleChange = vi.fn();
      render(<Slider onValueChange={handleChange} defaultValue={[50]} />);
      const thumb = screen.getByRole('slider');

      thumb.focus();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowLeft}');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange.mock.calls.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Slider.displayName).toBe('Slider');
    });
  });
});
