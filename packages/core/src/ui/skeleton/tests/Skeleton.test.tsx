import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkeletonBodyText } from '../components/SkeletonBodyText';
import { SkeletonDisplayText } from '../components/SkeletonDisplayText';

describe('Skeleton', () => {
  describe('SkeletonBodyText', () => {
    describe('Basic Rendering', () => {
      it('renders default 3 rows', () => {
        const { container } = render(<SkeletonBodyText />);
        const wrapper = container.firstChild as HTMLElement;
        const rows = wrapper?.children;
        expect(rows).toHaveLength(3);
      });

      it('renders custom number of rows', () => {
        const { container } = render(<SkeletonBodyText rows={5} />);
        const wrapper = container.firstChild as HTMLElement;
        const rows = wrapper?.children;
        expect(rows).toHaveLength(5);
      });

      it('renders single row', () => {
        const { container } = render(<SkeletonBodyText rows={1} />);
        const wrapper = container.firstChild as HTMLElement;
        const rows = wrapper?.children;
        expect(rows).toHaveLength(1);
      });

      it('renders zero rows', () => {
        const { container } = render(<SkeletonBodyText rows={0} />);
        const wrapper = container.firstChild as HTMLElement;
        const rows = wrapper?.children;
        expect(rows).toHaveLength(0);
      });
    });

    describe('Animation Prop', () => {
      it('renders without animation by default', () => {
        const { container } = render(<SkeletonBodyText />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('renders with animation enabled', () => {
        const { container } = render(<SkeletonBodyText hasAnimation />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('renders with animation disabled explicitly', () => {
        const { container } = render(<SkeletonBodyText hasAnimation={false} />);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    describe('Edge Cases', () => {
      it('handles very large number of rows', () => {
        const { container } = render(<SkeletonBodyText rows={100} />);
        const wrapper = container.firstChild as HTMLElement;
        const rows = wrapper?.children;
        expect(rows).toHaveLength(100);
      });

      it('handles rows prop change', () => {
        const { container, rerender } = render(<SkeletonBodyText rows={3} />);
        let wrapper = container.firstChild as HTMLElement;
        let rows = wrapper?.children;
        expect(rows).toHaveLength(3);

        rerender(<SkeletonBodyText rows={7} />);
        wrapper = container.firstChild as HTMLElement;
        rows = wrapper?.children;
        expect(rows).toHaveLength(7);
      });
    });
  });

  describe('SkeletonDisplayText', () => {
    describe('Basic Rendering', () => {
      it('renders without props', () => {
        const { container } = render(<SkeletonDisplayText />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toBeInTheDocument();
      });

      it('renders with custom width', () => {
        const { container } = render(<SkeletonDisplayText width="200px" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ width: '200px' });
      });

      it('renders with custom height', () => {
        const { container } = render(<SkeletonDisplayText height="50px" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ height: '50px' });
      });

      it('renders with custom width and height', () => {
        const { container } = render(<SkeletonDisplayText width="300px" height="80px" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ width: '300px', height: '80px' });
      });
    });

    describe('Width Variations', () => {
      it('handles percentage width', () => {
        const { container } = render(<SkeletonDisplayText width="50%" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ width: '50%' });
      });

      it('handles pixel width', () => {
        const { container } = render(<SkeletonDisplayText width="150px" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ width: '150px' });
      });

      it('handles em width', () => {
        const { container } = render(<SkeletonDisplayText width="10em" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ width: '10em' });
      });
    });

    describe('Height Variations', () => {
      it('handles pixel height', () => {
        const { container } = render(<SkeletonDisplayText height="100px" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ height: '100px' });
      });

      it('handles rem height', () => {
        const { container } = render(<SkeletonDisplayText height="3rem" />);
        const skeleton = container.querySelector('div');
        expect(skeleton).toHaveStyle({ height: '3rem' });
      });
    });

    describe('Animation Prop', () => {
      it('renders without animation by default', () => {
        const { container } = render(<SkeletonDisplayText />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('renders with animation enabled', () => {
        const { container } = render(<SkeletonDisplayText hasAnimation />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('renders with animation disabled explicitly', () => {
        const { container } = render(<SkeletonDisplayText hasAnimation={false} />);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    describe('Combined Props', () => {
      it('handles all props together', () => {
        const { container } = render(
          <SkeletonDisplayText width="250px" height="60px" hasAnimation />
        );
        const skeleton = container.querySelector('div');
        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveStyle({ width: '250px', height: '60px' });
      });
    });
  });

  describe('Multiple Skeletons', () => {
    it('renders multiple SkeletonBodyText components', () => {
      const { container } = render(
        <div>
          <SkeletonBodyText rows={2} />
          <SkeletonBodyText rows={3} />
        </div>
      );
      const skeletons = container.querySelectorAll('div > div > div');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders multiple SkeletonDisplayText components', () => {
      const { container } = render(
        <div>
          <SkeletonDisplayText width="100px" />
          <SkeletonDisplayText width="200px" />
          <SkeletonDisplayText width="150px" />
        </div>
      );
      const wrapper = container.firstChild as HTMLElement;
      const skeletons = wrapper?.children;
      expect(skeletons).toHaveLength(3);
    });

    it('renders mixed skeleton types', () => {
      const { container } = render(
        <div>
          <SkeletonDisplayText width="200px" height="40px" />
          <SkeletonBodyText rows={4} />
          <SkeletonDisplayText width="100px" />
        </div>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
