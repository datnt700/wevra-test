export interface PaginationProps {
  currentPage: number;
  numPages: number;
  onPageChange?: (page: number) => void;
}
