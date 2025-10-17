import React from 'react';

export type SortDirection = 'asc' | 'desc';
export type RowAlign = 'center' | 'left' | 'right';

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

export type TableProps<T, K extends keyof T> = {
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
