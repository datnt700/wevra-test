/**
 * @fileoverview Table component with sorting, filtering, pagination, and row selection
 * Features: searchable columns, sortable headers, pagination, multi-row selection
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Pagination } from '../pagination';
import { InputSearch } from '../input-search';
import { Checkbox } from '../checkbox';
import { Styled } from './Table.styles';

type SortDirection = 'asc' | 'desc';
type RowAlign = 'center' | 'left' | 'right';

export interface Column<T, K extends keyof T> {
  key: string;
  header: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
  accessor?: K;
  sortable?: boolean;
  width?: string;
  align?: RowAlign;
  onClick?: any;

  render?(data: T): React.ReactNode;
}

type TableProps<T, K extends keyof T> = {
  columns: Array<Column<T, K>>;
  data: any;
  selectable?: boolean;
  searchable?: boolean;
  pagination?: boolean;
  onSelectionChange?: (selectedIds: Set<any>) => void;
  onSort?: (field: string, direction: SortDirection) => void;
  onSearch?: (term: string) => void;
  empty?: React.ReactNode;
  onRowClick?: (data: T) => void;
  isLoading?: boolean;
  loading?: React.ReactNode;
  isError?: boolean;
  error?: React.ReactNode;
};

/**
 * Table - Data table with sorting, filtering, pagination, and selection
 *
 * @description
 * Feature-rich data table component with built-in support for:
 * - Column sorting (ascending/descending)
 * - Row filtering via search
 * - Pagination with configurable page size
 * - Multi-row selection with checkboxes
 * - Custom cell rendering
 * - Loading and error states
 *
 * @example
 * // Basic table with user data
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 *   role: string;
 * }
 *
 * const columns: Column<User, keyof User>[] = [
 *   { key: 'name', header: 'Name' },
 *   { key: 'email', header: 'Email' },
 *   { key: 'role', header: 'Role', sortable: false },
 * ];
 *
 * const users: User[] = [
 *   { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
 *   { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
 * ];
 *
 * <Table columns={columns} data={users} />
 * ```
 *
 * @example
 * // Table with custom rendering and selection
 * ```tsx
 * const columns: Column<User, keyof User>[] = [
 *   { key: 'name', header: 'Name', width: '200px' },
 *   {
 *     key: 'status',
 *     header: 'Status',
 *     render: (user) => (
 *       <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
 *         {user.status}
 *       </Badge>
 *     ),
 *   },
 * ];
 *
 * <Table
 *   columns={columns}
 *   data={users}
 *   selectable
 *   onSelectionChange={(ids) => console.log('Selected:', ids)}
 * />
 * ```
 *
 * @example
 * // Table without search or pagination
 * ```tsx
 * <Table
 *   columns={columns}
 *   data={users}
 *   searchable={false}
 *   pagination={false}
 *   selectable={false}
 * />
 * ```
 *
 * @example
 * // Table with loading state
 * ```tsx
 * <Table
 *   columns={columns}
 *   data={users}
 *   isLoading={isLoading}
 *   loading={<Spinner />}
 *   empty={<EmptyState message="No users found" />}
 * />
 * ```
 */
export const Table = <T, K extends keyof T>({
  columns,
  data,
  selectable = true,
  searchable = true,
  pagination = true,
  onSelectionChange,
  onSort,
  onSearch,
  empty,
  //onRowClick,
  isError,
  error,
  isLoading,
  loading,
}: TableProps<T, K>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>(columns[0]?.key || '');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, _] = useState(10);

  if (isError) {
    return <>{error}</>;
  }

  if (isLoading) {
    return <>{loading}</>;
  }

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter((row: any) =>
        Object.entries(row).some(
          ([key, value]) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()) &&
            columns.some((col) => col.key === key)
        )
      )
    : data;

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = String(a[sortField]);
    const bValue = String(b[sortField]);
    return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : sortedData;

  const handleSort = (field: string) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onSort?.(field, newDirection);
  };

  const handleSelectAll = () => {
    const newSelected =
      selectedRows.size === paginatedData.length
        ? new Set()
        : new Set(paginatedData.map((row) => row.id));
    setSelectedRows(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSelectRow = (id: any) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch?.(term);
    setCurrentPage(1); // Reset to first page on search
  };

  return data && data.length ? (
    <Styled.TableWrapper>
      {searchable && (
        <Styled.SearchWrapper>
          <InputSearch
            placeholder="Search property ..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Styled.SearchWrapper>
      )}

      <Styled.TableElement>
        <thead>
          <Styled.TableRow>
            {selectable && (
              <Styled.TableHeader>
                <Checkbox
                  checked={selectedRows.size === paginatedData.length}
                  onCheckedChange={handleSelectAll}
                />
              </Styled.TableHeader>
            )}
            {columns.map((column) => (
              <Styled.TableHeader
                key={column.key}
                style={{ width: column.width }}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="headerContent">
                  <span>{column.header}</span>
                  {column.sortable !== false &&
                    sortField === column.key &&
                    (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </Styled.TableHeader>
            ))}
          </Styled.TableRow>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <Styled.TableRow key={row.id} className={selectedRows.has(row.id) ? 'selectedRow' : ''}>
              {selectable && (
                <Styled.TableCell>
                  <Checkbox
                    checked={selectedRows.has(row.id)}
                    onCheckedChange={() => handleSelectRow(row.id)}
                  />
                </Styled.TableCell>
              )}
              {columns.map((column) => (
                <Styled.TableCell key={column.key} onClick={() => column.onClick?.(row)}>
                  {column.render ? column.render(row) : row[column.key]}
                </Styled.TableCell>
              ))}
            </Styled.TableRow>
          ))}
        </tbody>
      </Styled.TableElement>

      <Styled.Footer>
        {pagination && <Pagination numPages={totalPages} currentPage={currentPage} />}
      </Styled.Footer>
    </Styled.TableWrapper>
  ) : (
    <>{empty}</>
  );
};

Table.displayName = 'Table';
