import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Breadcrumb } from '../components/Breadcrumb';

describe('Breadcrumb', () => {
  describe('Basic Rendering', () => {
    it('renders breadcrumb items', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category' },
          ]}
        />
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
    });

    it('renders as nav element', () => {
      const { container } = render(<Breadcrumb items={[{ label: 'Home' }]} />);
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('renders single item', () => {
      render(<Breadcrumb items={[{ label: 'Single' }]} />);
      expect(screen.getByText('Single')).toBeInTheDocument();
    });

    it('renders empty items array', () => {
      const { container } = render(<Breadcrumb items={[]} />);
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav?.children).toHaveLength(0);
    });
  });

  describe('Links', () => {
    it('renders links for items with href (except last)', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Current' },
          ]}
        />
      );

      const homeLink = screen.getByRole('link', { name: 'Home' });
      const productsLink = screen.getByRole('link', { name: 'Products' });

      expect(homeLink).toHaveAttribute('href', '/');
      expect(productsLink).toHaveAttribute('href', '/products');
      expect(screen.queryByRole('link', { name: 'Current' })).not.toBeInTheDocument();
    });

    it('does not render last item as link even with href', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Current', href: '/current' },
          ]}
        />
      );

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Current' })).not.toBeInTheDocument();
    });

    it('renders spans for items without href', () => {
      render(<Breadcrumb items={[{ label: 'First' }, { label: 'Second' }]} />);

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });

  describe('Separators', () => {
    it('renders separators between items', () => {
      render(<Breadcrumb items={[{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]} />);

      // Separators contain "/" text
      const separators = screen.getAllByText('/');
      expect(separators).toHaveLength(2);
    });

    it('does not render separator after last item', () => {
      render(<Breadcrumb items={[{ label: 'First' }, { label: 'Last' }]} />);

      const separators = screen.getAllByText('/');
      expect(separators).toHaveLength(1);
    });

    it('renders no separator for single item', () => {
      render(<Breadcrumb items={[{ label: 'Only' }]} />);

      expect(screen.queryByText('/')).not.toBeInTheDocument();
    });
  });

  describe('Last Item Styling', () => {
    it('renders last item without link', () => {
      render(<Breadcrumb items={[{ label: 'First' }, { label: 'Last' }]} />);

      expect(screen.getByText('Last')).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Last' })).not.toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('handles many breadcrumb items', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Category', href: '/category' },
            { label: 'Subcategory', href: '/subcategory' },
            { label: 'Product', href: '/product' },
            { label: 'Details' },
          ]}
        />
      );

      expect(screen.getAllByRole('link')).toHaveLength(4);
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    it('handles mixed href and no-href items', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'No Link' },
            { label: 'Products', href: '/products' },
            { label: 'Current' },
          ]}
        />
      );

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'No Link' })).not.toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Current' })).not.toBeInTheDocument();
    });

    it('handles special characters in labels', () => {
      render(
        <Breadcrumb
          items={[{ label: 'Home & Garden', href: '/' }, { label: 'Tools & Equipment' }]}
        />
      );

      expect(screen.getByText('Home & Garden')).toBeInTheDocument();
      expect(screen.getByText('Tools & Equipment')).toBeInTheDocument();
    });

    it('handles very long label text', () => {
      const longLabel = 'A'.repeat(100);
      render(<Breadcrumb items={[{ label: longLabel }]} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      render(<Breadcrumb items={[{ label: '' }]} />);
      const { container } = render(<Breadcrumb items={[{ label: '' }]} />);
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('handles items with same labels', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/home1' },
            { label: 'Home', href: '/home2' },
            { label: 'Home' },
          ]}
        />
      );

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
    });
  });
});
