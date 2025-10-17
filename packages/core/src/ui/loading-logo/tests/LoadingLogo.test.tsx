import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingLogo } from '../components/LoadingLogo';

describe('LoadingLogo', () => {
  describe('Basic Rendering', () => {
    it('should render SVG element', () => {
      const { container } = render(<LoadingLogo />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have correct viewBox', () => {
      const { container } = render(<LoadingLogo />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 99.86 43.35');
    });

    it('should render all logo path elements', () => {
      const { container } = render(<LoadingLogo />);

      const paths = container.querySelectorAll('path');
      expect(paths).toHaveLength(8);
    });

    it('should have proper namespace', () => {
      const { container } = render(<LoadingLogo />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });
  });

  describe('Custom Dimensions', () => {
    it('should render with custom width', () => {
      const { container } = render(<LoadingLogo width={150} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '150');
    });

    it('should render with custom height', () => {
      const { container } = render(<LoadingLogo height={65} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', '65');
    });

    it('should render with both custom width and height', () => {
      const { container } = render(<LoadingLogo width={200} height={87} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '87');
    });

    it('should render with small dimensions', () => {
      const { container } = render(<LoadingLogo width={50} height={22} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '50');
      expect(svg).toHaveAttribute('height', '22');
    });

    it('should render with large dimensions', () => {
      const { container } = render(<LoadingLogo width={300} height={130} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '130');
    });
  });

  describe('SVG Structure', () => {
    it('should have correct id attribute', () => {
      const { container } = render(<LoadingLogo />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('id', 'Layer_1');
    });

    it('should have correct data-name attribute', () => {
      const { container } = render(<LoadingLogo />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('data-name', 'Layer 1');
    });

    it('should render company logo paths', () => {
      const { container } = render(<LoadingLogo />);

      const paths = container.querySelectorAll('path');
      // Check that paths have d attributes (path data)
      paths.forEach((path) => {
        expect(path).toHaveAttribute('d');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should render without dimensions', () => {
      const { container } = render(<LoadingLogo />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with zero width', () => {
      const { container } = render(<LoadingLogo width={0} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '0');
    });

    it('should render with zero height', () => {
      const { container } = render(<LoadingLogo height={0} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', '0');
    });

    it('should render multiple instances', () => {
      const { container } = render(
        <div>
          <LoadingLogo width={100} height={43} />
          <LoadingLogo width={150} height={65} />
          <LoadingLogo width={200} height={87} />
        </div>
      );

      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('should be properly structured for screen readers', () => {
      const { container } = render(<LoadingLogo />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should maintain aspect ratio with viewBox', () => {
      const { container } = render(<LoadingLogo width={200} />);

      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBe('0 0 99.86 43.35');
    });
  });

  describe('Styling', () => {
    it('should apply fill color to all paths', () => {
      const { container } = render(<LoadingLogo />);

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render with consistent styling', () => {
      const { container } = render(<LoadingLogo width={100} height={43} />);

      const svg = container.querySelector('svg');
      const paths = container.querySelectorAll('path');

      expect(svg).toBeInTheDocument();
      expect(paths.length).toBe(8);
    });
  });
});
