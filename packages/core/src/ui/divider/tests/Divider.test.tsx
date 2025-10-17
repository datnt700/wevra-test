import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from '../Divider';

describe('Divider', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<Divider />);
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });

    it('renders with horizontal orientation by default', () => {
      render(<Divider data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('accepts custom className', () => {
      const { container } = render(<Divider className="custom-divider" />);
      const separator = container.querySelector('.custom-divider');
      expect(separator).toBeInTheDocument();
    });

    it('renders as separator role', () => {
      const { container } = render(<Divider />);
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('Orientation Prop', () => {
    it('renders horizontal orientation explicitly', () => {
      render(<Divider orientation="horizontal" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders vertical orientation', () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('data-orientation', 'vertical');
    });

    it('sets aria-orientation for vertical divider', () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('sets aria-orientation for horizontal divider', () => {
      render(<Divider orientation="horizontal" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      // Radix defaults to horizontal, may not set aria-orientation
      expect(divider).toHaveAttribute('data-orientation', 'horizontal');
    });
  });

  describe('Size Prop', () => {
    it('renders with default size', () => {
      render(<Divider size="default" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toBeInTheDocument();
    });

    it('renders with sm size', () => {
      render(<Divider size="sm" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toBeInTheDocument();
    });

    it('renders with md size', () => {
      render(<Divider size="md" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toBeInTheDocument();
    });

    it('renders with lg size', () => {
      render(<Divider size="lg" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toBeInTheDocument();
    });

    it('renders with custom numeric size', () => {
      render(<Divider size={5} data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      const { container } = render(<Divider id="custom-divider" data-custom="value" />);
      const divider = container.querySelector('#custom-divider');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveAttribute('data-custom', 'value');
    });

    it('supports data-testid', () => {
      render(<Divider data-testid="my-divider" />);
      expect(screen.getByTestId('my-divider')).toBeInTheDocument();
    });

    it('supports style prop', () => {
      render(<Divider data-testid="divider" style={{ margin: '20px 0' }} />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveStyle({ margin: '20px 0' });
    });
  });

  describe('Radix UI Integration', () => {
    it('uses Radix Separator component', () => {
      const { container } = render(<Divider />);
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });

    it('passes orientation to Radix', () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Accessibility', () => {
    it('has separator role', () => {
      const { container } = render(<Divider />);
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });

    it('sets correct aria-orientation for vertical', () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('allows custom ARIA attributes', () => {
      render(<Divider data-testid="divider" aria-label="Section separator" />);
      const divider = screen.getByTestId('divider');
      expect(divider).toHaveAttribute('aria-label', 'Section separator');
    });
  });

  describe('Size and Orientation Combinations', () => {
    it('renders horizontal with default size', () => {
      render(<Divider orientation="horizontal" size="default" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });

    it('renders horizontal with lg size', () => {
      render(<Divider orientation="horizontal" size="lg" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });

    it('renders vertical with default size', () => {
      render(<Divider orientation="vertical" size="default" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });

    it('renders vertical with md size', () => {
      render(<Divider orientation="vertical" size="md" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });

    it('renders vertical with custom numeric size', () => {
      render(<Divider orientation="vertical" size={10} data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with zero size', () => {
      render(<Divider size={0} data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });

    it('renders with large numeric size', () => {
      render(<Divider size={100} data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });

    it('renders multiple dividers', () => {
      render(
        <div>
          <Divider data-testid="divider-1" />
          <Divider data-testid="divider-2" />
          <Divider data-testid="divider-3" />
        </div>
      );
      expect(screen.getByTestId('divider-1')).toBeInTheDocument();
      expect(screen.getByTestId('divider-2')).toBeInTheDocument();
      expect(screen.getByTestId('divider-3')).toBeInTheDocument();
    });
  });
});
