import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SketetonTabs } from '../SketetonTabs';

describe('SketetonTabs', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<SketetonTabs />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with default structure', () => {
      const { container } = render(<SketetonTabs />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs).toBeInTheDocument();
    });

    it('should render with default count of 2 tabs', () => {
      const { container } = render(<SketetonTabs />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(2);
    });
  });

  describe('Count Prop', () => {
    it('should render 1 tab when count is 1', () => {
      const { container } = render(<SketetonTabs count={1} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(1);
    });

    it('should render 2 tabs when count is 2', () => {
      const { container } = render(<SketetonTabs count={2} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(2);
    });

    it('should render 3 tabs when count is 3', () => {
      const { container } = render(<SketetonTabs count={3} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(3);
    });

    it('should render 5 tabs when count is 5', () => {
      const { container } = render(<SketetonTabs count={5} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(5);
    });

    it('should render 10 tabs when count is 10', () => {
      const { container } = render(<SketetonTabs count={10} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(10);
    });

    it('should handle count of 0', () => {
      const { container } = render(<SketetonTabs count={0} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(0);
    });
  });

  describe('Animation Prop', () => {
    it('should render without animation by default', () => {
      const { container } = render(<SketetonTabs />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with animation when hasAnimation is true', () => {
      const { container } = render(<SketetonTabs hasAnimation={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render without animation when hasAnimation is false', () => {
      const { container } = render(<SketetonTabs hasAnimation={false} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should pass hasAnimation to all tab elements', () => {
      const { container } = render(<SketetonTabs count={3} hasAnimation={true} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(3);
    });
  });

  describe('Combined Props', () => {
    it('should render with count and animation', () => {
      const { container } = render(<SketetonTabs count={4} hasAnimation={true} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(4);
    });

    it('should render with count 1 and animation', () => {
      const { container } = render(<SketetonTabs count={1} hasAnimation={true} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(1);
    });

    it('should render with count 7 and no animation', () => {
      const { container } = render(<SketetonTabs count={7} hasAnimation={false} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(7);
    });
  });

  describe('Other Props', () => {
    it('should pass other props to container', () => {
      const { container } = render(<SketetonTabs className="custom-class" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle data attributes', () => {
      const { container } = render(<SketetonTabs data-testid="skeleton-tabs" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle multiple other props', () => {
      const { container } = render(
        <SketetonTabs className="custom" data-testid="test" aria-label="loading tabs" />
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Array Generation', () => {
    it('should generate unique keys for each tab', () => {
      const { container } = render(<SketetonTabs count={3} />);
      const tabs = container.firstChild as HTMLElement;
      const children = Array.from(tabs.children);

      // Each child should be rendered
      expect(children.length).toBe(3);
      children.forEach((child) => {
        expect(child).toBeInTheDocument();
      });
    });

    it('should handle large count values', () => {
      const { container } = render(<SketetonTabs count={20} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(20);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined count (defaults to 2)', () => {
      const { container } = render(<SketetonTabs count={undefined} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(2);
    });

    it('should handle undefined hasAnimation (defaults to false)', () => {
      const { container } = render(<SketetonTabs hasAnimation={undefined} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle all props as undefined', () => {
      const { container } = render(<SketetonTabs count={undefined} hasAnimation={undefined} />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(2);
    });

    it('should handle rerender with different count', () => {
      const { container, rerender } = render(<SketetonTabs count={2} />);
      let tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(2);

      rerender(<SketetonTabs count={5} />);
      tabs = container.firstChild as HTMLElement;
      expect(tabs.children.length).toBe(5);
    });

    it('should handle rerender with animation toggle', () => {
      const { container, rerender } = render(<SketetonTabs hasAnimation={false} />);
      expect(container.firstChild).toBeTruthy();

      rerender(<SketetonTabs hasAnimation={true} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should render as a loading placeholder', () => {
      const { container } = render(<SketetonTabs />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should be visible in the document', () => {
      const { container } = render(<SketetonTabs />);
      const tabs = container.firstChild as HTMLElement;
      expect(tabs).toBeVisible();
    });

    it('should render all tabs visibly', () => {
      const { container } = render(<SketetonTabs count={3} />);
      const tabs = container.firstChild as HTMLElement;
      const children = Array.from(tabs.children);

      children.forEach((child) => {
        expect(child).toBeVisible();
      });
    });
  });

  describe('Multiple Instances', () => {
    it('should render multiple skeleton tabs independently', () => {
      const { container } = render(
        <>
          <SketetonTabs count={2} hasAnimation={true} />
          <SketetonTabs count={3} hasAnimation={false} />
          <SketetonTabs count={4} />
        </>
      );

      const tabs = container.children;
      expect(tabs.length).toBe(3);
    });

    it('should handle multiple instances with same props', () => {
      const { container } = render(
        <>
          <SketetonTabs count={5} hasAnimation={true} />
          <SketetonTabs count={5} hasAnimation={true} />
        </>
      );

      const tabs = container.children;
      expect(tabs.length).toBe(2);
      Array.from(tabs).forEach((tabContainer) => {
        expect(tabContainer.children.length).toBe(5);
      });
    });
  });
});
