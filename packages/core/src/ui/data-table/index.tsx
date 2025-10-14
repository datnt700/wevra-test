import React from 'react';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender
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

export const DataTable = <T,>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  empty
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
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
