'use client';

/**
 * @fileoverview Table component styles using Emotion
 * Provides styled components for data table with sorting, filtering, and pagination
 */

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

/**
 * Wrapper for the entire table component
 * Contains search, table, and pagination sections
 */
const TableWrapper = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      margin: 0;
      padding: 0;
      background-color: ${taviaTheme.colors.surface};
      width: 100%;
      max-width: 100%;
      border-radius: ${taviaTheme.radii.md};
    `;
  }}
`;

/**
 * Header section for table controls (e.g., search)
 */
const Header = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      padding: 1rem;
      background-color: ${taviaTheme.colors.surface};
    `;
  }}
`;

/**
 * Main HTML table element
 */
const TableElement = styled.table`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;

      thead {
        background-color: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
      }

      tbody tr {
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #f9fafb;
        }

        &.selectedRow {
          background-color: ${taviaTheme.colors.gray.gray100};
        }
      }
    `;
  }}
`;

/**
 * Table header cell (th element)
 * Includes sorting functionality
 */
const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  vertical-align: middle;
  cursor: pointer;

  .headerContent {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

/**
 * Table row (tr element)
 * Supports hover and selection states
 */
const TableRow = styled.tr`
  text-align: left;
  cursor: pointer;
`;

/**
 * Table data cell (td element)
 */
const TableCell = styled.td`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      padding: 1rem;
      vertical-align: middle;
      color: ${taviaTheme.colors.text.primary};
      font-size: 0.875rem;
    `;
  }}
`;

/**
 * Footer section for pagination controls
 */
const Footer = styled.div`
  padding: 1rem;
`;

/**
 * Wrapper for search input component
 */
const SearchWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Styled = {
  TableWrapper,
  Header,
  TableElement,
  TableHeader,
  TableRow,
  TableCell,
  Footer,
  SearchWrapper,
};
