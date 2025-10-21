import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorState } from '../components/ErrorState';

describe('ErrorState', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('should render with default structure', () => {
      const { container } = render(<ErrorState />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with title', () => {
      render(<ErrorState title="An error occurred" />);
      expect(screen.getByText('An error occurred')).toBeInTheDocument();
      expect(screen.getByText('An error occurred').tagName).toBe('H2');
    });

    it('should render with subtitle', () => {
      render(<ErrorState subTitle="Please try again later" />);
      expect(screen.getByText('Please try again later')).toBeInTheDocument();
      expect(screen.getByText('Please try again later').tagName).toBe('H5');
    });

    it('should render with icon', () => {
      const Icon = () => <svg data-testid="error-icon" />;
      render(<ErrorState icon={<Icon />} />);
      expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    });

    it('should render with action', () => {
      const ActionButton = () => <button>Try Again</button>;
      render(<ErrorState action={<ActionButton />} />);
      expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
    });
  });

  // Children Override
  describe('Children Override', () => {
    it('should render children when provided', () => {
      render(
        <ErrorState title="This should not render">
          <div data-testid="custom-error">Custom error content</div>
        </ErrorState>
      );
      expect(screen.getByTestId('custom-error')).toBeInTheDocument();
    });

    it('should not render default content when children provided', () => {
      render(
        <ErrorState title="Hidden Title" subTitle="Hidden Subtitle">
          <div>Custom content</div>
        </ErrorState>
      );
      expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
      expect(screen.queryByText('Hidden Subtitle')).not.toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      render(
        <ErrorState>
          <div>
            <h1>Fatal Error</h1>
            <p>Something went wrong</p>
            <button>Report Issue</button>
          </div>
        </ErrorState>
      );
      expect(screen.getByText('Fatal Error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Report Issue' })).toBeInTheDocument();
    });
  });

  // Combined Props
  describe('Combined Props', () => {
    it('should render all default content props together', () => {
      const Icon = () => <svg data-testid="icon" />;
      const ActionButton = () => <button>Retry</button>;

      render(
        <ErrorState
          title="Error loading data"
          subTitle="Unable to fetch the requested information"
          icon={<Icon />}
          action={<ActionButton />}
        />
      );

      expect(screen.getByText('Error loading data')).toBeInTheDocument();
      expect(screen.getByText('Unable to fetch the requested information')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('should render with title and icon only', () => {
      const Icon = () => <svg data-testid="icon" />;
      render(<ErrorState title="Error" icon={<Icon />} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should render with title and action only', () => {
      render(<ErrorState title="Error" action={<button>Action</button>} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  // ReactNode Support
  describe('ReactNode Support', () => {
    it('should render title as ReactNode', () => {
      render(
        <ErrorState
          title={
            <span>
              Error: <strong>404</strong>
            </span>
          }
        />
      );
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByText('404').tagName).toBe('STRONG');
    });

    it('should render subtitle as ReactNode', () => {
      render(
        <ErrorState
          subTitle={
            <div>
              <span>Please</span> <a href="#">contact support</a>
            </div>
          }
        />
      );
      expect(screen.getByText('Please')).toBeInTheDocument();
      expect(screen.getByText('contact support')).toBeInTheDocument();
    });

    it('should render action as ReactNode', () => {
      render(
        <ErrorState
          action={
            <div>
              <button>Retry</button>
              <button>Go Home</button>
            </div>
          }
        />
      );
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go Home' })).toBeInTheDocument();
    });
  });

  // Display Name
  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(ErrorState.displayName).toBe('ErrorState');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should render with empty string title', () => {
      render(<ErrorState title="" />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('');
    });

    it('should render with empty string subtitle', () => {
      const { container } = render(<ErrorState subTitle="" />);
      const subtitle = container.querySelector('.subTitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent('');
    });

    it('should handle null icon gracefully', () => {
      const { container } = render(<ErrorState icon={null} title="Test" />);
      expect(container).toBeInTheDocument();
    });

    it('should handle undefined props gracefully', () => {
      const { container } = render(
        <ErrorState title={undefined} subTitle={undefined} icon={undefined} action={undefined} />
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with only children (empty children)', () => {
      const { container } = render(<ErrorState>{null}</ErrorState>);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with numeric title', () => {
      render(<ErrorState title={404} />);
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('should render with boolean title (coerced to string)', () => {
      // React doesn't render booleans, but TypeScript allows ReactNode
      const { container } = render(<ErrorState title={false as any} />);
      expect(container).toBeInTheDocument();
    });
  });

  // Unused Props (Transient Props Pattern)
  describe('Unused Props Handling', () => {
    it('should accept className prop without errors', () => {
      const { container } = render(<ErrorState className="custom-class" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should accept wrapperClassName prop without errors', () => {
      const { container } = render(<ErrorState wrapperClassName="wrapper-class" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  // Semantic HTML
  describe('Semantic HTML', () => {
    it('should use h2 for title', () => {
      render(<ErrorState title="Error Title" />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveTextContent('Error Title');
    });

    it('should use h5 for subtitle', () => {
      const { container } = render(<ErrorState subTitle="Error Subtitle" />);
      const subtitle = container.querySelector('.subTitle');
      expect(subtitle?.tagName).toBe('H5');
      expect(subtitle).toHaveTextContent('Error Subtitle');
    });

    it('should use h5 for action container', () => {
      const { container } = render(<ErrorState action={<button>Action</button>} />);
      const actionContainer = container.querySelector('.action');
      expect(actionContainer?.tagName).toBe('H5');
      expect(actionContainer).toBeInTheDocument();
    });
  });

  // Common Use Cases
  describe('Common Use Cases', () => {
    it('should render "404 not found" error state', () => {
      const ErrorIcon = () => <svg data-testid="404-icon" />;
      render(
        <ErrorState
          icon={<ErrorIcon />}
          title="404 - Page Not Found"
          subTitle="The page you're looking for doesn't exist"
          action={<button>Go to Homepage</button>}
        />
      );

      expect(screen.getByTestId('404-icon')).toBeInTheDocument();
      expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
      expect(screen.getByText("The page you're looking for doesn't exist")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to Homepage' })).toBeInTheDocument();
    });

    it('should render "network error" state', () => {
      render(
        <ErrorState
          title="Network Error"
          subTitle="Unable to connect to the server. Please check your internet connection."
          action={<button>Retry</button>}
        />
      );

      expect(screen.getByText('Network Error')).toBeInTheDocument();
      expect(
        screen.getByText('Unable to connect to the server. Please check your internet connection.')
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('should render "custom error" state with custom content', () => {
      render(
        <ErrorState>
          <div data-testid="custom-error">
            <h1>Something went wrong</h1>
            <p>We&apos;re sorry, but an unexpected error occurred</p>
            <button>Report this issue</button>
          </div>
        </ErrorState>
      );

      expect(screen.getByTestId('custom-error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText("We're sorry, but an unexpected error occurred")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Report this issue' })).toBeInTheDocument();
    });
  });
});
