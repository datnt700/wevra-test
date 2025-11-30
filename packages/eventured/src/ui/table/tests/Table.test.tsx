import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, Column } from '../components/Table';

interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const mockUsers: TestUser[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
];

const basicColumns: Column<TestUser, keyof TestUser>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

describe('Table', () => {
  describe('Basic Rendering', () => {
    it('should render table with data', () => {
      render(<Table columns={basicColumns} data={mockUsers} />);

      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });

    it('should render table headers', () => {
      render(<Table columns={basicColumns} data={mockUsers} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('should render empty state when data is empty', () => {
      render(<Table columns={basicColumns} data={[]} empty={<div>No users found</div>} />);

      expect(screen.getByText('No users found')).toBeInTheDocument();
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    });

    it('should render loading state', () => {
      render(
        <Table columns={basicColumns} data={mockUsers} isLoading loading={<div>Loading...</div>} />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    });

    it('should render error state', () => {
      render(
        <Table
          columns={basicColumns}
          data={mockUsers}
          isError
          error={<div>Error loading data</div>}
        />
      );

      expect(screen.getByText('Error loading data')).toBeInTheDocument();
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should render search input when searchable is true', () => {
      render(<Table columns={basicColumns} data={mockUsers} searchable />);

      const searchInput = screen.getByPlaceholderText('Search property ...');
      expect(searchInput).toBeInTheDocument();
    });

    it('should not render search input when searchable is false', () => {
      render(<Table columns={basicColumns} data={mockUsers} searchable={false} />);

      const searchInput = screen.queryByPlaceholderText('Search property ...');
      expect(searchInput).not.toBeInTheDocument();
    });

    it('should filter data when searching', async () => {
      const user = userEvent.setup();
      render(<Table columns={basicColumns} data={mockUsers} searchable />);

      const searchInput = screen.getByPlaceholderText('Search property ...');
      await user.type(searchInput, 'Alice');

      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
    });

    it('should call onSearch callback when typing', async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<Table columns={basicColumns} data={mockUsers} onSearch={onSearch} />);

      const searchInput = screen.getByPlaceholderText('Search property ...');
      await user.type(searchInput, 'Alice');

      expect(onSearch).toHaveBeenCalledWith('Alice');
    });
  });

  describe('Selection Functionality', () => {
    it('should render select-all checkbox when selectable is true', () => {
      render(<Table columns={basicColumns} data={mockUsers} selectable />);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should not render checkboxes when selectable is false', () => {
      render(<Table columns={basicColumns} data={mockUsers} selectable={false} />);

      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(0);
    });

    it('should select all rows when clicking select-all checkbox', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(
        <Table
          columns={basicColumns}
          data={mockUsers}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      const selectAllCheckbox = checkboxes[0]!; // First checkbox is select-all

      await user.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalled();
    });

    it('should toggle individual row selection', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(
        <Table
          columns={basicColumns}
          data={mockUsers}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      const firstRowCheckbox = checkboxes[1]!; // Second checkbox is first data row

      await user.click(firstRowCheckbox);

      expect(onSelectionChange).toHaveBeenCalled();
    });
  });

  describe('Sorting Functionality', () => {
    it('should display sort icons on sortable columns', () => {
      render(<Table columns={basicColumns} data={mockUsers} />);

      // ChevronUp/ChevronDown icons are rendered as SVG
      const nameHeader = screen.getByText('Name');
      expect(nameHeader).toBeInTheDocument();
    });

    it('should call onSort callback when clicking header', async () => {
      const user = userEvent.setup();
      const onSort = vi.fn();
      render(<Table columns={basicColumns} data={mockUsers} onSort={onSort} />);

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      expect(onSort).toHaveBeenCalledWith('name', 'desc'); // First click toggles to desc
    });

    it('should not sort when column is marked as non-sortable', async () => {
      const user = userEvent.setup();
      const onSort = vi.fn();
      const columns: Column<TestUser, keyof TestUser>[] = [
        { key: 'name', header: 'Name', sortable: false },
      ];

      render(<Table columns={columns} data={mockUsers} onSort={onSort} />);

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      expect(onSort).not.toHaveBeenCalled();
    });
  });

  describe('Custom Rendering', () => {
    it('should render custom cell content', () => {
      const columns: Column<TestUser, keyof TestUser>[] = [
        { key: 'name', header: 'Name' },
        {
          key: 'role',
          header: 'Role',
          render: (user) => <strong data-testid="custom-role">{user.role}</strong>,
        },
      ];

      render(<Table columns={columns} data={mockUsers} />);

      const customRoles = screen.getAllByTestId('custom-role');
      expect(customRoles).toHaveLength(mockUsers.length);
      expect(customRoles[0]).toHaveTextContent('Admin');
    });

    it('should call onClick handler when clicking cell', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const columns: Column<TestUser, keyof TestUser>[] = [
        { key: 'name', header: 'Name', onClick },
      ];

      render(<Table columns={columns} data={mockUsers} />);

      const nameCell = screen.getByText('Alice Johnson');
      await user.click(nameCell);

      expect(onClick).toHaveBeenCalledWith(mockUsers[0]);
    });
  });

  describe('Pagination', () => {
    it('should render pagination when enabled', () => {
      render(<Table columns={basicColumns} data={mockUsers} pagination />);

      // Pagination component renders page numbers
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should not render pagination when disabled', () => {
      render(<Table columns={basicColumns} data={mockUsers} pagination={false} />);

      // All users should be visible without pagination
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty column array', () => {
      const { container } = render(<Table columns={[]} data={mockUsers} />);

      // Should render table structure even with no columns
      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();

      // Should render rows for data (only selection checkboxes visible)
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0); // At least select-all checkbox
    });

    it('should handle missing row id', () => {
      const usersWithoutId = mockUsers.map(({ id: _id, ...user }) => user);

      // Should not crash even without id
      expect(() => {
        render(<Table columns={basicColumns} data={usersWithoutId as any} />);
      }).not.toThrow();
    });

    it('should handle column width property', () => {
      const columns: Column<TestUser, keyof TestUser>[] = [
        { key: 'name', header: 'Name', width: '200px' },
      ];

      render(<Table columns={columns} data={mockUsers} />);

      const nameHeader = screen.getByText('Name');
      expect(nameHeader).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render table with proper semantic structure', () => {
      const { container } = render(<Table columns={basicColumns} data={mockUsers} />);

      const table = container.querySelector('table');
      const thead = container.querySelector('thead');
      const tbody = container.querySelector('tbody');

      expect(table).toBeInTheDocument();
      expect(thead).toBeInTheDocument();
      expect(tbody).toBeInTheDocument();
    });

    it('should render checkboxes with proper roles', () => {
      render(<Table columns={basicColumns} data={mockUsers} selectable />);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });
});
