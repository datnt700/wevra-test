import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingState } from '../components/LoadingState';

describe('LoadingState', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('should render with default structure', () => {
      const { container } = render(<LoadingState />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render spinner by default', () => {
      const { container } = render(<LoadingState />);
      const spinner = container.querySelector('.icon');
      expect(spinner).toBeInTheDocument();
    });

    it('should render with title', () => {
      render(<LoadingState title="Loading data..." />);
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
      expect(screen.getByText('Loading data...').tagName).toBe('H2');
    });

    it('should render with subtitle', () => {
      render(<LoadingState subTitle="Please wait" />);
      expect(screen.getByText('Please wait')).toBeInTheDocument();
      expect(screen.getByText('Please wait').tagName).toBe('H5');
    });

    it('should render with both title and subtitle', () => {
      render(<LoadingState title="Loading..." subTitle="This may take a moment" />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('This may take a moment')).toBeInTheDocument();
    });
  });

  // Children Override
  describe('Children Override', () => {
    it('should render children when provided', () => {
      render(
        <LoadingState title="This should not render">
          <div data-testid="custom-loading">Custom loading content</div>
        </LoadingState>
      );
      expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
    });

    it('should not render default content when children provided', () => {
      render(
        <LoadingState title="Hidden Title" subTitle="Hidden Subtitle">
          <div>Custom content</div>
        </LoadingState>
      );
      expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
      expect(screen.queryByText('Hidden Subtitle')).not.toBeInTheDocument();
    });

    it('should not render spinner when children provided', () => {
      const { container } = render(
        <LoadingState>
          <div>Custom loading</div>
        </LoadingState>
      );
      const spinner = container.querySelector('.icon');
      expect(spinner).not.toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      render(
        <LoadingState>
          <div>
            <h1>Custom Loading</h1>
            <p>Processing your request</p>
            <div data-testid="custom-spinner">Custom Spinner</div>
          </div>
        </LoadingState>
      );
      expect(screen.getByText('Custom Loading')).toBeInTheDocument();
      expect(screen.getByText('Processing your request')).toBeInTheDocument();
      expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
    });
  });

  // Combined Props
  describe('Combined Props', () => {
    it('should render spinner with title and subtitle', () => {
      const { container } = render(<LoadingState title="Loading data" subTitle="Please wait..." />);

      const spinner = container.querySelector('.icon');
      expect(spinner).toBeInTheDocument();
      expect(screen.getByText('Loading data')).toBeInTheDocument();
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('should render with title only', () => {
      const { container } = render(<LoadingState title="Loading..." />);
      const spinner = container.querySelector('.icon');
      expect(spinner).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render with subtitle only', () => {
      const { container } = render(<LoadingState subTitle="Processing..." />);
      const spinner = container.querySelector('.icon');
      expect(spinner).toBeInTheDocument();
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });
  });

  // ReactNode Support
  describe('ReactNode Support', () => {
    it('should render title as ReactNode', () => {
      render(
        <LoadingState
          title={
            <span>
              Loading <strong>important</strong> data
            </span>
          }
        />
      );
      expect(screen.getByText('important')).toBeInTheDocument();
      expect(screen.getByText('important').tagName).toBe('STRONG');
    });

    it('should render subtitle as ReactNode', () => {
      render(
        <LoadingState
          subTitle={
            <div>
              <span>Please wait</span> <em>patiently</em>
            </div>
          }
        />
      );
      expect(screen.getByText('Please wait')).toBeInTheDocument();
      expect(screen.getByText('patiently')).toBeInTheDocument();
    });

    it('should render both title and subtitle as ReactNode', () => {
      render(
        <LoadingState
          title={
            <div>
              <strong>Loading</strong>
            </div>
          }
          subTitle={
            <div>
              <em>Processing...</em>
            </div>
          }
        />
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });
  });

  // Display Name
  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(LoadingState.displayName).toBe('LoadingState');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should render with empty string title', () => {
      render(<LoadingState title="" />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('');
    });

    it('should render with empty string subtitle', () => {
      const { container } = render(<LoadingState subTitle="" />);
      const subtitle = container.querySelector('.subTitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent('');
    });

    it('should handle undefined props gracefully', () => {
      const { container } = render(<LoadingState title={undefined} subTitle={undefined} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with only children (empty children)', () => {
      const { container } = render(<LoadingState>{null}</LoadingState>);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with numeric title', () => {
      render(<LoadingState title={100} />);
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('should render with boolean title (coerced to string)', () => {
      // React doesn't render booleans, but TypeScript allows ReactNode
      const { container } = render(<LoadingState title={false as any} />);
      expect(container).toBeInTheDocument();
    });
  });

  // Unused Props (Transient Props Pattern)
  describe('Unused Props Handling', () => {
    it('should accept className prop without errors', () => {
      const { container } = render(<LoadingState className="custom-class" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should accept wrapperClassName prop without errors', () => {
      const { container } = render(<LoadingState wrapperClassName="wrapper-class" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should accept unused props from type definition', () => {
      const { container } = render(
        <LoadingState
          image={<img src="loading.gif" alt="loading" />}
          largeImage="large-loading.gif"
          fullWidth="100%"
          footerContent={<div>Footer</div>}
          size="md"
        />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  // Semantic HTML
  describe('Semantic HTML', () => {
    it('should use h2 for title', () => {
      render(<LoadingState title="Loading Title" />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveTextContent('Loading Title');
    });

    it('should use h5 for subtitle', () => {
      const { container } = render(<LoadingState subTitle="Loading Subtitle" />);
      const subtitle = container.querySelector('.subTitle');
      expect(subtitle?.tagName).toBe('H5');
      expect(subtitle).toHaveTextContent('Loading Subtitle');
    });
  });

  // Common Use Cases
  describe('Common Use Cases', () => {
    it('should render "fetching data" loading state', () => {
      const { container } = render(
        <LoadingState title="Fetching data..." subTitle="This may take a few seconds" />
      );

      const spinner = container.querySelector('.icon');
      expect(spinner).toBeInTheDocument();
      expect(screen.getByText('Fetching data...')).toBeInTheDocument();
      expect(screen.getByText('This may take a few seconds')).toBeInTheDocument();
    });

    it('should render "processing" loading state', () => {
      render(
        <LoadingState title="Processing your request" subTitle="Please do not close this window" />
      );

      expect(screen.getByText('Processing your request')).toBeInTheDocument();
      expect(screen.getByText('Please do not close this window')).toBeInTheDocument();
    });

    it('should render "custom loading" state with custom content', () => {
      render(
        <LoadingState>
          <div data-testid="custom-loader">
            <h1>Loading Application</h1>
            <p>Initializing components...</p>
            <div>Custom progress bar</div>
          </div>
        </LoadingState>
      );

      expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
      expect(screen.getByText('Loading Application')).toBeInTheDocument();
      expect(screen.getByText('Initializing components...')).toBeInTheDocument();
    });

    it('should render minimal loading state with spinner only', () => {
      const { container } = render(<LoadingState />);
      const spinner = container.querySelector('.icon');
      expect(spinner).toBeInTheDocument();
    });
  });
});
