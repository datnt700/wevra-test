import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from '../components/Icon';
import { Check, AlertCircle, XCircle } from 'lucide-react';

describe('Icon', () => {
  describe('Basic Rendering', () => {
    it('should render with React element source', () => {
      const { container } = render(<Icon source={<Check data-testid="check-icon" />} />);

      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with SVG string source', () => {
      const svgString = '<svg><circle cx="12" cy="12" r="10" /></svg>';
      const { container } = render(<Icon source={svgString} />);

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
    });

    it('should render with different icon components', () => {
      const { container } = render(<Icon source={<AlertCircle />} />);

      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Variant Styles', () => {
    it('should render with inherit variant (default)', () => {
      const { container } = render(<Icon source={<Check />} variant="inherit" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with primary variant', () => {
      const { container } = render(<Icon source={<Check />} variant="primary" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with info variant', () => {
      const { container } = render(<Icon source={<AlertCircle />} variant="info" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with success variant', () => {
      const { container } = render(<Icon source={<Check />} variant="success" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with warning variant', () => {
      const { container } = render(<Icon source={<AlertCircle />} variant="warning" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with danger variant', () => {
      const { container } = render(<Icon source={<XCircle />} variant="danger" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with caution variant', () => {
      const { container } = render(<Icon source={<AlertCircle />} variant="caution" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with base variant', () => {
      const { container } = render(<Icon source={<Check />} variant="base" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should pass custom className', () => {
      const { container } = render(<Icon source={<Check />} className="custom-icon" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-icon');
    });

    it('should pass other props to wrapper', () => {
      const { container } = render(<Icon source={<Check />} data-testid="icon-wrapper" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'icon-wrapper');
    });

    it('should support style prop', () => {
      const { container } = render(<Icon source={<Check />} style={{ fontSize: '2rem' }} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ fontSize: '2rem' });
    });
  });

  describe('Icon Sources', () => {
    it('should handle complex SVG elements', () => {
      const ComplexIcon = () => (
        <svg width="24" height="24">
          <path d="M12 2L2 7v10l10 5 10-5V7z" data-testid="complex-path" />
        </svg>
      );

      render(<Icon source={<ComplexIcon />} />);

      expect(screen.getByTestId('complex-path')).toBeInTheDocument();
    });

    it('should handle Lucide icons with custom size', () => {
      const { container } = render(<Icon source={<Check size={32} />} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');
    });

    it('should render SVG string with proper data URI', () => {
      const svgString = '<svg width="20" height="20"><rect width="20" height="20" /></svg>';
      const { container } = render(<Icon source={svgString} />);

      const img = container.querySelector('img');
      expect(img?.getAttribute('src')).toContain('data:image/svg+xml;utf8,');
      expect(img?.getAttribute('src')).toContain('<svg');
    });
  });

  describe('Edge Cases', () => {
    it('should render without variant', () => {
      const { container } = render(<Icon source={<Check />} />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle empty SVG string', () => {
      const { container } = render(<Icon source="" />);

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
    });

    it('should render with multiple icons at once', () => {
      const { container } = render(
        <div>
          <Icon source={<Check />} variant="success" />
          <Icon source={<XCircle />} variant="danger" />
          <Icon source={<AlertCircle />} variant="warning" />
        </div>
      );

      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('should have empty alt text for decorative SVG strings', () => {
      const svgString = '<svg><circle /></svg>';
      const { container } = render(<Icon source={svgString} />);

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', '');
    });

    it('should be accessible to screen readers', () => {
      const { container } = render(<Icon source={<Check />} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
