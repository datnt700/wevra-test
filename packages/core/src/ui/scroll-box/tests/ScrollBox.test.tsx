import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollBox } from '../components/ScrollBox';

describe('ScrollBox', () => {
  describe('Basic Rendering', () => {
    it('should render with children', () => {
      render(
        <ScrollBox>
          <div>Test content</div>
        </ScrollBox>
      );
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should render with multiple children', () => {
      render(
        <ScrollBox>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
        </ScrollBox>
      );
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    it('should render with long content', () => {
      render(
        <ScrollBox maxHeight="200px">
          <div style={{ height: '1000px' }}>Very long content</div>
        </ScrollBox>
      );
      expect(screen.getByText('Very long content')).toBeInTheDocument();
    });

    it('should render with text content', () => {
      render(<ScrollBox>Plain text content</ScrollBox>);
      expect(screen.getByText('Plain text content')).toBeInTheDocument();
    });
  });

  describe('Height Props', () => {
    it('should apply height style', () => {
      const { container } = render(
        <ScrollBox height="300px">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ height: '300px' });
    });

    it('should apply maxHeight style', () => {
      const { container } = render(
        <ScrollBox maxHeight="500px">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ maxHeight: '500px' });
    });

    it('should apply both height and maxHeight', () => {
      const { container } = render(
        <ScrollBox height="200px" maxHeight="400px">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ height: '200px', maxHeight: '400px' });
    });

    it('should render without height props', () => {
      const { container } = render(
        <ScrollBox>
          <div>Content</div>
        </ScrollBox>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('CSS Class', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <ScrollBox className="custom-scroll">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveClass('custom-scroll');
    });

    it('should render without className', () => {
      const { container } = render(
        <ScrollBox>
          <div>Content</div>
        </ScrollBox>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Scroll Events', () => {
    it('should handle onScroll event', () => {
      const handleScroll = vi.fn();
      const { container } = render(
        <ScrollBox onScroll={handleScroll}>
          <div style={{ height: '1000px' }}>Scrollable content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;

      // Trigger scroll event
      scrollBox.dispatchEvent(new Event('scroll'));

      expect(handleScroll).toHaveBeenCalled();
    });

    it('should handle scroll with custom handler', () => {
      const customHandler = vi.fn();
      const { container } = render(
        <ScrollBox onScroll={customHandler}>
          <div style={{ height: '500px' }}>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;

      scrollBox.dispatchEvent(new Event('scroll'));

      expect(customHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('HTML Attributes', () => {
    it('should apply data-testid', () => {
      render(
        <ScrollBox data-testid="scroll-container">
          <div>Content</div>
        </ScrollBox>
      );
      expect(screen.getByTestId('scroll-container')).toBeInTheDocument();
    });

    it('should apply id attribute', () => {
      const { container } = render(
        <ScrollBox id="my-scroll-box">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('id', 'my-scroll-box');
    });

    it('should apply title attribute', () => {
      const { container } = render(
        <ScrollBox title="Scrollable container">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('title', 'Scrollable container');
    });

    it('should apply role attribute', () => {
      const { container } = render(
        <ScrollBox role="region">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('role', 'region');
    });

    it('should apply aria-label', () => {
      const { container } = render(
        <ScrollBox aria-label="Scrollable content area">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('aria-label', 'Scrollable content area');
    });
  });

  describe('Data Attributes', () => {
    it('should apply custom data attributes', () => {
      const { container } = render(
        <ScrollBox data-scroll="vertical">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('data-scroll', 'vertical');
    });

    it('should apply multiple data attributes', () => {
      const { container } = render(
        <ScrollBox data-type="scrollable" data-direction="vertical">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('data-type', 'scrollable');
      expect(scrollBox).toHaveAttribute('data-direction', 'vertical');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children gracefully', () => {
      const { container } = render(<ScrollBox>{null}</ScrollBox>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      const { container } = render(<ScrollBox>{undefined}</ScrollBox>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle height as number string', () => {
      const { container } = render(
        <ScrollBox height="100">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ height: '100' });
    });

    it('should handle maxHeight in different units (rem)', () => {
      const { container } = render(
        <ScrollBox maxHeight="20rem">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ maxHeight: '20rem' });
    });

    it('should handle maxHeight in different units (vh)', () => {
      const { container } = render(
        <ScrollBox maxHeight="50vh">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ maxHeight: '50vh' });
    });

    it('should handle very long className', () => {
      const longClassName = 'very-long-class-name-that-should-still-work';
      const { container } = render(
        <ScrollBox className={longClassName}>
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveClass(longClassName);
    });

    it('should handle special characters in content', () => {
      render(
        <ScrollBox>
          <div>Content with special chars: !@#$%^&*()</div>
        </ScrollBox>
      );
      expect(screen.getByText(/Content with special chars/)).toBeInTheDocument();
    });

    it('should handle nested ScrollBox components', () => {
      render(
        <ScrollBox maxHeight="500px">
          <ScrollBox maxHeight="200px">
            <div>Nested content</div>
          </ScrollBox>
        </ScrollBox>
      );
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      const { container } = render(
        <ScrollBox tabIndex={0}>
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('tabIndex', '0');
    });

    it('should support aria-labelledby', () => {
      render(
        <div>
          <h2 id="scroll-title">Scrollable Section</h2>
          <ScrollBox aria-labelledby="scroll-title">
            <div>Content</div>
          </ScrollBox>
        </div>
      );
      const scrollBox = screen.getByText('Content').parentElement;
      expect(scrollBox).toHaveAttribute('aria-labelledby', 'scroll-title');
    });

    it('should support aria-describedby', () => {
      const { container } = render(
        <ScrollBox aria-describedby="scroll-description">
          <div>Content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('aria-describedby', 'scroll-description');
    });

    it('should support aria-live for dynamic content', () => {
      const { container } = render(
        <ScrollBox aria-live="polite">
          <div>Dynamic content</div>
        </ScrollBox>
      );
      const scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle dynamic height changes', () => {
      const { container, rerender } = render(
        <ScrollBox height="200px">
          <div>Content</div>
        </ScrollBox>
      );
      let scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ height: '200px' });

      rerender(
        <ScrollBox height="400px">
          <div>Content</div>
        </ScrollBox>
      );
      scrollBox = container.firstChild as HTMLElement;
      expect(scrollBox).toHaveStyle({ height: '400px' });
    });

    it('should handle dynamic content changes', () => {
      const { rerender } = render(
        <ScrollBox>
          <div>Original content</div>
        </ScrollBox>
      );
      expect(screen.getByText('Original content')).toBeInTheDocument();

      rerender(
        <ScrollBox>
          <div>Updated content</div>
        </ScrollBox>
      );
      expect(screen.getByText('Updated content')).toBeInTheDocument();
      expect(screen.queryByText('Original content')).not.toBeInTheDocument();
    });

    it('should work with mixed content types', () => {
      render(
        <ScrollBox>
          <h1>Title</h1>
          <p>Paragraph</p>
          <ul>
            <li>List item</li>
          </ul>
          <button>Button</button>
        </ScrollBox>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('List item')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should preserve event handlers on children', () => {
      const handleClick = vi.fn();
      render(
        <ScrollBox>
          <button onClick={handleClick}>Click me</button>
        </ScrollBox>
      );
      const button = screen.getByText('Click me');
      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(ScrollBox.displayName).toBe('ScrollBox');
    });
  });
});
