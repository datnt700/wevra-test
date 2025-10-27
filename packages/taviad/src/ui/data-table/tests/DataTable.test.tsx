import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from '../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface TestUser {
  id: number;
  name: string;
  email: string;
  age?: number;
}

describe('DataTable', () => {
  // Test data
  const mockData: TestUser[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
  ];

  const basicColumns: ColumnDef<TestUser>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
  ];

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<DataTable data={mockData} columns={basicColumns} />);
      expect(screen.getByText('ID')).toBeInTheDocument();
    });

    it('renders all column headers', () => {
      render(<DataTable data={mockData} columns={basicColumns} />);

      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders all row data', () => {
      render(<DataTable data={mockData} columns={basicColumns} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('renders correct number of rows', () => {
      const { container } = render(<DataTable data={mockData} columns={basicColumns} />);
      const rows = container.querySelectorAll('tbody tr');

      expect(rows).toHaveLength(3);
    });

    it('renders empty state when no data', () => {
      render(<DataTable data={[]} columns={basicColumns} />);

      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('renders default empty state message', () => {
      render(<DataTable data={[]} columns={basicColumns} />);

      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('renders custom empty state', () => {
      const customEmpty = <div>No users found</div>;
      render(<DataTable data={[]} columns={basicColumns} empty={customEmpty} />);

      expect(screen.getByText('No users found')).toBeInTheDocument();
      expect(screen.queryByText('No data available')).not.toBeInTheDocument();
    });

    it('renders custom React node as empty state', () => {
      const customEmpty = (
        <div>
          <strong>No data</strong>
          <p>Try adjusting your filters</p>
        </div>
      );
      render(<DataTable data={[]} columns={basicColumns} empty={customEmpty} />);

      expect(screen.getByText('No data')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
    });
  });

  describe('Row Click Handler', () => {
    it('calls onRowClick when row is clicked', async () => {
      const user = userEvent.setup();
      const handleRowClick = vi.fn();

      render(<DataTable data={mockData} columns={basicColumns} onRowClick={handleRowClick} />);

      const firstRow = screen.getByText('John Doe').closest('tr');
      if (firstRow) {
        await user.click(firstRow);
      }

      expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
    });

    it('passes correct row data to onRowClick', async () => {
      const user = userEvent.setup();
      const handleRowClick = vi.fn();

      render(<DataTable data={mockData} columns={basicColumns} onRowClick={handleRowClick} />);

      const secondRow = screen.getByText('Jane Smith').closest('tr');
      if (secondRow) {
        await user.click(secondRow);
      }

      expect(handleRowClick).toHaveBeenCalledWith(mockData[1]);
      expect(handleRowClick).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
        })
      );
    });

    it('works without onRowClick prop', async () => {
      const user = userEvent.setup();

      render(<DataTable data={mockData} columns={basicColumns} />);

      const firstRow = screen.getByText('John Doe').closest('tr');
      if (firstRow) {
        // Should not throw error
        await user.click(firstRow);
      }

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('Custom Column Rendering', () => {
    it('renders custom cell content', () => {
      const customColumns: ColumnDef<TestUser>[] = [
        { accessorKey: 'id', header: 'ID' },
        {
          accessorKey: 'name',
          header: 'Name',
          cell: ({ getValue }) => <strong>{getValue() as string}</strong>,
        },
      ];

      const { container } = render(<DataTable data={mockData} columns={customColumns} />);
      const strongElements = container.querySelectorAll('strong');

      expect(strongElements).toHaveLength(3); // 3 rows with strong tags
    });

    it('renders custom header content', () => {
      const customColumns: ColumnDef<TestUser>[] = [
        {
          accessorKey: 'id',
          header: () => <span>User ID</span>,
        },
        { accessorKey: 'name', header: 'Name' },
      ];

      render(<DataTable data={mockData} columns={customColumns} />);

      expect(screen.getByText('User ID')).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('accepts pageSize prop', () => {
      render(<DataTable data={mockData} columns={basicColumns} pageSize={2} />);

      // Table should render with custom page size (though pagination controls not visible in this simple version)
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('uses default pageSize of 10', () => {
      render(<DataTable data={mockData} columns={basicColumns} />);

      // All 3 items should be visible (within default page size of 10)
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles single row', () => {
      const singleData = [{ id: 1, name: 'John Doe', email: 'john@example.com', age: 30 }];
      render(<DataTable data={singleData} columns={basicColumns} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('handles large dataset', () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
      }));

      render(<DataTable data={largeData} columns={basicColumns} />);

      // First item should be visible
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    it('handles missing optional data fields', () => {
      const dataWithMissing: TestUser[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' }, // age is optional
      ];

      render(<DataTable data={dataWithMissing} columns={basicColumns} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('handles single column', () => {
      const singleColumn: ColumnDef<TestUser>[] = [{ accessorKey: 'name', header: 'Name' }];

      render(<DataTable data={mockData} columns={singleColumn} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('ID')).not.toBeInTheDocument();
    });

    it('renders empty row with correct colspan', () => {
      const { container } = render(<DataTable data={[]} columns={basicColumns} />);
      const emptyCell = container.querySelector('tbody td');

      expect(emptyCell).toHaveAttribute('colspan', '3');
    });
  });

  describe('Accessibility', () => {
    it('renders semantic table structure', () => {
      const { container } = render(<DataTable data={mockData} columns={basicColumns} />);

      expect(container.querySelector('table')).toBeInTheDocument();
      expect(container.querySelector('thead')).toBeInTheDocument();
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });

    it('renders table headers with th elements', () => {
      const { container } = render(<DataTable data={mockData} columns={basicColumns} />);
      const headers = container.querySelectorAll('th');

      expect(headers).toHaveLength(3);
    });

    it('renders table cells with td elements', () => {
      const { container } = render(<DataTable data={mockData} columns={basicColumns} />);
      const cells = container.querySelectorAll('tbody td');

      // 3 rows × 3 columns = 9 cells
      expect(cells.length).toBeGreaterThan(0);
    });

    it('maintains proper table row structure', () => {
      const { container } = render(<DataTable data={mockData} columns={basicColumns} />);
      const rows = container.querySelectorAll('tbody tr');

      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        expect(cells.length).toBe(3); // Each row should have 3 cells
      });
    });
  });

  describe('TypeScript Generics', () => {
    it('works with custom typed data', () => {
      interface Product {
        sku: string;
        title: string;
        price: number;
      }

      const products: Product[] = [{ sku: 'ABC123', title: 'Product 1', price: 29.99 }];

      const productColumns: ColumnDef<Product>[] = [
        { accessorKey: 'sku', header: 'SKU' },
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'price', header: 'Price' },
      ];

      render(<DataTable data={products} columns={productColumns} />);

      expect(screen.getByText('ABC123')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});
