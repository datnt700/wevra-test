import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthLayout from '../layout';

describe('AuthLayout', () => {
  it('should render children', () => {
    render(
      <AuthLayout>
        <div data-testid="test-child">Test Content</div>
      </AuthLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <AuthLayout>
        <div data-testid="child1">First Child</div>
        <div data-testid="child2">Second Child</div>
      </AuthLayout>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('should render nested children', () => {
    render(
      <AuthLayout>
        <div data-testid="parent">
          <span data-testid="nested">Nested Content</span>
        </div>
      </AuthLayout>
    );

    const parent = screen.getByTestId('parent');
    const nested = screen.getByTestId('nested');

    expect(parent).toBeInTheDocument();
    expect(parent).toContainElement(nested);
  });

  it('should render text content', () => {
    render(<AuthLayout>Plain text content</AuthLayout>);

    expect(screen.getByText('Plain text content')).toBeInTheDocument();
  });

  it('should render complex component tree', () => {
    const ComplexChild = () => (
      <div>
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Action</button>
      </div>
    );

    render(
      <AuthLayout>
        <ComplexChild />
      </AuthLayout>
    );

    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('should not add any wrapper elements', () => {
    const { container } = render(
      <AuthLayout>
        <div data-testid="direct-child">Content</div>
      </AuthLayout>
    );

    // Should use React Fragment, so direct child should be immediate
    const child = screen.getByTestId('direct-child');
    expect(child.parentElement).toBe(container);
  });

  it('should handle empty children', () => {
    const { container } = render(<AuthLayout>{null}</AuthLayout>);

    expect(container).toBeEmptyDOMElement();
  });

  it('should handle undefined children', () => {
    const { container } = render(<AuthLayout>{undefined}</AuthLayout>);

    expect(container).toBeEmptyDOMElement();
  });

  it('should handle string children', () => {
    render(<AuthLayout>Simple string</AuthLayout>);

    expect(screen.getByText('Simple string')).toBeInTheDocument();
  });

  it('should handle number children', () => {
    render(<AuthLayout>{42}</AuthLayout>);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should preserve children props', () => {
    render(
      <AuthLayout>
        <button data-testid="btn" onClick={() => {}} disabled>
          Click me
        </button>
      </AuthLayout>
    );

    const button = screen.getByTestId('btn');
    expect(button).toHaveAttribute('disabled');
  });

  it('should render array of children', () => {
    render(
      <AuthLayout>
        {[1, 2, 3].map((num) => (
          <div key={num} data-testid={`item-${num}`}>
            Item {num}
          </div>
        ))}
      </AuthLayout>
    );

    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
    expect(screen.getByTestId('item-3')).toBeInTheDocument();
  });
});
