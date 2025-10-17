import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  pageSize?: number;
  onRowClick?: (data: T) => void;
  empty?: React.ReactNode;
};
