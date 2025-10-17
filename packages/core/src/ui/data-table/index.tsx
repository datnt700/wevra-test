/**
 * @fileoverview DataTable component built with TanStack Table
 * Provides powerful data table with pagination and flexible column configuration
 */

import React from 'react';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, Container, Wrapper } from './Data.styles';

// type RowAlign = 'center' | 'left' | 'right';

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  pageSize?: number;
  onRowClick?: (data: T) => void;
  empty?: React.ReactNode;
};

/**
 * DataTable - Flexible data table component with TanStack Table
 *
 * @description
 * A powerful data table component built on TanStack Table (formerly React Table).
 * Features:
 * - Generic type support for type-safe data
 * - Pagination support with configurable page size
 * - Flexible column configuration
 * - Row click handlers
 * - Custom empty state
 * - Striped rows with hover effects
 * - Scrollable container for large datasets
 *
 * Built with TanStack Table for advanced table features and accessibility.
 *
 * @example
 * // Basic usage with typed data
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * const columns: ColumnDef<User>[] = [
 *   { accessorKey: 'id', header: 'ID' },
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 * ];
 *
 * const users: User[] = [
 *   { id: 1, name: 'John Doe', email: 'john@example.com' },
 *   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
 * ];
 *
 * <DataTable data={users} columns={columns} pageSize={10} />
 * ```
 *
 * @example
 * // With row click handler
 * ```tsx
 * const handleRowClick = (user: User) => {
 *   console.log('Clicked user:', user);
 *   navigate(`/users/${user.id}`);
 * };
 *
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   onRowClick={handleRowClick}
 * />
 * ```
 *
 * @example
 * // With custom empty state
 * ```tsx
 * <DataTable
 *   data={[]}
 *   columns={columns}
 *   empty={<div>No users found. Try adjusting your filters.</div>}
 * />
 * ```
 *
 * @example
 * // With custom cell rendering
 * ```tsx
 * const columns: ColumnDef<User>[] = [
 *   { accessorKey: 'id', header: 'ID' },
 *   {
 *     accessorKey: 'name',
 *     header: 'Name',
 *     cell: ({ getValue }) => <strong>{getValue()}</strong>,
 *   },
 *   {
 *     accessorKey: 'email',
 *     header: 'Email',
 *     cell: ({ getValue }) => <a href={`mailto:${getValue()}`}>{getValue()}</a>,
 *   },
 * ];
 *
 * <DataTable data={users} columns={columns} />
 * ```
 */
export const DataTable = <T,>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  empty,
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Wrapper>
      <Container>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={() => onRowClick?.(row.original)}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>{empty || 'No data available'}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Wrapper>
  );
};

DataTable.displayName = 'DataTable';
