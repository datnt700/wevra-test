/**
 * Pagination component - Navigate through pages
 *
 * @example
 * // Basic usage
 * <Pagination currentPage={1} numPages={10} onPageChange={(page) => console.log(page)} />
 *
 * @example
 * // With many pages (shows ellipsis)
 * <Pagination currentPage={15} numPages={50} onPageChange={setPage} />
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Styled } from './Pagination.styles';
import { PaginationProps } from '../types';

export const Pagination = ({ currentPage, numPages, onPageChange }: PaginationProps) => {
  /**
   * Generate page numbers with ellipsis for large ranges
   * Shows at most 5 pages at a time with smart ellipsis placement
   */
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(numPages, currentPage + halfRange);

    // Adjust range if near start
    if (currentPage - halfRange <= 0) {
      endPage = Math.min(numPages, endPage + (1 - currentPage + halfRange));
    }

    // Adjust range if near end
    if (currentPage + halfRange > numPages) {
      startPage = Math.max(1, startPage - (currentPage + halfRange - numPages));
    }

    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (startPage > 1) pages.unshift('...');
    if (endPage < numPages) pages.push('...');

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const pages = getPageNumbers();
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= numPages;

  return (
    <Styled.Container role="navigation" aria-label="Pagination">
      {/* Previous button */}
      <Styled.Item
        $isDisabled={isPrevDisabled}
        onClick={handlePrevious}
        aria-label="Go to previous page"
        disabled={isPrevDisabled}
      >
        <ChevronLeft size={16} />
      </Styled.Item>

      {/* Page numbers */}
      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <Styled.Ellipsis key={`ellipsis-${index}`} aria-hidden="true">
            {page}
          </Styled.Ellipsis>
        ) : (
          <Styled.Item
            key={page}
            $isActive={page === currentPage}
            onClick={() => handlePageClick(page)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Styled.Item>
        )
      )}

      {/* Next button */}
      <Styled.Item
        $isDisabled={isNextDisabled}
        onClick={handleNext}
        aria-label="Go to next page"
        disabled={isNextDisabled}
      >
        <ChevronRight size={16} />
      </Styled.Item>
    </Styled.Container>
  );
};

Pagination.displayName = 'Pagination';
