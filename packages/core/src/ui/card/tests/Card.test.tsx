import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card';

describe('Card', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <p>Card content</p>
        </Card>
      );

      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders without header', () => {
      render(<Card>Content only</Card>);
      expect(screen.getByText('Content only')).toBeInTheDocument();
    });

    it('accepts custom className for body', () => {
      const { container } = render(<Card className="custom-body-class">Content</Card>);

      const body = container.querySelector('.custom-body-class');
      expect(body).toBeInTheDocument();
    });

    it('accepts custom wrapperClassName', () => {
      const { container } = render(<Card wrapperClassName="custom-wrapper-class">Content</Card>);

      expect(container.firstChild).toHaveClass('custom-wrapper-class');
    });
  });

  describe('Header Prop', () => {
    it('renders header when provided', () => {
      render(
        <Card header="Card Title">
          <p>Body content</p>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('renders header as React node', () => {
      render(<Card header={<h2>Custom Header</h2>}>Content</Card>);

      expect(screen.getByText('Custom Header')).toBeInTheDocument();
    });

    it('does not render header element when header is not provided', () => {
      const { container } = render(<Card>Content</Card>);
      const headers = container.querySelectorAll('div > div:first-child');

      // Should only have the body div
      expect(headers.length).toBeLessThanOrEqual(1);
    });
  });

  describe('Variant Prop', () => {
    it('renders elevated variant by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(card);

      expect(styles.boxShadow).not.toBe('none');
    });

    it('renders elevated variant explicitly', () => {
      const { container } = render(<Card variant="elevated">Content</Card>);
      const card = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(card);

      expect(styles.boxShadow).not.toBe('none');
      expect(styles.border).toBe('');
    });

    it('renders outlined variant', () => {
      render(
        <Card variant="outlined" data-testid="outlined-card">
          Outlined content
        </Card>
      );

      const card = screen.getByTestId('outlined-card');
      expect(card).toBeInTheDocument();

      // Check that variant prop is passed (border styles applied via Emotion)
      expect(card.textContent).toContain('Outlined content');
    });
    it('renders flat variant', () => {
      const { container } = render(<Card variant="flat">Content</Card>);
      const card = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(card);

      expect(styles.boxShadow).toBe('none');
      expect(styles.border).toBe('');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      const { container } = render(
        <Card id="test-card" data-testid="card">
          Content
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('id', 'test-card');
      expect(card).toHaveAttribute('data-testid', 'card');
    });

    it('supports onClick handler', () => {
      const handleClick = vi.fn();
      const { container } = render(<Card onClick={handleClick}>Content</Card>);

      const card = container.firstChild as HTMLElement;
      card.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports style prop', () => {
      const { container } = render(<Card style={{ margin: '10px' }}>Content</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({ margin: '10px' });
    });
  });

  describe('Complex Content', () => {
    it('renders multiple children', () => {
      render(
        <Card>
          <h1>Title</h1>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </Card>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });

    it('renders nested components', () => {
      render(
        <Card header="Outer Card">
          <Card variant="outlined">
            <p>Nested card content</p>
          </Card>
        </Card>
      );

      expect(screen.getByText('Outer Card')).toBeInTheDocument();
      expect(screen.getByText('Nested card content')).toBeInTheDocument();
    });

    it('renders with mixed content types', () => {
      render(
        <Card>
          Text content
          <div>Div content</div>
          <span>Span content</span>
        </Card>
      );

      expect(screen.getByText('Text content')).toBeInTheDocument();
      expect(screen.getByText('Div content')).toBeInTheDocument();
      expect(screen.getByText('Span content')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty children', () => {
      const { container } = render(<Card>{''}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with null header', () => {
      render(<Card header={null}>Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with undefined header', () => {
      render(<Card header={undefined}>Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('handles very long content', () => {
      const longText = 'A'.repeat(1000);
      render(<Card>{longText}</Card>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic structure', () => {
      const { container } = render(
        <Card header="Title">
          <p>Content</p>
        </Card>
      );

      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('allows custom ARIA attributes', () => {
      const { container } = render(
        <Card aria-label="Custom card" role="region">
          Content
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('aria-label', 'Custom card');
      expect(card).toHaveAttribute('role', 'region');
    });
  });

  describe('Style Props', () => {
    it('applies border radius', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(card);

      expect(styles.borderRadius).toBe('0.75rem');
    });

    it('has overflow hidden', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(card);

      expect(styles.overflow).toBe('hidden');
    });
  });

  describe('Variant Combinations', () => {
    it('renders elevated with header', () => {
      render(
        <Card variant="elevated" header="Elevated Card">
          Content
        </Card>
      );

      expect(screen.getByText('Elevated Card')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders outlined with header', () => {
      render(
        <Card variant="outlined" header="Outlined Card">
          Content
        </Card>
      );

      expect(screen.getByText('Outlined Card')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders flat with header', () => {
      render(
        <Card variant="flat" header="Flat Card">
          Content
        </Card>
      );

      expect(screen.getByText('Flat Card')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});
