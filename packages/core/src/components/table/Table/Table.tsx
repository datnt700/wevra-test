import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Pagination } from '../../nav/Pagination';
import { InputSearch } from '../../form/inputs/InputSearch/components';
import { Checkbox } from '../../../main';
import {
  TableWrapper,
  TableElement,
  TableHeader,
  TableRow,
  TableCell,
  Footer,
  SearchWrapper
} from './Table.styles';

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
  loading
}: TableProps<T, K>): JSX.Element => {
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
    <TableWrapper>
      {searchable && (
        <SearchWrapper>
          <InputSearch
            placeholder="Search property ..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </SearchWrapper>
      )}

      <TableElement>
        <thead>
          <TableRow>
            {selectable && (
              <TableHeader>
                <Checkbox
                  checked={selectedRows.size === paginatedData.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHeader>
            )}
            {columns.map((column) => (
              <TableHeader
                key={column.key}
                style={{ width: column.width }}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="headerContent">
                  <span>{column.header}</span>
                  {column.sortable !== false &&
                    sortField === column.key &&
                    (sortDirection === 'asc' ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <TableRow key={row.id} className={selectedRows.has(row.id) ? 'selectedRow' : ''}>
              {selectable && (
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(row.id)}
                    onCheckedChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.key} onClick={() => column.onClick?.(row)}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </TableElement>

      <Footer>
        {pagination && <Pagination numPages={totalPages} currentPage={currentPage} />}
      </Footer>
    </TableWrapper>
  ) : (
    <>{empty}</>
  );
};
