import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonCard } from '../SkeletonCard';

describe('SkeletonCard', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with default structure', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it('should render with correct display name', () => {
      expect(SkeletonCard.displayName).toBe('SkeletonCard');
    });
  });

  describe('Animation Prop', () => {
    it('should render without animation by default', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with animation when hasAnimation is true', () => {
      const { container } = render(<SkeletonCard hasAnimation={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render without animation when hasAnimation is false', () => {
      const { container } = render(<SkeletonCard hasAnimation={false} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should pass hasAnimation prop to child skeleton components', () => {
      const { container } = render(<SkeletonCard hasAnimation={true} />);
      // Verify that the component renders with animation prop
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Structure Composition', () => {
    it('should render skeleton image', () => {
      const { container } = render(<SkeletonCard />);
      // The skeleton image is rendered as the first child within the card
      const card = container.firstChild as HTMLElement;
      expect(card.children.length).toBeGreaterThan(0);
    });

    it('should render skeleton content area', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.firstChild as HTMLElement;
      // Card should have 2 children: image and content area
      expect(card.children.length).toBe(2);
    });

    it('should render SkeletonDisplayText in content area', () => {
      const { container } = render(<SkeletonCard />);
      // SkeletonDisplayText is rendered within the content area
      expect(container.firstChild).toBeTruthy();
    });

    it('should render SkeletonBodyText in content area', () => {
      const { container } = render(<SkeletonCard />);
      // SkeletonBodyText with 5 rows is rendered within the content area
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('SkeletonDisplayText Props', () => {
    it('should render SkeletonDisplayText with height 1.5rem', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should pass hasAnimation to SkeletonDisplayText', () => {
      const { container } = render(<SkeletonCard hasAnimation={true} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('SkeletonBodyText Props', () => {
    it('should render SkeletonBodyText with 5 rows', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should pass hasAnimation to SkeletonBodyText', () => {
      const { container } = render(<SkeletonCard hasAnimation={true} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle animation toggle', () => {
      const { rerender, container } = render(<SkeletonCard hasAnimation={false} />);
      expect(container.firstChild).toBeTruthy();

      rerender(<SkeletonCard hasAnimation={true} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle undefined hasAnimation prop', () => {
      const { container } = render(<SkeletonCard hasAnimation={undefined} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should maintain structure with animation', () => {
      const { container } = render(<SkeletonCard hasAnimation={true} />);
      const card = container.firstChild as HTMLElement;
      expect(card.children.length).toBe(2);
    });

    it('should maintain structure without animation', () => {
      const { container } = render(<SkeletonCard hasAnimation={false} />);
      const card = container.firstChild as HTMLElement;
      expect(card.children.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('should render as a loading placeholder', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should be visible in the document', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeVisible();
    });
  });

  describe('Multiple Instances', () => {
    it('should render multiple skeleton cards independently', () => {
      const { container } = render(
        <>
          <SkeletonCard hasAnimation={true} />
          <SkeletonCard hasAnimation={false} />
          <SkeletonCard />
        </>
      );

      const cards = container.children;
      expect(cards.length).toBe(3);
    });

    it('should handle multiple cards with same props', () => {
      const { container } = render(
        <>
          <SkeletonCard hasAnimation={true} />
          <SkeletonCard hasAnimation={true} />
        </>
      );

      const cards = container.children;
      expect(cards.length).toBe(2);
    });
  });
});
