import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationStyled, PaginationItemStyled } from './Pagination.styles';
import { PaginationProps } from '../types';

export const Pagination = ({ currentPage, numPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5; // Adjust the number of visible pages as needed
    const halfRange = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(numPages, currentPage + halfRange);

    if (currentPage - halfRange <= 0) {
      endPage = Math.min(numPages, endPage + (1 - currentPage + halfRange));
    }

    if (currentPage + halfRange > numPages) {
      startPage = Math.max(1, startPage - (currentPage + halfRange - numPages));
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

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

  return (
    <PaginationStyled>
      <PaginationItemStyled
        isActive={false}
        className={currentPage === 1 ? 'disabled' : ''}
        onClick={handlePrevious}
      >
        <ChevronLeft size={16} />
      </PaginationItemStyled>
      {pages.map((page, index) => (
        <PaginationItemStyled
          key={index}
          isActive={page === currentPage}
          className={typeof page === 'string' ? 'disabled' : ''}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PaginationItemStyled>
      ))}
      <PaginationItemStyled
        isActive={false}
        className={currentPage === numPages ? 'disabled' : ''}
        onClick={handleNext}
      >
        <ChevronRight size={16} />
      </PaginationItemStyled>
    </PaginationStyled>
  );
};

Pagination.displayName = 'Pagination';

Pagination.displayName = 'Pagination';
