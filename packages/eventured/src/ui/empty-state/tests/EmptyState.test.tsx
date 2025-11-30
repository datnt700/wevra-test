import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../components/EmptyState';

describe('EmptyState', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('should render with default structure', () => {
      const { container } = render(<EmptyState />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with title', () => {
      render(<EmptyState title="No results found" />);
      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.getByText('No results found').tagName).toBe('H2');
    });

    it('should render with subtitle', () => {
      render(<EmptyState subTitle="Try adjusting your filters" />);
      expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your filters').tagName).toBe('H5');
    });

    it('should render with icon', () => {
      const Icon = () => <svg data-testid="custom-icon" />;
      render(<EmptyState icon={<Icon />} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render with action', () => {
      const ActionButton = () => <button>Refresh</button>;
      render(<EmptyState action={<ActionButton />} />);
      expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
    });
  });

  // Children Override
  describe('Children Override', () => {
    it('should render children when provided', () => {
      render(
        <EmptyState title="This should not render">
          <div data-testid="custom-content">Custom empty state</div>
        </EmptyState>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('should not render default content when children provided', () => {
      render(
        <EmptyState title="Hidden Title" subTitle="Hidden Subtitle">
          <div>Custom content</div>
        </EmptyState>
      );
      expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
      expect(screen.queryByText('Hidden Subtitle')).not.toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      render(
        <EmptyState>
          <div>
            <h1>Custom Title</h1>
            <p>Custom description</p>
            <button>Custom action</button>
          </div>
        </EmptyState>
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom action' })).toBeInTheDocument();
    });
  });

  // Combined Props
  describe('Combined Props', () => {
    it('should render all default content props together', () => {
      const Icon = () => <svg data-testid="icon" />;
      const ActionButton = () => <button>Click me</button>;

      render(
        <EmptyState
          title="No items"
          subTitle="Get started by adding items"
          icon={<Icon />}
          action={<ActionButton />}
        />
      );

      expect(screen.getByText('No items')).toBeInTheDocument();
      expect(screen.getByText('Get started by adding items')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('should render with title and icon only', () => {
      const Icon = () => <svg data-testid="icon" />;
      render(<EmptyState title="Empty" icon={<Icon />} />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should render with title and action only', () => {
      render(<EmptyState title="Empty" action={<button>Action</button>} />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  // ReactNode Support
  describe('ReactNode Support', () => {
    it('should render title as ReactNode', () => {
      render(
        <EmptyState
          title={
            <span>
              No <strong>results</strong> found
            </span>
          }
        />
      );
      expect(screen.getByText('results')).toBeInTheDocument();
      expect(screen.getByText('results').tagName).toBe('STRONG');
    });

    it('should render subtitle as ReactNode', () => {
      render(
        <EmptyState
          subTitle={
            <div>
              <span>Try again or</span> <a href="#">contact support</a>
            </div>
          }
        />
      );
      expect(screen.getByText('Try again or')).toBeInTheDocument();
      expect(screen.getByText('contact support')).toBeInTheDocument();
    });

    it('should render action as ReactNode', () => {
      render(
        <EmptyState
          action={
            <div>
              <button>Primary</button>
              <button>Secondary</button>
            </div>
          }
        />
      );
      expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
    });
  });

  // Display Name
  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(EmptyState.displayName).toBe('EmptyState');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should render with empty string title', () => {
      render(<EmptyState title="" />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('');
    });

    it('should render with empty string subtitle', () => {
      const { container } = render(<EmptyState subTitle="" />);
      const subtitle = container.querySelector('.subTitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent('');
    });

    it('should handle null icon gracefully', () => {
      const { container } = render(<EmptyState icon={null} title="Test" />);
      expect(container).toBeInTheDocument();
    });

    it('should handle undefined props gracefully', () => {
      const { container } = render(
        <EmptyState title={undefined} subTitle={undefined} icon={undefined} action={undefined} />
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with only children (empty children)', () => {
      const { container } = render(<EmptyState>{null}</EmptyState>);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with numeric title', () => {
      render(<EmptyState title={0} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should render with boolean title (coerced to string)', () => {
      // React doesn't render booleans, but TypeScript allows ReactNode
      const { container } = render(<EmptyState title={false as any} />);
      expect(container).toBeInTheDocument();
    });
  });

  // Unused Props (Transient Props Pattern)
  describe('Unused Props Handling', () => {
    it('should accept className prop without errors', () => {
      const { container } = render(<EmptyState className="custom-class" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should accept wrapperClassName prop without errors', () => {
      const { container } = render(<EmptyState wrapperClassName="wrapper-class" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  // Semantic HTML
  describe('Semantic HTML', () => {
    it('should use h2 for title', () => {
      render(<EmptyState title="Title" />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveTextContent('Title');
    });

    it('should use h5 for subtitle', () => {
      const { container } = render(<EmptyState subTitle="Subtitle" />);
      const subtitle = container.querySelector('.subTitle');
      expect(subtitle?.tagName).toBe('H5');
      expect(subtitle).toHaveTextContent('Subtitle');
    });

    it('should use h5 for action container', () => {
      const { container } = render(<EmptyState action={<button>Action</button>} />);
      const actionContainer = container.querySelector('.action');
      expect(actionContainer?.tagName).toBe('H5');
      expect(actionContainer).toBeInTheDocument();
    });
  });

  // Common Use Cases
  describe('Common Use Cases', () => {
    it('should render "no search results" state', () => {
      const SearchIcon = () => <svg data-testid="search-icon" />;
      render(
        <EmptyState
          icon={<SearchIcon />}
          title="No results found"
          subTitle="Try adjusting your search terms"
          action={<button>Clear filters</button>}
        />
      );

      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search terms')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
    });

    it('should render "empty inbox" state', () => {
      render(
        <EmptyState
          title="Your inbox is empty"
          subTitle="When you receive messages, they will appear here"
        />
      );

      expect(screen.getByText('Your inbox is empty')).toBeInTheDocument();
      expect(
        screen.getByText('When you receive messages, they will appear here')
      ).toBeInTheDocument();
    });

    it('should render "get started" state with custom content', () => {
      render(
        <EmptyState>
          <div data-testid="onboarding">
            <h1>Welcome!</h1>
            <p>Let&apos;s get you started</p>
            <button>Create your first item</button>
          </div>
        </EmptyState>
      );

      expect(screen.getByTestId('onboarding')).toBeInTheDocument();
      expect(screen.getByText('Welcome!')).toBeInTheDocument();
    });
  });
});
